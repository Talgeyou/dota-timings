import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { DotaEventKey, DotaMapGameState, DotaNewData } from '../../../types';

type DotaDataState = {
  lastRoshanKillTiming?: number;
  lastAegisPickedUpTiming?: number;
  gameState?: DotaMapGameState;
  currentClockTime?: number;
  currentGameTime?: number;
  heroId?: number;
  gpm?: number;
  xpm?: number;
};

const initialState: DotaDataState = {};

export const dotaDataSlice = createSlice({
  name: 'dota-new-data',
  initialState,
  reducers: {
    setNewData: (state, action: PayloadAction<DotaNewData>) => {
      if (
        action.payload.map?.game_state &&
        action.payload.map.game_state !== DotaMapGameState.GameInProgress
      ) {
        return initialState;
      }

      const newRoshanKillTiming = action.payload.events.find(
        (event) => event.event_type === DotaEventKey.RoshanKilled,
      )?.game_time;

      if (newRoshanKillTiming) {
        state.lastRoshanKillTiming = newRoshanKillTiming;
      }

      const newAegisPickedUpTiming = action.payload.events.find(
        (event) => event.event_type === DotaEventKey.AegisPickedUp,
      )?.game_time;

      if (newAegisPickedUpTiming) {
        state.lastAegisPickedUpTiming = newAegisPickedUpTiming;
      }
      state.gpm = action.payload.player?.gpm;
      state.xpm = action.payload.player?.xpm;
      state.currentClockTime = action.payload.map?.clock_time;
      state.currentGameTime = action.payload.map?.game_time;
      state.heroId = action.payload.hero?.id;
      state.gameState = action.payload.map?.game_state;
    },
  },
});

export const { setNewData } = dotaDataSlice.actions;

// eslint-disable-next-line  no-undef
export function selectLastRoshanKillTiming(state: RootState) {
  return state.dotaData.lastRoshanKillTiming;
}

// eslint-disable-next-line  no-undef
export function selectLastAegisPickedUpTiming(state: RootState) {
  return state.dotaData.lastAegisPickedUpTiming;
}

// eslint-disable-next-line no-undef
export function selectGameState(state: RootState) {
  return state.dotaData.gameState;
}

// eslint-disable-next-line no-undef
export function selectHeroId(state: RootState) {
  return state.dotaData.heroId;
}

// eslint-disable-next-line no-undef
export function selectGPM(state: RootState) {
  return state.dotaData.gpm;
}

// eslint-disable-next-line no-undef
export function selectXPM(state: RootState) {
  return state.dotaData.xpm;
}

// eslint-disable-next-line no-undef
export function selectCurrentClockTime(state: RootState) {
  return state.dotaData.currentClockTime;
}

// eslint-disable-next-line no-undef
export function selectCurrentGameTime(state: RootState) {
  return state.dotaData.currentGameTime;
}

export default dotaDataSlice.reducer;
