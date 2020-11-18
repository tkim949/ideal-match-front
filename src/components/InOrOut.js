//npm install --save @material-ui/icons
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
//import Card  from '@material-ui/core/Card';
//show data
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
//import LinkToData from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
//import LocationOnIcon from '@material-ui/icons/LocationOn';
//import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
//import Tooltip from '@material-ui/core/Tooltip';
//for image update
//icon//https://material-ui.com/components/material-icons/
//import EditIcon from '@material-ui/icons/Edit';


//for edit the exist contents
//import EditDetails from './EditDetails';

//redux
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/userActions'
//import { KeyboardReturn } from '@material-ui/icons';


const styles = {

      paper: { padding: 20,
        //height: "600px"
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

class InOrOut extends Component {
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
    //get '/user', which get data from 'profiles'
    render() {
        const { classes, user: { 
            authenticated,
            loading,
         }
        } = this.props;
        let show = !loading ? (authenticated ? 
                                     ( <Paper className={classes.paper}>
                                         <div className={classes.bntLogout}>
                                             <br/>
                                             <Typography variant="body2" align="center">
                                                 Need to check your profile? 
                                             </Typography>
                                             <Typography variant="body2" align="center">
                                                 Go and update your profile on account! 
                                             </Typography>
                                            
                                             <div className={classes.buttons}>
                                                <Button
                                                variant="contained"
                                                color="secondary"
                                                component={Link}
                                                to="/account"
                                                >
                                                Account
                                                </Button>
                    
                                                <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleLogout}
                                                >Logout
                                                </Button>
                                             </div>
                                         </div>
                                     </Paper>

                                     ) : (
                                         <Paper className={classes.bntLogin}>
                                             <br/>
                                             <Typography variant="body2" align="center">
                                                 You want to find your ideal partner? 
                                             </Typography>
                                             <Typography variant="body2" align="center">
                                                 Allow Ideal Match to help you! 
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
                                     //: (<p>loading... </p>);
                                     : <Paper className={classes.paper}>
                                     <div className={classes.bntLogout}>
                                         <br/>
                                         <Typography variant="body2" align="center">
                                            It seems you do not have profile yet. 
                                         </Typography>
                                         <Typography variant="body2" align="center">
                                             Go and fill out the forms! 
                                         </Typography>
                                        
                                         <div className={classes.buttons}>
                                            <Button
                                            variant="contained"
                                            color="secondary"
                                            component={Link}
                                            to="/account"
                                            >
                                            Account
                                            </Button>
                
                                            <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={this.handleLogout}
                                            >Logout
                                            </Button>
                                         </div>
                                     </div>
                                 </Paper>
        return show;
    }
}

const mapStateToProps = (state) => {
    return {user: state.user};
}

const mapActionsToProps = { logoutUser };


InOrOut.propTypes = {
        logoutUser: PropTypes.func.isRequired,
        user: PropTypes.object.isRequired,
        classes: PropTypes.object.isRequired 
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(InOrOut))



