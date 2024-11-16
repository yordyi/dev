import { createStore } from 'zustand/vanilla';
import { createDispatch } from 'zutron/main';
import { AppState } from './types';
import { runAgent } from './runAgent';

export const store = createStore<AppState>((set, get) => ({
  instructions: 'find flights from seattle to sf for next tuesday to thursday',
  fullyAuto: true, // renamed and changed default to true
  running: false,
  error: null,
  runHistory: [],
  RUN_AGENT: async () => runAgent(set, get),
  STOP_RUN: () => set({ running: false }),
  SET_INSTRUCTIONS: (instructions) => set({ instructions }),
  SET_FULLY_AUTO: (fullyAuto) => {
    // renamed from SET_HUMAN_SUPERVISED
    set({ fullyAuto: fullyAuto ?? true }); // changed default to true
  },
  CLEAR_HISTORY: () => set({ runHistory: [] }),
}));

export const dispatch = createDispatch(store);
