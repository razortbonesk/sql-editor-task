import { all, call, delay, put, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { dataBaseUrls } from "./constants";
import { setDataSources } from "../../actions/dataSourceActions";
import { setAppLoader } from "../../actions/appLoaderActions";

function* fetchDataSource(urlObj: {
  url: string;
  name: string;
  dbName: string;
  dbType: string;
}) {
  const response: Response = yield call(fetch, urlObj.url);
  const data: Response = yield response.json();
  return {
    data,
    name: urlObj.name,
    dbName: urlObj.dbName,
    dbType: urlObj.dbType,
  };
}
export function* fetchAllDataSources() {
  // make parallel fetch calls to all data
  // sources and return the response
  const responses: Response[] = yield all(
    dataBaseUrls.map((urlObj) => fetchDataSource(urlObj))
  );
  yield put(setDataSources(responses));
  // delay for 1/2 second to show the loader to the user for smooth transition
  yield delay(800);
  yield put(setAppLoader(false));
}

export function* dataSourcesSaga() {
  // Add your sagas here
  yield takeLatest(Redux_Actions.INITIALIZE_APP, fetchAllDataSources);
}
