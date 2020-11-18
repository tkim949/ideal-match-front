import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logoutUser } from '../redux/actions/userActions'
//error related to router when using import Link from 'reat-router-dom/Link'
//material-ui, https://material-ui.com/components/app-bar/
//npm install --save @material-ui/core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import { IconButton } from '@material-ui/core';
//for image update
//icon//https://material-ui.com/components/material-icons/
import HomeIcon from '@material-ui/icons/HomeSharp';
//https://material-ui.com/components/tooltips/
import Tooltip from '@material-ui/core/Tooltip';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import PeopleIcon from '@material-ui/icons/People';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAlt';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

/*
it doesn't change the authenticated one! need to check later!
Error: index.js:1 Warning: findDOMNode is deprecated in StrictMode. 
findDOMNode was passed an instance of Transition which is inside StrictMode. 
Instead, add a ref directly to the element you want to reference. 
Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
*/
class Navbar extends Component {

    handleLogout = () => {
        this.props.logoutUser();
    }
    
    render() {
        const { user: {authenticated} } = this.props;
        //const { authenticated } = this.props;
        console.log(authenticated);
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated 
                    //!== undefined ? ( authenticated 
                    ? (
                        <Fragment>
                            <Link to="/">
                            <Tooltip title="Home">
                                <IconButton className="button">
                                    <HomeIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                            <Link to="/account">
                            <Tooltip title="Account" >
                                <IconButton className="button">
                                    <AccountBoxIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                            <Link to="/maybe">
                            <Tooltip title="Maybe">
                                <IconButton className="button">
                                    <PeopleIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                            <Tooltip title="Logout" placement="top">
                                    <IconButton onClick={this.handleLogout} className="button">
                                            <ExitToAppIcon />
                                    </IconButton>
                            </Tooltip>
                        </Fragment>

                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="login">Login</Button>
                            <Button color="inherit" component={Link} to="signup">Signup</Button>
                        </Fragment>)
                   // ) : <p> Loading </p>
                }
                    
                </Toolbar>
            </AppBar>
        );
    }
}

Navbar.propTypes = {

    authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
    //classes: PropTypes.object.isRequired 
}
const mapActionsToProps = { logoutUser};

/*
Warning: Failed prop type: The prop `authenticated` is marked as required in `Navbar`, but its value is `undefined`.
*/
const mapStateToProps = (state) => {
   // return {autenticated: state.user.authenticated};
   return { user: state.user };
}

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
//export default Navbar

/*
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        
    }
    componentDidUpdate(prevProps) {
        if (prevProps.authenticated !== this.props.authenticated) { // <-- Only update error state if value different
            this.setState({
              authenticated: this.props.authenticated,
            });
          }
    }*/