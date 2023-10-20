// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcRenderer, IpcRendererEvent } from 'electron';
import { Channel, ChannelData } from '~/types';

const electronHandler = {
  ipcRenderer: {
    sendMessage<T extends Channel>(channel: T, data: ChannelData[T]) {
      ipcRenderer.send(channel, data);
    },
    on<T extends Channel>(channel: T, func: (data: ChannelData[T]) => void) {
      const subscription = (_event: IpcRendererEvent, data: ChannelData[T]) =>
        func(data);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once<T extends Channel>(channel: T, func: (data: ChannelData[T]) => void) {
      ipcRenderer.once(channel, (_event, data) => func(data));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);

export type ElectronHandler = typeof electronHandler;
