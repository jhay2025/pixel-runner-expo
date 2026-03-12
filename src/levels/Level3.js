import { TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT, GROUND_Y } from '../constants';

const T = TILE_SIZE;

export const Level3 = {
  name: 'Sky Fortress',
  bg: ['#0a1a2e', '#1e3a5e'],
  platforms: [
    { x: 0, y: GROUND_Y, w: T * 5, h: T, ground: true },
    { x: T * 3, y: GROUND_Y - T * 3, w: T * 2, h: T },
    { x: T * 7, y: GROUND_Y - T * 2, w: T * 2, h: T },
    { x: T * 11, y: GROUND_Y - T * 4, w: T * 3, h: T },
    { x: T * 16, y: GROUND_Y - T * 3, w: T * 2, h: T },
    { x: T * 14, y: GROUND_Y, w: T * 2, h: T, lava: true },
    { x: T * 16, y: GROUND_Y, w: T * 6, h: T, ground: true },
    { x: T * 20, y: GROUND_Y - T * 5, w: T * 2, h: T },
    { x: T * 24, y: GROUND_Y - T * 3, w: T * 3, h: T },
    { x: T * 22, y: GROUND_Y, w: T * 2, h: T, lava: true },
    { x: T * 24, y: GROUND_Y, w: T * 8, h: T, ground: true },
    { x: T * 29, y: GROUND_Y - T * 6, w: T * 2, h: T },
    { x: T * 33, y: GROUND_Y - T * 4, w: T * 3, h: T },
    { x: T * 32, y: GROUND_Y, w: T * 2, h: T, lava: true },
    { x: T * 34, y: GROUND_Y, w: T * 8, h: T, ground: true },
    { x: T * 38, y: GROUND_Y - T * 3, w: T * 2, h: T },
    { x: T * 42, y: GROUND_Y - T * 5, w: T * 3, h: T },
    { x: T * 42, y: GROUND_Y, w: T * 10, h: T, ground: true },
    { x: T * 47, y: GROUND_Y - T * 3, w: T * 2, h: T },
  ],
  enemies: [
    { x: T * 12, y: GROUND_Y - T * 5, patrolW: T * 2 },
    { x: T * 17, y: GROUND_Y - T, patrolW: T * 4 },
    { x: T * 25, y: GROUND_Y - T * 4, patrolW: T * 2 },
    { x: T * 27, y: GROUND_Y - T, patrolW: T * 4 },
    { x: T * 34, y: GROUND_Y - T * 5, patrolW: T * 2 },
    { x: T * 36, y: GROUND_Y - T, patrolW: T * 4 },
    { x: T * 44, y: GROUND_Y - T, patrolW: T * 5 },
  ],
  coins: [
    { x: T * 4, y: GROUND_Y - T * 5 },
    { x: T * 8, y: GROUND_Y - T * 4 },
    { x: T * 12, y: GROUND_Y - T * 6 },
    { x: T * 13, y: GROUND_Y - T * 6 },
    { x: T * 17, y: GROUND_Y - T * 5 },
    { x: T * 21, y: GROUND_Y - T * 7 },
    { x: T * 25, y: GROUND_Y - T * 5 },
    { x: T * 26, y: GROUND_Y - T * 5 },
    { x: T * 30, y: GROUND_Y - T * 8 },
    { x: T * 34, y: GROUND_Y - T * 6 },
    { x: T * 39, y: GROUND_Y - T * 5 },
    { x: T * 43, y: GROUND_Y - T * 7 },
    { x: T * 44, y: GROUND_Y - T * 7 },
    { x: T * 48, y: GROUND_Y - T * 5 },
  ],
  finish: { x: T * 50, y: GROUND_Y - T * 2 },
  playerStart: { x: T * 2, y: GROUND_Y - T * 2 },
};

export default Level3;