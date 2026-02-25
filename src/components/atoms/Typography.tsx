import React from 'react';

interface TypographyProps {
    variant?: 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption';
    children: React.ReactNode;
    className?: string;
}

export const Typography: React.FC<TypographyProps> = ({
    variant = 'body',
    children,
    className = ''
}) => {
    const styles = {
        h1: "text-3xl font-bold tracking-tight text-white theme-light:text-slate-900",
        h2: "text-xl font-semibold text-white theme-light:text-slate-800",
        h3: "text-sm font-semibold uppercase tracking-wider text-saas-300 theme-light:text-saas-600",
        subtitle: "text-sm text-gray-400 theme-light:text-slate-500",
        body: "text-base text-gray-300 theme-light:text-slate-600",
        caption: "text-xs text-gray-400 theme-light:text-slate-500",
    };

    const Component = ['h1', 'h2', 'h3'].includes(variant) ? variant as any : 'p';

    return (
        <Component className={`${styles[variant]} ${className}`}>
            {children}
        </Component>
    );
};
