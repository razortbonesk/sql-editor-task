import { combineReducers } from "@reduxjs/toolkit";
import dataSourcesReducer, { DataSourceState } from "./datasourcesReducer";
import { AppLoaderState, appLoaderReducer } from "./appLoaderReducer";
import { queryEngineReducer } from "./queryEngineReducer";

export interface IAppState {
  // Add your state here
  dataSources: DataSourceState;
  appLoader: AppLoaderState;
}

export const appReducer = combineReducers({
  // Add your reducers here
  dataSources: dataSourcesReducer,
  appLoader: appLoaderReducer,
  queryEngine: queryEngineReducer,
});
