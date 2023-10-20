import { Color, WidgetState } from './types';

export const WIDGET_COLOR_BY_STATE: Record<WidgetState, Color> = {
  idle: 'default',
  success: 'success',
  unknown: 'default',
  warning: 'warning',
};
