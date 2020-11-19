import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
//import MyButton from '../../util/MyButton';
// MUI Stuff
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
/*
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close'; *///
// Redux stuff
import { connect } from 'react-redux';
import { postChat, clearErrors } from '../redux/actions/dataActions';
//import Tooltip from '@material-ui/core/Tooltip';
//for image update
//icon//https://material-ui.com/components/material-icons/
//import { IconButton } from '@material-ui/core';
//import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';


const styles = {
    paper:{
        padding: 10
    },
    textField: {
         padding: 10
    },
  
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10,
    marginBottom: 10
  },
  progressShow: {
    position: 'absolute'
  },
 
};

class PostChat extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };

  /*
  componentDidUpdate(prevProps) {
    //console.log(prevProps.auth, this.props.auth, this.props.history);
    if (prevProps.authenticated !== this.props.authenticated) {
      this.props.history.push("/dashboard");
    }
    //console.log(this.props.history);
    if (prevProps.errors !== this.props.errors) { // <-- Only update error state if value different
      this.setState({
        errors: this.props.errors,
      });
    }
  }*/
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '', open: false, errors: {} });
    }
  }
  
  /*
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  }; */
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.postChat({ body: this.state.body });
    //this.setState({ body: '', errors: {}}); //still the message doesnot go away after posting!
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;

    return (
        <Card className={classes.paper}>
            <form onSubmit={this.handleSubmit}>
                <br/>
              <TextField
                name="body"
                type="text"
                label="Chat"
                multiline
                rows="5"
                placeholder="Post your message"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={25}
                    className={classes.progressShow}
                  />
                )}
              </Button>
            </form>
        </Card>

    );
    /*
    return (
      <Paper>
           <Tooltip title="Open Dialog" placement="top">
                <IconButton onClick={this.handleOpen}>
                        <AddIcon color="red"/>
                 </IconButton>
            </Tooltip>
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
             <Tooltip title="Close" placement="top" className="closeButton">
                <IconButton onClick={this.handleClose}>
                        <CloseIcon color="primary"/>
                 </IconButton>
            </Tooltip>
          
          <DialogTitle>Post a new chat</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Chat"
                multiline
                rows="4"
                placeholder="Post your message"
                error={errors.body ? true : false}
                helperText={errors.body}
                className={classes.textField}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.submitButton}
                disabled={loading}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    className={classes.progressSpinner}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Paper>
    );
    */
  }
}

PostChat.propTypes = {
  postChat: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { postChat, clearErrors }
)(withStyles(styles)(PostChat));