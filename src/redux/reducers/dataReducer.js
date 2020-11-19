
import {
    SET_PROFILES,
    LIKE_PROFILE,
    UNLIKE_PROFILE,
    DELETE_PROFILE,
    POST_PROFILE,
    SET_PROFILE,
    SET_MEMBERS,
    SET_MEMBER,
    LIKE_MEMBER,
    UNLIKE_MEMBER,
    LOADING_DATA,
    SET_CHATS,
    SET_CHAT,
    POST_CHAT,
    DELETE_CHAT,
    SET_OLIKES,
    SET_OLIKE,
    SET_MESSAGES,
    SET_MESSAGE,
    POST_MESSAGE,
    SET_SMESSAGES,
    SET_SMESSAGE,
    //SUBMIT_COMMENT
  } from '../types';
  
  const initialState = {
    profiles: [],
    profile: {},
    members: [],
    member: {},
    chats: [],
    chat: {},
    oLikes:[],
    oLike: {},
    messages: [],
    message: {},
    smessages: [],
    smessage: {},
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
        case SET_MESSAGES:
          return {
            ...state,
            messages: action.payload,
            loading: false
        };
        case SET_SMESSAGES:
          return {
            ...state,
            smessages: action.payload,
            loading: false
        };
        case SET_MEMBERS:
          return {
            ...state,
          members: action.payload,
          loading: false
          };
        case SET_OLIKES:
          return {
            ...state,
          oLikes: action.payload,
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
        case SET_MESSAGE:
            return {
              ...state,
              message: action.payload
            };
        case SET_SMESSAGE:
              return {
                ...state,
                smessage: action.payload
              };
        case SET_OLIKE:
          return {
            ...state,
            oLike: action.payload
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
      case DELETE_CHAT:
          let indexC = state.chats.findIndex(
            (chat) => chat.chatId === action.payload
          );
          state.chats.splice(indexC , 1); //get rid of one from the first one
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
      case POST_MESSAGE:
            return {
              ...state,
              messages: [action.payload, ...state.messages]
            };
      default:
        return state;
    }
  }
  