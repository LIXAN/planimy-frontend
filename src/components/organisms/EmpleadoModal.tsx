import React, { useState, useEffect } from 'react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';

interface EmpleadoModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    loading: boolean;
    initialData?: any;
}

export const EmpleadoModal: React.FC<EmpleadoModalProps> = ({ isOpen, onClose, onSubmit, loading, initialData }) => {
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [documentoIdentidad, setDocumentoIdentidad] = useState('');
    const [cargo, setCargo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [salario, setSalario] = useState<number | ''>('');
    const [estado, setEstado] = useState('activo');

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setNombreCompleto(initialData.nombre_completo || '');
                setDocumentoIdentidad(initialData.documento_identidad || '');
                setCargo(initialData.cargo || '');
                setTelefono(initialData.telefono || '');
                setSalario(initialData.salario || '');
                setEstado(initialData.estado || 'activo');
            } else {
                setNombreCompleto('');
                setDocumentoIdentidad('');
                setCargo('');
                setTelefono('');
                setSalario('');
                setEstado('activo');
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-white/10 p-6 rounded-2xl w-full max-w-lg shadow-2xl relative theme-light:bg-white theme-light:border-slate-200">
                <Typography variant="h2" className="mb-4">{initialData ? 'Editar Empleado' : 'Nuevo Empleado'}</Typography>
                <form onSubmit={e => {
                    e.preventDefault();
                    onSubmit({
                        nombre_completo: nombreCompleto,
                        documento_identidad: documentoIdentidad || null,
                        cargo: cargo,
                        telefono: telefono || null,
                        salario: salario ? Number(salario) : null,
                        estado: estado
                    });
                }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Nombre Completo *</label>
                            <input className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Ej. Juan Pérez" value={nombreCompleto} onChange={e => setNombreCompleto(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Documento de Identidad</label>
                                <input className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Opcional" value={documentoIdentidad} onChange={e => setDocumentoIdentidad(e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Teléfono</label>
                                <input className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Opcional" value={telefono} onChange={e => setTelefono(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Cargo *</label>
                                <input className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Ej. Arquitecto, Maestro..." value={cargo} onChange={e => setCargo(e.target.value)} required />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Salario</label>
                                <input type="number" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Opcional" value={salario} onChange={e => setSalario(e.target.value ? Number(e.target.value) : '')} min="0" />
                            </div>
                        </div>

                        {initialData && (
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Estado del Empleado</label>
                                <select
                                    className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900"
                                    value={estado}
                                    onChange={e => setEstado(e.target.value)}
                                >
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option>
                                </select>
                            </div>
                        )}

                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : (initialData ? 'Actualizar' : 'Registrar Empleado')}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
