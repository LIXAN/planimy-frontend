import React, { useState, useEffect } from 'react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { Header } from '../organisms/Header';
import { projectService } from '../../services/api';
import { TorreDetailsView } from './TorreDetailsView';
import ConfirmModal from '../atoms/ConfirmModal';

const TorreModal = ({ isOpen, onClose, onSubmit, loading }: any) => {
    // ... TorreModal content ...
    const [nombre, setNombre] = useState('');
    const [pisos, setPisos] = useState<number | ''>('');

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-white/10 p-6 rounded-2xl w-full max-w-md shadow-2xl relative theme-light:bg-white theme-light:border-slate-200">
                <Typography variant="h2" className="mb-4">Nueva Torre</Typography>
                <form onSubmit={e => { e.preventDefault(); onSubmit({ nombre, numero_pisos: Number(pisos) }); }}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Nombre de la Torre</label>
                            <input className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="Ej. Torre 1" value={nombre} onChange={e => setNombre(e.target.value)} required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1 theme-light:text-slate-500">Número de Pisos</label>
                            <input type="number" className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-saas-500 outline-none theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white theme-light:placeholder-slate-400" placeholder="" value={pisos} onChange={e => setPisos(e.target.value ? Number(e.target.value) : '')} required min="1" />
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>{loading ? 'Guardando...' : 'Crear Torre'}</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const TipoPlantillaModal = ({ isOpen, onClose, onSubmit, loading, initialData }: any) => {
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

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
    constructor(props: { children: React.ReactNode }) {
        super(props);
        this.state = { hasError: false, error: null };
    }
    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }
    render() {
        if (this.state.hasError) {
            return <div className="p-8 text-red-500 font-mono bg-dark-900 absolute inset-0 z-50">
                <h2>React Crash Info:</h2>
                <pre>{this.state.error?.message}</pre>
                <pre>{this.state.error?.stack}</pre>
            </div>;
        }
        return this.props.children;
    }
}

interface ProjectDetailsViewProps {
    projectId: string;
    onBack: () => void;
}

export const ProjectDetailsView: React.FC<ProjectDetailsViewProps> = (props) => {
    return (
        <ErrorBoundary>
            <ProjectDetailsViewContent {...props} />
        </ErrorBoundary>
    );
};

