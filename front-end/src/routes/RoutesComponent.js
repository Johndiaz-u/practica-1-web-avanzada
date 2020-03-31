import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { history } from "../utils/history";
import LoginContainer from "../container/user/LoginContainer";
import PrivateRoute from "../authentication/components/PrivateRoute";
import App from "../App";
import RegisterContainer from "../container/register/RegisterContainer";


const logOut = (props) => {
  localStorage.removeItem('rentalUser');
  props.history.push('/');
  return null;
}

const RouteComponents = () =>
  <ConnectedRouter history={history}>
    <Switch>
      <Route exact path={'/login'} component={LoginContainer} />
      <Route exact path={'/register'} component={RegisterContainer} />
      <Route exact path={'/logout'} render={(props) => logOut(props)} />
      <PrivateRoute path={'/'} component={App} />
    </Switch>
  </ConnectedRouter>


export default RouteComponents;
