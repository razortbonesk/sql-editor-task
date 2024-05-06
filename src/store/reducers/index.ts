import { combineReducers } from "@reduxjs/toolkit";
import dataSourcesReducer from "./datasourcesReducer";

export const appReducer = combineReducers({
  // Add your reducers here
  dataSourcesReducer,
});
