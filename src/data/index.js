import { applyMiddleware , createStore, compose } from "redux";
import { modelReducer } from './modelReducer' ;
import { asyncMiddelware } from "./middelware";

export default createStore(modelReducer , compose(
            applyMiddleware(asyncMiddelware) ,
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
            ));
