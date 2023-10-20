import { useMemo } from 'react';
import {
  selectGameState,
  selectLastRoshanKillTiming,
  selectCurrentGameTime,
} from '~/overlay/shared/lib/dota-data';
import { DotaMapGameState } from '~/types';
import { Color, WidgetState } from '~/overlay/shared/types';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { useIsOverlayActive } from '~/overlay/shared/lib/use-is-overlay-active';
import { getTimerWidgetState } from '~/overlay/shared/lib/get-timer-widget-state';
import { ROSHAN_MIN_TIME, ROSHAN_MAX_TIME } from './constants';

const ROSHAN_TEXT_BY_STATE: Record<WidgetState, string> = {
  idle: 'Dead',
  success: 'Alive',
  unknown: 'Start game',
  warning: 'Maybe alive',
};

export function useRoshanTimer() {
  const gameState = useAppSelector(selectGameState);
  const lastRoshanKillTiming = useAppSelector(selectLastRoshanKillTiming);
  const currentGameTime = useAppSelector(selectCurrentGameTime);
  const isOverlayActive = useIsOverlayActive();

  const roshanMinTimeLeft =
    typeof lastRoshanKillTiming === 'number' &&
    typeof currentGameTime === 'number'
      ? lastRoshanKillTiming + ROSHAN_MIN_TIME - currentGameTime
      : 0;

  const roshanMaxTimeLeft =
    typeof lastRoshanKillTiming === 'number' &&
    typeof currentGameTime === 'number'
      ? lastRoshanKillTiming + ROSHAN_MAX_TIME - currentGameTime
      : 0;

  const roshanState = getTimerWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    timeLeft: roshanMaxTimeLeft,
    warningTime: ROSHAN_MAX_TIME - ROSHAN_MIN_TIME,
  });
  const roshanText = ROSHAN_TEXT_BY_STATE[roshanState];
  const roshanColor: Color = WIDGET_COLOR_BY_STATE[roshanState];

  const minTimingState = getTimerWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    timeLeft: roshanMinTimeLeft,
  });
  const minTimingText = useMemo(() => {
    if (minTimingState === 'unknown') {
      return 'Start game';
    }

    return `${roshanMinTimeLeft}s`;
  }, [minTimingState, roshanMinTimeLeft]);
  const minTimingColor: Color = WIDGET_COLOR_BY_STATE[minTimingState];
  const showMinTiming = roshanMinTimeLeft > 0 || isOverlayActive;

  const maxTimingState = getTimerWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    timeLeft: roshanMaxTimeLeft,
  });
  const maxTimingText = useMemo(() => {
    if (maxTimingState === 'unknown') {
      return 'Start game';
    }

    return `${roshanMaxTimeLeft}s`;
  }, [maxTimingState, roshanMaxTimeLeft]);
  const maxTimingColor: Color = WIDGET_COLOR_BY_STATE[maxTimingState];
  const showMaxTiming = roshanMaxTimeLeft > 0 || isOverlayActive;

  return useMemo(
    () => ({
      roshanText,
      roshanColor,
      minTimingText,
      minTimingColor,
      maxTimingText,
      maxTimingColor,
      showMinTiming,
      showMaxTiming,
    }),
    [
      maxTimingColor,
      maxTimingText,
      minTimingColor,
      minTimingText,
      roshanColor,
      roshanText,
      showMaxTiming,
      showMinTiming,
    ],
  );
}