const ProjectDetailsViewContent: React.FC<ProjectDetailsViewProps> = ({ projectId, onBack }) => {
    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isTorreModalOpen, setIsTorreModalOpen] = useState(false);
    const [isTipoModalOpen, setIsTipoModalOpen] = useState(false);
    const [savingTorre, setSavingTorre] = useState(false); // Added this line

    // Novedad: Control de la vista descendente de Torre
    const [selectedTorreId, setSelectedTorreId] = useState<string | null>(null);

    const [savingTipo, setSavingTipo] = useState(false);
    const [editingTipo, setEditingTipo] = useState<any>(null);

    const [torreToDelete, setTorreToDelete] = useState<string | null>(null);
    const [tipoToDelete, setTipoToDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchProject = async () => {
        try {
            setLoading(true);
            const data = await projectService.getProject(projectId);
            setProject(data);
        } catch (error) {
            console.error("Error fetching project", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selectedTorreId) {
            fetchProject();
        }
    }, [projectId, selectedTorreId]);

    const handleCreateTorre = async (data: any) => {
        try {
            setSavingTorre(true);
            await projectService.createTorre(projectId, data);
            setIsTorreModalOpen(false);
            fetchProject();
        } catch (error) {
            console.error("Error creating torre", error);
        } finally {
            setSavingTorre(false);
        }
    }

    const handleCreateOrUpdateTipo = async (data: any) => {
        try {
            setSavingTipo(true);
            if (editingTipo) {
                await projectService.updateTipoPlantilla(projectId, editingTipo.id, data);
            } else {
                await projectService.createTipoPlantilla(projectId, data);
            }
            setIsTipoModalOpen(false);
            setEditingTipo(null);
            fetchProject();
        } catch (error) {
            console.error("Error saving tipo", error);
        } finally {
            setSavingTipo(false);
        }
    }

    const handleDeleteTorreClick = (torreId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTorreToDelete(torreId);
    };

    const confirmDeleteTorre = async () => {
        if (!torreToDelete) return;
        setDeleting(true);
        try {
            await projectService.deleteTorre(projectId, torreToDelete);
            fetchProject();
        } catch (error) {
            console.error("Error deleting torre", error);
            alert("Hubo un error al eliminar la torre.");
        } finally {
            setDeleting(false);
            setTorreToDelete(null);
        }
    };

    const handleDeleteTipoClick = (tipoId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setTipoToDelete(tipoId);
    };

    const confirmDeleteTipo = async () => {
        if (!tipoToDelete) return;
        setDeleting(true);
        try {
            await projectService.deleteTipoPlantilla(projectId, tipoToDelete);
            fetchProject();
        } catch (error: any) {
            console.error("Error deleting tipo", error);
            if (error.response && error.response.status === 400) {
                alert(error.response.data.detail || "No se puede eliminar porque hay apartamentos usándolo.");
            } else {
                alert("Hubo un error al eliminar el Tipo de Plantilla.");
            }
        } finally {
            setDeleting(false);
            setTipoToDelete(null);
        }
    };

    // Si hay una torre seleccionada, descendemos a esa vista
    if (selectedTorreId) {
        return <TorreDetailsView projectId={projectId} torreId={selectedTorreId} onBack={() => setSelectedTorreId(null)} />;
    }

    if (loading) return <div className="p-8 text-center text-gray-400 animate-pulse">Cargando detalles...</div>;
    if (!project) return <div className="p-8 text-center text-red-500">Error al cargar el proyecto.</div>;

    const totalTorres = project.torres ? project.torres.length : 0;
    const totalAptos = project.torres ? project.torres.reduce((acc: number, t: any) => acc + t.numero_aptos, 0) : 0;
    const totalTipos = project.tipos_plantilla ? project.tipos_plantilla.length : 0;

    return (
        <div className="animate-fade-in flex-1 flex flex-col relative w-full h-full">
            <Header
                title={`Proyecto: ${project.nombre}`}
                subtitle={`${project.ciudad || 'Sin ciudad'}, ${project.departamento || 'Sin dpto'}` + (project.es_vis ? ' | Proyecto VIS' : '')}
                actionLabel="+ Agregar Torre"
                onAction={() => setIsTorreModalOpen(true)}
            />

            <div className="p-8 space-y-8">
                <Button variant="ghost" onClick={onBack} className="mb-4">
                    ← Volver a Proyectos
                </Button>

                <div className="glass-card theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-slate-200/50 p-6 rounded-2xl">
                    <Typography variant="h2" className="mb-2">Información General</Typography>
                    <Typography variant="body" className="mb-6">
                        Aquí verás los detalles como Ubicación, si es VIS y el progreso general de ventas agrupado de todas las torres.
                        <br /><span className="text-gray-400 text-sm mt-2 block theme-light:text-slate-500">
                            Zonas Sociales: {project.zonas_sociales && project.zonas_sociales.length > 0 ? project.zonas_sociales.join(', ') : 'Ninguna registrada'}
                        </span>
                    </Typography>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-dark-900 border border-white/5 p-4 rounded-xl theme-light:bg-slate-50 theme-light:border-slate-200">
                            <span className="text-gray-400 text-sm block theme-light:text-slate-500">Torres Registradas</span>
                            <span className="text-2xl font-bold text-white theme-light:text-gray-900">{totalTorres}</span>
                        </div>
                        <div className="bg-dark-900 border border-white/5 p-4 rounded-xl theme-light:bg-slate-50 theme-light:border-slate-200">
                            <span className="text-gray-400 text-sm block theme-light:text-slate-500">Aptos Totales</span>
                            <span className="text-2xl font-bold text-white theme-light:text-gray-900">{totalAptos}</span>
                        </div>
                        <div className="bg-dark-900 border border-white/5 p-4 rounded-xl theme-light:bg-slate-50 theme-light:border-slate-200">
                            <span className="text-gray-400 text-sm block theme-light:text-slate-500">Ventas</span>
                            <span className="text-2xl font-bold text-saas-400 theme-light:text-saas-600">0%</span>
                        </div>
                    </div>
                </div>

                <div className="glass-card theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-slate-200/50 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <Typography variant="h2">Administración de Torres</Typography>
                    </div>
                    {totalTorres === 0 ? (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/10 rounded-xl theme-light:border-slate-300 theme-light:text-slate-500">
                            Aún no hay torres en este proyecto. Haz click en "+ Agregar Torre" para empezar.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.torres.map((torre: any) => (
                                <div key={torre.id} className="bg-dark-900 border border-white/10 p-4 rounded-xl hover:border-saas-500 transition-colors cursor-pointer group theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:hover:border-saas-400 relative" onClick={() => setSelectedTorreId(torre.id)}>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button onClick={(e) => handleDeleteTorreClick(torre.id, e)} className="text-gray-500 hover:text-red-500 p-1 bg-dark-800 rounded-md theme-light:bg-white theme-light:shadow-sm" title="Eliminar Torre">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-white group-hover:text-saas-400 transition-colors theme-light:text-slate-800 pr-8">{torre.nombre}</h3>
                                    <div className="flex justify-between mt-2 text-sm text-gray-400 theme-light:text-slate-500">
                                        <span>{torre.numero_pisos} Pisos</span>
                                        <span>{torre.numero_aptos} Aptos</span>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center theme-light:border-slate-200">
                                        <span className="text-xs px-2 py-1 rounded bg-white/5 text-gray-300 theme-light:bg-slate-200 theme-light:text-slate-600">En diseño</span>
                                        <button className="text-saas-500 text-sm hover:underline theme-light:text-saas-600">Gestionar pisos →</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="glass-card theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-slate-200/50 p-6 rounded-2xl">
                    <div className="flex justify-between items-center mb-6">
                        <Typography variant="h2">Tipos de Apartamento</Typography>
                        <Button onClick={() => { setEditingTipo(null); setIsTipoModalOpen(true); }}>
                            + Agregar Tipo
                        </Button>
                    </div>
                    {totalTipos === 0 ? (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-white/10 rounded-xl theme-light:border-slate-300 theme-light:text-slate-500">
                            Aún no has configurado tipos de apartamento. Haz click en "+ Agregar Tipo" para empezar.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {project.tipos_plantilla.map((tipo: any) => (
                                <div key={tipo.id} className="bg-dark-900 border border-white/10 p-4 rounded-xl flex flex-col hover:border-saas-500 transition-colors cursor-pointer group theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:hover:border-saas-400 relative" onClick={() => { setEditingTipo(tipo); setIsTipoModalOpen(true); }}>
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <button onClick={(e) => handleDeleteTipoClick(tipo.id, e)} className="text-gray-500 hover:text-red-500 p-1 bg-dark-800 rounded-md theme-light:bg-white theme-light:shadow-sm" title="Eliminar Tipo">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-start mb-4 pr-8">
                                        <h3 className="text-lg font-bold text-white group-hover:text-saas-400 transition-colors theme-light:text-slate-800">{tipo.nombre}</h3>
                                        <span className="text-xs px-2 py-1 rounded bg-saas-500/10 text-saas-400 border border-saas-500/20 theme-light:bg-saas-50 theme-light:border-saas-200 theme-light:text-saas-600">
                                            {tipo.area_construida} m²
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-400 mb-2 theme-light:text-slate-500">
                                        <div><span className="text-gray-500 block text-xs theme-light:text-slate-400">Área Privada</span> {tipo.area_privada} m²</div>
                                        <div><span className="text-gray-500 block text-xs theme-light:text-slate-400">Habitaciones</span> {tipo.habitaciones}</div>
                                        <div><span className="text-gray-500 block text-xs theme-light:text-slate-400">Baños</span> {tipo.banos}</div>
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-white/10 text-right theme-light:border-slate-200">
                                        <span className="text-saas-500 text-sm group-hover:underline theme-light:text-saas-600">Editar →</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {isTorreModalOpen && (
                <TorreModal
                    isOpen={isTorreModalOpen}
                    onClose={() => setIsTorreModalOpen(false)}
                    onSubmit={handleCreateTorre}
                    loading={savingTorre}
                />
            )}

            {isTipoModalOpen && (
                <TipoPlantillaModal
                    isOpen={isTipoModalOpen}
                    onClose={() => { setIsTipoModalOpen(false); setEditingTipo(null); }}
                    onSubmit={handleCreateOrUpdateTipo}
                    loading={savingTipo}
                    initialData={editingTipo}
                />
            )}

            <ConfirmModal
                isOpen={torreToDelete !== null}
                onClose={() => setTorreToDelete(null)}
                onConfirm={confirmDeleteTorre}
                title="Eliminar Torre"
                message="¿Estás seguro de que deseas eliminar esta Torre? Se borrarán de forma permanente todos los pisos y apartamentos asociados."
                loading={deleting}
            />

            <ConfirmModal
                isOpen={tipoToDelete !== null}
                onClose={() => setTipoToDelete(null)}
                onConfirm={confirmDeleteTipo}
                title="Eliminar Tipo de Apartamento"
                message="¿Estás seguro de que deseas eliminar este Tipo de Apartamento?"
                loading={deleting}
            />
        </div>
    );
};
