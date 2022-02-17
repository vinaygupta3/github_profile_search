import * as actions from "../actionTypes";
const reducer = (state: {} = {}, action: any) => {
  switch (action.type) {
    case actions.SEARCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload,
      };
    }
    case actions.GET_USER_REPO_SUCCESS: {
      return {
        ...state,
        repos: action.payload,
      };
    }
    case actions.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case actions.GET_REPO_READAME_FILE_SUCCESS: {
      return {
        ...state,
        fileData: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
