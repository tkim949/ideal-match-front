import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
//import "./Chat.css";
//import { Link } from 'react-router-dom';

//https://material-ui.com/components/cards/
import Card  from '@material-ui/core/Card';
//import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
//import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';

//change the date format, https://www.npmjs.com/package/dayjs
//npm install --save dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { deleteChat } from '../redux/actions/dataActions';
import DeleteChat from './DeleteChat';



const styles = {
    
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 10,
    },
    image: {
        //height: 300,
        minWidth: 200,
    },
    content: {
        padding: 10,
        objectFit: 'cover',
    },
    timeD: {
        left: '90%',
        top: '10%',
        color: "textSecondary"
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
                        user: { authenticated,
                               credentials: { userName }}
                        } = this.props;
        //let time = dayjs(classes.createdAt);
        const deleteButton = authenticated && userHandle === userName ? (
            <DeleteChat chatId={chatId}/>
        ) : null;

        /*
        return (
            <div className={classes.chat}>
                 
                <div className={classes.chat_details}>
                    <h2>{userHandle}</h2>
                    <p>{body}</p>
                </div>
                {deleteButton}
                <p className={classes.chat_timestamp}>{dayjs(createdAt).fromNow()}</p>
                
            </div>

        ) */
        
        return(
            <Card className={classes.card}>
               
            <CardContent className={classes.content}>
                <Typography variant="h5" color="secondary" className={classes.username} >
                     {userHandle}
                </Typography>
              
                {deleteButton}
                <Typography variant="body1">{body}</Typography>
                <div className={classes.timeD} >
                <Typography variant="body2" align= "left" color="textSecondary">{dayjs(createdAt).fromNow()} </Typography>       
                </div>
            </CardContent>
        </Card>
        ) 
    } 
}

ShowChat.propTypes = {
    
    user: PropTypes.object.isRequired,
    chat: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired //styles

}

const mapStateToProps = (state) => {
    return { user: state.user };
}


//export default withStyles(styles)(ShowChat)
export default connect(mapStateToProps)(withStyles(styles)(ShowChat));
/*
<div className={classes.timeD} >
                <Typography variant="body2"  className={classes.timeD} align= "right" color="textSecondary">{dayjs(createdAt).fromNow()} </Typography>       
                </div>
*/