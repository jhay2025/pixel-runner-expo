import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SCREEN_WIDTH = Math.max(width, height);
export const SCREEN_HEIGHT = Math.min(width, height);

export const GRAVITY = 0.6;
export const JUMP_FORCE = -12;
export const MOVE_SPEED = 4;
export const PLAYER_SIZE = 40;
export const TILE_SIZE = 40;
export const GROUND_Y = SCREEN_HEIGHT - TILE_SIZE;
export const ENEMY_SPEED = 1.5;
export const COIN_SIZE = 24;

export const COLORS = {
  bg1: '#0a0a2e',
  bg2: '#1a1a4e',
  bg3: '#2a1a3e',
  player: '#00f5d4',
  playerAccent: '#00bbf9',
  platform: '#6c63ff',
  platformTop: '#9d4edd',
  ground: '#3a3a6e',
  groundTop: '#5a5a8e',
  enemy: '#ff006e',
  enemyEye: '#ffffff',
  coin: '#fee440',
  coinShine: '#ffd000',
  lava: '#ff4444',
  text: '#ffffff',
  textAccent: '#00f5d4',
  heart: '#ff006e',
  btnLeft: '#6c63ff',
  btnRight: '#6c63ff',
  btnJump: '#00f5d4',
  overlay: 'rgba(0,0,0,0.7)',
};