import React, { useState, useEffect } from 'react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { projectService } from '../../services/api';

interface PisoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    loading: boolean;
    tiposDisponibles?: any[];
    initialData?: any;
    projectId: string;
    torreId: string;
    esCasas?: boolean;
}

export const PisoModal: React.FC<PisoModalProps> = ({
    isOpen, onClose, onSubmit, loading, tiposDisponibles = [], initialData = null, projectId, torreId, esCasas = false
}) => {
    const [numeroNivel, setNumeroNivel] = useState<number | ''>('');
    const [zonasSociales, setZonasSociales] = useState<string[]>([]);
    const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const opcionesZonaSocial = [
        "Lobby / Recepción", "Gimnasio", "Piscina", "Salón Social",
        "Terraza / BBQ", "Cancha Múltiple", "Zona Infantil", "Coworking",
        "Cine / Teatrino", "SPA / Zonas Húmedas", "Parqueadero", "Otro"
    ];

    useEffect(() => {
        if (isOpen) {
            setIsDropdownOpen(false);
            if (initialData) {
                setNumeroNivel(initialData.numero_nivel);

                // Parse existing zona_social (it might come as a JSON string or an array from backend, or a single string from older data)
                let initialZonas: string[] = [];
                if (initialData.zona_social) {
                    if (Array.isArray(initialData.zona_social)) {
                        initialZonas = initialData.zona_social;
                    } else if (typeof initialData.zona_social === 'string') {
                        try {
                            const parsed = JSON.parse(initialData.zona_social);
                            initialZonas = Array.isArray(parsed) ? parsed : [initialData.zona_social];
                        } catch {
                            // Si no es JSON válido y no es array, pero es string (ej: "Gimnasio")
                            // Opciones antiguas separadas por comas? 
                            if (initialData.zona_social.includes(',')) {
                                initialZonas = initialData.zona_social.split(',').map((s: string) => s.trim());
                            } else {
                                initialZonas = [initialData.zona_social];
                            }
                        }
                    }
                }
                setZonasSociales(initialZonas);

                const loadCantidades = async () => {
                    try {
                        // The `projectService.getTorre` endpoint might return nested `apartamentos` or not. Let's handle both.
                        if (initialData.apartamentos && Array.isArray(initialData.apartamentos)) {
                            const counts: { [key: string]: number } = {};
                            initialData.apartamentos.forEach((a: any) => {
                                const tId = a.tipo_id;
                                counts[tId] = (counts[tId] || 0) + 1;
                            });
                            setCantidades(counts);
                        } else if (initialData.apartamentos_tipos) { // In case the backend returns the summary we send
                            const counts: { [key: string]: number } = {};
                            initialData.apartamentos_tipos.forEach((at: any) => {
                                counts[at.tipo_id] = at.cantidad;
                            });
                            setCantidades(counts);
                        } else if (projectId && torreId && initialData.id) {
                            // Fetch the apartments for this specific floor
                            const aptos = await projectService.getApartamentosPorPiso(projectId, torreId, initialData.id);
                            const counts: { [key: string]: number } = {};
                            aptos.forEach((a: any) => {
                                const tId = a.tipo_id;
                                counts[tId] = (counts[tId] || 0) + 1;
                            });
                            setCantidades(counts);
                        }
                    } catch (e) {
                        console.error("Failed to load cantidades", e);
                    }
                };
                loadCantidades();
            } else {
                setCantidades({});
                setNumeroNivel('');
                setZonasSociales([]);
            }
        }
    }, [isOpen, initialData, projectId, torreId]);

    const toggleZonaSocial = (opcion: string) => {
        setZonasSociales(prev =>
            prev.includes(opcion)
                ? prev.filter(z => z !== opcion)
                : [...prev, opcion]
        );
    };

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative theme-light:bg-white theme-light:border-slate-200">
                <Typography variant="h2" className="mb-4">{initialData ? (esCasas ? 'Gestionar Casas' : 'Gestionar Piso') : (esCasas ? 'Configurar Casas' : 'Agregar Piso')}</Typography>
                <form onSubmit={e => {
                    e.preventDefault();
                    if (isDropdownOpen) setIsDropdownOpen(false);
                    const aps = Object.entries(cantidades).filter(([_, qty]) => qty > 0).map(([tipo_id, cantidad]) => ({ tipo_id, cantidad }));
                    // Subimos un array de strings (o null si está vacío)
                    const zonaToSave = zonasSociales.length > 0 ? zonasSociales : null;
                    onSubmit({ numero_nivel: esCasas ? 1 : Number(numeroNivel), zona_social: zonaToSave, apartamentos_tipos: aps });
                }}>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {!esCasas && (
                                <div>
                                    <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Nivel del Piso</label>
                                    <input type="number" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900" placeholder="" value={numeroNivel} onChange={e => setNumeroNivel(e.target.value ? Number(e.target.value) : '')} required min="1" />
                                </div>
                            )}
                            <div className="relative">
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Zonas Sociales (Opcional)</label>
                                <div
                                    className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-3 py-2 cursor-pointer min-h-[42px] flex justify-between items-center focus:ring-2 focus:ring-saas-500 hover:border-saas-500/50 transition-colors theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900"
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                >
                                    <div className="flex flex-wrap gap-1 flex-1 overflow-hidden h-6 items-center">
                                        {zonasSociales.length === 0 ? (
                                            <span className="text-gray-500">Ninguna</span>
                                        ) : (
                                            <span className="text-sm truncate w-full pr-2">
                                                {zonasSociales.join(', ')}
                                            </span>
                                        )}
                                    </div>
                                    <svg className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {isDropdownOpen && (
                                    <>
                                        {/* Invisible overlay to close dropdown when clicking outside */}
                                        <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)}></div>
                                        <div className="absolute z-20 w-full mt-1 bg-dark-800 border border-white/10 rounded-lg shadow-xl overflow-hidden max-h-48 overflow-y-auto theme-light:bg-white theme-light:border-slate-200">
                                            {opcionesZonaSocial.map(opcion => {
                                                const isSelected = zonasSociales.includes(opcion);
                                                return (
                                                    <div
                                                        key={opcion}
                                                        className="px-4 py-2 cursor-pointer flex items-center gap-3 text-sm hover:bg-dark-900 theme-light:hover:bg-slate-50 group transition-colors"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            toggleZonaSocial(opcion);
                                                        }}
                                                    >
                                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${isSelected ? 'bg-saas-500 border-saas-500 text-white' : 'border-gray-500 group-hover:border-saas-400'}`}>
                                                            {isSelected && (
                                                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            )}
                                                        </div>
                                                        <span className={`${isSelected ? 'text-white theme-light:text-slate-900 font-medium' : 'text-gray-300 theme-light:text-slate-600'}`}>
                                                            {opcion}
                                                        </span>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2 theme-light:text-slate-500">Distribución de {esCasas ? 'Casas' : 'Apartamentos'}</label>
                            {tiposDisponibles.length === 0 ? (
                                <div className="text-sm text-red-400 p-3 bg-red-400/10 rounded-lg">Primero debes crear Tipos de Plantilla en el Proyecto.</div>
                            ) : (
                                <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
                                    {tiposDisponibles.map((t: any) => (
                                        <div key={t.id} className="flex items-center justify-between bg-dark-900/50 p-3 rounded-lg border border-white/5 theme-light:bg-slate-50 theme-light:border-slate-200">
                                            <span className="text-sm font-medium theme-light:text-slate-800">{t.nombre} <span className="text-gray-500 text-xs">({t.area_construida}m²)</span></span>
                                            <input
                                                type="number"
                                                min="0"
                                                className="w-20 bg-dark-900 border border-white/10 text-white rounded-md px-2 py-1 text-center outline-none focus:border-saas-500 theme-light:bg-white theme-light:border-slate-300 theme-light:text-slate-900"
                                                placeholder=""
                                                value={cantidades[t.id] || ''}
                                                onChange={e => setCantidades({ ...cantidades, [t.id]: e.target.value ? Number(e.target.value) : 0 })}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading || Object.values(cantidades).reduce((a, b) => a + b, 0) === 0}>{loading ? 'Guardando...' : (initialData ? 'Guardar Cambios' : (esCasas ? 'Guardar Distribución' : 'Agregar Piso'))}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
