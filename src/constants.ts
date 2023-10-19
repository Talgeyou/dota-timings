export const CHANNELS = {
  NEW_DATA: 'NEW_DATA',
  OVERLAY_STATE_CHANGE: 'OVERLAY_STATE_CHANGE',
  OVERLAY_CONFIG_LOADED: 'OVERLAY_CONFIG_LOADED',
  OVERLAY_CONFIG_UPDATE_WIDGET: 'OVERLAY_CONFIG_UPDATE_WIDGET',
  OVERLAY_CONFIG_UPDATE_THEME: 'OVERLAY_CONFIG_UPDATE_THEME',
} as const;

export const [RADIANT, DIRE] = ['team2', 'team3'] as ('team2' | 'team3')[];
export const [RADIANT_ACTIVE, DIRE_ACTIVE] = [2, 3];
export const ACTIVE_TEAM = {
  [RADIANT_ACTIVE]: RADIANT,
  [DIRE_ACTIVE]: DIRE,
};

export const BASE_URL = 'https://cdn.cloudflare.steamstatic.com';
export const ITEM_SLOTS = [
  'slot0',
  'slot1',
  'slot2',
  'slot3',
  'slot4',
  'slot5',
];
export const BACKPACK_SLOTS = ['slot6', 'slot7', 'slot8'];
export const NEUTRAL_ITEMS = ['neutral0'];
export enum GAME_STATE {
  INIT = 'DOTA_GAMERULES_STATE_INIT',
  WAIT_FOR_PLAYERS_TO_LOAD = 'DOTA_GAMERULES_STATE_WAIT_FOR_PLAYERS_TO_LOAD',
  CUSTOM_GAME_SETUP = 'DOTA_GAMERULES_STATE_CUSTOM_GAME_SETUP',
  PLAYER_DRAFT = 'DOTA_GAMERULES_STATE_PLAYER_DRAFT',
  HERO_SELECTION = 'DOTA_GAMERULES_STATE_HERO_SELECTION',
  STRATEGY_TIME = 'DOTA_GAMERULES_STATE_STRATEGY_TIME',
  TEAM_SHOWCASE = 'DOTA_GAMERULES_STATE_TEAM_SHOWCASE',
  WAIT_FOR_MAP_TO_LOAD = 'DOTA_GAMERULES_STATE_WAIT_FOR_MAP_TO_LOAD',
  PRE_GAME = 'DOTA_GAMERULES_STATE_PRE_GAME',
  SCENARIO_SETUP = 'DOTA_GAMERULES_STATE_SCENARIO_SETUP',
  IN_PROGRESS = 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS',
  POST_GAME = 'DOTA_GAMERULES_STATE_POST_GAME',
  DISCONNECT = 'DOTA_GAMERULES_STATE_DISCONNECT',
}
export const DRAFT_PICK = [
  'pick0_id',
  'pick1_id',
  'pick2_id',
  'pick3_id',
  'pick4_id',
];
export const DRAFT_BAN = [
  'ban0_id',
  'ban1_id',
  'ban2_id',
  'ban3_id',
  'ban4_id',
  'ban5_id',
  'ban6_id',
];

export const PLAYERS = {
  [RADIANT]: ['player0', 'player1', 'player2', 'player3', 'player4'],
  [DIRE]: ['player5', 'player6', 'player7', 'player8', 'player9'],
};
