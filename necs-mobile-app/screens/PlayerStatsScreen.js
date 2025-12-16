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

const filters = ['All', 'Valorant', 'Rocket League', 'Smash Bros'];

const topPlayers = [
  {
    id: 1,
    rank: 1,
    name: 'Alex "Phantom" Chen',
    team: 'Nova Vanguard',
    teamAbbr: 'NV',
    teamColor: '#00f0ff',
    game: 'Valorant',
    mainStat: '1.42',
    mainStatLabel: 'K/D',
    stats: [
      { label: 'ACS', value: '287' },
      { label: 'HS%', value: '31%' },
      { label: 'FK', value: '45' },
    ],
    trend: 'up',
    change: '+2',
  },
  {
    id: 2,
    rank: 2,
    name: 'Ryan "Reaper" Kim',
    team: 'Shadow Elite',
    teamAbbr: 'SE',
    teamColor: '#ff4655',
    game: 'Valorant',
    mainStat: '1.38',
    mainStatLabel: 'K/D',
    stats: [
      { label: 'ACS', value: '271' },
      { label: 'HS%', value: '28%' },
      { label: 'FK', value: '38' },
    ],
    trend: 'same',
    change: '-',
  },
  {
    id: 3,
    rank: 3,
    name: 'Jake "Turbo" Reynolds',
    team: 'Supersonic Racers',
    teamAbbr: 'SR',
    teamColor: '#0080ff',
    game: 'Rocket League',
    mainStat: '24',
    mainStatLabel: 'Goals',
    stats: [
      { label: 'Assists', value: '18' },
      { label: 'Saves', value: '12' },
      { label: 'Shots', value: '58' },
    ],
    trend: 'up',
    change: '+1',
  },
  {
    id: 4,
    rank: 4,
    name: 'Leo "Lightning" Nakamura',
    team: 'Smash Masters',
    teamAbbr: 'SM',
    teamColor: '#e60012',
    game: 'Smash Bros',
    mainStat: '87%',
    mainStatLabel: 'Win Rate',
    stats: [
      { label: 'KOs', value: '156' },
      { label: 'Stocks', value: '2.4' },
      { label: 'Games', value: '24' },
    ],
    trend: 'up',
    change: '+3',
  },
];

const leaderboards = [
  {
    title: 'Most Kills',
    game: 'Valorant',
    color: '#ff4655',
    players: [
      { rank: 1, name: 'Phantom', value: '187' },
      { rank: 2, name: 'Reaper', value: '172' },
      { rank: 3, name: 'Blaze', value: '165' },
    ],
  },
  {
    title: 'Most Goals',
    game: 'Rocket League',
    color: '#0080ff',
    players: [
      { rank: 1, name: 'Turbo', value: '24' },
      { rank: 2, name: 'Flip', value: '21' },
      { rank: 3, name: 'Boost', value: '18' },
    ],
  },
  {
    title: 'Highest Win %',
    game: 'Smash Bros',
    color: '#e60012',
    players: [
      { rank: 1, name: 'Lightning', value: '87%' },
      { rank: 2, name: 'Combo', value: '82%' },
      { rank: 3, name: 'Meteor', value: '78%' },
    ],
  },
];

