import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider, combineReducers } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import {BrowserRouter} from 'react-router-dom';
import combinedReducers from './reducers/index'
import CarReducer from './reducers/CarReducer';
import TaskReducer from './reducers/TaskReducer';


const store = createStore(combinedReducers(), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
        <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
