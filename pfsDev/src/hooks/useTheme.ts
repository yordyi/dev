import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setTheme] = useState<string>(() => {
        return window.localStorage.getItem('theme') || 'light';
    });

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    useEffect(() => {
        document.documentElement.className = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    return { theme, toggleTheme };
};
