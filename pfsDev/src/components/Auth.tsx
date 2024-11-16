import React, { useState } from 'react';
import { Input, Button, Flex } from '@radix-ui/react-components';
import { useAuth } from '../hooks/useAuth';

const Auth: React.FC = () => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const { login, register } = useAuth();

    const handleLogin = () => {
        login(username, password);
    };

    const handleRegister = () => {
        register(username, password);
    };

    return (
        <Flex direction="column" gap="4">
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={handleLogin}>登录</Button>
            <Button onClick={handleRegister}>注册</Button>
        </Flex>
    );
};

export default Auth;
