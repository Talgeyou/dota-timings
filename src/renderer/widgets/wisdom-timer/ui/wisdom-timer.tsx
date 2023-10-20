import { Chip } from '@nextui-org/chip';
import { Widget } from '~/overlay/shared/ui/widget';
import { WIDGET_KEY, useWisdomTimer } from '../model';

export function WisdomTimer() {
  const { color, text } = useWisdomTimer();

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Wisdom: {text}
      </Chip>
    </Widget>
  );
}
