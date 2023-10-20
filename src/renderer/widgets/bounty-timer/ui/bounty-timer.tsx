import { Chip } from '@nextui-org/chip';
import { Widget } from '~/overlay/shared/ui/widget';
import { useBountyTimer, WIDGET_KEY } from '../model';

export function BountyTimer() {
  const { color, text } = useBountyTimer();

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        variant="dot"
        color={color}
        classNames={{ base: 'max-w-full bg-neutral-200 dark:bg-neutral-900' }}
        size="sm"
      >
        Bounty: {text}
      </Chip>
    </Widget>
  );
}
