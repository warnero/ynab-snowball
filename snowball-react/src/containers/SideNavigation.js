import { connect } from 'react-redux';
import SideNavigation from '../components/SideNavigation';

// map state from store to props
const mapStateToProps = (state) => {
    return {
        mappedNavigationState: state.navigationState
    }
};

// map actions to props
const mapDispatchToProps = (dispatch) => {
    return {
        //you can now say this.props.mappedAppActions
        // mappedToggleAddTodo: () => dispatch(appActions.toggleAddTodo())
    }
};

export default connect(mapStateToProps,mapDispatchToProps)(SideNavigation);