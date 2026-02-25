import React, { useState } from 'react';
import { DashboardLayout } from '../templates/DashboardLayout';
import { DashboardResumenView } from './DashboardResumenView';
import { ProjectsView } from './ProjectsView';

export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Resumen');

    const renderContent = () => {
        switch (activeTab) {
            case 'Proyectos':
                return <ProjectsView />;
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
