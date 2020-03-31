import createSagaMiddleware from "redux-saga";
import { compose, applyMiddleware, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import { history } from "../utils/history";
import rootReducer from "../reducers/reducers";
import mySaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();

const logger = store => next => action => {
    let result = next(action);
    return result;
};


const composeEnhancers =
    typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const enhancer = composeEnhancers(
    applyMiddleware(
        routerMiddleware(history),
        logger,
        sagaMiddleware
    )
);

const store = createStore(
    rootReducer(history),
    enhancer
);

sagaMiddleware.run(mySaga);

export default store;