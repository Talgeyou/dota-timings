import electronJsonStorage from 'electron-json-storage';
import { OverlayConfig, overlayConfigSchema } from '../overlay-config';

export function getSavedOverlayConfig() {
  let overlayConfig: OverlayConfig = {};

  try {
    const savedConfig = electronJsonStorage.getSync('overlay-config');

    const validatedSavedConfig = overlayConfigSchema.safeParse(savedConfig);

    if (validatedSavedConfig.success) {
      overlayConfig = validatedSavedConfig.data;
    }
  } catch (e) {
    console.error(e);
  }

  return overlayConfig;
}

export function saveOverlayConfig(overlayConfig: OverlayConfig) {
  electronJsonStorage.set('overlay-config', overlayConfig, (error) => {
    if (error) {
      console.log('overlay config persist error');
      console.error(error);
    }
  });
}
