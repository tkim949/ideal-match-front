
import {
    SET_PROFILES,
    LIKE_PROFILE,
    UNLIKE_PROFILE,
    LOADING_DATA,
    DELETE_PROFILE,
    POST_PROFILE,
    SET_PROFILE,
    //SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    profiles: [],
    profile: {},
    loading: false
  };
  
  export default function dataReducer(state = initialState, action) {
    switch (action.type) {
      case LOADING_DATA:
        return {
          ...state,
          loading: true
        };
      case SET_PROFILES:
        return {
          ...state,
          profiles: action.payload,
          loading: false
        };
      case SET_PROFILE:
        return {
          ...state,
          profile: action.payload
        };
      case LIKE_PROFILE:
      case UNLIKE_PROFILE:
        let index = state.profiles.findIndex(
          (profile) => profile.profileId === action.payload.profileId
        );
        state.profiles[index] = action.payload;
        if (state.profile.profileId === action.payload.profileId) {
          state.profile = action.payload;
        }
        return {
          ...state
        };
      case DELETE_PROFILE:
        index = state.profiles.findIndex(
          (profile) => profile.profileId === action.payload
        );
        state.profiles.splice(index, 1);
        return {
          ...state
        };
      case POST_PROFILE:
        return {
          ...state,
          profiles: [action.payload, ...state.profiles]
        };
     /* case SUBMIT_COMMENT:
        return {
          ...state,
          scream: {
            ...state.scream,
            comments: [action.payload, ...state.scream.comments]
          }
        }; */
      default:
        return state;
    }
  }
  