import { useEffect, useMemo } from 'react';
import {
  selectCurrentClockTime,
  selectGameState,
} from '~/overlay/shared/lib/dota-data';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { useNotify } from '~/overlay/shared/lib/use-notify';
import { LOTUS_INTERVAL } from './constants';

export function useLotusTimer() {
  const currentClockTime = useAppSelector(selectCurrentClockTime);
  const gameState = useAppSelector(selectGameState);

  const { isNotifying, notify } = useNotify();

  const nextLotusTimeLeft =
    LOTUS_INTERVAL -
    (typeof currentClockTime === 'number' && currentClockTime > 0
      ? currentClockTime % LOTUS_INTERVAL
      : 0);

  const state = isNotifying
    ? 'success'
    : getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState,
        timeLeft: nextLotusTimeLeft,
      });

  const color = WIDGET_COLOR_BY_STATE[state];

  const text = useMemo(() => {
    if (state === 'unknown') {
      return 'Start game';
    }

    if (isNotifying) {
      return 'Pick up lotus';
    }

    return `${nextLotusTimeLeft}s`;
  }, [isNotifying, nextLotusTimeLeft, state]);

  useEffect(() => {
    if (state !== 'unknown' && nextLotusTimeLeft === 1) {
      notify();
    }
  }, [nextLotusTimeLeft, notify, state]);

  return useMemo(() => ({ text, color }), [color, text]);
}
