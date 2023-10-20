import { Chip } from '@nextui-org/chip';
import { Widget } from '~/overlay/shared/ui/widget';
import { WIDGET_KEY, useLotusTimer } from '../model';

export function LotusTimer() {
  const { color, text } = useLotusTimer();

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Lotus: {text}
      </Chip>
    </Widget>
  );
}
