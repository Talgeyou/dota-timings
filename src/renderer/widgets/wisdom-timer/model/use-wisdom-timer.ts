import { useMemo } from 'react';
import {
  selectGameState,
  selectCurrentClockTime,
} from '~/overlay/shared/lib/dota-data';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { WISDOM_INTERVAL, NOTIFY_DURATION } from './constants';

export function useWisdomTimer() {
  const gameState = useAppSelector(selectGameState);
  const currentClockTime = useAppSelector(selectCurrentClockTime);

  const nextRuneTimeLeft =
    WISDOM_INTERVAL -
    (currentClockTime && currentClockTime > 0
      ? currentClockTime % WISDOM_INTERVAL
      : 0);

  const isNotify =
    typeof currentClockTime === 'number' &&
    gameState === DotaMapGameState.GameInProgress &&
    typeof nextRuneTimeLeft === 'number' &&
    WISDOM_INTERVAL - nextRuneTimeLeft < NOTIFY_DURATION;

  const state = getTimerWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    timeLeft: nextRuneTimeLeft,
  });

  const color = WIDGET_COLOR_BY_STATE[state];

  const text = useMemo(() => {
    if (state === 'unknown') {
      return 'Start game';
    }

    if (isNotify) {
      return 'Pick up wisdom rune';
    }

    return `${nextRuneTimeLeft}s`;
  }, [isNotify, nextRuneTimeLeft, state]);

  return useMemo(
    () => ({
      color,
      text,
    }),
    [color, text],
  );
}
