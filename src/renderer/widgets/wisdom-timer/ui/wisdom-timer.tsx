import { Chip } from '@nextui-org/chip';
import { useMemo } from 'react';
import Widget from '../../../shared/ui/widget';
import useAppSelector from '../../../shared/lib/use-app-selector';
import {
  selectCurrentClockTime,
  selectGameState,
} from '../../../shared/lib/dota-data';
import { DotaMapGameState } from '../../../../types';

const WISDOM_INTERVAL = 7 * 60;
const NOTIFY_DURATION = 10;
const WIDGET_KEY = 'wisdom-timer';

export default function WisdomTimer() {
  const gameState = useAppSelector(selectGameState);
  const currentClockTime = useAppSelector(selectCurrentClockTime);

  const nextRuneTimeLeft =
    typeof currentClockTime === 'number' &&
    WISDOM_INTERVAL -
      (currentClockTime && currentClockTime > 0
        ? currentClockTime % WISDOM_INTERVAL
        : 0);

  const isNotify =
    typeof currentClockTime === 'number' &&
    gameState === DotaMapGameState.GameInProgress &&
    typeof nextRuneTimeLeft === 'number' &&
    WISDOM_INTERVAL - nextRuneTimeLeft < NOTIFY_DURATION;

  const color = useMemo(() => {
    if (
      typeof nextRuneTimeLeft !== 'number' ||
      gameState !== DotaMapGameState.GameInProgress
    ) {
      return 'default';
    }

    if (nextRuneTimeLeft === 0 || isNotify) {
      return 'success';
    }

    if (nextRuneTimeLeft < 30) {
      return 'warning';
    }

    return 'default';
  }, [gameState, isNotify, nextRuneTimeLeft]);

  const text = useMemo(() => {
    if (
      typeof currentClockTime !== 'number' ||
      gameState !== DotaMapGameState.GameInProgress
    ) {
      return 'Start game';
    }

    if (isNotify) {
      return 'Pick up wisdom rune';
    }

    return `${nextRuneTimeLeft}s`;
  }, [currentClockTime, gameState, isNotify, nextRuneTimeLeft]);

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Wisdom: {text}
      </Chip>
    </Widget>
  );
}
