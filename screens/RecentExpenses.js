import { useContext } from 'react';
import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../expenses-context';
import { getDateMinusDays } from '../utils/date';

function RecentExpenses() {
    const expensesCtx = useContext(ExpenseContext);
    
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