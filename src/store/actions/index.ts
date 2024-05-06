import { Redux_Actions } from "./types";

export function initializeApp(): any {
  return { type: Redux_Actions.INITIALIZE_APP };
}
