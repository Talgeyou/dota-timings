import { OverlayConfig } from '~/overlay-config';
import { ElectronHandler } from '~/main/preload';
import {
  AppDispatch as StoreAppDispatch,
  RootState as StoreRootState,
} from './app/store';

declare global {
  // eslint-disable-next-line no-unused-vars
  interface Window {
    electron: ElectronHandler;
    overlayConfig: OverlayConfig;
  }

  type RootState = StoreRootState;
  type AppDispatch = StoreAppDispatch;
}

export {};
