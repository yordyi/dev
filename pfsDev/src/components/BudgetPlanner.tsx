import React, { useState } from 'react';
import { Input, Button, Flex } from '@radix-ui/react-components';
import { useLocalStorage } from '../hooks/useLocalStorage';

const BudgetPlanner: React.FC = () => {
    const [budget, setBudget] = useState<number>(0);
    const [budgets, setBudgets] = useLocalStorage<Budget[]>('budgets', []);

    const handleAddBudget = () => {
        const newBudget = { amount: budget, date: new Date() };
        setBudgets([...budgets, newBudget]);
    };

    return (
        <Flex direction="column" gap="4">
            <Input type="number" value={budget} onChange={(e) => setBudget(Number(e.target.value))} />
            <Button onClick={handleAddBudget}>添加预算</Button>
        </Flex>
    );
};

export default BudgetPlanner;
