import { Chip } from '@nextui-org/chip';
import { Widget } from '~/overlay/shared/ui/widget';
import { WIDGET_KEY, useGoldPerMinute } from '../model';

export function GoldPerMinute() {
  const { color, text } = useGoldPerMinute();

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        classNames={{
          base: 'bg-neutral-200 dark:bg-neutral-900',
        }}
        variant="dot"
        size="sm"
        color={color}
      >
        GPM: {text}
      </Chip>
    </Widget>
  );
}
