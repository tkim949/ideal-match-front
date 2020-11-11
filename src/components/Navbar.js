import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//error related to router when using import Link from 'reat-router-dom/Link'
//material-ui, https://material-ui.com/components/app-bar/
//npm install --save @material-ui/core
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    <Button color="inherit" component={Link} to="/">Home</Button>
                    <Button color="inherit" component={Link} to="login">Login</Button>
                    <Button color="inherit" component={Link} to="signup">Signup</Button>
                    <Button color="inherit" component={Link} to="Maybe">Maybe</Button>
                    <Button color="inherit" component={Link} to="Match">Match</Button>
                </Toolbar>
            </AppBar>
        )
    }
}

export default Navbar