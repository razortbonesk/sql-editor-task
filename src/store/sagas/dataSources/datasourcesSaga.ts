import { all, call, put, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { dataBaseUrls } from "./constants";
import { setDataSources } from "../../actions/dataSourceActions";

function* fetchDataSource(url: string) {
  const response: Response = yield call(fetch, url);
  const data: Response = yield response.json();
  return data;
}
export function* fetchAllDataSources() {
  // make parallel fetch calls to all data
  // sources and return the response
  const responses: Response[] = yield all(
    dataBaseUrls.map((urlObj) => fetchDataSource(urlObj.url))
  );
  yield put(setDataSources(responses));
}

export function* dataSourcesSaga() {
  // Add your sagas here
  yield takeLatest(Redux_Actions.INITIALIZE_APP, fetchAllDataSources);
}
