// ./react-redux-client/src/reducers/accountReducer.js
const INITIAL_STATE = {
    accounts:[],
    account:null,
    isFetching: false,
    error: null,
    successMsg:null,
    showDeleteModal: false,
    accountToDelete: null,
    showEditModal: false,
    accountToEdit: null,
};
const accountReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'FETCH_ACCOUNTS_REQUEST':
            return {
                ...currentState,
                accounts:[],
                account:null,
                isFetching: true,
                error: null,
                successMsg:null,
                showDeleteModal: false,
                accountToDelete: null,
                showEditModal: false,
                accountToEdit: null,
            };
        case 'FETCH_ACCOUNTS_SUCCESS':
            return {
                ...currentState,
                accounts:action.accounts,
                account:null,
                isFetching: false,
                error: null,
                successMsg:action.message,
                showDeleteModal: false,
                accountToDelete: null,
                showEditModal: false,
                accountToEdit: null,
            };
        case 'FETCH_ACCOUNTS_FAILED':
            return {
                ...currentState,
                accounts:[],
                account:null,
                isFetching: false,
                error: action.error,
                successMsg:null,
                showDeleteModal: false,
                accountToDelete: null,
                showEditModal: false,
                accountToEdit: null,
            };
        case 'FETCH_ACCOUNT_REQUEST':
            return {
                ...currentState,
                accounts:currentState.accounts,
                account:null,
                isFetching: true,
                error: null,
                successMsg:null,
                showDeleteModal: false,
                accountToDelete: null,
                showEditModal: false,
                accountToEdit: null,
            };
        case 'FETCH_ACCOUNT_SUCCESS':
            return {
                ...currentState,
                accounts:currentState.accounts,
                account:action.account,
                isFetching: false,
                error: null,
                successMsg:action.message,
                showDeleteModal: false,
                accountToDelete: null,
                showEditModal: false,
                accountToEdit: null,
            };
        case 'FETCH_ACCOUNT_FAILED':
            return {
                ...currentState,
                accounts:[],
                account:null,
                isFetching: false,
                error: action.error,
                successMsg:null,
                showDeleteModal: false,
                accountToDelete: null,
                showEditModal: false,
                accountToEdit: null,
            };
        default:
            return currentState;
    }
};

export default accountReducer;