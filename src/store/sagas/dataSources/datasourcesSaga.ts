import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { dataBaseUrls } from "./constants";
import { setDataSources } from "../../actions/dataSourceActions";
import { setAppLoader } from "../../actions/appLoaderActions";

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
  // delay for 1 second to show the loader to the user for smooth transition
  yield delay(1000);
  yield put(setAppLoader(false));
}

export function* dataSourcesSaga() {
  // Add your sagas here
  yield takeLatest(Redux_Actions.INITIALIZE_APP, fetchAllDataSources);
}
