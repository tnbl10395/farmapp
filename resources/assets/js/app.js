require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import Index from './containers/IndexContainer';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import Reducer from './providers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(Reducer, applyMiddleware(thunk));

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Index />
            </Provider>
        );
    }
}

render(<App />, document.getElementById('happyfarm'));

