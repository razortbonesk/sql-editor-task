import { Redux_Actions } from "../actions/types";

const initialState = {
  dataSources: [],
};

const dataSourcesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case Redux_Actions.SET_DATASOURCES:
      return {
        ...state,
        dataSources: action.payload,
      };
    default:
      return state;
  }
};

export default dataSourcesReducer;
