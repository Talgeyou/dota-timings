import { Color, PerformanceWidgetState, TimerWidgetState } from './types';

export const WIDGET_COLOR_BY_STATE: Record<
  PerformanceWidgetState | TimerWidgetState,
  Color
> = {
  idle: 'default',
  success: 'success',
  unknown: 'default',
  warning: 'warning',
  danger: 'danger',
};
