import * as actions from "../actionTypes";
interface GetUsersAction {
  type: actions.SEARCH_USERS_SUCCESS;
  payload: {};
}
interface GetReposActions {
  type: actions.GET_REPOS;
  payload: {};
}
interface GetRadameActions {
  type: actions.GET_READAME;
  payload: string;
}
export type Action = GetUsersAction | GetReposActions | GetRadameActions;
