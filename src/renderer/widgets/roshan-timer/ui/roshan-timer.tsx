import { useMemo } from 'react';
import { Chip, cn } from '@nextui-org/react';
import Widget from '../../../shared/ui/widget';
import useIsOverlayActive from '../../../shared/lib/use-is-overlay-active';
import useAppSelector from '../../../shared/lib/use-app-selector';
import {
  selectCurrentGameTime,
  selectGameState,
  selectLastRoshanKillTiming,
} from '../../../shared/lib/dota-data';
import { DotaMapGameState } from '../../../../types';

const ROSHAN_MIN_TIME = 8 * 60;
const ROSHAN_MAX_TIME = 11 * 60;

const WIDGET_KEYS = {
  roshan: 'roshan-timer',
  roshanMin: 'roshan-min-timer',
  roshanMax: 'roshan-max-timer',
};

export default function RoshanTimer() {
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

  const roshanText = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    if (roshanMaxTimeLeft <= 0) {
      return 'Actually alive';
    }

    if (roshanMinTimeLeft <= 0) {
      return 'Maybe alive';
    }

    return 'Dead';
  }, [gameState, roshanMaxTimeLeft, roshanMinTimeLeft]);

  const roshanColor = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'default';
    }

    if (roshanMaxTimeLeft <= 0) {
      return 'success';
    }

    if (roshanMinTimeLeft <= 0) {
      return 'warning';
    }

    return 'danger';
  }, [gameState, roshanMaxTimeLeft, roshanMinTimeLeft]);

  const minTimingText = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    return `${roshanMinTimeLeft}s`;
  }, [gameState, roshanMinTimeLeft]);

  const maxTimingText = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    return `${roshanMaxTimeLeft}s`;
  }, [gameState, roshanMaxTimeLeft]);

  return (
    <>
      <Widget widgetKey={WIDGET_KEYS.roshan}>
        <Chip
          variant="dot"
          color={roshanColor}
          classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
          size="sm"
        >
          RS: {roshanText}
        </Chip>
      </Widget>
      <Widget widgetKey={WIDGET_KEYS.roshanMin}>
        <Chip
          variant="dot"
          color={
            roshanMinTimeLeft > 0 && roshanMinTimeLeft < 30
              ? 'warning'
              : 'danger'
          }
          classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
          className={cn('opacity-0', {
            'opacity-100': isOverlayActive || roshanMinTimeLeft > 0,
          })}
          size="sm"
        >
          RS MIN: {minTimingText}
        </Chip>
      </Widget>
      <Widget widgetKey={WIDGET_KEYS.roshanMax}>
        <Chip
          variant="dot"
          color={
            roshanMaxTimeLeft > 0 && roshanMaxTimeLeft < 30
              ? 'warning'
              : 'danger'
          }
          classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
          className={cn('opacity-0', {
            'opacity-100': isOverlayActive || roshanMaxTimeLeft > 0,
          })}
          size="sm"
        >
          RS MAX: {maxTimingText}
        </Chip>
      </Widget>
    </>
  );
}
