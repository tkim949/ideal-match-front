
import {
    SET_PROFILES,
    SET_MEMBERS,
    LIKE_PROFILE,
    UNLIKE_PROFILE,
    LIKE_MEMBER,
    UNLIKE_MEMBER,
    LOADING_DATA,
    DELETE_PROFILE,
    POST_PROFILE,
    SET_PROFILE,
    SET_MEMBER,
    SET_CHATS,
    SET_CHAT,
    POST_CHAT,
    //SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    profiles: [],
    profile: {},
    members: [],
    member: {},
    chats: [],
    chat: {},
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
        case SET_CHATS:
        return {
          ...state,
          chats: action.payload,
          loading: false
        };
        case SET_MEMBERS:
          return {
            ...state,
          members: action.payload,
          loading: false
          };
        case SET_PROFILE:
          return {
            ...state,
            profile: action.payload
          };
        case SET_CHAT:
            return {
              ...state,
              chat: action.payload
            };
        case SET_MEMBER:
          return {
            ...state,
            member: action.payload
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
        case LIKE_MEMBER:
        case UNLIKE_MEMBER:
            let indexMem = state.members.findIndex(
              (member) => member.userName === action.payload.userName
            );
            state.members[indexMem] = action.payload;
            if (state.member.userName === action.payload.userName) {
              state.member = action.payload;
            }
            return {
              ...state
            };
      case DELETE_PROFILE:
        index = state.profiles.findIndex(
          (profile) => profile.profileId === action.payload
        );
        state.profiles.splice(index, 1); //get rid of one from the first one
        return {
          ...state
        };
      case POST_PROFILE:
        return {
          ...state,
          profiles: [action.payload, ...state.profiles]
        };
        case POST_CHAT:
          return {
            ...state,
            chats: [action.payload, ...state.chats]
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
  