import createSagaMiddleware from "redux-saga";
import { appSagas } from "../sagas/index";
import { appReducer } from ".";
import { configureStore } from "@reduxjs/toolkit";
import { initializeApp } from "../actions";

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];
// Mount it on the Store
export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middleware),
});

export const runMiddleWare = () => {
  // Then run the saga
  sagaMiddleware.run(appSagas);
  store.dispatch(initializeApp());
};
