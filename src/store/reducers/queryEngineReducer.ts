import { Redux_Actions } from "../actions/types";

const initialState = {
  queryToRun: "",
  fetchingQueryResults: false,
  queryResults: [],
  queryHistory: [],
};

interface QueryLog {
  query: string;
  querySuccess: boolean;
  runAt: Date;
  timeTaken: number;
}
const historyLogMax = 50;
export interface QueryEngineState {
  queryToRun: string;
  fetchingQueryResults: boolean;
  queryResults: { [key: string]: string }[];
  queryFailed: boolean;
  errorMessage: string;
  queryHistory: QueryLog[];
}
export const queryEngineReducer = (state = initialState, action: any) => {
  const recentTenQueries: QueryLog[] = state.queryHistory.slice(
    -(historyLogMax - 1)
  );
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
        queryResults: action.payload.data,
        queryHistory: [
          {
            query: state.queryToRun,
            runAt: new Date(),
            querySuccess: true,
            timeTaken: action.payload.timeTaken,
          },
          ...recentTenQueries,
        ],
      };
    case Redux_Actions.SET_QUERY_FAILED:
      return {
        ...state,
        queryFailed: true,
        errorMessage: action.payload,
        fetchingQueryResults: false,
        queryHistory: [
          {
            query: state.queryToRun,
            runAt: new Date(),
            querySuccess: false,
            timeTaken: -1,
          },
          ...recentTenQueries,
        ],
      };
    default:
      return state;
  }
};
