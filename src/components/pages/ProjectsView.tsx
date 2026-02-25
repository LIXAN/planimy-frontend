import React, { useState, useEffect } from 'react';
import { ProjectTable } from '../organisms/ProjectTable';
import { ProjectModal } from '../organisms/ProjectModal';
import { projectService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../organisms/Header';
import { ProjectDetailsView } from './ProjectDetailsView';
import { FilterDropdown } from '../atoms/FilterDropdown';

export const ProjectsView: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
    const { token } = useAuth();

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await projectService.getProjects();
            const mappedData = data.map((p: any) => ({
                id: p.id,
                name: p.nombre,
                departamento: p.departamento,
                ciudad: p.ciudad,
                location: `${p.ciudad || 'Sin ciudad'}, ${p.departamento || 'Sin dpto'}`,
                tipo_inmueble: p.tipo_inmueble,
                towers: p.torres ? p.torres.length : 0,
                progress: p.es_vis ? 100 : 0, // Mock for VIS flag in progress column for now
                is_vis: p.es_vis
            }));
            setProjects(mappedData);
        } catch (error) {
            console.error("Error fetching projects", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token && !selectedProjectId) fetchProjects();
    }, [token, selectedProjectId]);

    const handleCreateProject = async (data: any) => {
        await projectService.createProject(data);
        setIsModalOpen(false);
        fetchProjects(); // Recargar la tabla
    };

    const [filterDepartment, setFilterDepartment] = useState('Todos');
    const [filterCity, setFilterCity] = useState('Todas');
    const [filterClassification, setFilterClassification] = useState('Todas');
    const [filterType, setFilterType] = useState('Todas');

    // Dynamically derive departments from uploaded projects
    const uniqueDepartments = Array.from(new Set(projects.map((p: any) => p.departamento ? p.departamento.trim() : ''))).filter(Boolean);

    // Filter cities dynamically based on selected department to avoid clutter
    const uniqueCities = Array.from(new Set(projects.filter((p: any) => filterDepartment === 'Todos' || p.departamento === filterDepartment).map((p: any) => p.ciudad ? p.ciudad.trim() : ''))).filter(Boolean);

    const filteredProjects = projects.filter((p: any) => {
        const matchesDpto = filterDepartment === 'Todos' || (p.departamento && p.departamento.trim() === filterDepartment);
        const matchesCity = filterCity === 'Todas' || (p.ciudad && p.ciudad.trim() === filterCity);

        let matchesClass = true;
        if (filterClassification === 'VIS') matchesClass = p.is_vis === true;
        if (filterClassification === 'NO VIS') matchesClass = p.is_vis === false;

        const matchesType = filterType === 'Todas' || p.tipo_inmueble === filterType;

        return matchesDpto && matchesCity && matchesClass && matchesType;
    });

    const dptoOptions = [
        { label: 'Todos los Departamentos', value: 'Todos' },
        ...uniqueDepartments.map(d => ({ label: String(d), value: String(d) }))
    ];

    const cityOptions = [
        { label: 'Todas las Ciudades', value: 'Todas' },
        ...uniqueCities.map(c => ({ label: String(c), value: String(c) }))
    ];

    const classOptions = [
        { label: 'Clasificación', value: 'Todas' },
        { label: 'VIS', value: 'VIS' },
        { label: 'NO VIS', value: 'NO VIS' }
    ];

    const typeOptions = [
        { label: 'Tipo inmueble', value: 'Todas' },
        { label: 'Apartamentos', value: 'Apartamentos' },
        { label: 'Casas', value: 'Casas' },
        { label: 'Lotes/Terrenos', value: 'Lotes' },
        { label: 'Oficinas/Locales', value: 'Oficinas' },
        { label: 'Mixto', value: 'Mixto' }
    ];

    if (selectedProjectId) {
        return <ProjectDetailsView projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />;
    }

    return (
        <div className="animate-fade-in flex-1 flex flex-col relative w-full h-full">
            <Header
                title="Proyectos"
                subtitle="Gestión del catálogo inmobiliario"
                actionLabel="+ Nuevo Proyecto"
                onAction={() => setIsModalOpen(true)}
            />
            <div className="p-8">
                {/* Filter Bar */}
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
                    <span className="text-gray-400 font-medium text-sm tracking-wider uppercase theme-light:text-slate-500">Filtrar por:</span>

                    <div className="flex flex-wrap gap-3">
                        {/* Department Filter */}
                        <FilterDropdown
                            value={filterDepartment}
                            onChange={(val) => {
                                setFilterDepartment(val);
                                setFilterCity('Todas'); // Reset city when changing dpto
                            }}
                            options={dptoOptions}
                            icon={
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                        />

                        {/* City Filter */}
                        <FilterDropdown
                            value={filterCity}
                            onChange={setFilterCity}
                            options={cityOptions}
                            icon={
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            }
                        />

                        {/* Classification Filter (VIS / No VIS) */}
                        <FilterDropdown
                            value={filterClassification}
                            onChange={setFilterClassification}
                            options={classOptions}
                            icon={
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                </svg>
                            }
                        />

                        {/* Property Type Filter */}
                        <FilterDropdown
                            value={filterType}
                            onChange={setFilterType}
                            options={typeOptions}
                            icon={
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                            }
                        />
                    </div>
                </div>

                {!loading ? (
                    filteredProjects.length > 0 ? (
                        <ProjectTable projects={filteredProjects} onManage={setSelectedProjectId} />
                    ) : (
                        <div className="text-center text-gray-500 py-16 border-2 border-dashed border-white/10 rounded-2xl theme-light:border-slate-200 theme-light:text-slate-500">
                            No se encontraron proyectos con los filtros actuales.
                        </div>
                    )
                ) : (
                    <div className="text-center text-gray-400 py-10 animate-pulse">Cargando catálogo...</div>
                )}
            </div>

            <ProjectModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateProject}
            />
        </div>
    );
};
