import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
//import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { deleteChat } from '../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  },
  dialog: {
      padding: 10
  }
};

class DeleteChat extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteChat = () => {
    this.props.deleteChat(this.props.chatId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
         <Tooltip title="Delete the chat" placement="top">
                <IconButton onClick={this.handleOpen} className={classes.deleteButton}>
                <DeleteRoundedIcon color="secondary" />
                </IconButton>
        </Tooltip> 
        
        <Dialog
          className={classes.dialog}
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <DialogTitle>
            Want to delete? After deletion, you cannot recover this chat.
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteChat} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteChat.propTypes = {
  deleteChat: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  chatId: PropTypes.string.isRequired
};

export default connect(null,{ deleteChat })(withStyles(styles)(DeleteChat));
