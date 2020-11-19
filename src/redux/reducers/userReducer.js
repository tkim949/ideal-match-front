
import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    //LIKE_PROFILE,
    //UNLIKE_PROFILE,
    LIKE_MEMBER,
    UNLIKE_MEMBER,
    //MARK_NOTIFICATIONS_READ
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    //likes: [],
    mLikes: []
    //notifications: []
  };
  //https://github.com/benmosher/eslint-plugin-import/blob/v2.22.1/docs/rules/no-anonymous-default-export.md
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case SET_AUTHENTICATED:
        return {
          ...state,
          authenticated: true
        };
      case SET_UNAUTHENTICATED:
        return initialState;
      case SET_USER:
        return {
          authenticated: true,
          loading: false,
          ...action.payload
        };
      case LOADING_USER:
        return {
          ...state,
          loading: true
        };
       /*case LIKE_PROFILE:
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              handle: state.credentials.handle, //userHandle########
              profileId: action.payload.profileId
            }
          ]
        };
      case UNLIKE_PROFILE:
        return {
          ...state,
          likes: state.likes.filter(
            (like) => like.profileId !== action.payload.profileId
          )
        };*/
      case LIKE_MEMBER:
        return {
          ...state,
          mLikes: [
            ...state.mLikes,
            {
              handle: state.credentials.userName, //userHandle########
              person: action.payload.userName
            }
          ]
        };
      case UNLIKE_MEMBER:
        return {
          ...state,
          mLikes: state.mLikes.filter(
            (mLike) => mLike.person !== action.payload.userName
          )
        };
      default:
        return state;
    }
  }
  