import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import CloseIcon from '@material-ui/icons/Close';
// Redux stuff
import { connect } from 'react-redux';
import { sendMessage, clearErrors } from '../redux/actions/dataActions';

const styles = {
  
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  },
  mailButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  },
  progressSpinner: {
    position: 'absolute'
  },
  closeButton: {
    position: 'absolute',
    left: '90%',
    top: '5%'
  }
};

class SendMessage extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  };
  
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

  /*
  componentDidUpdate(prevProps) {
    if (prevProps.UI.errors !== this.props.UI.errors) { // <-- Only update error state if value different
        this.setState({
          errors: this.props.UI.errors,
        });
      }
    if(prevProps.UI.errors === this.props.UI.errors) {
        this.setState({ body: '', open: false, errors: {} });
    }
}*/
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    //this.props.clearErrors();
    this.setState({ open: false });
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.sendMessage({ body: this.state.body}, this.props.handle);
    
    
  };
  render() {
    const { errors } = this.state;
    const {
      classes,
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <Tooltip title="Send a message" placement="top">
                <IconButton onClick={this.handleOpen} className={classes.mailButton}>
                        <MailOutlineIcon />
                 </IconButton>
            </Tooltip>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
        <Tooltip title="Close" placement="top" className={classes.closeButton}>
                <IconButton onClick={this.handleClose}>
                        <CloseIcon/>
                 </IconButton>
            </Tooltip>
          <DialogTitle>Send a message</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="Message"
                multiline
                rows="3"
                placeholder="Send a message!"
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
      </Fragment>
    );
  }
}

SendMessage.propTypes = {
  sendMessage: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  UI: state.UI
});

export default connect(
  mapStateToProps,
  { sendMessage, clearErrors }
)(withStyles(styles)(SendMessage));