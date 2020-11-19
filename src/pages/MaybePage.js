import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ShowChat from '../components/ShowChat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostChat from '../components/PostChat';
//import { getProfiles } from '../redux/actions/dataActions';
import { getChats } from '../redux/actions/dataActions';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

class MaybePage extends Component {


    componentDidMount() {
        //this.props.getProfiles();
        this.props.getChats();
    }

    //getChats = () => {
     //   this.props.getChats();
   // }

    render() {
        const { chats, loading } = this.props.data; //
        const { user: { authenticated }} = this.props;

        let recentChats = !loading ? ( authenticated ? (
            chats.map((chat, index) => (
                <ShowChat key={index} chat={chat} />
            ))) 
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

        return (
            <Grid container spacing={4}>
                <Grid item sm={7} xs={12}>
                    {recentChats}
                </Grid>
                <Grid item sm={5} xs={12}> 
                <h3>Leave a short message to people. You can delete it anytime!</h3>
                   <PostChat />
               </Grid>
            </Grid>
            
        )
    }
}
MaybePage.propTypes = {
    getChats: PropTypes.func.isRequired, //
    data: PropTypes.object.isRequired,
    //authenticated: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    
}

const mapStateToProps = (state) => {
    return { data: state.data, user: state.user };
}


export default connect(mapStateToProps, { getChats })(MaybePage); //
//export default MaybePage