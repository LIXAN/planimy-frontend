import React, { useState, useEffect } from 'react';
import { StatCard } from '../organisms/StatCard';
import { ProjectTable } from '../organisms/ProjectTable';
import { projectService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Header } from '../organisms/Header';

export const DashboardResumenView: React.FC = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useAuth();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectService.getProjects();
                const mappedData = data.map((p: any) => ({
                    id: p.id,
                    name: p.nombre,
                    location: `${p.ciudad || 'Sin ciudad'}, ${p.departamento || 'Sin dpto'}`,
                    tipo_inmueble: p.tipo_inmueble,
                    is_vis: p.es_vis,
                    towers: p.torres ? p.torres.length : 0,
                    progress: 0
                }));
                setProjects(mappedData);
            } catch (error) {
                console.error("Error fetching projects", error);
            } finally {
                setLoading(false);
            }
        };

        if (token) fetchProjects();
    }, [token]);

    const stats = [
        { title: "Proyectos Activos", value: projects.length.toString(), subtitle: "Registrados en DB", delay: "0.1s" },
        { title: "Torres Totales", value: "34", subtitle: "Multiples etapas", delay: "0.2s" },
        { title: "Aptos. Disponibles", value: "156", subtitle: "$42B en inventario", delay: "0.3s" },
        { title: "Ventas del Mes", value: "28", subtitle: "+12% frente a Enero", delay: "0.4s" },
    ];

    return (
        <div className="animate-fade-in flex-1 flex flex-col relative w-full h-full">
            <Header
                title="Resumen General"
                subtitle="Métricas y estadísticas de la inmobiliaria"
            />
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, i) => (
                        <StatCard key={i} {...stat} />
                    ))}
                </div>

                {!loading ? (
                    <ProjectTable projects={projects} />
                ) : (
                    <div className="text-center text-gray-400 py-10 animate-pulse">Cargando resumen...</div>
                )}
            </div>
        </div>
    );
};
