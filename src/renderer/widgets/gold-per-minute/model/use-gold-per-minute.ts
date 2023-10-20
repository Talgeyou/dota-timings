import { useMemo } from 'react';
import { useHeroBenchmarks } from '~/overlay/shared/api/use-hero-benchmarks';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import {
  selectHeroId,
  selectGPM,
  selectGameState,
} from '~/overlay/shared/lib/dota-data';
import { getPerformanceWidgetState } from '~/overlay/shared/lib/get-performance-widget-state';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { DotaMapGameState } from '~/types';

export function useGoldPerMinute() {
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

  const state = getPerformanceWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    successThreshold: bestGpm,
    warningThreshold: averageGpm,
  });

  const color = WIDGET_COLOR_BY_STATE[state];

  const text = useMemo(() => {
    if (gameState !== DotaMapGameState.GameInProgress) {
      return 'Start game';
    }

    return gpm;
  }, [gameState, gpm]);

  return useMemo(
    () => ({
      color,
      text,
    }),
    [color, text],
  );
}
