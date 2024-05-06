import { Redux_Actions } from "./types";

export const setDataSources = (data: any) => {
  return {
    type: Redux_Actions.SET_DATASOURCES,
    payload: data,
  };
};
