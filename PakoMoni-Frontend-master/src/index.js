import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "jquery/dist/jquery.min";
import "bootstrap/dist/js/bootstrap.min";
import { BrowserRouter as Router} from "react-router-dom";
import thunk from "redux-thunk";
import App from './layouts/App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore, applyMiddleware} from "redux";
import rootReducer from "./store/reducers/root-reducer";
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
      <Router>
          <App />
      </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
