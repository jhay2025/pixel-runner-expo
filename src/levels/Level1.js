import { TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT, GROUND_Y } from '../constants';

const T = TILE_SIZE;

export const Level1 = {
  name: 'Forest Ruins',
  bg: ['#0a1628', '#1a2a4e'],
  platforms: [
    { x: 0, y: GROUND_Y, w: SCREEN_WIDTH * 3, h: T, ground: true },
    { x: T * 4, y: GROUND_Y - T * 3, w: T * 3, h: T },
    { x: T * 9, y: GROUND_Y - T * 2, w: T * 2, h: T },
    { x: T * 13, y: GROUND_Y - T * 4, w: T * 4, h: T },
    { x: T * 19, y: GROUND_Y - T * 3, w: T * 2, h: T },
    { x: T * 23, y: GROUND_Y - T * 2, w: T * 3, h: T },
    { x: T * 28, y: GROUND_Y - T * 5, w: T * 3, h: T },
    { x: T * 33, y: GROUND_Y - T * 3, w: T * 4, h: T },
    { x: T * 39, y: GROUND_Y - T * 2, w: T * 2, h: T },
  ],
  enemies: [
    { x: T * 6, y: GROUND_Y - T, patrolW: T * 4 },
    { x: T * 15, y: GROUND_Y - T * 5, patrolW: T * 3 },
    { x: T * 25, y: GROUND_Y - T, patrolW: T * 5 },
    { x: T * 35, y: GROUND_Y - T * 4, patrolW: T * 3 },
  ],
  coins: [
    { x: T * 5, y: GROUND_Y - T * 5 },
    { x: T * 6, y: GROUND_Y - T * 5 },
    { x: T * 10, y: GROUND_Y - T * 4 },
    { x: T * 14, y: GROUND_Y - T * 6 },
    { x: T * 15, y: GROUND_Y - T * 6 },
    { x: T * 16, y: GROUND_Y - T * 6 },
    { x: T * 20, y: GROUND_Y - T * 5 },
    { x: T * 24, y: GROUND_Y - T * 4 },
    { x: T * 29, y: GROUND_Y - T * 7 },
    { x: T * 34, y: GROUND_Y - T * 5 },
  ],
  finish: { x: T * 42, y: GROUND_Y - T * 2 },
  playerStart: { x: T * 2, y: GROUND_Y - T * 2 },
};

export default Level1;