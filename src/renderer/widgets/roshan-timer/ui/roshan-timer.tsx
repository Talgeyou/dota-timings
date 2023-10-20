import { Chip, cn } from '@nextui-org/react';
import { Widget } from '~/overlay/shared/ui/widget';
import { useRoshanTimer } from '~/overlay/widgets/roshan-timer/model/use-roshan-timer';

const WIDGET_KEYS = {
  roshan: 'roshan-timer',
  roshanMin: 'roshan-min-timer',
  roshanMax: 'roshan-max-timer',
};

export function RoshanTimer() {
  const {
    maxTimingText,
    minTimingText,
    roshanColor,
    roshanText,
    maxTimingColor,
    minTimingColor,
    showMaxTiming,
    showMinTiming,
  } = useRoshanTimer();

  return (
    <>
      <Widget widgetKey={WIDGET_KEYS.roshan}>
        <Chip
          variant="dot"
          color={roshanColor}
          classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
          size="sm"
        >
          RS: {roshanText}
        </Chip>
      </Widget>
      <Widget widgetKey={WIDGET_KEYS.roshanMin}>
        <Chip
          variant="dot"
          color={minTimingColor}
          classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
          className={cn('opacity-0', {
            'opacity-100': showMinTiming,
          })}
          size="sm"
        >
          RS MIN: {minTimingText}
        </Chip>
      </Widget>
      <Widget widgetKey={WIDGET_KEYS.roshanMax}>
        <Chip
          variant="dot"
          color={maxTimingColor}
          classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
          className={cn('opacity-0', {
            'opacity-100': showMaxTiming,
          })}
          size="sm"
        >
          RS MAX: {maxTimingText}
        </Chip>
      </Widget>
    </>
  );
}
