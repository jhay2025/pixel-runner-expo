import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

export default function Controls({ onLeftStart, onLeftEnd, onRightStart, onRightEnd, onJumpStart, onJumpEnd }) {
  return (
    <View style={styles.controls} pointerEvents="box-none">
      <View style={styles.dpad}>
        <TouchableOpacity
          style={[styles.btn, styles.btnLeft]}
          onPressIn={onLeftStart}
          onPressOut={onLeftEnd}
          activeOpacity={0.6}
        >
          <Text style={styles.btnText}>◀</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.btnRight]}
          onPressIn={onRightStart}
          onPressOut={onRightEnd}
          activeOpacity={0.6}
        >
          <Text style={styles.btnText}>▶</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[styles.btn, styles.btnJump]}
        onPressIn={onJumpStart}
        onPressOut={onJumpEnd}
        activeOpacity={0.6}
      >
        <Text style={styles.jumpText}>▲</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: {
    position: 'absolute', bottom: 12, left: 12, right: 12,
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end',
  },
  dpad: { flexDirection: 'row', gap: 8 },
  btn: {
    width: 60, height: 60, borderRadius: 30,
    justifyContent: 'center', alignItems: 'center',
    opacity: 0.7,
  },
  btnLeft: { backgroundColor: COLORS.btnLeft },
  btnRight: { backgroundColor: COLORS.btnRight },
  btnJump: { backgroundColor: COLORS.btnJump, width: 70, height: 70, borderRadius: 35 },
  btnText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  jumpText: { color: '#000', fontSize: 28, fontWeight: 'bold' },
});