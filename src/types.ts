import { CHANNELS } from './constants';
import { OverlayConfig } from './overlay-config';

export enum DotaEventKey {
  RoshanKilled = 'roshan_killed',
  AegisPickedUp = 'aegis_picked_up',
  AegisDenied = 'aegis_denied',
}

export enum DotaTeam {
  Radiant = 'radiant',
  Dire = 'dire',
}

export type RoshanKilledDotaEvent = {
  event_type: DotaEventKey.RoshanKilled;
  game_time: number;
  killed_by_team: DotaTeam;
  killed_player_id: number;
};

export type AegisPickedUpDotaEvent = {
  event_type: DotaEventKey.AegisPickedUp;
  game_time: number;
};

export type AegisDeniedDotaEvent = {
  event_type: DotaEventKey.AegisDenied;
  game_time: number;
};

export enum DotaMapGameState {
  Init = 'DOTA_GAMERULES_STATE_INIT',
  HeroSelection = 'DOTA_GAMERULES_STATE_HERO_SELECTION',
  StrategyTime = 'DOTA_GAMERULES_STATE_STRATEGY_TIME',
  TeamShowCase = 'DOTA_GAMERULES_STATE_TEAM_SHOWCASE',
  PreGame = 'DOTA_GAMERULES_STATE_PRE_GAME',
  GameInProgress = 'DOTA_GAMERULES_STATE_GAME_IN_PROGRESS',
  PostGame = 'DOTA_GAMERULES_STATE_POST_GAME',
}

export type DotaEvent =
  | RoshanKilledDotaEvent
  | AegisPickedUpDotaEvent
  | AegisDeniedDotaEvent;

export type DotaNewData = {
  events: DotaEvent[];
  map?: {
    game_time: number;
    clock_time: number;
    game_state: DotaMapGameState;
  };
  hero?: {
    id?: number;
  };
  player?: {
    gpm?: number;
    xpm?: number;
  };
  previously?: {
    map: true;
  };
};

export type Channel = (typeof CHANNELS)[keyof typeof CHANNELS];

export type ArrayElement<A> = A extends readonly (infer T)[] ? T : never;

export type ChannelData = {
  [CHANNELS.NEW_DATA]: DotaNewData;
  [CHANNELS.OVERLAY_STATE_CHANGE]: boolean;
  [CHANNELS.OVERLAY_CONFIG_LOADED]: OverlayConfig;
  [CHANNELS.OVERLAY_CONFIG_UPDATE_WIDGET]: {
    key: string;
    data: Partial<
      Pick<
        ArrayElement<OverlayConfig['widgets']>,
        'height' | 'transform' | 'width'
      >
    >;
  };
  [CHANNELS.OVERLAY_CONFIG_UPDATE_THEME]: 'dark' | 'light';
};
