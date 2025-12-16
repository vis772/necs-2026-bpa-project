import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

const games = ['Valorant', 'Rocket League', 'Smash'];

export default function GameTabs({ activeTab, onTabPress }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {games.map((game) => (
        <TouchableOpacity
          key={game}
          style={[styles.tab, activeTab === game && styles.tabActive]}
          onPress={() => onTabPress(game)}
        >
          <Text style={[styles.tabText, activeTab === game && styles.tabTextActive]}>
            {game}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  tab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    marginRight: Spacing.sm,
  },
  tabActive: {
    backgroundColor: Colors.accentCyan,
    borderColor: Colors.accentCyan,
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  tabTextActive: {
    color: Colors.bgPrimary,
  },
});


