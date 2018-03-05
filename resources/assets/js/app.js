require('./bootstrap');
import React from 'react';
import { render } from 'react-dom';
import Index from './containers/IndexContainer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducer from './providers/rootReducer';

const store = createStore(Reducer);

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

