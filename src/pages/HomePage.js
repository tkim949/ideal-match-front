import React, { Component } from 'react';
//https://material-ui.com/components/grid/
import { Grid } from '@material-ui/core';

//npm install --save axios //to fetch the data from firebase
//import axios from 'axios';

import Profile from '../components/Profile';
import Detail from '../components/Detail';

//connect react
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../redux/actions/dataActions';



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
        this.props.getProfiles();
    }

    /*///
    state = {
        profiles: null
    }*///

   
    

    render() {

        const { profiles, loading } = this.props.data;
        let recentProf = !loading ? (
            profiles.map((profile, index) => (
                <Profile key={index} profile={profile} />
            ))) : (<p>Loading...</p>);
        

        /*
        //https://reactjs.org/docs/lists-and-keys.html#keys
        let recentProf = this.state.profiles ? (
              this.state.profiles.map((profile, index) => <Profile key={index} profile={profile} />
            )) : (<p>Loading...</p>);
        */
        return (
            <Grid container spacing={10}>
                <Grid item sm={8} xs={12}>
                    {recentProf}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Detail/>
               </Grid>
            </Grid>
        )
    }
}

HomePage.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    data: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return { data: state.data };
}

//export default HomePage;
export default connect(mapStateToProps, { getProfiles })(HomePage);