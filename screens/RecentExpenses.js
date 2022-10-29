import { useContext, useEffect, useState } from 'react';

import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { ExpenseContext } from '../expenses-context';
import { getDateMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';


function RecentExpenses() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    const expensesCtx = useContext(ExpenseContext);

    useEffect(() => {
        async function getExpenses() {
            setIsLoading(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsLoading(false);
        }

        getExpenses();
    }, []);

    if (error && !isLoading) {
        return <ErrorOverlay message={error} />
    }

    if (isLoading) {
        return <LoadingOverlay />;
    }
    
    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const daysSevenAgo = getDateMinusDays(today, 7);

        return (expense.date > daysSevenAgo) && (expense.date <= today);
    })

    return (
        <ExpensesOutput  expenses={recentExpenses} expensesPeriod="Last 7 Days" fallbackText="No expenses registered for the last 7 days." />
    )
}

export default RecentExpenses;