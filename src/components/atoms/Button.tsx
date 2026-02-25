import React, { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    fullWidth = false,
    className = '',
    ...props
}) => {
    const baseStyles = "font-semibold py-2 px-6 rounded-lg transition transform hover:-translate-y-1";

    const variants = {
        primary: "bg-saas-500 hover:bg-saas-400 text-dark-900 shadow-[0_0_20px_rgba(45,212,191,0.4)]",
        secondary: "bg-dark-800 hover:bg-dark-700 text-white border border-white/10",
        ghost: "text-gray-400 hover:text-white hover:bg-white/5 theme-light:text-slate-600 theme-light:hover:text-slate-900 theme-light:hover:bg-slate-100",
    };

    const widthClass = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
