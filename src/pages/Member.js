import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Profile from '../components/Profile';
import MemberProfile from '../components/MemberProfile';
//import StaticProfile from '../components/profile/StaticProfile';
import Grid from '@material-ui/core/Grid';

//import ScreamSkeleton from '../util/ScreamSkeleton';
//import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import { getMemberData } from '../redux/actions/dataActions';

class Member extends Component {
  state = {
    profile: null,
    //profileIdParam: null
  };
  componentDidMount() {
    const handle = this.props.match.params.handle;
    //const profileId = this.props.match.params.profileId;
    //if (profileId) this.setState({ profleIdParam: profileId });

    this.props.getMemberData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
           profile: res.data.user
        });
      })
      .catch((err) => console.log(err));
  }
  render() {
    const { profiles, loading } = this.props.data;
    //const { profileIdParam } = this.state;

    const profileShow = loading ? (
      <p> Loading data...</p>
    ) : profiles === null ? (
      <p>No profile from this member</p>
    ) : (
      profiles.map((profile) => <Profile key={profile.profileId} profile={profile} />)
    ) 

    return (
      <Grid container spacing={8}>
        <Grid item sm={8} xs={12}>
          {profileShow}
        </Grid>
        <Grid item sm={4} xs={12}>
          {this.state.profile === null ? (
              <p>Loading profile...</p>
          ) : (<MemberProfile profile={this.state.profile} />)}
            
        </Grid>
      </Grid>
    );
  }
}

Member.propTypes = {
  getMemberData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return { data: state.data };
};

export default connect(mapStateToProps,{ getMemberData })(Member);