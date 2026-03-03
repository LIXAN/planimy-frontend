import React, { useState, useEffect } from 'react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface TipoPlantillaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    loading: boolean;
    initialData?: any;
    error?: string | null;
}

export const TipoPlantillaModal: React.FC<TipoPlantillaModalProps> = ({ isOpen, onClose, onSubmit, loading, initialData, error }) => {
    const [nombre, setNombre] = useState(initialData?.nombre || '');
    const [areaConstruida, setAreaConstruida] = useState<number | ''>(initialData?.area_construida || '');
    const [areaPrivada, setAreaPrivada] = useState<number | ''>(initialData?.area_privada || '');
    const [habitaciones, setHabitaciones] = useState<number | ''>(initialData?.habitaciones || '');
    const [banos, setBanos] = useState<number | ''>(initialData?.banos || '');

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setAreaConstruida(initialData.area_construida);
            setAreaPrivada(initialData.area_privada);
            setHabitaciones(initialData.habitaciones);
            setBanos(initialData.banos);
        } else {
            setNombre(''); setAreaConstruida(''); setAreaPrivada(''); setHabitaciones(''); setBanos('');
        }
    }, [initialData, isOpen]);

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative theme-light:bg-white theme-light:border-slate-200">
                <Typography variant="h2" className="mb-4">{initialData ? 'Editar Tipo' : 'Nuevo Tipo'}</Typography>
                <form onSubmit={e => {
                    e.preventDefault();
                    onSubmit({
                        nombre,
                        area_construida: Number(areaConstruida),
                        area_privada: Number(areaPrivada),
                        habitaciones: Number(habitaciones),
                        banos: Number(banos)
                    });
                }}>
                    {error && (
                        <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 p-3 rounded-lg theme-light:bg-red-50 theme-light:border-red-200">
                            {error}
                        </div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Nombre del Tipo</label>
                            <input className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Ej. Tipo A" value={nombre} onChange={e => setNombre(e.target.value)} required />
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Área Construida (m²)</label>
                                <input type="number" step="0.01" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="" value={areaConstruida} onChange={e => setAreaConstruida(e.target.value ? Number(e.target.value) : '')} required min="0" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Área Privada (m²)</label>
                                <input type="number" step="0.01" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="" value={areaPrivada} onChange={e => setAreaPrivada(e.target.value ? Number(e.target.value) : '')} required min="0" />
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <div className="w-1/2">
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Habitaciones</label>
                                <input type="number" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="" value={habitaciones} onChange={e => setHabitaciones(e.target.value ? Number(e.target.value) : '')} required min="1" />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Baños</label>
                                <input type="number" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="" value={banos} onChange={e => setBanos(e.target.value ? Number(e.target.value) : '')} required min="1" />
                            </div>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : (initialData ? 'Actualizar Tipo' : 'Crear Tipo')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
