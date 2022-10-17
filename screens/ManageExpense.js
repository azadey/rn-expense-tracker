import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Button from '../components/UI/Button';

import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpenseContext } from '../expenses-context';

function ManageExpense({route, navigation}) {
    const expenseCtx = useContext(ExpenseContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpense(expenseId);
        navigation.goBack();
    }

    function canelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if (isEditing) {
            expenseCtx.updateExpense(expenseId, {description: 'Test !!!!!', amount: 19.19, date: new Date('2022-01-01')});
        } else {
            expenseCtx.addExpense({description: 'Test', amount: 99.99, date: new Date('2022-10-15')});
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <View style={styles.buttons}>
                <Button mode='flat' onPress={canelHandler} style={styles.button} >Cancel</Button>
                <Button onPress={confirmHandler} style={styles.button}>{isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
});