import { useMemo } from 'react';
import { Chip } from '@nextui-org/chip';
import Widget from '../../../shared/ui/widget';
import useHeroBenchmarks from '../../../shared/api/use-hero-benchmarks';
import useAppSelector from '../../../shared/lib/use-app-selector';
import {
  selectGPM,
  selectGameState,
  selectHeroId,
} from '../../../shared/lib/dota-data';
import { DotaMapGameState } from '../../../../types';

const WIDGET_KEY = 'gpm';

export default function GoldPerMinute() {
  const heroId = useAppSelector(selectHeroId);
  const gpm = useAppSelector(selectGPM);
  const gameState = useAppSelector(selectGameState);

  const heroBenchmarks = useHeroBenchmarks(heroId);

  const averageGpm = heroBenchmarks.data?.result.gold_per_min.find(
    (item) => item.percentile === 0.5,
  )?.value;

  const bestGpm = heroBenchmarks.data?.result.gold_per_min.find(
    (item) => item.percentile === 0.99,
  )?.value;

  const color = useMemo(() => {
    if (typeof gpm !== 'number') {
      return 'default';
    }

    if (bestGpm && gpm >= bestGpm) {
      return 'success';
    }

    if (averageGpm) {
      return gpm > averageGpm ? 'warning' : 'danger';
    }

    return 'primary';
  }, [averageGpm, bestGpm, gpm]);

  const text = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    return gpm;
  }, [gameState, gpm]);

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        classNames={{
          base: 'bg-neutral-200 dark:bg-neutral-900',
        }}
        variant="dot"
        size="sm"
        color={color}
      >
        GPM: {text}
      </Chip>
    </Widget>
  );
}
