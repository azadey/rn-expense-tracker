import { Children, createContext, useReducer, useRef } from "react";


export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    setExpenses: (expenses) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            return [action.payload, ...state]
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        case 'UPDATE':
            const updateIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updateExpense = state[updateIndex];
            const updateItem = { ...updateExpense, ...action.payload.data };
            const updatedExpenses = [...state];
            updatedExpenses[updateIndex] = updateItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        default:
            return state
    }
}

function ExpenseContextProvider({children}) 
{
    const [expenseState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(data) {
        dispatch({ type: 'ADD', payload: data });
    }

    function setExpenses(expenses) {
        dispatch({ type: 'SET', payload: expenses });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, data) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: data }});
    }
    
    const value = {
        expenses: expenseState,
        setExpenses: setExpenses,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return (
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    ) 
}

export default ExpenseContextProvider;