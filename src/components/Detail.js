//npm install --save @material-ui/icons
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//import Card  from '@material-ui/core/Card';
//show data
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import LinkToData from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
import Tooltip from '@material-ui/core/Tooltip';
//for image update
//icon//https://material-ui.com/components/material-icons/
import EditIcon from '@material-ui/icons/Edit';


//for edit the exist contents
import EditDetails from './EditDetails';

//redux
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions'
import { KeyboardReturn } from '@material-ui/icons';


const styles = {

    invisibleSeparator: {
        border: 'none',
        margin: 4
      },
      visibleSeparator: {
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        marginBottom: 20
      },
      paper: {
        padding: 20,
        height: "600px"
      },
      detail: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
          '& button': {
            position: 'absolute',
            top: '80%',
            left: '70%'
          }
        },
        '& .profile-image': {
           width: 200,
           height: 200,
           objectFit: 'cover',
           maxWidth: '50%',
           borderRadius: '50%'
           //margin: '10px auto 10px auto',
        //height: '30%',
        //width: '30%'
        },
        '& .profile-body': {
          textAlign: 'center',
          '& span, svg': {
            verticalAlign: 'middle'
          },
          '& a': {
            color: '#00bcd4'
          }
        },
        '& hr': {
          border: 'none',
          margin: '0 0 10px 0'
        },
        '& svg.button': {
          '&:hover': {
            cursor: 'pointer'
          }
        }
      },
      buttons: {
        textAlign: 'center',
        '& a': {
          margin: '20px 10px'
        }
      }

};
/* Error: Warning: Failed prop type: Invalid prop `uploadImage` of type `function` supplied to `Detail`, expected `object`.
    at Detail (http://localhost:3000/static/js/main.chunk.js:530:5)
Solution:???
*/

/* Error:index.js:1 Warning: findDOMNode is deprecated in StrictMode. 
findDOMNode was passed an instance of Transition which is inside StrictMode. 
Instead, add a ref directly to the element you want to reference. 
Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
Solution: https://stackoverflow.com/questions/60903335/warning-finddomnode-is-deprecated-in-strictmode-finddomnode-was-passed-an-inst
*/

class Detail extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        //send the image to the server
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    }

    handleEditPicture = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    }

    handleLogout = () => {
        this.props.logoutUser();
    }

    render() {
        const { classes, user: { credentials: { handle, imageUrl, intro, interest, value, location },
            authenticated,
            loading,
         }
        } = this.props;
        let detailShow = !loading ? (authenticated ? 
                                     ( <Paper className={classes.paper}>
                                         <div className={classes.detail}>
                                             <div className="image-wrapper">
                                                 <img src={imageUrl} alt="profileImage" className="profile-image"/>
                                                 <input type="file" id="imageInput" hidden="hidden" onChange={this.handleImageChange}/>
                                                 <Tooltip title="Edit profile picture" placement="top">
                                                    <IconButton onClick={this.handleEditPicture} className="button">
                                                        <EditIcon color="primary"/>
                                                    </IconButton>
                                                 </Tooltip>
                                             </div>
                                             <hr/>
                                             <div className="profile-body">
                                             <Typography variant="body2">{intro}</Typography>
                                                 <LinkToData component={Link} to={`users/${handle}`} 
                                                    color="primary" variant="h5">
                                                        @{handle}

                                                    </LinkToData>
                                                
                                                 {intro && <Typography variant="body2">{intro}</Typography>}
                                                 <hr/>
                                                 {interest && <Typography variant="body2">Interest: {interest}</Typography>}
                                                 <hr/>
                                                 {value && <Typography variant="body2">Value: {value}</Typography>}
                                                 <hr/>
                                                 {location && (
                                                     <Fragment>
                                                        <LocationOnIcon color="primary" /> <span>{location}</span>
                                                     </Fragment>
                                                 )}
  
                                             </div>
                                             <Tooltip title="Logout" placement="top">
                                                 <IconButton onClick={this.handleLogout}>
                                                     <KeyboardReturn color="primary"/>
                                                 </IconButton>
                                             </Tooltip>
                                             <EditDetails />
                                         </div>

                                     </Paper>

                                     ) : (
                                         <Paper className={classes.paper}>
                                             <Typography variant="body2" align="center">
                                                 There is no profile. Go to create profile or login again!
                                             </Typography>
                                             <div className={classes.buttons}>
                                                <Button
                                                variant="contained"
                                                color="primary"
                                                component={Link}
                                                to="/login"
                                                >
                                                Login
                                                </Button>
                                                <Button
                                                variant="contained"
                                                color="secondary"
                                                component={Link}
                                                to="/signup"
                                                >
                                                Signup
                                                </Button>
                                            </div>
                                         </Paper>
                                     ) ) 
                                     : (<p>loading... </p>);
        return detailShow;
    }
}

const mapStateToProps = (state) => {
    return {user: state.user};
}

const mapActionsToProps = { logoutUser, uploadImage };


Detail.propTypes = {
        logoutUser: PropTypes.func.isRequired,
        uploadImage: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired 
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Detail))



