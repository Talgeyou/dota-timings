import { useEffect, useMemo } from 'react';
import {
  selectCurrentClockTime,
  selectGameState,
} from '~/overlay/shared/lib/dota-data';
import { DotaMapGameState } from '~/types';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { useNotify } from '~/overlay/shared/lib/use-notify';
import { BOUNTY_INTERVAL } from './constants';

export function useBountyTimer() {
  const currentClockTime = useAppSelector(selectCurrentClockTime);
  const gameState = useAppSelector(selectGameState);

  const { isNotifying, notify } = useNotify();

  const nextRuneTimeLeft =
    BOUNTY_INTERVAL -
    (typeof currentClockTime === 'number' && currentClockTime > 0
      ? currentClockTime % BOUNTY_INTERVAL
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
      return 'Pick up bounty rune';
    }

    return `${nextRuneTimeLeft}s`;
  }, [isNotifying, nextRuneTimeLeft, state]);

  useEffect(() => {
    if (!isNotifying && state !== 'unknown' && nextRuneTimeLeft === 1) {
      notify();
    }
  }, [isNotifying, nextRuneTimeLeft, notify, state]);

  return useMemo(
    () => ({
      color,
      text,
    }),
    [color, text],
  );
}
