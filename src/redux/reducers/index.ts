import * as actions from "../actionTypes";
const reducer = (state: {} = {}, action: any) => {
  switch (action.type) {
    case actions.SEARCH_USERS_SUCCESS: {
      return {
        ...state,
        users: action.payload.users,
        loading: action.payload.loading,
      };
    }
    case actions.SEARCH_USERS_LOADING: {
      return {
        ...state,
        loading: action.payload.loading,
        users: { items: [], total_count: 0 },
      };
    }
    case actions.SEARCH_USERS_ERROR: {
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    }
    case actions.GET_USER_REPO_SUCCESS: {
      return {
        ...state,
        repos: action.payload.repos,
        loading: action.payload.loading,
      };
    }
    case actions.GET_USER_REPO_LOADING: {
      return {
        ...state,
        repos: [],
        loading: action.payload.loading,
      };
    }
    case actions.GET_USER_REPO_ERROR: {
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    }
    case actions.GET_USER_PROFILE_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        loading: action.payload.loading,
      };
    }
    case actions.GET_USER_PROFILE_LOADING: {
      return {
        ...state,
        user: {},
        loading: action.payload.loading,
      };
    }
    case actions.GET_USER_PROFILE_ERROR: {
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    }
    case actions.GET_REPO_READAME_FILE_SUCCESS: {
      return {
        ...state,
        fileData: action.payload.fileData,
        loading: action.payload.loading,
      };
    }
    case actions.GET_REPO_READAME_FILE_LOADING: {
      return {
        ...state,
        fileData: null,
        loading: action.payload.loading,
      };
    }
    case actions.GET_REPO_READAME_FILE_ERROR: {
      return {
        ...state,
        loading: action.payload.loading,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};
export default reducer;
