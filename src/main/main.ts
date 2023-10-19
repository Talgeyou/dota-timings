/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import {
  app,
  BrowserWindow,
  shell,
  ipcMain,
  globalShortcut,
  nativeImage,
  Tray,
  Menu,
} from 'electron';
import express from 'express';
// import MenuBuilder from './menu';
import electronJsonStorage from 'electron-json-storage';
import { resolveHtmlPath } from './util';
import { CHANNELS } from '../constants';
import { Channel, ChannelData } from '../types';
import { getSavedOverlayConfig, saveOverlayConfig } from './overlay-config';

electronJsonStorage.setDataPath(
  path.resolve(app.getPath('userData'), 'overlay-config.json'),
);

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const listenRenderer = <T extends Channel>(
  channel: T,
  callback: (event: unknown, data: ChannelData[T]) => void,
) => {
  ipcMain.on(channel, callback);
};

listenRenderer('OVERLAY_CONFIG_UPDATE_WIDGET', (_, payload) => {
  const overlayConfig = getSavedOverlayConfig();

  if (overlayConfig.widgets) {
    const existingWidgetIndex = overlayConfig.widgets.findIndex(
      (widget) => widget.key === payload.key,
    );

    if (existingWidgetIndex >= 0) {
      overlayConfig.widgets[existingWidgetIndex] = {
        ...overlayConfig.widgets[existingWidgetIndex],
        ...payload.data,
      };
    } else {
      overlayConfig.widgets.push({
        key: payload.key,
        ...payload.data,
      });
    }
  } else {
    overlayConfig.widgets = [
      {
        key: payload.key,
        ...payload.data,
      },
    ];
  }

  saveOverlayConfig(overlayConfig);
});

listenRenderer('OVERLAY_CONFIG_UPDATE_THEME', (_, payload) => {
  const overlayConfig = getSavedOverlayConfig();

  overlayConfig.theme = payload;

  console.log({ newTheme: payload });

  saveOverlayConfig(overlayConfig);
});

const sendRenderer = <T extends Channel>(event: T, data: ChannelData[T]) => {
  if (mainWindow !== null) {
    mainWindow.webContents.send(event, data);
  }
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    transparent: true,
    frame: false,
    movable: true,
    fullscreen: true,
    minimizable: false,
    show: false,
    maximizable: false,
    resizable: false,
    alwaysOnTop: true,
    skipTaskbar: true,
    webPreferences: {
      nodeIntegration: true,
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setFullScreen(true);
  mainWindow.setFullScreenable(false);
  mainWindow.setVisibleOnAllWorkspaces(true, {
    visibleOnFullScreen: true,
  });

  let isIgnoringMouseEvents = true;
  mainWindow.setIgnoreMouseEvents(isIgnoringMouseEvents);

  const toggleIgnoringMouseEvents = (value?: boolean) => {
    if (!mainWindow) {
      return;
    }

    const newIsIgnoringMouseEvents = value ?? !isIgnoringMouseEvents;
    mainWindow.setIgnoreMouseEvents(newIsIgnoringMouseEvents);
    isIgnoringMouseEvents = newIsIgnoringMouseEvents;

    sendRenderer(CHANNELS.OVERLAY_STATE_CHANGE, !isIgnoringMouseEvents);

    if (isIgnoringMouseEvents) {
      mainWindow.blur();
    } else {
      mainWindow.focus();
    }
  };

  globalShortcut.register('CmdOrCtrl+F12', toggleIgnoringMouseEvents);

  const icon = nativeImage.createFromPath(getAssetPath('icons/16x16.png'));
  const tray = new Tray(icon);

  const contextMenu = Menu.buildFromTemplate([
    {
      label: 'Show (Ctrl+F12)',
      type: 'radio',
      role: 'window',
      click: (item) => toggleIgnoringMouseEvents(!item.checked),
    },
    { label: 'Exit', type: 'normal', role: 'close', click: () => app.exit() },
  ]);

  tray.setContextMenu(contextMenu);

  tray.setToolTip('Dota Timings');
  tray.setTitle('Dota Timings');

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }

    const overlayConfig = getSavedOverlayConfig();

    sendRenderer('OVERLAY_CONFIG_LOADED', overlayConfig);
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const createServer = () => {
  const expressApp = express();

  expressApp.use(express.json());

  expressApp.post('/', async (req, res) => {
    const requestData = req.body;
    sendRenderer(CHANNELS.NEW_DATA, requestData);

    // if (!app.isPackaged) {
    //   const formattedData = await prettier.format(JSON.stringify(requestData), {
    //     parser: 'json',
    //   });
    //   const currentGameState = get(requestData, 'map.game_state', 'log');
    //   fs.writeFileSync(
    //     path.join(
    //       process.cwd(),
    //       `logs/${String(currentGameState)
    //         .replace(/DOTA_GAMERULES_STATE_/, '')
    //         .toLowerCase()}.json`,
    //     ),
    //     formattedData,
    //     { flag: 'w' },
    //   );
    // }

    res.end();
  });

  const port = 3000;
  expressApp.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
  });
};
/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    createServer();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);
