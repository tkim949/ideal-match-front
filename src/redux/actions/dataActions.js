
import {
    SET_PROFILES,
    LOADING_DATA,
    LIKE_PROFILE,
    UNLIKE_PROFILE,
    DELETE_PROFILE,
    SET_ERRORS,
    POST_PROFILE,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_PROFILE,
    STOP_LOADING_UI,
    //SUBMIT_COMMENT
  } from '../types';
  import axios from 'axios';
  
  // Get all PROFILEs
  export const getProfiles = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/profiles')
      .then((res) => {
        dispatch({
          type: SET_PROFILES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_PROFILES,
          payload: []
        });
      });
  };
  export const getProfile = (profileId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .get(`/profile/${profileId}`)
      .then((res) => {
        dispatch({
          type: SET_PROFILE,
          payload: res.data
        });
        dispatch({ type: STOP_LOADING_UI });
      })
      .catch((err) => console.log(err));
  };
  // Post a scream
  export const postProfile = (newProfile) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/profile', newProfile)
      .then((res) => {
        dispatch({
          type: POST_PROFILE,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  // Like a profile
  export const likeProfile = (profileId) => (dispatch) => {
    axios
      .post(`/profile/${profileId}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_PROFILE,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Unlike a profile
  export const unlikeProfile = (profileId) => (dispatch) => {
    axios
      .delete(`/profile/${profileId}/like`)
      .then((res) => {
        dispatch({
          type: UNLIKE_PROFILE,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  // Submit a comment
  /*
  export const submitComment = (screamId, commentData) => (dispatch) => {
    axios
      .post(`/scream/${screamId}/comment`, commentData)
      .then((res) => {
        dispatch({
          type: SUBMIT_COMMENT,
          payload: res.data
        });
        dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  }; */
  export const deleteProfile = (profileId) => (dispatch) => {
    axios
      .delete(`/profile/${profileId}`)
      .then(() => {
        dispatch({ type: DELETE_PROFILE, payload: profileId });
      })
      .catch((err) => console.log(err));
  };
  
  export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get(`/user/${userHandle}`)
      .then((res) => {
        dispatch({
          type: SET_PROFILES,
          payload: res.data.profiles
        });
      })
      .catch(() => {
        dispatch({
          type: SET_PROFILES,
          payload: null
        });
      });
  };
  
  export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  }; 
  