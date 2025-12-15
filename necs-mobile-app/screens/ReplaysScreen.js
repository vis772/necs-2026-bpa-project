import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';

const { width } = Dimensions.get('window');
const cardWidth = (width - Spacing.lg * 2 - Spacing.md) / 2;

const filters = ['All', 'Valorant', 'Rocket League', 'Smash', 'Top Plays', 'Full Match'];

const replaysData = [
  {
    id: 1,
    title: 'NV vs SE - Quarterfinal 1',
    game: 'Valorant',
    date: 'May 8',
    duration: '32:15',
    type: 'match',
  },
  {
    id: 2,
    title: 'Phantom 4K Ace Clutch',
    game: 'Top Play',
    date: 'May 8',
    duration: '0:42',
    type: 'highlight',
  },
  {
    id: 3,
    title: 'SR vs AE - Semifinal 1',
    game: 'Rocket League',
    date: 'May 8',
    duration: '18:24',
    type: 'match',
  },
  {
    id: 4,
    title: 'Insane Aerial Goal',
    game: 'Top Play',
    date: 'May 8',
    duration: '1:15',
    type: 'highlight',
  },
  {
    id: 5,
    title: 'SM vs KB - Semifinal',
    game: 'Smash Bros',
    date: 'May 8',
    duration: '25:08',
    type: 'match',
  },
  {
    id: 6,
    title: 'Lightning 0-Death Combo',
    game: 'Top Play',
    date: 'May 8',
    duration: '0:28',
    type: 'highlight',
  },
  {
    id: 7,
    title: 'TF vs CG - Group Stage',
    game: 'Valorant',
    date: 'May 7',
    duration: '45:32',
    type: 'match',
  },
  {
    id: 8,
    title: 'BO vs GS - Group Stage',
    game: 'Rocket League',
    date: 'May 6',
    duration: '22:17',
    type: 'match',
  },
];

function FilterChip({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.filterChip, isActive && styles.filterChipActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterText, isActive && styles.filterTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

function ReplayCard({ replay }) {
  return (
    <TouchableOpacity style={styles.replayCard}>
      <View style={styles.thumbnail}>
        <View style={styles.playButton}>
          <Ionicons name="play" size={16} color={Colors.accentCyan} />
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{replay.duration}</Text>
        </View>
      </View>
      <View style={styles.replayInfo}>
        <Text style={styles.replayTitle} numberOfLines={2}>
          {replay.title}
        </Text>
        <Text style={styles.replayMeta}>
          {replay.game} • {replay.date}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

export default function ReplaysScreen() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredReplays = replaysData.filter((replay) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Top Plays') return replay.type === 'highlight';
    if (activeFilter === 'Full Match') return replay.type === 'match';
    return replay.game.includes(activeFilter);
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Match"
        highlightedWord="Replays"
        subtitle="Watch the best moments"
      />

      {/* Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <FilterChip
            key={filter}
            label={filter}
            isActive={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      {/* Replays Grid */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.gridContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.grid}>
          {filteredReplays.map((replay) => (
            <ReplayCard key={replay.id} replay={replay} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  scrollView: {
    flex: 1,
  },
  filtersContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  filterChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    marginRight: Spacing.sm,
  },
  filterChipActive: {
    backgroundColor: Colors.accentCyan,
    borderColor: Colors.accentCyan,
  },
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  filterTextActive: {
    color: Colors.bgPrimary,
  },
  gridContainer: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  replayCard: {
    width: cardWidth,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    overflow: 'hidden',
    marginBottom: Spacing.md,
  },
  thumbnail: {
    width: '100%',
    aspectRatio: 16 / 9,
    backgroundColor: Colors.bgElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderWidth: 2,
    borderColor: Colors.accentCyan,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  durationText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
    fontFamily: 'monospace',
  },
  replayInfo: {
    padding: Spacing.md,
  },
  replayTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  replayMeta: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
});

