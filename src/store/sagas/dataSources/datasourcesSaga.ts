import { put, takeLatest } from "redux-saga/effects";
import { Redux_Actions } from "../../actions/types";
import { dataBaseUrls } from "./constants";
import { setDataSources } from "../../actions/dataSourceActions";
import { setAppLoader } from "../../actions/appLoaderActions";

export function* fetchAllDataSources() {
  const dataSources = dataBaseUrls.map((urlObj) => ({
    name: urlObj.name,
    dbName: urlObj.dbName,
    dbType: urlObj.dbType,
    url: urlObj.url,
  }));
  yield put(setDataSources(dataSources));
  yield put(setAppLoader(false));
}

export function* dataSourcesSaga() {
  // Add your sagas here
  yield takeLatest(Redux_Actions.INITIALIZE_APP, fetchAllDataSources);
}
