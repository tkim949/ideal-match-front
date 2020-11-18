import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import "./Chat.css";
//import { Link } from 'react-router-dom';

//https://material-ui.com/components/cards/
//import Card  from '@material-ui/core/Card';
//import CardMedia from '@material-ui/core/CardMedia';
////import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
//import Typography from '@material-ui/core/Typography';

//change the date format, https://www.npmjs.com/package/dayjs
//npm install --save dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';


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

class ShowChat extends Component {
    
    render() {
        dayjs.extend(relativeTime);
        const { classes, chat: {  body,
                                  createdAt,  
                                  userHandle, 
                                  chatId, 
                                
                                   },
                        
                        } = this.props;
        //let time = dayjs(classes.createdAt);


        return (
            <div className="chat">
                 
                <div className="chat_details">
                    <h2>{userHandle}</h2>
                    <p>{body}</p>
                </div>
                <p className="chat_timestamp">{dayjs(createdAt).fromNow()}</p>
                <div className={classes.card}></div>
            </div>

        )
        /*
        return(
            <Card className={classes.card}>
               
            <CardContent className={classes.content}>
                <Typography 
                    variant="h5" 
                    >
                    {userHandle}
                </Typography>
              
                <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()} </Typography>
                <Typography variant="body1">{body}</Typography>
                   
            </CardContent>
        </Card>
        ) */
    } 
}
/*
Profile.propTypes = {
    likeProfile: PropTypes.func.isRequired,
    unlikeProfile: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired //styles

}

const mapStateToProps = (state) => {
    return { user: state.user };
}

const mapActionsToProps = {
    likeProfile,
    unlikeProfile
}*/

export default withStyles(styles)(ShowChat)
//export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Profile));