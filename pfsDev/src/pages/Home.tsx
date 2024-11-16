import React from 'react';
import { Link, Flex } from '@radix-ui/react-components';

const Home: React.FC = () => {
    return (
        <Flex direction="column" gap="4">
            <Link href="/dashboard">仪表板</Link>
            <Link href="/expenditure">支出跟踪</Link>
            <Link href="/revenue">收入管理</Link>
            <Link href="/budget">预算规划</Link>
            <Link href="/targets">财务目标</Link>
            <Link href="/reports">财务报告</Link>
            <Link href="/auth">用户认证</Link>
        </Flex>
    );
};

export default Home;
