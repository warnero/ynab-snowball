import * as Accounts from '../controllers/Accounts';
import * as Snowball from '../controllers/Snowball';

export default function(app) {
    return {
        accounts: app.use('/api/accounts', [], Accounts.router),
        snowball: app.use('/api/snowball', [], Snowball.router)
    }
}
