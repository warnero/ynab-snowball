const apiUrl = "/api/accounts/";
export const addNewAccount = (account) => {
};
export const deleteAccount = (account) => {
};
export const updateAccount = (account) => {
    return (dispatch) => {
        dispatch(updateAccountRequest(account));
        // Returns a promise
        return fetch(apiUrl + account._id, {
                method: 'put',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(account)
            })
            .then(response => {
                if(response.ok){
                    response.json().then(data => {
                        dispatch(updateAccountRequestSuccess(data.account,data.message));
                    })
                }
                else{
                    response.json().then(error => {
                        dispatch(updateAccountRequestFailed(error));
                    })
                }
            })
    }
};

//Async action
export const fetchAccounts = () => {
    // Returns a dispatcher function
    // that dispatches an action at later time
    return (dispatch) => {
        dispatch(fetchAccountsRequest());
        // Returns a promise
        return fetch(apiUrl)
            .then(response => {
                if(response.ok){
                    response.json().then(data => {
                        dispatch(fetchAccountsSuccess(data.accounts,data.message));
                    })
                }
                else{
                    response.json().then(error => {
                        dispatch(fetchAccountsFailed(error));
                    })
                }
            })
    }
};
export const fetchAccountsRequest = () => {
    return {
        type:'FETCH_ACCOUNTS_REQUEST'
    }
};
//Sync action
export const fetchAccountsSuccess = (accounts,message) => {
    return {
        type: 'FETCH_ACCOUNTS_SUCCESS',
        accounts: accounts,
        message: message,
        receivedAt: Date.now
    }
}
export const fetchAccountsFailed = (error) => {
    return {
        type:'FETCH_ACCOUNTS_FAILED',
        error
    }
};
export const fetchAccountById = (accountId) => {
    return (dispatch) => {
        dispatch(fetchAccountRequest());
        // Returns a promise
        return fetch(apiUrl + accountId)
            .then(response => {
                console.log(response);
                if(response.ok){
                    response.json().then(data => {
                        dispatch(fetchAccountSuccess(data.account, data.message));
                    })
                }
                else{
                    response.json().then(error => {
                        dispatch(fetchAccountFailed(error));
                    })
                }
            })
    }
};
export const fetchAccountRequest = () => {
    return {
        type:'FETCH_ACCOUNT_REQUEST'
    }
};
//Sync action
export const fetchAccountSuccess = (account,message) => {
    return {
        type: 'FETCH_ACCOUNT_SUCCESS',
        account: account,
        message: message,
        receivedAt: Date.now
    }
};
export const fetchAccountFailed = (error) => {
    return {
        type:'FETCH_ACCOUNT_FAILED',
        error
    }
};

export const updateAccountRequest = (account) => {
    return {
        type: 'UPDATE_ACCOUNT_REQUEST',
        account
    }
};

export const updateAccountRequestSuccess = (account, message) => {
    return {
        type: 'UPDATE_ACCOUNT_REQUEST_SUCCESS',
        todo:account,
        message:message
    }
};

export const updateAccountRequestFailed = (error) => {
    return {
        type: 'UPDATE_ACCOUNT_REQUEST_FAILED',
        error
    }
};