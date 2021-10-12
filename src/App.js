import React, { useEffect } from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import "./App.css";
import Home from "../src/containers/Home/index";
import Login from "../src/containers/Login/index";
import Register from "../src/containers/Register/index";
import Products from "../src/containers/Products/index";
import Orders from "../src/containers/Orders/index";
import Category from "../src/containers/Category/index";
import Layout from "../src/components/layout/index";
import Page from "../src/containers/TypePage/index";
import PrivateRoute from './components/HOC/PrivateRoute';
import { isUserLoggedIn } from "./actions";
import { getAllCategory, addCategory } from "./actions/category-action";
import { getInitialData } from "./actions/initialData-action";
import { useDispatch, useSelector } from 'react-redux';

const App = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (auth.authenticate) {
      dispatch(getInitialData());
    }



  }, [auth.authenticate]);
  return (
    <div className="app">
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <PrivateRoute path="/page" component={Page} />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/orders" component={Orders} />
        <PrivateRoute path="/category" component={Category} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </div>
  );
};

export default App;
