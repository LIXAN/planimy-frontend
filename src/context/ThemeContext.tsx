import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface UIContextType {
    theme: Theme;
    toggleTheme: () => void;
    isSidebarCollapsed: boolean;
    toggleSidebar: () => void;
}

const ThemeContext = createContext<UIContextType>({
    theme: 'dark',
    toggleTheme: () => { },
    isSidebarCollapsed: false,
    toggleSidebar: () => { }
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, setTheme] = useState<Theme>('dark');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    useEffect(() => {
        if (theme === 'light') {
            document.documentElement.classList.add('theme-light');
            document.documentElement.classList.remove('theme-dark');
        } else {
            document.documentElement.classList.add('theme-dark');
            document.documentElement.classList.remove('theme-light');
        }
    }, [theme]);

    const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    const toggleSidebar = () => setSidebarCollapsed(prev => !prev);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isSidebarCollapsed, toggleSidebar }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useUI = () => useContext(ThemeContext);
