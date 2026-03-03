import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { DashboardResumenView } from './DashboardResumenView';
import { ProjectsView } from './ProjectsView';
import { RRHHView } from './RRHHView';

export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Resumen');

    const renderContent = () => {
        switch (activeTab) {
            case 'Proyectos':
                return <ProjectsView />;
            case 'Recursos Humanos':
                return <RRHHView />;
            case 'Resumen':
            default:
                return <DashboardResumenView />;
        }
    };

    return (
        <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </DashboardLayout>
    );
};
