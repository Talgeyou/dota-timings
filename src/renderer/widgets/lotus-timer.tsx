import { Chip } from '@nextui-org/chip';
import { useMemo } from 'react';
import { DotaMapGameState } from '../../types';
import {
  selectCurrentClockTime,
  selectGameState,
} from '../shared/lib/dota-data';
import useAppSelector from '../shared/lib/use-app-selector';
import Widget from '../shared/ui/widget';

const LOTUS_INTERVAL = 3 * 60;
const NOTIFY_DURATION = 10;

const WIDGET_KEY = 'lotus-timer';

export default function LotusTimer() {
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

  const color = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'default';
    }

    if (nextLotusTimeLeft === 0 || isNotify) {
      return 'success';
    }

    if (nextLotusTimeLeft < 30) {
      return 'warning';
    }

    return 'default';
  }, [gameState, isNotify, nextLotusTimeLeft]);

  const text = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    if (isNotify) {
      return 'Pick up lotus';
    }

    return `${nextLotusTimeLeft}s`;
  }, [gameState, isNotify, nextLotusTimeLeft]);

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Lotus: {text}
      </Chip>
    </Widget>
  );
}
