import { TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT, GROUND_Y } from '../constants';

const T = TILE_SIZE;

export const Level2 = {
  name: 'Crystal Caves',
  bg: ['#1a0a28', '#2e1a4e'],
  platforms: [
    { x: 0, y: GROUND_Y, w: T * 8, h: T, ground: true },
    { x: T * 4, y: GROUND_Y - T * 3, w: T * 2, h: T },
    { x: T * 10, y: GROUND_Y - T * 2, w: T * 3, h: T },
    { x: T * 8, y: GROUND_Y, w: T * 2, h: T, lava: true },
    { x: T * 10, y: GROUND_Y, w: T * 10, h: T, ground: true },
    { x: T * 14, y: GROUND_Y - T * 4, w: T * 2, h: T },
    { x: T * 18, y: GROUND_Y - T * 3, w: T * 3, h: T },
    { x: T * 20, y: GROUND_Y, w: T * 2, h: T, lava: true },
    { x: T * 22, y: GROUND_Y, w: T * 12, h: T, ground: true },
    { x: T * 24, y: GROUND_Y - T * 5, w: T * 2, h: T },
    { x: T * 28, y: GROUND_Y - T * 3, w: T * 3, h: T },
    { x: T * 33, y: GROUND_Y - T * 4, w: T * 2, h: T },
    { x: T * 34, y: GROUND_Y, w: T * 12, h: T, ground: true },
    { x: T * 37, y: GROUND_Y - T * 3, w: T * 3, h: T },
    { x: T * 42, y: GROUND_Y - T * 5, w: T * 2, h: T },
  ],
  enemies: [
    { x: T * 12, y: GROUND_Y - T, patrolW: T * 4 },
    { x: T * 19, y: GROUND_Y - T * 4, patrolW: T * 2 },
    { x: T * 26, y: GROUND_Y - T, patrolW: T * 5 },
    { x: T * 30, y: GROUND_Y - T * 4, patrolW: T * 2 },
    { x: T * 38, y: GROUND_Y - T, patrolW: T * 4 },
  ],
  coins: [
    { x: T * 5, y: GROUND_Y - T * 5 },
    { x: T * 11, y: GROUND_Y - T * 4 },
    { x: T * 12, y: GROUND_Y - T * 4 },
    { x: T * 15, y: GROUND_Y - T * 6 },
    { x: T * 19, y: GROUND_Y - T * 5 },
    { x: T * 25, y: GROUND_Y - T * 7 },
    { x: T * 29, y: GROUND_Y - T * 5 },
    { x: T * 34, y: GROUND_Y - T * 6 },
    { x: T * 38, y: GROUND_Y - T * 5 },
    { x: T * 39, y: GROUND_Y - T * 5 },
    { x: T * 42, y: GROUND_Y - T * 7 },
  ],
  finish: { x: T * 46, y: GROUND_Y - T * 2 },
  playerStart: { x: T * 2, y: GROUND_Y - T * 2 },
};

export default Level2;