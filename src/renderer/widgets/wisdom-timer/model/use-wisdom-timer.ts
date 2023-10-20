import { useEffect, useMemo } from 'react';
import {
  selectGameState,
  selectCurrentClockTime,
} from '~/overlay/shared/lib/dota-data';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { useNotify } from '~/overlay/shared/lib/use-notify';
import { WISDOM_INTERVAL } from './constants';

export function useWisdomTimer() {
  const gameState = useAppSelector(selectGameState);
  const currentClockTime = useAppSelector(selectCurrentClockTime);

  const { isNotifying, notify } = useNotify();

  const nextRuneTimeLeft =
    WISDOM_INTERVAL -
    (currentClockTime && currentClockTime > 0
      ? currentClockTime % WISDOM_INTERVAL
      : 0);

  const state = isNotifying
    ? 'success'
    : getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState,
        timeLeft: nextRuneTimeLeft,
      });

  const color = WIDGET_COLOR_BY_STATE[state];

  const text = useMemo(() => {
    if (state === 'unknown') {
      return 'Start game';
    }

    if (isNotifying) {
      return 'Pick up wisdom rune';
    }

    return `${nextRuneTimeLeft}s`;
  }, [isNotifying, nextRuneTimeLeft, state]);

  useEffect(() => {
    if (state !== 'unknown' && nextRuneTimeLeft === 1) {
      notify();
    }
  }, [nextRuneTimeLeft, notify, state]);

  return useMemo(
    () => ({
      color,
      text,
    }),
    [color, text],
  );
}
