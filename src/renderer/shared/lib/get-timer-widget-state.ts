import { DotaMapGameState } from '~/types';
import { TimerWidgetState } from '~/overlay/shared/types';

type GetTimerWidgetStateWithGameStateParams =
  | {
      gameState?: DotaMapGameState;
      expectedGameState: DotaMapGameState;
    }
  | {
      gameState?: never;
      expectedGameState?: never;
    };

type GetTimerWidgetStateParams = {
  timeLeft: number;
  indicatePresence?: boolean;
  warningTime?: number;
  successTime?: number;
} & GetTimerWidgetStateWithGameStateParams;

export function getTimerWidgetState({
  expectedGameState,
  timeLeft,
  gameState,
  warningTime = 30,
  successTime = 0,
  indicatePresence = true,
}: GetTimerWidgetStateParams): TimerWidgetState {
  if (expectedGameState && expectedGameState !== gameState) {
    return 'unknown';
  }

  if (indicatePresence) {
    if (timeLeft > warningTime) {
      return 'idle';
    }

    if (timeLeft > successTime) {
      return 'warning';
    }

    return 'success';
  }

  if (timeLeft > warningTime) {
    return 'success';
  }

  if (timeLeft > successTime) {
    return 'warning';
  }

  return 'unknown';
}
