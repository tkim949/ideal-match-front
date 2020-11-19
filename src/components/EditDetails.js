//rce + tab
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import { editUserDetails } from '../redux/actions/userActions';
import Button from '@material-ui/core/Button';

import Tooltip from '@material-ui/core/Tooltip';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = {
    
    icon: {
        margin: '20px auto 20px auto',
        height: '50%',
        width: '50%'
    },
    textField: {
        margin: '10px auto 10px auto'
    },
    button: {
        float: 'right'
    },
    progress: {
        position: 'absolute'
    },
};


class EditDetails extends Component {
    state = {
        name:'',
        intro: '',
        interest: '',
        value: '',
        location: '',
        open: false
    };
    mapUserDetailsToState = (credentials) => {
        this.setState({
            name: credentials.name ? credentials.name: '',
            intro: credentials.intro ? credentials.intro: '',
            interest: credentials.interest ? credentials.interest: '',
            value: credentials.value ? credentials.value: '',
            location: credentials.location ? credentials.location: '',
        });
    }
    handleOpen = () => {
        this.setState({ open: true })
        this.mapUserDetailsToState(this.props.credentials);
    }
    handleClose = () => {
        this.setState({ open: false });
    }
    componentDidMount() {
        const { credentials } = this.props;
        this.mapUserDetailsToState(credentials);
        /*
        this.setState({
            intro: credentials.intro ? credentials.intro: '',
            interest: credentials.interest ? credentials.interest: '',
            value: credentials.value ? credentials.value: '',
            location: credentials.location ? credentials.location: '',

        })*/
    }
    handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value
        });
      };
    handleSubmit = () => {
        const userDetails = {
          name: this.state.name,
          intro: this.state.intro,
          interest: this.state.interest,
          value: this.state.value,
          location: this.state.location
        };
        this.props.editUserDetails(userDetails);
        this.handleClose();
      };
    

    render() {
        const { classes } = this.props;
        return (
           <Fragment>
               <Tooltip title="Edit profile" placement="top">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <EditIcon color="primary"/>
                    </IconButton>
               </Tooltip>
               <Dialog 
                open={this.state.open}
                onClose={this.handleClose}
                fullWidth
                maxWidth="sm">
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                        <TextField
                            name="name"
                            type="text"
                            label="Name"
                            placeholder="Your first and last name"
                            className={classes.textField}
                            value={this.state.name}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="intro"
                            type="text"
                            label="Introduction"
                            multiline
                            rows="3"
                            placeholder="A short introduction about yourself"
                            className={classes.textField}
                            value={this.state.intro}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="interest"
                            type="text"
                            label="Interest"
                            placeholder="What you most interested in"
                            className={classes.textField}
                            value={this.state.interest}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="value"
                            type="text"
                            label="Value"
                            placeholder="What you think is most important in your life"
                            className={classes.textField}
                            value={this.state.value}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        <TextField
                            name="location"
                            type="text"
                            label="Location"
                            placeholder="Where you live"
                            className={classes.textField}
                            value={this.state.location}
                            onChange={this.handleChange}
                            fullWidth
                        />
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} color="primary">
                        Save
                        </Button>
                    </DialogActions>

               </Dialog>

           </Fragment>
        )
    }
}

EditDetails.propTypes = {
    editUserDetails: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

export default connect(mapStateToProps, { editUserDetails })(withStyles(styles)(EditDetails));
