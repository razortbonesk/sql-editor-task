import { Redux_Actions } from "../actions/types";

const initialState = {
  queryToRun: "",
  fetchingQueryResults: false,
  queryResults: [],
};

export interface QueryEngineState {
  queryToRun: string;
  fetchingQueryResults: boolean;
  queryResults: { [key: string]: string }[];
  queryFailed: boolean;
  errorMessage: string;
}
export const queryEngineReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Redux_Actions.FETCH_QUERY_RESULTS:
      return {
        ...state,
        queryResults: [],
        fetchingQueryResults: true,
        queryToRun: action.payload,
        queryFailed: false,
        errorMessage: "",
      };
    case Redux_Actions.SET_QUERY_RESULTS:
      return {
        ...state,
        queryFailed: false,
        errorMessage: "",
        fetchingQueryResults: false,
        queryResults: action.payload,
      };
    case Redux_Actions.SET_QUERY_FAILED:
      return {
        ...state,
        queryFailed: true,
        errorMessage: action.payload,
        fetchingQueryResults: false,
      };
    default:
      return state;
  }
};
