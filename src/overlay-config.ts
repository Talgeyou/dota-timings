import { z } from 'zod';

export const overlayConfigSchema = z.object({
  widgets: z
    .array(
      z.object({
        key: z.string().min(1),
        width: z.number().min(1).optional(),
        height: z.number().min(1).optional(),
        transform: z.string().min(1).optional(),
      }),
    )
    .optional(),
  theme: z.enum(['dark', 'light']).optional(),
});

export type OverlayConfig = z.infer<typeof overlayConfigSchema>;
