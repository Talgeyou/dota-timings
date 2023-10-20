import { useMemo } from 'react';
import {
  selectCurrentClockTime,
  selectGameState,
} from '~/overlay/shared/lib/dota-data';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { BOUNTY_INTERVAL, NOTIFY_DURATION } from './constants';

export function useBountyTimer() {
  const currentClockTime = useAppSelector(selectCurrentClockTime);
  const gameState = useAppSelector(selectGameState);

  const nextRuneTimeLeft =
    BOUNTY_INTERVAL -
    (typeof currentClockTime === 'number' && currentClockTime > 0
      ? currentClockTime % BOUNTY_INTERVAL
      : 0);

  const isNotify =
    typeof currentClockTime === 'number' &&
    BOUNTY_INTERVAL - nextRuneTimeLeft < NOTIFY_DURATION;

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
      return 'Pick up bounty rune';
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
