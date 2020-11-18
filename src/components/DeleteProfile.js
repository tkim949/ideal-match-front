import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
//import MyButton from '../../util/MyButton';

// MUI Stuff
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
import Tooltip from '@material-ui/core/Tooltip';

import { connect } from 'react-redux';
import { deleteProfile } from '../../redux/actions/dataActions';

const styles = {
  deleteButton: {
    position: 'absolute',
    left: '90%',
    top: '10%'
  }
};

class DeleteProfile extends Component {
  state = {
    open: false
  };
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  deleteScream = () => {
    this.props.deleteProfle(this.props.profileId);
    this.setState({ open: false });
  };
  render() {
    const { classes } = this.props;

    return (
      <Fragment>
         <Tooltip title="Delete the profile" placement="top">
                <IconButton onClick={this.handleOpen} className="button">
                <DeleteOutline color="secondary" />
                </IconButton>
        </Tooltip> 
        
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <DialogTitle>
            Are you sure you want to delete this Profile?
          </DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.deleteProfile} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    );
  }
}

DeleteProfile.propTypes = {
  deleteProfile: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  profileId: PropTypes.string.isRequired
};

export default connect(
  null,
  { deleteProfile }
)(withStyles(styles)(DeleteProfile));
