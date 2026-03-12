import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export default function GameOverScreen({ score, won, onRestart, onMenu }) {
  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: 20 }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.star,
              {
                left: Math.random() * SCREEN_WIDTH,
                top: Math.random() * SCREEN_HEIGHT * 0.7,
                width: Math.random() * 3 + 1,
                height: Math.random() * 3 + 1,
                opacity: Math.random() * 0.7 + 0.3,
              },
            ]}
          />
        ))}
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, won && styles.titleWin]}>
          {won ? '🎉 ¡VICTORIA!' : '💀 GAME OVER'}
        </Text>
        {won && <Text style={styles.winSub}>¡Has completado los 3 niveles!</Text>}
        <Text style={styles.score}>Puntuación: {score}</Text>

        <TouchableOpacity style={styles.btn} onPress={onRestart} activeOpacity={0.8}>
          <Text style={styles.btnText}>🔄  Reintentar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.btnMenu]} onPress={onMenu} activeOpacity={0.8}>
          <Text style={styles.btnTextMenu}>🏠  Menú</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg1, justifyContent: 'center', alignItems: 'center' },
  stars: { ...StyleSheet.absoluteFillObject },
  star: { position: 'absolute', backgroundColor: '#fff', borderRadius: 2 },
  content: { alignItems: 'center', zIndex: 10 },
  title: {
    fontSize: 42, fontWeight: '900', color: COLORS.enemy,
    textShadowColor: COLORS.enemy, textShadowRadius: 20,
    textShadowOffset: { width: 0, height: 0 },
  },
  titleWin: {
    color: COLORS.coin,
    textShadowColor: COLORS.coinShine,
  },
  winSub: { color: COLORS.textAccent, fontSize: 16, marginTop: 8 },
  score: { color: '#fff', fontSize: 22, marginTop: 16, fontWeight: 'bold' },
  btn: {
    backgroundColor: COLORS.textAccent, paddingHorizontal: 36, paddingVertical: 12,
    borderRadius: 25, marginTop: 24,
  },
  btnText: { color: '#000', fontSize: 18, fontWeight: 'bold' },
  btnMenu: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#555', marginTop: 12 },
  btnTextMenu: { color: '#aaa', fontSize: 16 },
});