import React from 'react';
import { Typography } from '../atoms/Typography';
import { Button } from '../atoms/Button';
import { useUI } from '../../context/ThemeContext';

interface HeaderProps {
    title: string;
    subtitle: string;
    actionLabel?: string;
    onAction?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ title, subtitle, actionLabel, onAction }) => {
    const { theme, toggleTheme } = useUI();

    return (
        <header className="px-8 py-6 flex items-center justify-between border-b border-white/5 bg-dark-900 sticky top-0 z-10 theme-light:bg-white theme-light:border-slate-200 shadow-sm">
            <div className="flex items-center space-x-4">
                <div>
                    <Typography variant="h1" className="animate-fade-in theme-light:text-slate-900">{title}</Typography>
                    <Typography variant="subtitle" className="mt-1 theme-light:text-slate-500">{subtitle}</Typography>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg text-gray-400 hover:text-saas-500 hover:bg-white/5 transition-colors focus:outline-none theme-light:hover:bg-slate-100 theme-light:hover:text-saas-600"
                    title={theme === 'dark' ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro"}
                >
                    {theme === 'dark' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    )}
                </button>

                {actionLabel && (
                    <Button onClick={onAction}>
                        {actionLabel}
                    </Button>
                )}
            </div>
        </header>
    );
};
