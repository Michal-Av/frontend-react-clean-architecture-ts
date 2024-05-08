import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Redirect, RouteProps } from 'react-router-dom';
import LoginPage from './Login';
import HomePage from './Home';
import ResetPasswordPage from './ResetPassword'; // Import the ResetPasswordPage component

const MainComp: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  return (
    <Router>
      <Route exact path="/">
        {loggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />}
      </Route>
      <Route path="/login">
        <LoginPage setLoggedIn={setLoggedIn} />
      </Route>
      <PrivateRoute path="/home" component={HomePage} loggedIn={loggedIn} />
      <Route path="/reset-password/:token"> {/* Add a new Route for the reset-password path */}
        <ResetPasswordPage setLoggedIn={setLoggedIn} />
      </Route>
    </Router>
  );
};

interface PrivateRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  loggedIn: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, loggedIn, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

export default MainComp;
