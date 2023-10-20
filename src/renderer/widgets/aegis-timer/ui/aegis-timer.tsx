import { Chip } from '@nextui-org/chip';
import { Widget } from '~/overlay/shared/ui/widget';
import { useAegisTimer } from '../model';

const WIDGET_KEY = 'aegis-timer';

export function AegisTimer() {
  const { color, text } = useAegisTimer();

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Aegis: {text}
      </Chip>
    </Widget>
  );
}
