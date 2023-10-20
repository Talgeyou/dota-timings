import { DotaMapGameState } from '~/types';
import { PerformanceWidgetState } from '~/overlay/shared/types';

type GetPerformanceWidgetStateWithGameStateParams =
  | {
      gameState?: DotaMapGameState;
      expectedGameState: DotaMapGameState;
    }
  | {
      gameState?: never;
      expectedGameState?: never;
    };

type GetPerformanceWidgetStateParams = {
  value?: number;
  warningThreshold?: number;
  successThreshold?: number;
} & GetPerformanceWidgetStateWithGameStateParams;

export function getPerformanceWidgetState({
  expectedGameState,
  gameState,
  value,
  successThreshold,
  warningThreshold,
}: GetPerformanceWidgetStateParams): PerformanceWidgetState {
  if (expectedGameState && expectedGameState !== gameState) {
    return 'unknown';
  }

  if (!value) {
    return 'unknown';
  }

  if (!successThreshold && !warningThreshold) {
    return 'unknown';
  }

  if (successThreshold && value >= successThreshold) {
    return 'success';
  }

  if (warningThreshold && value >= warningThreshold) {
    return 'warning';
  }

  return 'danger';
}
