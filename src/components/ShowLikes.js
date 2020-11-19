import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
//import "./Chat.css";
//import { Link } from 'react-router-dom';

//https://material-ui.com/components/cards/
import Card  from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SendMessage from './SendMessage';
//import { getReceiveMsg } from '../redux/actions/dataActions';
//import ShowMessage from './ShowMessage';

const styles = {
    
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 10,
    },
    
    content: {
        padding: 10,
        objectFit: 'cover',
    },
    sendMsgBtn: {
        left: '90%',
        top: '10%'
    }
};

class ShowLikes extends Component {
    //TypeError: this.props.getReceiveMsg is not a function
    /*
    componentDidMount() {
        //this.props.getProfiles();
        this.props.getReceiveMsg();
    }*/
    
    render() {
        
        const { classes, 
                       //messages,
                       oLike: {  handle,
                                   person,
                                  // likeId,
                                   },
                        user: { authenticated,
                               credentials: { userName }}
                        } = this.props;
        //let time = dayjs(classes.createdAt);
        
        const sendMsgBtn = authenticated && person === userName ? (
            <SendMessage handle={handle}/>
        ) : null;

        //let recentMsg = messages.map((message, index) => (
        //       <ShowMessage key={index} message={message}/> ));

        //https://www.debuggr.io/react-map-of-undefined/
        return(
            <Card className={classes.card}>
               
            <CardContent className={classes.content}>
                <Typography variant="h5" color="secondary" className={classes.username} >
                    {handle}
                </Typography>
               {sendMsgBtn}
               <hr/>
               
            </CardContent>
            
        </Card>
        ) 
    } 
}

/*
<CardContent>
            {messages && messages.map((message, index) => (
               <ShowMessage key={index} message={message}/> ))}
            </CardContent>
*/

ShowLikes.propTypes = {
  //  getReceiveMsg: PropTypes.func.isRequired, 
    user: PropTypes.object.isRequired,
    oLike: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired //styles

}

const mapStateToProps = (state) => {
    return { user: state.user };
}


//export default withStyles(styles)(ShowLikes)
export default connect(mapStateToProps)(withStyles(styles)(ShowLikes));
//{ getReceiveMsg }