import React, { Component } from 'react';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter } from 'react-router-redux';
import configureStore from './store/configureStore';
import routes from './routes';

const history = createHistory();
const store = configureStore(history, undefined);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <ConnectedRouter history={history} children={routes} />
                </div>
            </Provider>
        );
    }
}
// App.propTypes = {
//     store: PropTypes.object.isRequired,
//     history: PropTypes.object.isRequired
// }
export default App;

