import { useQuery } from 'react-query';
import { openDotaAxios } from './open-dota';

export type HeroBenchMarks = {
  hero_id: 6;
  result: {
    gold_per_min: [
      {
        percentile: 0.1;
        value: number;
      },
      {
        percentile: 0.2;
        value: number;
      },
      {
        percentile: 0.3;
        value: number;
      },
      {
        percentile: 0.4;
        value: number;
      },
      {
        percentile: 0.5;
        value: number;
      },
      {
        percentile: 0.6;
        value: number;
      },
      {
        percentile: 0.7;
        value: number;
      },
      {
        percentile: 0.8;
        value: number;
      },
      {
        percentile: 0.9;
        value: number;
      },
      {
        percentile: 0.95;
        value: number;
      },
      {
        percentile: 0.99;
        value: number;
      },
    ];
    xp_per_min: [
      {
        percentile: 0.1;
        value: number;
      },
      {
        percentile: 0.2;
        value: number;
      },
      {
        percentile: 0.3;
        value: number;
      },
      {
        percentile: 0.4;
        value: number;
      },
      {
        percentile: 0.5;
        value: number;
      },
      {
        percentile: 0.6;
        value: number;
      },
      {
        percentile: 0.7;
        value: number;
      },
      {
        percentile: 0.8;
        value: number;
      },
      {
        percentile: 0.9;
        value: number;
      },
      {
        percentile: 0.95;
        value: number;
      },
      {
        percentile: 0.99;
        value: number;
      },
    ];
  };
};

export function useHeroBenchmarks(heroId?: number) {
  const query = useQuery({
    queryKey: `hero-${heroId}-benchmarks`,
    queryFn: ({ signal }) =>
      openDotaAxios
        .get<HeroBenchMarks>(`benchmarks?hero_id=${heroId}`, { signal })
        .then((res) => res.data),
    enabled: Boolean(heroId),
  });

  return query;
}
