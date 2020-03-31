import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router';
import { routerMiddleware } from 'connected-react-router';
import { createStore, applyMiddleware, compose } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import mySaga from './sagas';
import store from './config/store';
import RouteComponents from './routes/RoutesComponent';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <Provider store={store}>
    <RouteComponents />
  </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
