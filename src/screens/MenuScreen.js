import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Dimensions } from 'react-native';
import { COLORS, SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants';

export default function MenuScreen({ onPlay }) {
  return (
    <View style={styles.container}>
      <View style={styles.stars}>
        {Array.from({ length: 30 }).map((_, i) => (
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
        <Text style={styles.titleTop}>PIXEL</Text>
        <Text style={styles.titleBot}>RUNNER</Text>
        <Text style={styles.subtitle}>🤖 Robot Adventures 🤖</Text>

        <TouchableOpacity style={styles.playBtn} onPress={onPlay} activeOpacity={0.8}>
          <Text style={styles.playText}>▶  PLAY</Text>
        </TouchableOpacity>

        <View style={styles.info}>
          <Text style={styles.infoText}>🎮 3 Niveles  |  🪙 Monedas  |  👾 Enemigos</Text>
        </View>

        <View style={styles.controls}>
          <Text style={styles.ctrlTitle}>Controles:</Text>
          <Text style={styles.ctrlText}>◀ ▶ Mover  |  ▲ Saltar</Text>
          <Text style={styles.ctrlText}>🐾 Salta sobre enemigos para eliminarlos</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.bg1, justifyContent: 'center', alignItems: 'center' },
  stars: { ...StyleSheet.absoluteFillObject },
  star: { position: 'absolute', backgroundColor: '#fff', borderRadius: 2 },
  content: { alignItems: 'center', zIndex: 10 },
  titleTop: {
    fontSize: 52, fontWeight: '900', color: COLORS.textAccent,
    letterSpacing: 12, textShadowColor: COLORS.playerAccent,
    textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20,
  },
  titleBot: {
    fontSize: 52, fontWeight: '900', color: COLORS.coin,
    letterSpacing: 12, marginTop: -8,
    textShadowColor: COLORS.coinShine,
    textShadowOffset: { width: 0, height: 0 }, textShadowRadius: 20,
  },
  subtitle: { color: '#aaa', fontSize: 14, marginTop: 8, letterSpacing: 2 },
  playBtn: {
    backgroundColor: COLORS.textAccent, paddingHorizontal: 48, paddingVertical: 14,
    borderRadius: 30, marginTop: 30,
    shadowColor: COLORS.textAccent, shadowRadius: 20, shadowOpacity: 0.5,
    elevation: 10,
  },
  playText: { color: '#000', fontSize: 22, fontWeight: 'bold', letterSpacing: 4 },
  info: { marginTop: 24 },
  infoText: { color: '#888', fontSize: 12, letterSpacing: 1 },
  controls: { marginTop: 20, alignItems: 'center' },
  ctrlTitle: { color: COLORS.textAccent, fontSize: 13, fontWeight: 'bold', marginBottom: 4 },
  ctrlText: { color: '#666', fontSize: 11, marginTop: 2 },
});