import { Chip } from '@nextui-org/chip';
import { Widget } from '~/overlay/shared/ui/widget';
import { WIDGET_KEY, useExperiencePerMinute } from '../model';

export function ExperiencePerMinute() {
  const { color, text } = useExperiencePerMinute();

  return (
    <Widget widgetKey={WIDGET_KEY}>
      <Chip
        classNames={{
          base: 'bg-neutral-200 dark:bg-neutral-900',
        }}
        variant="dot"
        color={color}
        size="sm"
      >
        XPM: {text}
      </Chip>
    </Widget>
  );
}
