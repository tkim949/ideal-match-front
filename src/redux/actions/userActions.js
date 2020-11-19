
import {
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_UNAUTHENTICATED,
    SET_AUTHENTICATED,
    LOADING_USER,
    //MARK_NOTIFICATIONS_READ
  } from '../types';
  import axios from 'axios';

 
export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER })
  axios.get('/user')
    .then(res => {
        dispatch({
            type: SET_USER,
            payload: res.data, //payload is a data that we send reducer

        })
    })
    .catch(err => console.log(err));
};


export const loginUser = (userData, history) => (dispatch) => {
      dispatch({ type: LOADING_UI });
      const optionAX = {
        url: '/login',
        method: 'POST',
        data: userData
    };
    axios(optionAX)
        .then(res => {
            console.log(res.data);
            
            localStorage.setItem('FBToken', `Bearer ${res.data.token}`); //it will be used in App.js file
            axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            dispatch({ type: SET_AUTHENTICATED});
            dispatch(getUserData()); 
            //first get user data, which is from profiles!
            dispatch({ type: CLEAR_ERRORS});
            history.push('/'); //to the homepage/redirect 
        })
        .catch((err) => {
          dispatch({
            type: SET_ERRORS,
            payload: err.response.data
            })
        })

  };

  //delete token, so a user can logout!
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  }; 

export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    const optionAX = {
        url: '/signup',
        method: 'POST',
        data: newUserData
    };
    axios(optionAX)
        .then(res => {
           localStorage.setItem('FBToken', `Bearer ${res.data.token}`); //it will be used in App.js file
           axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            dispatch({ type: SET_AUTHENTICATED});
            dispatch(getUserData()); //first get user data
            dispatch({ type: CLEAR_ERRORS });
            history.push('/'); //redirect!
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            });
        });
  };

  
export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user/image', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };

  
export const editUserDetails = (profileDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user', profileDetails)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };

export const clearErrorsU = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
  }; 

  /*
  export const loginUser = (userData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/login', userData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const signupUser = (newUserData, history) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios
      .post('/signup', newUserData)
      .then((res) => {
        setAuthorizationHeader(res.data.token);
        dispatch(getUserData());
        dispatch({ type: CLEAR_ERRORS });
        history.push('/');
      })
      .catch((err) => {
        dispatch({
          type: SET_ERRORS,
          payload: err.response.data
        });
      });
  };
  
  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({ type: SET_UNAUTHENTICATED });
  };
  
  export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .get('/user')
      .then((res) => {
        dispatch({
          type: SET_USER,
          payload: res.data
        });
      })
      .catch((err) => console.log(err));
  };
  
  export const uploadImage = (formData) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user/image', formData)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };
  
  export const editUserDetails = (userDetails) => (dispatch) => {
    dispatch({ type: LOADING_USER });
    axios
      .post('/user', userDetails)
      .then(() => {
        dispatch(getUserData());
      })
      .catch((err) => console.log(err));
  };
  
  */