require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import { HashRouter } from 'react-router-dom';
import App from './IndexContainer';
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './providers/rootReducer';
import thunk from 'redux-thunk';
import Loader from './templates/Loader';

const store = createStore(Reducer, applyMiddleware(thunk));

render(
    <HashRouter>
        <Provider store={store}>
            {/* <App /> */}
            <Loader />
        </Provider>
    </HashRouter>
    , document.getElementById('happyfarm'));

