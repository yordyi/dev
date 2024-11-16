import React, { useState } from 'react';
import { Input, Button, Flex } from '@radix-ui/react-components';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ExpenditureTracker: React.FC = () => {
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [transactions, setTransactions] = useLocalStorage<Transaction[]>('transactions', []);

    const handleAddTransaction = () => {
        const newTransaction = { amount, description, date: new Date() };
        setTransactions([...transactions, newTransaction]);
    };

    return (
        <Flex direction="column" gap="4">
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
            <Input value={description} onChange={(e) => setDescription(e.target.value)} />
            <Button onClick={handleAddTransaction}>添加支出</Button>
        </Flex>
    );
};

export default ExpenditureTracker;
