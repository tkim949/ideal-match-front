//npm install --save @material-ui/icons
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import LinkToData from '@material-ui/core/Link';
//import Card  from '@material-ui/core/Card';
//show data
//import Button from '@material-ui/core/Button';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

//import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
//import Tooltip from '@material-ui/core/Tooltip';
//for image update
//icon//https://material-ui.com/components/material-icons/
//import EditIcon from '@material-ui/icons/Edit';


//for edit the exist contents
//import EditDetails from './EditDetails';

//redux
/*
import { connect } from 'react-redux';
import { logoutUser, uploadImage } from '../redux/actions/userActions'
import { KeyboardReturn } from '@material-ui/icons';*/


const styles = {

      paper: {
        padding: 20,
        height: "600px"
      },
      detail: {
        '& .image-wrapper': {
          textAlign: 'center',
          position: 'relative',
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
        }

   }
};
const MemberProfile = (props) => {
    const {
      classes,
      profile: { handle, createdAt, imageUrl, intro, interest, value, location }
    } = props;
  
    return (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          <div className="image-wrapper">
            <img src={imageUrl} alt="profile" className="profile-image" />
          </div>
          <hr />
          <div className="profile-details">
            <LinkToData component={Link} to={`users/${handle}`} 
                             color="primary" variant="h5" >
                    @{handle} </LinkToData>

            
            {intro && <Typography variant="body2">{intro}</Typography>}
            
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
        </div>
      </Paper>
    );
  };
  
  MemberProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired
  };
  
  export default withStyles(styles)(MemberProfile);
  