import { dataSourcesSaga } from "./dataSources/datasourcesSaga";
import { fork } from "redux-saga/effects";
import { queryEngineSagas } from "./queryEngine/queryEngineSagas";

export function* appSagas() {
  // Add your sagas here
  yield fork(queryEngineSagas);
  yield fork(dataSourcesSaga);
}
