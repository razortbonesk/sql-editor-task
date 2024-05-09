import { delay, put, select, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { IAppState } from "../../reducers";
import { DataSource } from "../../reducers/datasourcesReducer";
import {
  setQueryFailed,
  setQueryResults,
} from "../../actions/queryEngineActions";
import { extractDatabaseTableName } from "../utils";

function* fetchQueryResultsSaga(action: any) {
  const existingDataSources: DataSource[] = yield select(
    (state: IAppState) => state.dataSources.dataSources
  );
  yield delay(500);
  const tableName = extractDatabaseTableName(action.payload);
  if (tableName) {
    const datasource = existingDataSources.find(
      (ds) => ds.name.toLowerCase() === tableName.toLowerCase()
    );
    if (datasource && datasource.data) {
      yield put(setQueryResults(datasource.data));
      return;
    }
  }
  yield put(setQueryFailed("Query not supported"));
}

export function* queryEngineSagas() {
  yield takeLatest(Redux_Actions.FETCH_QUERY_RESULTS, fetchQueryResultsSaga);
}
