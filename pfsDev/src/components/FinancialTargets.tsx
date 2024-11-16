import React, { useState } from 'react';
import { Input, Button, Flex } from '@radix-ui/react-components';
import { useLocalStorage } from '../hooks/useLocalStorage';

const FinancialTargets: React.FC = () => {
    const [target, setTarget] = useState<number>(0);
    const [targets, setTargets] = useLocalStorage<FinancialTarget[]>('targets', []);

    const handleAddTarget = () => {
        const newTarget = { amount: target, date: new Date() };
        setTargets([...targets, newTarget]);
    };

    return (
        <Flex direction="column" gap="4">
            <Input type="number" value={target} onChange={(e) => setTarget(Number(e.target.value))} />
            <Button onClick={handleAddTarget}>添加目标</Button>
        </Flex>
    );
};

export default FinancialTargets;
