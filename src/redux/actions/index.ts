import axios from "axios";
import {
  GET_REPO_READAME_FILE_ERROR,
  GET_REPO_READAME_FILE_SUCCESS,
  GET_USER_REPO_ERROR,
  GET_USER_REPO_SUCCESS,
  SEARCH_USERS_ERROR,
  SEARCH_USERS_SUCCESS,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  SEARCH_USERS_LOADING,
  GET_USER_PROFILE_LOADING,
  GET_REPO_READAME_FILE_LOADING,
  GET_USER_REPO_LOADING,
} from "../actionTypes";
const API_URL: string | undefined =
  process.env.REACT_APP_API_URL || "https://api.github.com";
const DATA_URL: string | undefined =
  process.env.REACT_APP_DATA_URL || "https://raw.githubusercontent.com";
export const GetSearchUsers = (
  search: string,
  pageNo: number,
  perPage: number
) => {
  return async (dispatch: any) => {
    dispatch({
      type: SEARCH_USERS_LOADING,
      payload: { loading: true },
    });
    axios
      .get(
        `${API_URL}/search/users?q=${search}&page=${pageNo}&per_page=${perPage}`
      )
      .then((response) => {
        dispatch({
          type: SEARCH_USERS_SUCCESS,
          payload: { users: response.data, loading: false },
        });
      })
      .catch((error) => {
        dispatch({
          type: SEARCH_USERS_ERROR,
          payload: { error: error.response.data.message, loading: false },
        });
      });
  };
};
export const GetUserRepos = (userId: string | undefined) => {
  return async (dispatch: any) => {
    dispatch({
      type: GET_USER_REPO_LOADING,
      payload: { loading: true },
    });
    axios
      .get(`${API_URL}/users/${userId}/repos`)
      .then((response) => {
        dispatch({
          type: GET_USER_REPO_SUCCESS,
          payload: { repos: response.data, loading: false },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_USER_REPO_ERROR,
          payload: { error: error.response.data.message, loading: false },
        });
      });
  };
};
export const GetUserProfile = (userId: string | undefined) => {
  return async (dispatch: any) => {
    dispatch({
      type: GET_USER_PROFILE_LOADING,
      payload: { loading: true },
    });
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          payload: { user: response.data, loading: false },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_USER_PROFILE_ERROR,
          payload: { error: error.response.data.message, loading: false },
        });
      });
  };
};
export const GetReposReadmeFile = (
  userId?: string,
  repoName?: string,
  defaultBranch?: string
) => {
  return async (dispatch: any) => {
    dispatch({
      type: GET_REPO_READAME_FILE_LOADING,
      payload: { loading: true },
    });
    axios
      .get(`${DATA_URL}/${userId}/${repoName}/${defaultBranch}/README.md`)
      .then((response) => {
        dispatch({
          type: GET_REPO_READAME_FILE_SUCCESS,
          payload: { fileData: response.data, loading: false },
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_REPO_READAME_FILE_ERROR,
          payload: { error: error.response.data.message, loading: false },
        });
      });
  };
};
