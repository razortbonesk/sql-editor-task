import { Redux_Actions } from "../actions/types";

interface DataSource {
  id: string;
  name: string;
  type: string;
  url: string;
  username: string;
  password: string;
}

const initialState = {
  dataSources: [],
};

export interface DataSourceState {
  dataSources: DataSource[];
}

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
