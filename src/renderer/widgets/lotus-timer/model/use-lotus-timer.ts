import { useMemo } from 'react';
import {
  selectCurrentClockTime,
  selectGameState,
} from '~/overlay/shared/lib/dota-data';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { LOTUS_INTERVAL, NOTIFY_DURATION } from './constants';

export function useLotusTimer() {
  const currentClockTime = useAppSelector(selectCurrentClockTime);
  const gameState = useAppSelector(selectGameState);

  const nextLotusTimeLeft =
    LOTUS_INTERVAL -
    (typeof currentClockTime === 'number' && currentClockTime > 0
      ? currentClockTime % LOTUS_INTERVAL
      : 0);

  const isNotify =
    typeof currentClockTime === 'number' &&
    LOTUS_INTERVAL - nextLotusTimeLeft < NOTIFY_DURATION;

  const state = getTimerWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    timeLeft: nextLotusTimeLeft,
  });

  const color = WIDGET_COLOR_BY_STATE[state];

  const text = useMemo(() => {
    if (state === 'unknown') {
      return 'Start game';
    }

    if (isNotify) {
      return 'Pick up lotus';
    }

    return `${nextLotusTimeLeft}s`;
  }, [isNotify, nextLotusTimeLeft, state]);

  return useMemo(() => ({ text, color }), [color, text]);
}
