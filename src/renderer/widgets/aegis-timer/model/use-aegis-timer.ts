import { useMemo } from 'react';
import {
  selectGameState,
  selectLastAegisPickedUpTiming,
  selectCurrentGameTime,
} from '~/overlay/shared/lib/dota-data';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { AEGIS_TIME } from './constants';

export function useAegisTimer() {
  const gameState = useAppSelector(selectGameState);
  const lastAegisPickedUpTiming = useAppSelector(selectLastAegisPickedUpTiming);
  const currentGameTime = useAppSelector(selectCurrentGameTime);

  const aegisTimeLeft =
    typeof currentGameTime === 'number' &&
    typeof lastAegisPickedUpTiming === 'number'
      ? lastAegisPickedUpTiming + AEGIS_TIME - currentGameTime
      : 0;

  const state = getTimerWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,

    timeLeft: aegisTimeLeft,
  });

  const color = WIDGET_COLOR_BY_STATE[state];
  const text = useMemo(() => {
    if (state === 'unknown') {
      return 'Start game';
    }

    if (state !== 'success') {
      return `${aegisTimeLeft}s`;
    }

    return 'No Aegis';
  }, [aegisTimeLeft, state]);

  return useMemo(() => ({ color, text }), [color, text]);
}
