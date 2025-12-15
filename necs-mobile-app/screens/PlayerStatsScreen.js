import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import GameTabs from '../components/GameTabs';

const playersData = {
  'Valorant': [
    {
      id: 1,
      name: 'Alex "Phantom" Chen',
      team: 'Nova Vanguard',
      role: 'Duelist',
      initials: 'AC',
      stats: { kd: '1.42', acs: '287', hs: '31%' },
      color: ['#00f0ff', '#8b5cf6'],
    },
    {
      id: 2,
      name: 'Ryan "Reaper" Kim',
      team: 'Shadow Elite',
      role: 'Duelist',
      initials: 'RK',
      stats: { kd: '1.38', acs: '271', hs: '28%' },
      color: ['#ff4655', '#ff6b6b'],
    },
    {
      id: 3,
      name: 'Nathan "Blaze" Harris',
      team: 'Titan Force',
      role: 'Duelist',
      initials: 'NH',
      stats: { kd: '1.35', acs: '264', hs: '33%' },
      color: ['#8b5cf6', '#a78bfa'],
    },
    {
      id: 4,
      name: 'Yuki "Storm" Tanaka',
      team: 'Nova Vanguard',
      role: 'Controller',
      initials: 'YT',
      stats: { kd: '1.12', acs: '198', hs: '22%' },
      color: ['#22c55e', '#4ade80'],
    },
  ],
  'Rocket League': [
    {
      id: 5,
      name: 'Jake "Turbo" Reynolds',
      team: 'Supersonic Racers',
      role: 'Striker',
      initials: 'JR',
      stats: { goals: '24', assists: '18', saves: '12' },
      color: ['#0080ff', '#60a5fa'],
    },
  ],
  'Smash': [
    {
      id: 6,
      name: 'Leo "Lightning" Nakamura',
      team: 'Smash Masters',
      role: 'Main: Fox',
      initials: 'LN',
      stats: { winrate: '87%', stocks: '2.4', ko: '156' },
      color: ['#e60012', '#ff4444'],
    },
  ],
};

const leaderboardData = [
  { label: 'Most Kills', value: 'Phantom • 187' },
  { label: 'Highest K/D', value: 'Phantom • 1.42' },
  { label: 'Most Aces', value: 'Reaper • 4' },
  { label: 'Most Clutches', value: 'Blaze • 12' },
  { label: 'Highest HS%', value: 'Blaze • 33%' },
];

function PlayerCard({ player }) {
  return (
    <TouchableOpacity style={styles.playerCard}>
      <View style={[styles.playerAvatar, { backgroundColor: player.color[0] }]}>
        <Text style={styles.playerInitials}>{player.initials}</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerTeam}>{player.team}</Text>
        <View style={styles.statsRow}>
          {Object.entries(player.stats).map(([key, value]) => (
            <View key={key} style={styles.statItem}>
              <Text style={styles.statLabel}>{key.toUpperCase()}:</Text>
              <Text style={styles.statValue}>{value}</Text>
            </View>
          ))}
        </View>
      </View>
      <View style={styles.roleBadge}>
        <Text style={styles.roleText}>{player.role}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function PlayerStatsScreen() {
  const [activeGame, setActiveGame] = useState('Valorant');
  const [searchQuery, setSearchQuery] = useState('');
  const players = playersData[activeGame] || [];

  const filteredPlayers = players.filter((player) =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Player"
        highlightedWord="Stats"
        subtitle="Top performers this tournament"
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search players..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <GameTabs activeTab={activeGame} onTabPress={setActiveGame} />

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Players List */}
        {filteredPlayers.map((player) => (
          <PlayerCard key={player.id} player={player} />
        ))}

        {/* Leaderboard Section */}
        <View style={styles.leaderboardSection}>
          <Text style={styles.sectionTitle}>Tournament Leaders</Text>
          <View style={styles.leaderboardCard}>
            {leaderboardData.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.leaderboardRow,
                  index < leaderboardData.length - 1 && styles.leaderboardRowBorder,
                ]}
              >
                <Text style={styles.leaderboardLabel}>{item.label}</Text>
                <Text style={styles.leaderboardValue}>{item.value}</Text>
              </View>
            ))}
          </View>
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
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    paddingHorizontal: Spacing.base,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.md,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  playerAvatar: {
    width: 56,
    height: 56,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  playerInitials: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.bgPrimary,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  playerTeam: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.xs,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  statValue: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.accentCyan,
  },
  roleBadge: {
    backgroundColor: Colors.bgElevated,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  roleText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  leaderboardSection: {
    marginTop: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  leaderboardCard: {
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    overflow: 'hidden',
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  leaderboardRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  leaderboardLabel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  leaderboardValue: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
});

