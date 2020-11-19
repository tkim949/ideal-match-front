import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ShowMessage from '../components/ShowMessage';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import PostChat from '../components/PostChat';
import { getReceiveMsg } from '../redux/actions/dataActions';
//import { getSentMsg } from '../redux/actions/dataActions';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

class MatchPage extends Component {


    componentDidMount() {
        //this.props.getProfiles();
        this.props.getReceiveMsg();
        
    }

    //getChats = () => {
     //   this.props.getChats();
   // }

    render() {
        const { messages, loading } = this.props.data; //
        const { user: { credentials: { userName},
                       authenticated }
                } = this.props;

        let recentMsgs = !loading ? ( 
            authenticated ? (
                messages ? (messages.filter(msg => msg.recipient === userName).map((message, index) => (
                            <ShowMessage key={index} message={message} />
                            ))) 
                        : (<p>No receive messages</p>)) 
               : (
                    <Paper className="paper">
                    <p>You are not logged in. Go to login/signup!</p>
                    <div className="button">
                    <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/login"
                    >
                    Login
                    </Button>
                    </div>
                    <br/>
                    <div>
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
            ))
            : (<p>Loading...</p>);
        
        let recentSent = 
            !loading ? ( 
            authenticated ? (
                messages ? (messages.filter(msg => msg.userHandle === userName).map((message, index) => (
                            <ShowMessage key={index} message={message} />
                            ))) 
                        : (<p>No sent messages</p>)) 
                : (<p></p>))
            : (<p>Loading...</p>)

        return (
            <Grid container spacing={4}>
                <Grid item sm={6} xs={12}>
                    <h3>Received Messages from people who you gave a like!</h3>
                     {recentMsgs}
                </Grid>
                <Grid item sm={6} xs={12}> 
                   <h3>Sent Messages to people who gave you a like!</h3>
                    {recentSent}
                   
               </Grid>
            </Grid>
            
        )
    }
}
MatchPage.propTypes = {
    getReceiveMsg: PropTypes.func.isRequired,  
    data: PropTypes.object.isRequired,
    //authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    
}

const mapStateToProps = (state) => {
    return { data: state.data, user: state.user };
}


export default connect(mapStateToProps, { getReceiveMsg })(MatchPage); //
//export default MaybePage