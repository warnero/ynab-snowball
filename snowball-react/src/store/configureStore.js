import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';

export default function configureStore(history, initialState) {
    // const middlewares = [
    //     thunk,
    //     routerMiddleware(history)
    // ];

    const store = createStore(rootReducer, initialState, compose(
        applyMiddleware(thunk, routerMiddleware(history)),
        window.devToolsExtension ? window.devToolsExtension() : f => f // add support for Redux dev tools
        )
    );

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers', () => {
            const nextReducer = require('../reducers').default; // eslint-disable-line global-require
            store.replaceReducer(nextReducer);
        });
    }
    return store;
}