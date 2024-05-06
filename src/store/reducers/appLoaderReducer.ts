import { Redux_Actions } from "../actions/types";

export interface AppLoaderState {
  loading: boolean;
}

export const appLoaderReducer = (state = { loading: true }, action: any) => {
  switch (action.type) {
    case Redux_Actions.SET_APP_LOADER:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};
