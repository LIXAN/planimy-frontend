import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { authService } from '../../services/api';
import { Button } from '../atoms/Button';
import { Typography } from '../atoms/Typography';

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const data = await authService.login(email, password);
            login(data.access_token);
            navigate('/');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Glow Effects removed for performance */}

            <div className="glass-card w-full max-w-md p-8 rounded-2xl animate-slide-up relative z-10">
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-black mb-3 tracking-[0.2em] pl-[0.2em] text-transparent bg-clip-text bg-gradient-to-r from-white via-saas-100 to-saas-400 drop-shadow-[0_0_15px_rgba(45,212,191,0.3)]">PLANIMY</h1>
                    <span className="text-xs uppercase tracking-[0.3em] pl-[0.3em] text-saas-400/80 mb-6 block font-bold">Powered by LIXAN</span>
                    <Typography variant="subtitle">Ingresa tus credenciales para continuar</Typography>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Correo Electrónico</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-dark-800 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saas-500 focus:border-transparent transition-all"
                            placeholder="admin@ejemplo.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-dark-800 border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saas-500 focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <Button type="submit" fullWidth disabled={loading}>
                        {loading ? 'Iniciando...' : 'Iniciar Sesión'}
                    </Button>
                </form>
            </div>
        </div>
    );
};
