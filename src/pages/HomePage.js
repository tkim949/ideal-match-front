import React, { Component } from 'react';
//https://material-ui.com/components/grid/
import { Grid } from '@material-ui/core';

//npm install --save axios //to fetch the data from firebase
//import axios from 'axios';
import Members from '../components/Members';
import InOrOut from '../components/InOrOut';
import PhotoGallery from '../components/PhotoGal';

//connect react
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//import { getProfiles } from '../redux/actions/dataActions';
import { getMembers } from '../redux/actions/dataActions';


class HomePage extends Component {
    /*
    constructor(props) {
        super(props);
        this.state = {
            profiles: null
        }
    }
     //rm -r package-lock.json node_modules
    //https://github.com/facebook/create-react-app/issues/5103
    
    componentDidMount() {
        axios.get(`/profiles/`)
        //fetch('/profiles', {method: 'GET'})
            .then(res => {
                console.log(res.data) 
                this.successShow(res)
             //   this.setState({
             //       profiles: res.data
             //   }) 
            })
            .catch(err => console.log(err));
    };  

    successShow(res) {
        this.setState({
            profiles: res.data
        });
    }
    */

    componentDidMount() {
        //this.props.getProfiles();
        this.props.getMembers();
    }

   //getMembers =() => {
   //     this.props.getMembers();
    //}

    handleLogout = () => {
        this.props.logoutUser();
    }

    /*///
    state = {
        profiles: null
    }*///

    render() {

        const { members, loading } = this.props.data; //
        const { user: { authenticated}} = this.props;
        console.log(authenticated);
        let recentProf = !loading ? ( 
            authenticated ? (
            members.map((member, index) => (
                <Members key={index} member={member} />
            ))) : (<PhotoGallery />)) : (<p>Loading...</p>);

         /*
         profiles.map((profile, index) => (
                <Profile key={index} profile={profile} />
         */
        

        /*
        //https://reactjs.org/docs/lists-and-keys.html#keys
        let recentProf = this.state.profiles ? (
              this.state.profiles.map((profile, index) => <Profile key={index} profile={profile} />
            )) : (<p>Loading...</p>);
        */
        return (
            <Grid container spacing={4}>
                <Grid item sm={9} xs={12}>
                    {recentProf}
                </Grid>
                <Grid item sm={3} xs={12}>
                   
                    <InOrOut />
               </Grid>
            </Grid>
        )
    }
}

HomePage.propTypes = {
    getMembers: PropTypes.func.isRequired, //
    data: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    //authenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
    return { data: state.data, user: state.user };
}

//export default HomePage;
export default connect(mapStateToProps, { getMembers })(HomePage); //