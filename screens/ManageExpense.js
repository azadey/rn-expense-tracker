import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../expenses-context';
import Button from '../components/UI/Button';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';

function ManageExpense({route, navigation}) {
    const expenseCtx = useContext(ExpenseContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;
    const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === expenseId)

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(expenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(data) {
        if (isEditing) {
            expenseCtx.updateExpense(expenseId, data);
        } else {
            expenseCtx.addExpense(data);
        }
        navigation.goBack();
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