import { call, put, select, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { IAppState } from "../../reducers";
import { DataSource } from "../../reducers/datasourcesReducer";
import {
  setQueryFailed,
  setQueryResults,
} from "../../actions/queryEngineActions";
import { extractDatabaseTableName, flattenObject } from "../utils";

function* runSelectQueryOnTable(
  datasource: DataSource,
  filterFn?: (each: { [key: string]: any }) => boolean
) {
  try {
    const time = performance.now();
    const response: Response = yield call(fetch, datasource.url);
    const data: { [key: string]: any }[] = yield response.json();
    const flattenedData = (data || []).map(flattenObject);
    const filteredData = filterFn
      ? flattenedData.filter(filterFn)
      : flattenedData;
    const timeTaken = performance.now() - time;
    yield put(
      setQueryResults({
        data: filteredData,
        timeTaken,
      })
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
      const queryType = action.payload.split(" ")[0].toLowerCase();
      switch (queryType) {
        case "select":
          const whereClause = action.payload.split("where")[1];
          const filterFn = whereClause ? () => true : undefined;
          yield runSelectQueryOnTable(datasource, filterFn);
          return;
      }
    }
  }
  yield put(setQueryFailed("Query not supported"));
}

export function* queryEngineSagas() {
  yield takeLatest(Redux_Actions.FETCH_QUERY_RESULTS, fetchQueryResultsSaga);
}
