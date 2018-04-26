import { connect } from 'react-redux';
import * as accountActions from '../actions/accountActions';
import Accounts from '../components/Accounts';
// map state from store to props
const mapStateToProps = (state,ownProps) => {
    return {
        //you can now say this.props.mappedAppSate
        mappedAccountState: state.accountState
    }
};
// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        //you can now say this.props.mappedAppActions
        fetchAccounts: () => dispatch(accountActions.fetchAccounts())
    }
};
export default connect(mapStateToProps,mapDispatchToProps)(Accounts);