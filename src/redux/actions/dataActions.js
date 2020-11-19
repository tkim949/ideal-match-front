
import {
    LOADING_DATA,
    SET_PROFILES,
    SET_PROFILE,
    LIKE_PROFILE,
    UNLIKE_PROFILE,
    DELETE_PROFILE,
    POST_PROFILE,
    SET_MEMBERS,
    LIKE_MEMBER,
    UNLIKE_MEMBER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    STOP_LOADING_UI,
    SET_CHATS,
    //SET_CHAT,
    POST_CHAT,
    DELETE_CHAT,
    SET_OLIKES,
    SET_MESSAGES,
    POST_MESSAGE,
    SET_SMESSAGES,

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
  //get all users
  export const getMembers = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/users')
      .then((res) => {
        dispatch({
          type: SET_MEMBERS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_MEMBERS,
          payload: []
        });
      });
  };

  export const getChats = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/chats')
      .then((res) => {
        dispatch({
          type: SET_CHATS,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_CHATS,
          payload: []
        });
      });
  };

  export const getReceiveMsg = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/message')
      .then((res) => {
        dispatch({
          type: SET_MESSAGES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_MESSAGES,
          payload: []
        });
      });
  };


  export const getSentMsg = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/sent-message')
      .then((res) => {
        dispatch({
          type: SET_SMESSAGES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_SMESSAGES,
          payload: []
        });
      });
  };

  
  export const getOLikes = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
      .get('/like')
      .then((res) => {
        dispatch({
          type: SET_OLIKES,
          payload: res.data
        });
      })
      .catch((err) => {
        dispatch({
          type: SET_OLIKES,
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
  // Post a profile
  //https://stackoverflow.com/questions/51379356/axios-post-request-not-working
  /* const url = "https://us-central1-i-match-7689e.cloudfunctions.net/api/profile"
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify(newProfile)
    };
    fetch(url, options)*/
    /*let data = JSON.stringify(newProfile);

      headers: { 'content-type': 'application/json' },
      data
      //headers: { 'content-type': 'application/x-www-form-urlencoded' },
      //data: newProfile,  
    */
  export const postProfile = (newProfile) => (dispatch) => {
    
    dispatch({ type: LOADING_UI });
    
   const optionAX = {
      url: '/profile',
      method: 'POST',
      data: newProfile
  };
    axios(optionAX)
      .then((res) => {
        dispatch({
          type: POST_PROFILE,
          payload: res.data,
          
        });
        dispatch({ type: CLEAR_ERRORS });
        //dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
     
  };

  export const postChat = (newPost) => (dispatch) => {
    
    dispatch({ type: LOADING_UI });
    
   const optionAX = {
      url: '/chat',
      method: 'POST',
      data: newPost
  };
    axios(optionAX)
      .then((res) => {
        dispatch({
          type: POST_CHAT,
          payload: res.data,
          
        });
        dispatch({ type: CLEAR_ERRORS });
        //dispatch(clearErrors());
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      }); 
  };

  export const sendMessage = (newMsg, recipient) => (dispatch) => {
    
    dispatch({ type: LOADING_UI });
    
   const optionAX = {
      url: `/message/${recipient}`,
      method: 'POST',
      data: newMsg
  };
    axios(optionAX)
      .then((res) => {
        dispatch({
          type: POST_MESSAGE,
          payload: res.data,
          
        });
        dispatch({ type: CLEAR_ERRORS });
        //dispatch(clearErrors());
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

  export const likeMember = (userName) => (dispatch) => {
    axios
      .post(`/user/${userName}/like`)
      .then((res) => {
        dispatch({
          type: LIKE_MEMBER,
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

  //cancle like a member
  export const cancelLike = (userName) => (dispatch) => {
    axios
      .delete(`/user/${userName}/like`)
      .then((res) => {
        dispatch({
          type: UNLIKE_MEMBER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  export const deleteProfile = (profileId) => (dispatch) => {
    axios
      .delete(`/profile/${profileId}`)
      .then(() => {
        dispatch({ type: DELETE_PROFILE, payload: profileId });
      })
      .catch((err) => console.log(err));
  };

  export const deleteChat = (chatId) => (dispatch) => {
    axios
      .delete(`/chat/${chatId}`)
      .then(() => {
        dispatch({ type: DELETE_CHAT, payload: chatId });
      })
      .catch((err) => console.log(err));
  };
  //####handle
  export const getMemberData = (userHandle) => (dispatch) => {
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
  