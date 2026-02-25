import React from 'react';
import { Typography } from '../atoms/Typography';

interface Project {
    id: string;
    name: string;
    location: string;
    tipo_inmueble: string;
    is_vis?: boolean;
    towers: number;
    progress: number;
}

interface ProjectTableProps {
    projects: Project[];
    onManage?: (id: string) => void;
}

export const ProjectTable: React.FC<ProjectTableProps> = ({ projects, onManage }) => {
    return (
        <div className="glass-card theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-slate-200/50 rounded-2xl p-6 animate-slide-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex justify-between items-center mb-6">
                <Typography variant="h2">Proyectos Recientes</Typography>
                <button className="text-saas-400 hover:text-saas-300 text-sm font-medium transition-colors">
                    Ver todos →
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 text-gray-400 theme-light:text-slate-500 text-sm uppercase tracking-wider">
                            <th className="pl-6 pr-4 pb-4 font-medium">Nombre</th>
                            <th className="px-4 pb-4 font-medium">Ciudad / Dpto</th>
                            <th className="px-4 pb-4 font-medium">Tipo</th>
                            <th className="px-4 pb-4 font-medium">Torres</th>
                            <th className="px-4 pb-4 font-medium">Progreso Ventas</th>
                            <th className="pr-6 pl-4 pb-4 font-medium text-right">Acción</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {projects.map((p, i) => (
                            <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors group theme-light:border-slate-100 theme-light:hover:bg-slate-50">
                                <td className="pl-6 pr-4 py-4 font-medium text-white transition-colors theme-light:text-slate-800">{p.name}</td>
                                <td className="px-4 py-4 text-gray-300 theme-light:text-slate-600">{p.location}</td>
                                <td className="px-4 py-4 text-gray-300 theme-light:text-slate-600">
                                    <div className="flex flex-row items-center gap-2">
                                        <span className="text-xs px-2.5 py-1 rounded-md border border-white/10 bg-white/5 group-hover:bg-white/10 text-gray-300 transition-colors theme-light:bg-slate-100 theme-light:border-slate-200 theme-light:text-slate-700 theme-light:group-hover:bg-slate-200">
                                            {p.tipo_inmueble || 'Apartamentos'}
                                        </span>
                                        {p.is_vis !== undefined && (
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-colors ${p.is_vis
                                                ? 'border-saas-500/30 bg-saas-500/10 text-saas-400 group-hover:bg-saas-500/20 theme-light:border-saas-200 theme-light:bg-saas-50 theme-light:text-saas-600 theme-light:group-hover:bg-saas-100'
                                                : 'border-white/10 bg-black/20 text-gray-400 group-hover:bg-black/40 theme-light:border-slate-200 theme-light:bg-slate-50 theme-light:text-slate-500 theme-light:group-hover:bg-slate-100'
                                                }`}>
                                                {p.is_vis ? 'VIS' : 'NO VIS'}
                                            </span>
                                        )}
                                    </div>
                                </td>
                                <td className="px-4 py-4 text-gray-300 theme-light:text-slate-600">{p.towers}</td>
                                <td className="px-4 py-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-full bg-dark-700 rounded-full h-2 max-w-[120px] theme-light:bg-slate-200">
                                            <div className="bg-gradient-to-r from-saas-500 to-saas-300 h-2 rounded-full" style={{ width: `${p.progress}%` }}></div>
                                        </div>
                                        <span className="text-xs text-gray-400 theme-light:text-slate-500">{p.progress}%</span>
                                    </div>
                                </td>
                                <td className="pr-6 pl-4 py-4 text-right">
                                    <button
                                        onClick={() => onManage && onManage(p.id)}
                                        className="text-saas-500 font-medium hover:text-saas-400 hover:underline transition-colors theme-light:text-saas-600 theme-light:hover:text-saas-700"
                                    >
                                        Gestionar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
