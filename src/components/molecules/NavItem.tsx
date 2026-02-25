import React from 'react';

interface NavItemProps {
    label: string;
    isActive: boolean;
    onClick: () => void;
    icon?: React.ReactNode;
    isCollapsed?: boolean;
}

export const NavItem: React.FC<NavItemProps> = ({ label, isActive, onClick, icon, isCollapsed }) => {
    const activeStyles = 'bg-saas-500/20 text-saas-300 border border-saas-500/30 shadow-[0_0_15px_rgba(20,184,166,0.2)]';
    const inactiveStyles = 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent';

    return (
        <button
            onClick={onClick}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors duration-200 relative ${isActive ? activeStyles : inactiveStyles}`}
            title={isCollapsed ? label : undefined}
        >
            <div className={`flex-shrink-0 transition-transform duration-300 ease-in-out ${isCollapsed ? 'translate-x-1' : 'translate-x-0'}`}>
                {icon}
            </div>
            <span
                className={`absolute left-14 whitespace-nowrap transition-all duration-300 ease-in-out ${isCollapsed ? 'opacity-0 translate-x-[-10px] pointer-events-none' : 'opacity-100 translate-x-0'
                    }`}
            >
                {label}
            </span>
        </button>
    );
};
