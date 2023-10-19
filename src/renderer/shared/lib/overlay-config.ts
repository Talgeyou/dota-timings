import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { OverlayConfig } from '../../../overlay-config';

type OverlayConfigState = {
  status: 'idle' | 'loaded';
  data: OverlayConfig;
};

const initialState: OverlayConfigState = {
  data: {},
  status: 'idle',
};

export const overlayConfigSlice = createSlice({
  name: 'overlay-config',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<OverlayConfig>) => {
      state.data = action.payload;
      state.status = 'loaded';
    },
  },
});

export const { setConfig } = overlayConfigSlice.actions;

export function createWidgetSelector(key: string) {
  // eslint-disable-next-line  no-undef
  return function selectWidget(state: RootState) {
    return state.overlayConfig.data.widgets?.find(
      (widget) => widget.key === key,
    );
  };
}

// eslint-disable-next-line  no-undef
export function selectOverlayConfigTheme(state: RootState) {
  return state.overlayConfig.data.theme;
}

// eslint-disable-next-line  no-undef
export function selectOverlayConfigStatus(state: RootState) {
  return state.overlayConfig.status;
}

export default overlayConfigSlice.reducer;
