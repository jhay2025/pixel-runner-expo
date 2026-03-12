import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import MenuScreen from './src/screens/MenuScreen';
import GameScreen from './src/screens/GameScreen';
import GameOverScreen from './src/screens/GameOverScreen';

export default function App() {
  const [screen, setScreen] = useState('menu');
  const [finalScore, setFinalScore] = useState(0);
  const [won, setWon] = useState(false);

  const startGame = () => setScreen('game');
  const goMenu = () => { setScreen('menu'); setFinalScore(0); setWon(false); };

  const gameOver = (score) => {
    setFinalScore(score);
    setWon(false);
    setScreen('gameover');
  };

  const gameWin = (score) => {
    setFinalScore(score);
    setWon(true);
    setScreen('gameover');
  };

  return (
    <>
      <StatusBar hidden />
      {screen === 'menu' && <MenuScreen onPlay={startGame} />}
      {screen === 'game' && (
        <GameScreen onMenu={goMenu} onGameOver={gameOver} onWin={gameWin} />
      )}
      {screen === 'gameover' && (
        <GameOverScreen score={finalScore} won={won} onRestart={startGame} onMenu={goMenu} />
      )}
    </>
  );
}