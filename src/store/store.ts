import { createStore } from "redux";
import { reducer } from "./reducer";

export type Store = typeof store;
export type Reducer = typeof reducer;
export type State = ReturnType<Reducer>;

export const store = createStore(reducer);
