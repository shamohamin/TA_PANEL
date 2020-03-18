import React from 'react' ;
import store from './data/index' ;
import {Provider , } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import "@fortawesome/fontawesome-free/css/all.min.css" ;
import { Connect } from "./Connect";
import './Style/scrollbar.css';

function App() {
  return (
    <Provider store={store}>
      <Connect />
    </Provider>
  );
}

export default App;
