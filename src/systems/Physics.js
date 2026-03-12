import { GRAVITY, JUMP_FORCE, MOVE_SPEED, PLAYER_SIZE, TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT, ENEMY_SPEED } from '../constants';

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

export default function Physics(entities, { touches, dispatch, time }) {
  const player = entities.player;
  const level = entities.level;
  const camera = entities.camera;

  if (!player || !level || player.dead) return entities;

  // Apply controls
  if (player.moveLeft) player.vx = -MOVE_SPEED;
  else if (player.moveRight) player.vx = MOVE_SPEED;
  else player.vx = 0;

  // Apply gravity
  player.vy += GRAVITY;
  if (player.vy > 15) player.vy = 15;

  // Move X
  player.x += player.vx;

  // Collision X with platforms
  const pRect = { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
  for (const plat of level.platforms) {
    if (plat.lava) continue;
    if (rectsOverlap(pRect, plat)) {
      if (player.vx > 0) player.x = plat.x - PLAYER_SIZE;
      else if (player.vx < 0) player.x = plat.x + plat.w;
    }
  }

  // Move Y
  player.y += player.vy;
  player.onGround = false;

  const pRect2 = { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
  for (const plat of level.platforms) {
    if (plat.lava) {
      if (rectsOverlap(pRect2, { x: plat.x, y: plat.y - 5, w: plat.w, h: plat.h + 5 })) {
        dispatch({ type: 'hit' });
        return entities;
      }
      continue;
    }
    if (rectsOverlap(pRect2, plat)) {
      if (player.vy > 0) {
        player.y = plat.y - PLAYER_SIZE;
        player.vy = 0;
        player.onGround = true;
      } else if (player.vy < 0) {
        player.y = plat.y + plat.h;
        player.vy = 0;
      }
    }
  }

  // Jump
  if (player.jumping && player.onGround) {
    player.vy = JUMP_FORCE;
    player.onGround = false;
  }

  // Fall off screen
  if (player.y > SCREEN_HEIGHT + 100) {
    dispatch({ type: 'hit' });
    return entities;
  }

  // Enemies
  if (level.enemies) {
    for (let i = level.enemies.length - 1; i >= 0; i--) {
      const en = level.enemies[i];
      if (en.dead) continue;
      en.x += en.dir * ENEMY_SPEED;
      if (en.x <= en.startX) en.dir = 1;
      if (en.x >= en.startX + en.patrolW) en.dir = -1;

      const eRect = { x: en.x, y: en.y, w: TILE_SIZE * 0.8, h: TILE_SIZE * 0.8 };
      const playerBox = { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };

      if (rectsOverlap(playerBox, eRect)) {
        if (player.vy > 0 && player.y + PLAYER_SIZE - 8 < en.y + TILE_SIZE * 0.4) {
          en.dead = true;
          player.vy = JUMP_FORCE * 0.6;
          dispatch({ type: 'score', points: 100 });
        } else {
          dispatch({ type: 'hit' });
          return entities;
        }
      }
    }
  }

  // Coins
  if (level.coins) {
    for (let i = level.coins.length - 1; i >= 0; i--) {
      const c = level.coins[i];
      if (c.collected) continue;
      const cRect = { x: c.x, y: c.y, w: 24, h: 24 };
      const playerBox = { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
      if (rectsOverlap(playerBox, cRect)) {
        c.collected = true;
        dispatch({ type: 'score', points: 50 });
        dispatch({ type: 'coin' });
      }
    }
  }

  // Finish flag
  if (level.finish) {
    const fRect = { x: level.finish.x, y: level.finish.y, w: TILE_SIZE, h: TILE_SIZE * 2 };
    const playerBox = { x: player.x, y: player.y, w: PLAYER_SIZE, h: PLAYER_SIZE };
    if (rectsOverlap(playerBox, fRect)) {
      dispatch({ type: 'level-complete' });
    }
  }

  // Camera follow
  camera.x = player.x - SCREEN_WIDTH * 0.3;
  if (camera.x < 0) camera.x = 0;

  return entities;
}