function FilterPill({ label, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.filterPill, isActive && styles.filterPillActive]}
      onPress={onPress}
    >
      <Text style={[styles.filterPillText, isActive && styles.filterPillTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

function TeamLogo({ abbr, color, size = 40 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{abbr}</Text>
    </View>
  );
}

function PlayerCard({ player }) {
  return (
    <TouchableOpacity style={styles.playerCard} activeOpacity={0.7}>
      <View style={styles.playerHeader}>
        <View style={styles.rankBadge}>
          <Text style={styles.rankText}>#{player.rank}</Text>
        </View>
        <TeamLogo abbr={player.teamAbbr} color={player.teamColor} size={44} />
        <View style={styles.playerInfo}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={styles.playerTeam}>{player.team}</Text>
        </View>
        <View style={styles.mainStatBox}>
          <Text style={styles.mainStatValue}>{player.mainStat}</Text>
          <Text style={styles.mainStatLabel}>{player.mainStatLabel}</Text>
        </View>
      </View>
      
      <View style={styles.statsRow}>
        {player.stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
        <View style={styles.trendItem}>
          {player.trend === 'up' && (
            <Ionicons name="arrow-up" size={16} color={Colors.statusCompleted} />
          )}
          {player.trend === 'down' && (
            <Ionicons name="arrow-down" size={16} color={Colors.statusLive} />
          )}
          {player.trend === 'same' && (
            <Ionicons name="remove" size={16} color={Colors.textMuted} />
          )}
          <Text style={[
            styles.changeText,
            player.trend === 'up' && { color: Colors.statusCompleted },
            player.trend === 'down' && { color: Colors.statusLive },
          ]}>{player.change}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function LeaderboardCard({ leaderboard }) {
  return (
    <View style={styles.leaderboardCard}>
      <View style={[styles.leaderboardHeader, { backgroundColor: leaderboard.color }]}>
        <Text style={styles.leaderboardGame}>{leaderboard.game}</Text>
        <Text style={styles.leaderboardTitle}>{leaderboard.title}</Text>
      </View>
      <View style={styles.leaderboardContent}>
        {leaderboard.players.map((player, index) => (
          <View key={index} style={styles.leaderboardRow}>
            <View style={styles.leaderboardLeft}>
              <View style={[
                styles.leaderboardRank,
                index === 0 && styles.leaderboardRankFirst
              ]}>
                <Text style={[
                  styles.leaderboardRankText,
                  index === 0 && styles.leaderboardRankTextFirst
                ]}>{player.rank}</Text>
              </View>
              <Text style={styles.leaderboardName}>{player.name}</Text>
            </View>
            <Text style={styles.leaderboardValue}>{player.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default function PlayerStatsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = topPlayers.filter(player => {
    const matchesFilter = activeFilter === 'All' || player.game === activeFilter;
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Stats</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="options-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={18} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search players..."
          placeholderTextColor={Colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Filters */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersRow}
      >
        {filters.map(filter => (
          <FilterPill
            key={filter}
            label={filter}
            isActive={activeFilter === filter}
            onPress={() => setActiveFilter(filter)}
          />
        ))}
      </ScrollView>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Top Players */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOP PLAYERS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </View>

        {/* Leaderboards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitlePadded}>LEADERBOARDS</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.leaderboardsRow}
          >
            {leaderboards.map((board, index) => (
              <LeaderboardCard key={index} leaderboard={board} />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerButton: {
    padding: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    paddingVertical: Spacing.sm,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  filtersRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  filterPill: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: '#111',
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: '#222',
  },
  filterPillActive: {
    backgroundColor: Colors.accentCyan,
    borderColor: Colors.accentCyan,
  },
  filterPillText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  filterPillTextActive: {
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
  },
  sectionTitlePadded: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
    letterSpacing: 1,
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    color: Colors.accentCyan,
    fontWeight: '600',
  },
  teamLogo: {
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    fontWeight: '700',
    color: '#000',
  },
  playerCard: {
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accentCyan,
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
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  mainStatBox: {
    alignItems: 'flex-end',
  },
  mainStatValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.accentCyan,
  },
  mainStatLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#0a0a0a',
    borderRadius: BorderRadius.sm,
    padding: Spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  statLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  trendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: Spacing.sm,
  },
  changeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  leaderboardsRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  leaderboardCard: {
    width: 200,
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  leaderboardHeader: {
    padding: Spacing.md,
  },
  leaderboardGame: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: 'rgba(0,0,0,0.6)',
    textTransform: 'uppercase',
  },
  leaderboardTitle: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: '#000',
    marginTop: 2,
  },
  leaderboardContent: {
    padding: Spacing.sm,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  leaderboardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  leaderboardRank: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leaderboardRankFirst: {
    backgroundColor: Colors.accentYellow,
  },
  leaderboardRankText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  leaderboardRankTextFirst: {
    color: '#000',
  },
  leaderboardName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  leaderboardValue: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.accentCyan,
  },
});
