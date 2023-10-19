import { configureStore } from '@reduxjs/toolkit';
import dotaDataReducer from '../shared/lib/dota-data';
import overlayConfigReducer from '../shared/lib/overlay-config';

export const store = configureStore({
  reducer: {
    dotaData: dotaDataReducer,
    overlayConfig: overlayConfigReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
