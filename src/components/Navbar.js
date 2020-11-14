import React, { Component, Fragment} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

/*
it doesn't change the authenticated one! need to check later!
*/
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: false
        }
        
    }
    componentDidUpdate(prevProps) {
        if (prevProps.authenticated!== this.props.authenticated) { // <-- Only update error state if value different
            this.setState({
              authenticated: this.props.authenticated,
            });
          }
    }
    render() {
        const { authenticated } = this.props
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <Fragment>
                            <Link to="/">
                            <Tooltip title="Home">
                                <IconButton className="button">
                                    <HomeIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                            <Link to="/account">
                            <Tooltip title="Account"  placement="bottom">
                                <IconButton className="button">
                                    <AccountBoxIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                            <Link to="/maybe">
                            <Tooltip title="Maybe" placement="bottom">
                                <IconButton className="button">
                                    <PeopleIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                            <Link to="/match">
                            <Tooltip title="Match" placement="bottom">
                                <IconButton className="button">
                                    <SentimentSatisfiedAltIcon />
                                 </IconButton>
                            </Tooltip>
                            </Link>
                        </Fragment>

                    ) : (
                        <Fragment>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="login">Login</Button>
                            <Button color="inherit" component={Link} to="signup">Signup</Button>
                        </Fragment>)}
                    
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {

    authenticated: PropTypes.bool.isRequired
}
/*
Warning: Failed prop type: The prop `authenticated` is marked as required in `Navbar`, but its value is `undefined`.
*/
const mapStateToProps = (state) => {
    return {autenticated: state.user.authenticated};
}

export default connect(mapStateToProps)(Navbar);
//export default Navbar