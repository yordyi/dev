import { type AppState } from './types';

export type Subscribe = (
  listener: (state: AppState, prevState: AppState) => void,
) => () => void;
export type Handlers = Record<string, () => void>;

export type Store = {
  getState: () => AppState;
  getInitialState: () => AppState;
  setState: (stateSetter: (state: AppState) => AppState) => void;
  subscribe: Subscribe;
};
