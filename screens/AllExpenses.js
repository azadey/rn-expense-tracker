import { useContext } from 'react';
import { Text } from 'react-native';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpenseContext } from '../expenses-context';

function AllExpenses() {
    const expensesCtx = useContext(ExpenseContext);

    return (
        <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriod="Total" fallbackText="No registered expenses found" />
    )
}

export default AllExpenses;