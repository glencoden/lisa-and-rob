import React from 'react';
import ReactDOM from 'react-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer, composeWithDevTools());

const main = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(main, document.getElementById('root'));
