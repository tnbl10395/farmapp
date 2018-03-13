require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';

import Index from './containers/IndexContainer';
import Login from './containers/LoginContainer';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './providers/rootReducer';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, HashRouter } from 'react-router-dom';

const store = createStore(Reducer, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>
                    <Route path="/" component={Index} />
                    <Route path="/login" component={Login} />
                </div>
                {/* <Index /> */}
            </Provider>
        );
    }
}

render(
    <HashRouter>
        <App />
    </HashRouter>
    , document.getElementById('happyfarm'));

