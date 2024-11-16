import React, { useState } from 'react';
import { Input, Button, Flex } from '@radix-ui/react-components';
import { useLocalStorage } from '../hooks/useLocalStorage';

const RevenueManager: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [revenues, setRevenues] = useLocalStorage<Revenue[]>('revenues', []);

    const handleAddRevenue = () => {
        const newRevenue = { amount, description, date: new Date() };
        setRevenues([...revenues, newRevenue]);
    };

    return (
        <Flex direction="column" gap="4">
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button onClick={handleAddRevenue}>添加收入</Button>
        </Flex>
    );
};

export default RevenueManager;
