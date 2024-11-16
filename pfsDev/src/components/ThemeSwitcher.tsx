import React from 'react';
import { Button } from '@radix-ui/react-components';
import { useTheme } from '../hooks/useTheme';

const ThemeSwitcher: React.FC = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme}>
            {theme === 'light' ? '切换到暗主题' : '切换到亮主题'}
        </Button>
    );
};

export default ThemeSwitcher;
