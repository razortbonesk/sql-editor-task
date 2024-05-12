import { Redux_Actions } from "../actions/types";

export interface DataSource {
  name: string;
  dbName: string;
  dbType: string;
  url: string;
  data: [{ [key: string]: any }];
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
