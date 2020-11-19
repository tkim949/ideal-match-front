import { React, Component } from 'react';
import { Grid } from '@material-ui/core';
//import ProfileForm from '../components/PostProfile';
import UserProfile from '../components/UserProfile';
import ShowLikes from '../components/ShowLikes';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getOLikes } from '../redux/actions/dataActions';

class AccountPage extends Component {

    componentDidMount() {
        //this.props.getProfiles();
        this.props.getOLikes();
    };

    //getOlikes =() => {
    //    this.props.getOLikes();
    //}

    render() {
        const { oLikes, loading } = this.props.data; //
        const { user: { authenticated}} = this.props;

        let recentLikes = !loading ? ( authenticated ? (
            oLikes.map((oLike, index) => (
                <ShowLikes key={index} oLike={oLike} />
            ))): (<p></p>)) : (<p>Loading...</p>);

    return (

        <Grid container spacing={4}>
                <Grid item sm={6} xs={12}>  
                <UserProfile />
                </Grid>
                <Grid item sm={6} xs={12}>
                <h3>Here are people who gave you a like. Awesome! Isn't it? Want to send a message?</h3>
                    {recentLikes}
               </Grid>
            </Grid>
        
    )
    }
}
AccountPage.propTypes = {
    getOLikes: PropTypes.func.isRequired, //
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    //authenticated: PropTypes.bool.isRequired
    
}

const mapStateToProps = (state) => {
    return { data: state.data , user: state.user};
}


export default connect(mapStateToProps, { getOLikes })(AccountPage); //