import { Redux_Actions } from "./types";

export const setAppLoader = (isLoading: boolean) => {
  return {
    type: Redux_Actions.SET_APP_LOADER,
    payload: isLoading,
  };
};
