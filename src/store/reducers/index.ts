import { combineReducers } from "@reduxjs/toolkit";
import dataSourcesReducer, { DataSourceState } from "./datasourcesReducer";
import { AppLoaderState, appLoaderReducer } from "./appLoaderReducer";
import { QueryEngineState, queryEngineReducer } from "./queryEngineReducer";

export interface IAppState {
  // Add your state here
  dataSources: DataSourceState;
  appLoader: AppLoaderState;
  queryEngine: QueryEngineState;
}

export const appReducer = combineReducers({
  // Add your reducers here
  dataSources: dataSourcesReducer,
  appLoader: appLoaderReducer,
  queryEngine: queryEngineReducer,
});
