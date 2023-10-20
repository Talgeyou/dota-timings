import '@testing-library/jest-dom';
import { DotaMapGameState } from '../types';
import { getPerformanceWidgetState } from '../renderer/shared/lib/get-performance-widget-state';

describe('getPerformanceWidgetState', () => {
  it('widget state is unknown', () => {
    expect(
      getPerformanceWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.Init,
        value: 15,
      }),
    ).toEqual('unknown');
  });

  it('widget state is idle', () => {
    expect(
      getPerformanceWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
      }),
    ).toEqual('idle');
  });

  it('widget state is warning', () => {
    expect(
      getPerformanceWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
        value: 30,
        warningThreshold: 25,
        successThreshold: 40,
      }),
    ).toEqual('warning');
  });

  it('widget state is success', () => {
    expect(
      getPerformanceWidgetState({
        expectedGameState: DotaMapGameState.GameInProgress,
        gameState: DotaMapGameState.GameInProgress,
        value: 60,
        warningThreshold: 25,
        successThreshold: 40,
      }),
    ).toEqual('success');
  });
});
