import { Children, createContext, useReducer, useRef } from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 82.29,
        date: new Date('2021-01-05')
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2021-02-19')
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2021-02-18')
    },
    {
        id: 'e6',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2021-12-19')
    },
    {
        id: 'e7',
        description: 'A pair of trousers',
        amount: 82.29,
        date: new Date('2021-01-05')
    },
    {
        id: 'e8',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2021-12-01')
    },
    {
        id: 'e9',
        description: 'A book',
        amount: 14.99,
        date: new Date('2021-02-19')
    },
    {
        id: 'e10',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2021-02-18')
    }
];

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch(action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id}, ...state]
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
    const [expenseState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(data) {
        dispatch({ type: 'ADD', payload: data });
    }

    function deleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id });
    }

    function updateExpense(id, data) {
        dispatch({ type: 'UPDATE', payload: {id: id, data: data }});
    }
    
    const value = {
        expenses: expenseState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    };

    return (
        <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>
    ) 
}

export default ExpenseContextProvider;