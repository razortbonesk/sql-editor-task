import { Redux_Actions } from "../actions/types";

const initialState = {
  
};
export const queryEngineReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Redux_Actions.SET_QUERY_ENGINE:
      return {
        ...state,
        queryEngine: action.payload,
      };
    default:
      return state;
  }
};
