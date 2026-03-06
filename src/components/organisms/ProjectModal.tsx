import React, { useState } from 'react';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';
import { FilterDropdown } from '../atoms/FilterDropdown';
import { DEPARTAMENTOS, COLOMBIA_LOCATIONS } from '../../utils/colombia_locations';

const COMMON_ZONAS = [
    "Piscina",
    "Gimnasio",
    "Salón Social",
    "Parque Infantil",
    "BBQ",
    "Cancha Múltiple",
    "Zonas Verdes",
    "Coworking",
    "Sala de Cine",
    "Terraza / Rooftop",
    "Turco / Sauna",
    "Juegos de Mesa",
    "Cancha de Squash",
    "Parqueadero Visitantes"
];

interface ProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: any) => Promise<void>;
    initialData?: any;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [nombre, setNombre] = useState('');
    const [departamento, setDepartamento] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [esVis, setEsVis] = useState(false);
    const [tipoInmueble, setTipoInmueble] = useState('Apartamentos');
    const [selectedZonas, setSelectedZonas] = useState<string[]>([]);
    const [imagenUrl, setImagenUrl] = useState('');
    const [telefonoContacto, setTelefonoContacto] = useState('');
    const [correoContacto, setCorreoContacto] = useState('');
    const [direccion, setDireccion] = useState('');
    const [loading, setLoading] = useState(false);

    React.useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setNombre(initialData.nombre || '');
                setDepartamento(initialData.departamento || '');
                setCiudad(initialData.ciudad || '');
                setEsVis(initialData.es_vis || false);
                setTipoInmueble(initialData.tipo_inmueble || 'Apartamentos');
                setSelectedZonas(initialData.zonas_sociales || []);
                setImagenUrl(initialData.imagen_url || '');
                setTelefonoContacto(initialData.telefono_contacto || '');
                setCorreoContacto(initialData.correo_contacto || '');
                setDireccion(initialData.direccion || '');
            } else {
                setNombre('');
                setDepartamento('');
                setCiudad('');
                setEsVis(false);
                setTipoInmueble('Apartamentos');
                setSelectedZonas([]);
                setImagenUrl('');
                setTelefonoContacto('');
                setCorreoContacto('');
                setDireccion('');
            }
        }
    }, [isOpen, initialData]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        await onSubmit({
            nombre,
            departamento,
            ciudad,
            es_vis: esVis,
            tipo_inmueble: tipoInmueble,
            zonas_sociales: selectedZonas,
            imagen_url: imagenUrl || null,
            telefono_contacto: telefonoContacto || null,
            correo_contacto: correoContacto || null,
            direccion: direccion || null
        });
        setLoading(false);
        setNombre('');
        setDepartamento('');
        setCiudad('');
        setEsVis(false);
        setTipoInmueble('Apartamentos');
        setSelectedZonas([]);
        setImagenUrl('');
        setTelefonoContacto('');
        setCorreoContacto('');
        setDireccion('');
    };

    const dptoOptions = DEPARTAMENTOS.map(d => ({ label: d, value: d }));
    const cityOptions = departamento && COLOMBIA_LOCATIONS[departamento]
        ? COLOMBIA_LOCATIONS[departamento].map(c => ({ label: c, value: c }))
        : [];

    const tipoOptions = [
        { label: 'Apartamentos', value: 'Apartamentos' },
        { label: 'Casas', value: 'Casas' },
        { label: 'Lotes/Terrenos', value: 'Lotes' },
        { label: 'Oficinas/Locales', value: 'Oficinas' },
        { label: 'Mixto', value: 'Mixto' }
    ];

    return (
        <div className="fixed inset-0 bg-dark-900/90 flex items-center justify-center z-50 p-4">
            <div className="bg-dark-800 border border-white/10 p-8 rounded-2xl w-full max-w-4xl shadow-2xl animate-fade-in relative overflow-hidden theme-light:bg-white theme-light:border-slate-200">
                {/* Glow removed for performance */}

                <div className="flex justify-between items-center mb-6">
                    <Typography variant="h2">{initialData ? 'Editar Proyecto' : 'Nuevo Proyecto'}</Typography>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors theme-light:text-slate-400 theme-light:hover:text-slate-800">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Nombre del Proyecto</label>
                        <input
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            required
                            className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saas-500 transition-all theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white"
                            placeholder="Ej. Torres del Valle"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Departamento</label>
                            <FilterDropdown
                                value={departamento}
                                onChange={(val) => { setDepartamento(val); setCiudad(''); }}
                                options={dptoOptions}
                                placeholder="Seleccionar"
                                variant="input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Ciudad</label>
                            <FilterDropdown
                                value={ciudad}
                                onChange={setCiudad}
                                options={cityOptions}
                                placeholder={departamento ? "Seleccionar" : "Elija Dpto primero"}
                                variant="input"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Dirección</label>
                        <input
                            type="text"
                            value={direccion}
                            onChange={(e) => setDireccion(e.target.value)}
                            className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saas-500 transition-all theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white"
                            placeholder="Ej. Calle 123 # 45-67"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Teléfono de Contacto</label>
                            <input
                                type="tel"
                                value={telefonoContacto}
                                onChange={(e) => setTelefonoContacto(e.target.value.replace(/\D/g, ''))}
                                className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saas-500 transition-all theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white"
                                placeholder="Ej. 3001234567"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Correo Electrónico</label>
                            <input
                                type="email"
                                value={correoContacto}
                                onChange={(e) => setCorreoContacto(e.target.value)}
                                className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saas-500 transition-all theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white"
                                placeholder="Ej. ventas@proyecto.com"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">Tipo de Inmueble</label>
                        <FilterDropdown
                            value={tipoInmueble}
                            onChange={setTipoInmueble}
                            options={tipoOptions}
                            variant="input"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2 theme-light:text-slate-600">Zonas Sociales</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                            {COMMON_ZONAS.map((zona) => (
                                <label key={zona} className="flex items-center space-x-2 text-sm text-gray-300 cursor-pointer theme-light:text-slate-700 bg-dark-900 border border-white/5 p-2 rounded-lg hover:border-saas-500/50 transition-colors theme-light:bg-slate-50 theme-light:border-slate-200">
                                    <input
                                        type="checkbox"
                                        checked={selectedZonas.includes(zona)}
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                                setSelectedZonas([...selectedZonas, zona]);
                                            } else {
                                                setSelectedZonas(selectedZonas.filter(z => z !== zona));
                                            }
                                        }}
                                        className="w-4 h-4 text-saas-500 bg-dark-900 border-white/10 rounded focus:ring-saas-500 theme-light:border-slate-300 theme-light:bg-white flex-shrink-0"
                                    />
                                    <span className="truncate">{zona}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1 theme-light:text-slate-600">URL de Imagen del Proyecto (Opcional)</label>
                        <input
                            type="url"
                            value={imagenUrl}
                            onChange={(e) => setImagenUrl(e.target.value)}
                            className="w-full bg-dark-900 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-saas-500 transition-all theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:focus:bg-white"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <input
                            type="checkbox"
                            checked={esVis}
                            onChange={(e) => setEsVis(e.target.checked)}
                            id="vis-checkbox"
                            className="w-4 h-4 text-saas-500 bg-dark-900 border-white/10 rounded focus:ring-saas-500 theme-light:border-slate-300 theme-light:bg-white"
                        />
                        <label htmlFor="vis-checkbox" className="text-sm text-gray-300 cursor-pointer theme-light:text-slate-700">
                            Es Vivienda de Interés Social (VIS)
                        </label>
                    </div>

                    <div className="pt-4 flex justify-end space-x-3">
                        <Button type="button" variant="ghost" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" disabled={loading}>
                            {loading ? 'Guardando...' : (initialData ? 'Guardar Cambios' : 'Crear Proyecto')}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
