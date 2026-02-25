import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Header } from '../organisms/Header';
import { projectService } from '../../services/api';
import ConfirmModal from '../atoms/ConfirmModal';

interface TorreDetailsViewProps {
    projectId: string;
    torreId: string;
    onBack: () => void;
}

const PisoModal = ({ isOpen, onClose, onSubmit, loading, tiposDisponibles = [] }: any) => {
    const [numeroNivel, setNumeroNivel] = useState<number | ''>('');
    const [cantidades, setCantidades] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        if (isOpen) {
            setCantidades({});
            setNumeroNivel('');
        }
    }, [isOpen]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative theme-light:bg-white theme-light:border-slate-200">
                <Typography variant="h2" className="mb-4">Agregar Piso</Typography>
                <form onSubmit={e => {
                    e.preventDefault();
                    const aps = Object.entries(cantidades).filter(([_, qty]) => qty > 0).map(([tipo_id, cantidad]) => ({ tipo_id, cantidad }));
                    onSubmit({ numero_nivel: Number(numeroNivel), apartamentos_tipos: aps });
                }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Nivel del Piso</label>
                            <input type="number" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900" placeholder="" value={numeroNivel} onChange={e => setNumeroNivel(e.target.value ? Number(e.target.value) : '')} required />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-2 theme-light:text-slate-500">Distribución de Apartamentos</label>
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
                        <Button type="submit" disabled={loading || Object.values(cantidades).reduce((a, b) => a + b, 0) === 0}>{loading ? 'Guardando...' : 'Agregar Piso'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export const TorreDetailsView: React.FC<TorreDetailsViewProps> = ({ projectId, torreId, onBack }) => {
    const [torre, setTorre] = useState<any>(null);
    const [tiposDisponibles, setTiposDisponibles] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isPisoModalOpen, setIsPisoModalOpen] = useState(false);
    const [savingPiso, setSavingPiso] = useState(false);

    const [pisoToDelete, setPisoToDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchTorreAndTipos = async () => {
        try {
            setLoading(true);
            const [torreData, projectData] = await Promise.all([
                projectService.getTorre(projectId, torreId),
                projectService.getProject(projectId)
            ]);
            setTorre(torreData);
            setTiposDisponibles(projectData.tipos_plantilla || []);
        } catch (error) {
            console.error("Error fetching torre data", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTorreAndTipos();
    }, [projectId, torreId]);

    const handleCreatePiso = async (data: any) => {
        try {
            setSavingPiso(true);
            await projectService.createPiso(projectId, torreId, data);
            setIsPisoModalOpen(false);
            fetchTorreAndTipos();
        } catch (error) {
            console.error("Error creating piso", error);
        } finally {
            setSavingPiso(false);
        }
    };

    const handleDeletePisoClick = (pisoId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setPisoToDelete(pisoId);
    };

    const confirmDeletePiso = async () => {
        if (!pisoToDelete) return;
        setDeleting(true);
        try {
            await projectService.deletePiso(projectId, torreId, pisoToDelete);
            fetchTorreAndTipos();
        } catch (error) {
            console.error("Error deleting piso", error);
            alert("Hubo un error al eliminar el piso.");
        } finally {
            setDeleting(false);
            setPisoToDelete(null);
        }
    };

    if (loading) return <div className="p-8 text-center text-gray-400 animate-pulse">Cargando detalles de la torre...</div>;
    if (!torre) return <div className="p-8 text-center text-red-500">Error al cargar la torre.</div>;

    const totalPisosAgregados = torre.pisos ? torre.pisos.length : 0;
    const progressPisos = (totalPisosAgregados / torre.numero_pisos) * 100;


    return (
        <div className="animate-fade-in flex-1 flex flex-col relative w-full h-full">
            <Header
                title={`Torre: ${torre.nombre}`}
                subtitle={`Objetivo: ${torre.numero_pisos} Pisos | ${torre.numero_aptos} Aptos`}
                actionLabel="+ Agregar Piso"
                onAction={() => setIsPisoModalOpen(true)}
            />

            <div className="p-8 space-y-8">
                <Button variant="ghost" onClick={onBack} className="mb-4">
                    ← Volver al Proyecto
                </Button>

                <div className="glass-card theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-slate-200/50 p-6 rounded-2xl">
                    <Typography variant="h2" className="mb-4">Progreso de Configuración</Typography>
                    <div className="flex justify-between text-sm text-gray-400 mb-2 theme-light:text-slate-500">
                        <span>Pisos Configurados: {totalPisosAgregados} / {torre.numero_pisos}</span>
                        <span>{Math.round(progressPisos)}%</span>
                    </div>
                    <div className="w-full bg-dark-900 rounded-full h-2.5 theme-light:bg-slate-100">
                        <div className="bg-saas-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${Math.min(progressPisos, 100)}%` }}></div>
                    </div>
                </div>

                <div className="glass-card theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-slate-200/50 p-6 rounded-2xl">
                    <Typography variant="h2" className="mb-6">Pisos de la Torre</Typography>

                    {totalPisosAgregados === 0 ? (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/10 rounded-xl theme-light:border-slate-300 theme-light:text-slate-500">
                            Aún no hay pisos configurados en esta torre.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {torre.pisos.sort((a: any, b: any) => b.numero_nivel - a.numero_nivel).map((piso: any) => (
                                <div key={piso.id} className="bg-dark-900 border border-white/10 p-4 rounded-xl flex items-center justify-between theme-light:bg-slate-50 theme-light:border-slate-200 group relative">
                                    <div className="absolute top-1/2 -translate-y-1/2 right-24 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => handleDeletePisoClick(piso.id, e)} className="text-gray-500 hover:text-red-500 p-1 bg-dark-800 rounded-md theme-light:bg-white theme-light:shadow-sm" title="Eliminar Piso">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white theme-light:text-slate-800">Piso {piso.numero_nivel}</h3>
                                        <span className="text-sm text-gray-400 theme-light:text-slate-500">{piso.cantidad_aptos} Apartamentos</span>
                                    </div>
                                    <button className="text-saas-500 hover:text-saas-400 p-2 theme-light:text-saas-600">
                                        Gestionar
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <PisoModal
                isOpen={isPisoModalOpen}
                onClose={() => setIsPisoModalOpen(false)}
                onSubmit={handleCreatePiso}
                loading={savingPiso}
                tiposDisponibles={tiposDisponibles}
            />

            <ConfirmModal
                isOpen={pisoToDelete !== null}
                onClose={() => setPisoToDelete(null)}
                onConfirm={confirmDeletePiso}
                title="Eliminar Piso"
                message="¿Estás seguro de que deseas eliminar este Piso? Se destruirán todos los apartamentos contenidos en él y se restarán del total de la Torre."
                loading={deleting}
            />
        </div>
    );
};
