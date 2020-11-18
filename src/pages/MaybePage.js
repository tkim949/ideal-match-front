import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import ShowChat from '../components/ShowChat';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostChat from '../components/PostChat';
//import { getProfiles } from '../redux/actions/dataActions';
import { getChats } from '../redux/actions/dataActions';

class MaybePage extends Component {


    componentDidMount() {
        //this.props.getProfiles();
        this.props.getChats();
    }

    render() {
        const { chats, loading } = this.props.data; //

        let recentChats = !loading ? ( 
            chats.map((chat, index) => (
                <ShowChat key={index} chat={chat} />
            ))) : (<p>Loading...</p>);

        return (
            <Grid container spacing={4}>
                <Grid item sm={8} xs={12}>
                    {recentChats}
                </Grid>
                <Grid item sm={4} xs={12}>
                   
                   <PostChat />
               </Grid>
            </Grid>
            
        )
    }
}
MaybePage.propTypes = {
    getChats: PropTypes.func.isRequired, //
    data: PropTypes.object.isRequired,
    
}

const mapStateToProps = (state) => {
    return { data: state.data };
}


export default connect(mapStateToProps, { getChats })(MaybePage); //
//export default MaybePage