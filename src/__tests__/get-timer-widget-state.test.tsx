import '@testing-library/jest-dom';
import { getTimerWidgetState } from '../renderer/shared/lib/get-timer-widget-state';
import { DotaMapGameState } from '../types';

describe('getTimerWidgetState', () => {
  it('widget state is unknown', () => {
    expect(
      getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.Init,
        timeLeft: 150,
      }),
    ).toEqual('unknown');
  });

  it('widget state is idle', () => {
    expect(
      getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
        timeLeft: 150,
      }),
    ).toEqual('idle');
  });

  it('widget state is warning', () => {
    expect(
      getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
        timeLeft: 30,
      }),
    ).toEqual('warning');
  });

  it('widget state is success', () => {
    expect(
      getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
        timeLeft: 0,
      }),
    ).toEqual('success');
  });

  it('negative time left', () => {
    expect(
      getTimerWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
        timeLeft: -10,
      }),
    ).toEqual('success');
  });
});
