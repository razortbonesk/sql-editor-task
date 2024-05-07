import { delay, put, select, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { IAppState } from "../../reducers";
import { DataSource } from "../../reducers/datasourcesReducer";
import {
  setQueryFailed,
  setQueryResults,
} from "../../actions/queryEngineActions";

function* fetchQueryResultsSaga(action: any) {
  const existingDataSources: DataSource[] = yield select(
    (state: IAppState) => state.dataSources.dataSources
  );
  yield delay(1000);
  if (action.payload.toLowerCase() === "select * from customers") {
    const datasource = existingDataSources.find(
      (ds) => ds.name.toLowerCase() === "customers"
    );
    if (datasource && datasource.data) {
      const mappedData = datasource.data.map((eachData) => {
        const addressObj = eachData["address"];
        return {
          ...eachData,
          ...addressObj,
          address: undefined,
        };
      });
      yield put(setQueryResults(mappedData));
      return;
    }
  }
  if (action.payload.toLowerCase() === "select * from order_details") {
    const datasource = existingDataSources.find(
      (ds) => ds.name.toLowerCase() === "orders"
    );
    if (datasource && datasource.data) {
      yield put(setQueryResults(datasource.data));
      return;
    }
  }
  yield put(setQueryFailed("Query not found"));
}

export function* queryEngineSagas() {
  yield takeLatest(Redux_Actions.FETCH_QUERY_RESULTS, fetchQueryResultsSaga);
}
