import { call, put, select, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { IAppState } from "../../reducers";
import { DataSource } from "../../reducers/datasourcesReducer";
import {
  setQueryFailed,
  setQueryResults,
} from "../../actions/queryEngineActions";
import { extractDatabaseTableName, flattenObject } from "../utils";

function* runSelectQueryOnTable(datasource: DataSource) {
  try {
    const time = performance.now();
    const response: Response = yield call(fetch, datasource.url);
    const data: { [key: string]: any }[] = yield response.json();
    const timeTaken = performance.now() - time;
    yield put(
      setQueryResults({ data: (data || []).map(flattenObject), timeTaken })
    );
  } catch (e) {
    yield put(setQueryFailed("Failed to fetch data"));
  }
}

function* fetchQueryResultsSaga(action: any) {
  const existingDataSources: DataSource[] = yield select(
    (state: IAppState) => state.dataSources.dataSources
  );
  const tableName = extractDatabaseTableName(action.payload);
  if (tableName) {
    const datasource = existingDataSources.find(
      (ds) => ds.name.toLowerCase() === tableName.toLowerCase()
    );
    if (datasource) {
      yield runSelectQueryOnTable(datasource);
      return;
    }
  }
  yield put(setQueryFailed("Query not supported"));
}

export function* queryEngineSagas() {
  yield takeLatest(Redux_Actions.FETCH_QUERY_RESULTS, fetchQueryResultsSaga);
}
