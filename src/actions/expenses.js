import uuid from 'uuid';
import database from '../firebase/firebase';

// Add_Expense
export const add_expense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense
})

// Function call to firebase
export const startAddingExpenses = (expenseData = {}) => {
    return (dispatch) => {
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        const expense = { description, note, amount, createdAt};

        return database.ref('expenses').push(expense)
            .then((ref) => {
                dispatch(add_expense(
                    {
                        id: ref.key,
                        ...expense
                    }
                ));
            })
            .catch((err) => { console.log(err)})
    };
};


// Remove_Expense
export const remove_expense = (
    {
        id
    } = {}
) => ({
    type: 'REMOVE_EXPENSE',
    id
})
// Edit_Expense
export const edit_expense = (id, updates) => ({
    type: 'EDIT_EXPENSE',
    id,
    updates
})
