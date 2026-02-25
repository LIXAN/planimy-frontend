import React, { useState, useRef, useEffect } from 'react';

interface FilterOption {
    label: string;
    value: string;
}

interface FilterDropdownProps {
    value: string;
    onChange: (value: string) => void;
    options: FilterOption[];
    icon?: React.ReactNode;
    placeholder?: string;
    variant?: 'pill' | 'input';
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ value, onChange, options, icon, placeholder, variant = 'pill' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(opt => opt.value === value);
    const displayLabel = selectedOption ? selectedOption.label : (placeholder || 'Seleccionar');

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center justify-between space-x-2 
                    px-4 py-2 ${variant === 'input' ? 'rounded-lg w-full' : 'rounded-full'} text-sm transition-all duration-200
                    border ${isOpen ? 'border-saas-500' : 'border-white/10'} 
                    ${variant === 'pill' ? (isOpen ? 'bg-saas-500/10' : 'bg-dark-900') : 'bg-dark-900 hover:border-saas-500'}
                    ${variant === 'pill' && !isOpen ? 'hover:bg-white/5' : ''}
                    text-gray-200 focus:outline-none focus:ring-2 focus:ring-saas-500 focus:ring-opacity-50
                    theme-light:text-slate-700 
                    ${variant === 'pill'
                        ? (isOpen ? 'theme-light:border-saas-400 theme-light:bg-saas-50' : 'theme-light:border-slate-200 theme-light:bg-white theme-light:hover:border-saas-300')
                        : 'theme-light:bg-slate-50 theme-light:border-slate-200 theme-light:text-slate-900 theme-light:hover:bg-white'
                    }
                `}
            >
                {icon && (
                    <span className="text-gray-400 theme-light:text-slate-400 flex-shrink-0">
                        {icon}
                    </span>
                )}
                <span className="truncate">{displayLabel}</span>
                <span className="text-gray-400 theme-light:text-slate-400 ml-2 flex-shrink-0">
                    <svg
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>

            {isOpen && (
                <div className="absolute z-50 mt-2 w-full min-w-[180px] bg-dark-800 border border-white/10 rounded-xl shadow-xl overflow-hidden animate-fade-in theme-light:bg-white theme-light:border-slate-200 theme-light:shadow-lg">
                    <div className="max-h-60 overflow-y-auto py-1">
                        {options.map((opt, i) => (
                            <button
                                key={i}
                                type="button"
                                onClick={() => {
                                    onChange(opt.value);
                                    setIsOpen(false);
                                }}
                                className={`
                                    w-full text-left px-4 py-2.5 text-sm transition-colors
                                    ${value === opt.value
                                        ? 'bg-saas-500/20 text-saas-400 font-medium theme-light:bg-saas-50 theme-light:text-saas-600'
                                        : 'text-gray-300 hover:bg-white/5 theme-light:text-slate-700 theme-light:hover:bg-slate-50'
                                    }
                                `}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
