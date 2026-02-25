import React from 'react';
import { Typography } from '../atoms/Typography';

interface StatCardProps {
    title: string;
    value: string | number;
    subtitle: string;
    delay: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle, delay }) => {
    return (
        <div className={`glass-card theme-light:bg-white theme-light:border-gray-100 theme-light:shadow-gray-200/50 rounded-2xl p-6 hover-lift animate-slide-up`} style={{ animationDelay: delay }}>
            <Typography variant="h3" className="mb-2 theme-light:text-gray-500">{title}</Typography>
            <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold text-white theme-light:text-gray-900 tracking-tight">{value}</span>
            </div>
            <Typography variant="subtitle" className="mt-2 theme-light:text-gray-500">{subtitle}</Typography>
        </div>
    );
};
