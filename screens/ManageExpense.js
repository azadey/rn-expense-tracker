import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';

function ManageExpense({route, navigation}) {
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const expenseCtx = useContext(ExpenseContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === expenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsLoading(true);
        try {
            expenseCtx.deleteExpense(expenseId);
            await deleteExpense(expenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - please try again later!');
        }
        setIsLoading(false);
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(data) {
        setIsLoading(true);
        try {
            if (isEditing) {
                expenseCtx.updateExpense(expenseId, data);
                await updateExpense(expenseId, data);
            } else {
                const id = await storeExpense(data);
                expenseCtx.addExpense({...data, id: id});
            }
            
            navigation.goBack();
        } catch (error) {
            setError('Could not save data - please try again later');
        }
        setIsLoading(false);
    }

    if (error && !isLoading) {
        return <ErrorOverlay message={error} />;
    }

    if (isLoading) {
        return <LoadingOverlay />;
    }

    return (
        <View style={styles.container}>
            <ExpenseForm 
                submitButtonLabel={isEditing ? 'Update' : 'Add'}  
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                defaultValues={selectedExpense} 
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton 
                        icon="trash" 
                        color={GlobalStyles.colors.error500} 
                        size={36} 
                        onPress={deleteExpenseHandler} 
                    />
                </View>
            )}
        </View>
    )
}

export default ManageExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});