import { connect } from 'react-redux';
import * as accountActions from '../actions/accountActions';
import Account from '../components/Account';
// map state from store to props
const mapStateToProps = (state) => {
    return {
        //you can now say this.props.mappedAppSate
        mappedAccountState: state.accountState
    }
};
// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        //you can now say this.props.mappedAppActions
        mappedfetchAccountById: accountId => dispatch(accountActions.fetchAccountById(accountId)),
        mappedDeleteAccount: accountToDelete => dispatch(accountActions.deleteAccount(accountToDelete)),
        mappedUpdateAccount: accountToUpdate => dispatch(accountActions.updateAccount(accountToUpdate))
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Account);