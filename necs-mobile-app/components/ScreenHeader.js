import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes } from '../constants/theme';

export default function ScreenHeader({ title, highlightedWord, subtitle }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title}{' '}
        {highlightedWord && (
          <Text style={styles.highlighted}>{highlightedWord}</Text>
        )}
      </Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing['3xl'],
    paddingBottom: Spacing.base,
  },
  title: {
    fontSize: FontSizes['3xl'],
    fontWeight: '700',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  highlighted: {
    color: Colors.accentCyan,
  },
  subtitle: {
    fontSize: FontSizes.base,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
});


