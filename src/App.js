import React from 'react' ;
import store from './data/index' ;
import {Provider , } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import { Connect } from "./Connect";

function App() {
  return (
    <Provider store={store}>
      <Connect />
    </Provider>
  );
}

export default App;
