import { dataSourcesSaga } from "./dataSources/datasourcesSaga";
import { fork } from "redux-saga/effects";

export function* appSagas() {
  // Add your sagas here
  yield fork(dataSourcesSaga);
}
