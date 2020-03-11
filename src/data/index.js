import { applyMiddleware , createStore, compose } from "redux";
import { modelReducer } from './modelReducer' ;
import { asyncMiddelware } from "./middelware";

// let store ;

// if(navigator.userAgent.indexOf("Chrome") !== -1){
//     store = createStore(modelReducer , compose(
//         applyMiddleware(asyncMiddelware) ,
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
//     ));
// }else {
//     store = createStore(modelReducer , compose(applyMiddleware(asyncMiddelware)));
// }



export default createStore(modelReducer ,
        compose(applyMiddleware(asyncMiddelware))); ;
