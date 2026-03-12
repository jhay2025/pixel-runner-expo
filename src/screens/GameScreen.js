import React, { useState, useRef, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { GameEngine } from 'react-native-game-engine';
import Physics from '../systems/Physics';
import { PLAYER_SIZE, TILE_SIZE, SCREEN_WIDTH, SCREEN_HEIGHT, COLORS, COIN_SIZE } from '../constants';
import Level1 from '../levels/Level1';
import Level2 from '../levels/Level2';
import Level3 from '../levels/Level3';
import Controls from '../components/Controls';

const LEVELS = [Level1, Level2, Level3];

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function initLevel(lvlIndex) {
  const src = LEVELS[lvlIndex];
  const lvl = deepCopy(src);
  lvl.enemies = lvl.enemies.map(e => ({ ...e, startX: e.x, dir: 1, dead: false }));
  lvl.coins = lvl.coins.map(c => ({ ...c, collected: false }));
  return lvl;
}

export default function GameScreen({ onMenu, onGameOver, onWin }) {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [coins, setCoins] = useState(0);
  const [running, setRunning] = useState(true);
  const [showLevelText, setShowLevelText] = useState(true);
  const engineRef = useRef(null);
  const playerRef = useRef(null);

  const setupEntities = useCallback(() => {
    const lvl = initLevel(currentLevel);
    const p = {
      x: lvl.playerStart.x,
      y: lvl.playerStart.y,
      vx: 0,
      vy: 0,
      onGround: false,
      jumping: false,
      moveLeft: false,
      moveRight: false,
      dead: false,
      facing: 1,
    };
    playerRef.current = p;
    return {
      player: p,
      level: lvl,
      camera: { x: 0 },
    };
  }, [currentLevel]);

  const [entities, setEntities] = useState(setupEntities);

  useEffect(() => {
    setEntities(setupEntities());
    setRunning(true);
    setShowLevelText(true);
    const t = setTimeout(() => setShowLevelText(false), 2000);
    return () => clearTimeout(t);
  }, [currentLevel, setupEntities]);

  const onEvent = (e) => {
    if (e.type === 'hit') {
      const newLives = lives - 1;
      setLives(newLives);
      if (newLives <= 0) {
        setRunning(false);
        onGameOver(score);
      } else {
        setEntities(setupEntities());
      }
    } else if (e.type === 'score') {
      setScore(s => s + e.points);
    } else if (e.type === 'coin') {
      setCoins(c => c + 1);
    } else if (e.type === 'level-complete') {
      if (currentLevel < LEVELS.length - 1) {
        setCurrentLevel(c => c + 1);
      } else {
        setRunning(false);
        onWin(score);
      }
    }
  };

  const cam = entities.camera || { x: 0 };
  const lvl = entities.level;
  const player = entities.player;

  return (
    <View style={styles.container}>
      {/* Background */}
      <View style={[styles.bg, { backgroundColor: lvl?.bg?.[0] || COLORS.bg1 }]} />

      {/* Game World */}
      <View style={[styles.world, { transform: [{ translateX: -cam.x }] }]}>

        {/* Platforms */}
        {lvl?.platforms?.map((p, i) => (
          <View key={`p${i}`} style={[
            styles.platform,
            {
              left: p.x, top: p.y, width: p.w, height: p.h,
              backgroundColor: p.lava ? COLORS.lava : p.ground ? COLORS.ground : COLORS.platform,
              borderTopWidth: 2,
              borderTopColor: p.lava ? '#ff8800' : p.ground ? COLORS.groundTop : COLORS.platformTop,
            }
          ]} />
        ))}

        {/* Coins */}
        {lvl?.coins?.filter(c => !c.collected).map((c, i) => (
          <View key={`c${i}`} style={[
            styles.coin,
            { left: c.x, top: c.y }
          ]}>
            <Text style={styles.coinText}>●</Text>
          </View>
        ))}

        {/* Enemies */}
        {lvl?.enemies?.filter(e => !e.dead).map((e, i) => (
          <View key={`e${i}`} style={[
            styles.enemy,
            { left: e.x, top: e.y }
          ]}>
            <View style={styles.enemyBody}>
              <View style={styles.enemyEyeL} />
              <View style={styles.enemyEyeR} />
            </View>
          </View>
        ))}

        {/* Finish Flag */}
        {lvl?.finish && (
          <View style={[styles.flag, { left: lvl.finish.x, top: lvl.finish.y }]}>
            <View style={styles.flagPole} />
            <View style={styles.flagBanner}><Text style={styles.flagText}>⚑</Text></View>
          </View>
        )}

        {/* Player */}
        {player && !player.dead && (
          <View style={[
            styles.player,
            { left: player.x, top: player.y, transform: [{ scaleX: player.facing || 1 }] }
          ]}>
            <View style={styles.playerHead}>
              <View style={styles.playerVisor} />
            </View>
            <View style={styles.playerBody} />
          </View>
        )}
      </View>

      {/* Game Engine (invisible, just runs physics) */}
      <GameEngine
        ref={engineRef}
        style={styles.engine}
        systems={[Physics]}
        entities={entities}
        running={running}
        onEvent={onEvent}
      />

      {/* HUD */}
      <View style={styles.hud}>
        <View style={styles.hudRow}>
          <Text style={styles.hudText}>{'❤️'.repeat(lives)}</Text>
          <Text style={styles.hudScore}>⭐ {score}</Text>
          <Text style={styles.hudCoins}>🪙 {coins}</Text>
        </View>
        <Text style={styles.hudLevel}>{LEVELS[currentLevel]?.name}</Text>
      </View>

      {/* Level Title */}
      {showLevelText && (
        <View style={styles.levelOverlay}>
          <Text style={styles.levelTitle}>Level {currentLevel + 1}</Text>
          <Text style={styles.levelName}>{LEVELS[currentLevel]?.name}</Text>
        </View>
      )}

      {/* Controls */}
      <Controls
        onLeftStart={() => { if(playerRef.current) { playerRef.current.moveLeft = true; playerRef.current.facing = -1; } }}
        onLeftEnd={() => { if(playerRef.current) playerRef.current.moveLeft = false; }}
        onRightStart={() => { if(playerRef.current) { playerRef.current.moveRight = true; playerRef.current.facing = 1; } }}
        onRightEnd={() => { if(playerRef.current) playerRef.current.moveRight = false; }}
        onJumpStart={() => { if(playerRef.current) playerRef.current.jumping = true; }}
        onJumpEnd={() => { if(playerRef.current) playerRef.current.jumping = false; }}
      />
    </View>
  );
}

const S = PLAYER_SIZE;
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg1 },
  bg: { ...StyleSheet.absoluteFillObject },
  world: { ...StyleSheet.absoluteFillObject },
  engine: { position: 'absolute', width: 0, height: 0 },
  platform: { position: 'absolute', borderRadius: 2 },
  coin: { position: 'absolute', width: COIN_SIZE, height: COIN_SIZE, justifyContent: 'center', alignItems: 'center' },
  coinText: { color: COLORS.coin, fontSize: 20, fontWeight: 'bold' },
  enemy: { position: 'absolute', width: TILE_SIZE * 0.8, height: TILE_SIZE * 0.8 },
  enemyBody: {
    flex: 1, backgroundColor: COLORS.enemy, borderRadius: 6,
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 4, paddingTop: 4,
  },
  enemyEyeL: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginRight: 2 },
  enemyEyeR: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginLeft: 2 },
  flag: { position: 'absolute', width: TILE_SIZE, height: TILE_SIZE * 2 },
  flagPole: { position: 'absolute', left: TILE_SIZE / 2 - 2, width: 4, height: TILE_SIZE * 2, backgroundColor: '#888' },
  flagBanner: { position: 'absolute', left: TILE_SIZE / 2 + 2, top: 4 },
  flagText: { fontSize: 28, color: '#00f5d4' },
  player: { position: 'absolute', width: S, height: S },
  playerHead: {
    width: S * 0.7, height: S * 0.45, backgroundColor: COLORS.player,
    borderRadius: 6, alignSelf: 'center', justifyContent: 'center', alignItems: 'center',
  },
  playerVisor: {
    width: S * 0.45, height: S * 0.15, backgroundColor: COLORS.playerAccent,
    borderRadius: 3, marginTop: 2,
  },
  playerBody: {
    width: S * 0.5, height: S * 0.5, backgroundColor: COLORS.player,
    borderRadius: 4, alignSelf: 'center', marginTop: 1,
    borderWidth: 1, borderColor: COLORS.playerAccent,
  },
  hud: { position: 'absolute', top: 8, left: 12, right: 12 },
  hudRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  hudText: { fontSize: 18 },
  hudScore: { color: COLORS.textAccent, fontSize: 16, fontWeight: 'bold' },
  hudCoins: { color: COLORS.coin, fontSize: 16, fontWeight: 'bold' },
  hudLevel: { color: '#aaa', fontSize: 11, marginTop: 2 },
  levelOverlay: {
    ...StyleSheet.absoluteFillObject, justifyContent: 'center', alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  levelTitle: { color: COLORS.textAccent, fontSize: 36, fontWeight: 'bold' },
  levelName: { color: '#fff', fontSize: 20, marginTop: 8 },
});