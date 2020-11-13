import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';


//https://reactjs.org/docs/react-component.html
//https://reactrouter.com/web/api/Redirect
//https://stackoverflow.com/questions/34735580/how-to-do-a-redirect-to-another-route-with-react-router
const AuthRoute = ({ component: Component, authenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      authenticated === true ? <Redirect to="/" /> : <Component {...props} />
    }
  />
);
//export default AuthRoute
////* after changing the autenticated, add belowe

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated
});
/////* it looks we don't need below
//AuthRoute.propTypes = {
//  user: PropTypes.object.isRequired
//};

export default connect(mapStateToProps)(AuthRoute);
