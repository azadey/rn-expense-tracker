import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

import { getFormattedDate } from '../../utils/date';
import Input from './Input';
import Button from '../UI/Button';
import { GlobalStyles } from '../../constants/styles';

function ExpenseForm({submitButtonLabel, onCancel, onSubmit, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount: { 
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: { 
            value: defaultValues ? defaultValues.description : '',
            isValid: true
        }
    });

    function inputChangedHandler(identifier, enteredValue) {
        setInputs((currentInput) => {
            return {
                ...currentInput, 
                [identifier]: { value: enteredValue, isValid: true }
            };
        });
    }

    function submitHandler() {
        const data = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value
        };

        const amountIsValid = !isNaN(data.amount) && data.amount > 0;
        const dateIsValid = data.date.toString() !== 'Invalid Date';
        const descriptionIsValid = data.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            setInputs((curInputs) => {
                return {
                    amount: { value: curInputs.amount.value, isValid: amountIsValid },
                    date: { value: curInputs.date.value, isValid: dateIsValid },
                    description: { value: curInputs.description.value, isValid: descriptionIsValid }
                }
            });
            return;
        }

        onSubmit(data);
    }

    const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputRow}>
                <Input label="Amount" style={styles.rowInput} invalid={!inputs.amount.isValid} inputConfig={{
                    keyboardType: "decimal-pad",
                    onChangeText: inputChangedHandler.bind(this, 'amount'),
                    value: inputs.amount.value
                }} />
                <Input label="Date" style={styles.rowInput} invalid={!inputs.date.isValid} inputConfig={{
                    placeholder: 'YYYY-MM-DD',
                    maxLength: 10,
                    onChangeText: inputChangedHandler.bind(this, 'date'),
                    value: inputs.date.value
                }} />
            </View>
            <Input label="Description" invalid={!inputs.description.isValid} inputConfig={{
                multiline: true,
                onChangeText: inputChangedHandler.bind(this, 'description'),
                value: inputs.description.value
            }} />
            {formIsInvalid && (
                <Text style={styles.errorText}>Invalid Input values - please check your entered data!</Text>
            )}
            <View style={styles.buttons}>
                <Button mode='flat' onPress={onCancel} style={styles.button} >Cancel</Button>
                <Button onPress={submitHandler} style={styles.button}>{submitButtonLabel}</Button>
            </View>
        </View>

    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form: {
        marginTop: 40
    },  
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex: 1
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8
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
});