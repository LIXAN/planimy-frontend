import React from 'react';


interface UserWidgetProps {
    name: string;
    email: string;
    initials: string;
}

export const UserWidget: React.FC<UserWidgetProps> = ({ name, email, initials }) => {
    return (
        <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-saas-400 to-saas-600 flex items-center justify-center font-bold text-white shadow-lg">
                {initials}
            </div>
            <div>
                <p className="text-sm font-medium text-white">{name}</p>
                <p className="text-xs text-saas-300">{email}</p>
            </div>
        </div>
    );
};
