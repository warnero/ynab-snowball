import * as Accounts from '../controllers/Accounts';

export default function(app) {
    return {
        accounts: app.use('/api/accounts', [], Accounts.router)
    }
}
