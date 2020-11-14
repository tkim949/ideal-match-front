
import {
    SET_USER,
    SET_AUTHENTICATED,
    SET_UNAUTHENTICATED,
    LOADING_USER,
    LIKE_PROFILE,
    UNLIKE_PROFILE,
    //MARK_NOTIFICATIONS_READ
  } from '../types';
  
  const initialState = {
    authenticated: false,
    loading: false,
    credentials: {},
    likes: [],
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
    case LIKE_PROFILE:
        return {
          ...state,
          likes: [
            ...state.likes,
            {
              userHandle: state.credentials.handle,
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
        };
      /*case MARK_NOTIFICATIONS_READ:
        state.notifications.forEach((not) => (not.read = true));
        return {
          ...state
        }; */
      default:
        return state;
    }
  }
  