import { useMemo } from 'react';
import { Chip } from '@nextui-org/chip';
import Widget from '../../../shared/ui/widget';
import useHeroBenchmarks from '../../../shared/api/use-hero-benchmarks';
import useAppSelector from '../../../shared/lib/use-app-selector';
import {
  selectGameState,
  selectHeroId,
  selectXPM,
} from '../../../shared/lib/dota-data';
import { DotaMapGameState } from '../../../../types';

const WIDGET_KEY = 'xpm';

export default function ExperiencePerMinute() {
  const heroId = useAppSelector(selectHeroId);
  const xpm = useAppSelector(selectXPM);
  const gameState = useAppSelector(selectGameState);
  const heroBenchmarks = useHeroBenchmarks(heroId);

  const averageXpm = heroBenchmarks.data?.result.xp_per_min.find(
    (item) => item.percentile === 0.5,
  )?.value;

  const bestXpm = heroBenchmarks.data?.result.xp_per_min.find(
    (item) => item.percentile === 0.99,
  )?.value;

  const color = useMemo(() => {
    if (typeof xpm !== 'number') {
      return 'default';
    }

    if (bestXpm && xpm >= bestXpm) {
      return 'success';
    }

    if (averageXpm) {
      return xpm > averageXpm ? 'warning' : 'danger';
    }

    return 'primary';
  }, [averageXpm, bestXpm, xpm]);

  const text = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    return xpm;
  }, [gameState, xpm]);

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        classNames={{
          base: 'bg-neutral-200 dark:bg-neutral-900',
        }}
        variant="dot"
        color={color}
        size="sm"
      >
        XPM: {text}
      </Chip>
    </Widget>
  );
}
