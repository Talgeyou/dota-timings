import { useMemo } from 'react';
import { Chip } from '@nextui-org/chip';
import { DotaMapGameState } from '../../../../types';
import Widget from '../../../shared/ui/widget';
import useAppSelector from '../../../shared/lib/use-app-selector';
import {
  selectCurrentGameTime,
  selectGameState,
  selectLastAegisPickedUpTiming,
} from '../../../shared/lib/dota-data';

const AEGIS_TIME = 5 * 60;
const WIDGET_KEY = 'aegis-timer';

export default function AegisTimer() {
  const gameState = useAppSelector(selectGameState);
  const lastAegisPickedUpTiming = useAppSelector(selectLastAegisPickedUpTiming);
  const currentGameTime = useAppSelector(selectCurrentGameTime);

  const aegisTimeLeft =
    typeof currentGameTime === 'number' &&
    typeof lastAegisPickedUpTiming === 'number'
      ? lastAegisPickedUpTiming + AEGIS_TIME - currentGameTime
      : 0;

  const color = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'default';
    }

    if (aegisTimeLeft > 30) {
      return 'success';
    }

    if (aegisTimeLeft > 0) {
      return 'warning';
    }

    return 'danger';
  }, [aegisTimeLeft, gameState]);

  const text = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    if (typeof aegisTimeLeft === 'number' && aegisTimeLeft > 0) {
      return `${aegisTimeLeft}s`;
    }

    return 'No Aegis';
  }, [aegisTimeLeft, gameState]);

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Aegis: {text}
      </Chip>
    </Widget>
  );
}
