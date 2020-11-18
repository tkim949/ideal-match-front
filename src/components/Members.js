import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

//https://material-ui.com/components/cards/
import Card  from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

//change the date format, https://www.npmjs.com/package/dayjs
//npm install --save dayjs
import dayjs from 'dayjs';

//add like and delete, redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { likeMember, cancelLike } from '../redux/actions/dataActions';
import { IconButton } from '@material-ui/core';
//https://material-ui.com/components/tooltips/
import Tooltip from '@material-ui/core/Tooltip';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';


//import { deleteProfile } from '../redux/actions/dataActions';
const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20,
    },
    image: {
        //height: 300,
        minWidth: 200,
    },
    content: {
        padding: 30,
        objectFit: 'cover',
    },
    deleteButton: {
        left: '90%',
        top: '10%'
    }
};

class Members extends Component {
    likedMember = () => {
        if(this.props.user.mLikes && this.props.user.mLikes.find(like => like.person === this.props.member.userName))
            return true;
        else return false;
    
    };

    likeMember = () => {
        this.props.likeMember(this.props.member.userName);
    }
    cancelLike = () => {
        this.props.cancelLike(this.props.member.userName);
    }
    render() {
        const { classes, member: { userName, intro, userImage, name, createdAt, likeCount },
                                  user: { authenticated,}
                                  //credentials: { handle } //check this
                                  }= this.props;

                                  const likeButton = !authenticated ? (
                                    <Tooltip title="Like" placement="top">
                                            <IconButton  className={classes.button}>
                                                <Link to="/login">
                                                    <FavoriteBorderIcon color="primary"/>
                                                </Link>
                                            </IconButton>
                                       </Tooltip>
                        
                                ) : ( this.likedMember() ? (
                                    <Tooltip title="Cancle Like" placement="top">
                                            <IconButton  onClick={this.cancelLike} className={classes.button}>
                                                <FavoriteIcon color="primary"/>   
                                            </IconButton>
                                       </Tooltip>
                                ) : (
                                    <Tooltip title="Like" placement="top">
                                            <IconButton  onClick={this.likeMember} className={classes.button}>
                                                <FavoriteBorderIcon color="primary"/>   
                                            </IconButton>
                                       </Tooltip>
                        
                                ));
        
        /*
         const deleteButton = authenticated && handle === handle ? (
             <DeleteProfile profileId={profileId/>
         ) : null
        */
        return(
            <Card className={classes.card}>
               <CardMedia
                image={userImage}
                title={"User Profile Image"}
                className={classes.image}
          />
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    component={Link} 
                    to={`/users/${userName}`} 
                   >
                    {userName}
                </Typography>
               {/* {deleteButton} */}
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).format('YYYY-MM-DD')} </Typography>
                <Typography variant="body1">{name}</Typography>
                <Typography variant="body1">{intro}</Typography>
                {likeButton}
                <span>{likeCount} Likes</span>
                
            </CardContent>
        </Card>
        )
    }
}

Members.propTypes = {
    likeMember: PropTypes.func.isRequired,
    cancelLike: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    member: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired //styles

}

const mapStateToProps = (state) => {
    return { user: state.user };
}
const mapActionsToProps = {
    likeMember,
    cancelLike
}


//export default withStyles(styles)(Members)
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Members));