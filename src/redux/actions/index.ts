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
} from "../actionTypes";
const API_URL: string | undefined =
  process.env.REACT_APP_API_URL || "https://api.github.com";
const DATA_URL: string | undefined =
  process.env.REACT_APP_DATA_URL || "https://raw.githubusercontent.com";
export const GetSearchUsers = (search: string) => {
  return async (dispatch: any) => {
    axios
      .get(`${API_URL}/search/users?q=${search}`)
      .then((response) => {
        dispatch({ type: SEARCH_USERS_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: SEARCH_USERS_ERROR,
          payload: { message: error.message },
        });
        alert(error.message);
      });
  };
};
export const GetUserRepos = (userId: string | undefined) => {
  return async (dispatch: any) => {
    axios
      .get(`${API_URL}/users/${userId}/repos`)
      .then((response) => {
        dispatch({
          type: GET_USER_REPO_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_USER_REPO_ERROR,
          payload: { message: error.message },
        });
        // alert(error.message);
      });
  };
};
export const GetUserProfile = (userId: string | undefined) => {
  return async (dispatch: any) => {
    axios
      .get(`${API_URL}/users/${userId}`)
      .then((response) => {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_USER_PROFILE_ERROR,
          payload: { message: error.message },
        });
        // alert(error.message);
      });
  };
};
export const GetReposReadmeFile = (
  userId?: string,
  repoName?: string,
  defaultBranch?: string
) => {
  return async (dispatch: any) => {
    axios
      .get(`${DATA_URL}/${userId}/${repoName}/${defaultBranch}/README.md`)
      .then((response) => {
        dispatch({
          type: GET_REPO_READAME_FILE_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: GET_REPO_READAME_FILE_ERROR,
          payload: { message: error.message },
        });
        // alert(error.message);
      });
  };
};
