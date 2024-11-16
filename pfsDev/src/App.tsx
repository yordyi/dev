import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import ExpenditurePage from './pages/ExpenditurePage';
import RevenuePage from './pages/RevenuePage';
import BudgetPage from './pages/BudgetPage';
import TargetsPage from './pages/TargetsPage';
import ReportsPage from './pages/ReportsPage';
import AuthPage from './pages/AuthPage';
import ThemeSwitcher from './components/ThemeSwitcher';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
    return (
        <ErrorBoundary>
            <Router>
                <ThemeSwitcher />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/expenditure" element={<ExpenditurePage />} />
                    <Route path="/revenue" element={<RevenuePage />} />
                    <Route path="/budget" element={<BudgetPage />} />
                    <Route path="/targets" element={<TargetsPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/auth" element={<AuthPage />} />
                </Routes>
            </Router>
        </ErrorBoundary>
    );
};

export default App;
