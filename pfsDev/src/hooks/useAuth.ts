import { useState } from 'react';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const login = (username: string, password: string) => {
        // 登录逻辑
    };

    const register = (username: string, password: string) => {
        // 注册逻辑
    };

    const logout = () => {
        setUser(null);
    };

    return { user, login, register, logout };
};
