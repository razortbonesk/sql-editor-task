import { Redux_Actions } from "./types";

export const fetchQueryResults = (queryString: string) => {
  return {
    type: Redux_Actions.FETCH_QUERY_RESULTS,
    payload: queryString,
  };
};

export const setQueryResults = (results: any) => {
  return {
    type: Redux_Actions.SET_QUERY_RESULTS,
    payload: results,
  };
};

export const setQueryFailed = (errorMessage: string) => {
  return {
    type: Redux_Actions.SET_QUERY_FAILED,
    payload: errorMessage,
  };
};
