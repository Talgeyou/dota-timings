import { useMemo } from 'react';
import { useHeroBenchmarks } from '~/overlay/shared/api/use-hero-benchmarks';
import { WIDGET_COLOR_BY_STATE } from '~/overlay/shared/constants';
import {
  selectHeroId,
  selectXPM,
  selectGameState,
} from '~/overlay/shared/lib/dota-data';
import { getPerformanceWidgetState } from '~/overlay/shared/lib/get-performance-widget-state';
import { useAppSelector } from '~/overlay/shared/lib/use-app-selector';
import { DotaMapGameState } from '~/types';

export function useExperiencePerMinute() {
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

  const state = getPerformanceWidgetState({
    expectedGameState: DotaMapGameState.GameInProgress,
    gameState,
    value: xpm,
    warningThreshold: averageXpm,
    successThreshold: bestXpm,
  });

  const color = WIDGET_COLOR_BY_STATE[state];

  const text = useMemo(() => {
    if (state === 'unknown') {
      return 'Start game';
    }

    return xpm;
  }, [state, xpm]);

  return useMemo(
    () => ({
      color,
      text,
    }),
    [color, text],
  );
}
