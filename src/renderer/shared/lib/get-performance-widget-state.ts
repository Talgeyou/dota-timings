import { DotaMapGameState } from '~/types';
import { WidgetState } from '~/overlay/shared/types';

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
}: GetPerformanceWidgetStateParams): WidgetState {
  if (expectedGameState && expectedGameState !== gameState) {
    return 'unknown';
  }

  if (!value) {
    return 'idle';
  }

  if (!successThreshold && !warningThreshold) {
    return 'idle';
  }

  if (successThreshold && value >= successThreshold) {
    return 'success';
  }

  if (warningThreshold && value >= warningThreshold) {
    return 'warning';
  }

  return 'idle';
}
