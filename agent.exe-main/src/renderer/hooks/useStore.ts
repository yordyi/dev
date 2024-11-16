import { createUseStore } from 'zutron';
import type { AppState } from '../../main/store/types';

export const useStore = createUseStore<AppState>(window.zutron);
