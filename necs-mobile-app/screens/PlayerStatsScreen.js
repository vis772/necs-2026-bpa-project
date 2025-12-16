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
    name: 'Phantom',
    fullName: 'Alex Chen',
    team: 'Nova Vanguard',
    teamAbbr: 'NV',
    teamColor: '#00f0ff',
    game: 'Valorant',
    mainStat: '1.42',
    mainStatLabel: 'K/D',
    trend: 'up',
  },
  {
    id: 2,
    rank: 2,
    name: 'Reaper',
    fullName: 'Ryan Kim',
    team: 'Shadow Elite',
    teamAbbr: 'SE',
    teamColor: '#ff4655',
    game: 'Valorant',
    mainStat: '1.38',
    mainStatLabel: 'K/D',
    trend: 'same',
  },
  {
    id: 3,
    rank: 3,
    name: 'Turbo',
    fullName: 'Jake Reynolds',
    team: 'Supersonic Racers',
    teamAbbr: 'SR',
    teamColor: '#0080ff',
    game: 'Rocket League',
    mainStat: '24',
    mainStatLabel: 'Goals',
    trend: 'up',
  },
  {
    id: 4,
    rank: 4,
    name: 'Lightning',
    fullName: 'Leo Nakamura',
    team: 'Smash Masters',
    teamAbbr: 'SM',
    teamColor: '#e60012',
    game: 'Smash Bros',
    mainStat: '87%',
    mainStatLabel: 'Win Rate',
    trend: 'up',
  },
  {
    id: 5,
    rank: 5,
    name: 'Blaze',
    fullName: 'Nathan Harris',
    team: 'Titan Force',
    teamAbbr: 'TF',
    teamColor: '#ffd700',
    game: 'Valorant',
    mainStat: '1.35',
    mainStatLabel: 'K/D',
    trend: 'down',
  },
  {
    id: 6,
    rank: 6,
    name: 'Flip',
    fullName: 'Dylan Hughes',
    team: 'Aerial Experts',
    teamAbbr: 'AE',
    teamColor: '#8b5cf6',
    game: 'Rocket League',
    mainStat: '21',
    mainStatLabel: 'Goals',
    trend: 'up',
  },
];

const statCategories = [
  { id: 'kills', label: 'Most Kills', game: 'Valorant', data: [
    { name: 'Phantom', value: '187', team: 'NV', color: '#00f0ff' },
    { name: 'Reaper', value: '172', team: 'SE', color: '#ff4655' },
    { name: 'Blaze', value: '165', team: 'TF', color: '#ffd700' },
  ]},
  { id: 'kd', label: 'Highest K/D', game: 'Valorant', data: [
    { name: 'Phantom', value: '1.42', team: 'NV', color: '#00f0ff' },
    { name: 'Reaper', value: '1.38', team: 'SE', color: '#ff4655' },
    { name: 'Blaze', value: '1.35', team: 'TF', color: '#ffd700' },
  ]},
  { id: 'goals', label: 'Most Goals', game: 'Rocket League', data: [
    { name: 'Turbo', value: '24', team: 'SR', color: '#0080ff' },
    { name: 'Flip', value: '21', team: 'AE', color: '#8b5cf6' },
    { name: 'Boost', value: '18', team: 'BO', color: '#22c55e' },
  ]},
  { id: 'winrate', label: 'Win Rate', game: 'Smash Bros', data: [
    { name: 'Lightning', value: '87%', team: 'SM', color: '#e60012' },
    { name: 'Combo', value: '82%', team: 'KB', color: '#ff00aa' },
    { name: 'Meteor', value: '78%', team: 'SC', color: '#22c55e' },
  ]},
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

function PlayerCard({ player }) {
  return (
    <TouchableOpacity style={styles.playerCard} activeOpacity={0.7}>
      <View style={styles.playerRank}>
        <Text style={styles.rankNumber}>{player.rank}</Text>
      </View>
      <View style={[styles.playerAvatar, { backgroundColor: player.teamColor }]}>
        <Text style={styles.avatarText}>{player.name.charAt(0)}</Text>
      </View>
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerTeam}>{player.team}</Text>
      </View>
      <View style={styles.playerStat}>
        <Text style={styles.statValue}>{player.mainStat}</Text>
        <Text style={styles.statLabel}>{player.mainStatLabel}</Text>
      </View>
      <View style={styles.trendIcon}>
        {player.trend === 'up' && <Ionicons name="caret-up" size={16} color={Colors.statusCompleted} />}
        {player.trend === 'down' && <Ionicons name="caret-down" size={16} color={Colors.statusLive} />}
        {player.trend === 'same' && <Ionicons name="remove" size={16} color={Colors.textMuted} />}
      </View>
    </TouchableOpacity>
  );
}

function StatLeaderCard({ category }) {
  return (
    <View style={styles.leaderCard}>
      <View style={styles.leaderHeader}>
        <Text style={styles.leaderTitle}>{category.label}</Text>
        <Text style={styles.leaderGame}>{category.game}</Text>
      </View>
      {category.data.map((player, index) => (
        <View key={index} style={styles.leaderRow}>
          <View style={styles.leaderLeft}>
            <Text style={[styles.leaderRank, index === 0 && styles.leaderRankFirst]}>
              {index + 1}
            </Text>
            <View style={[styles.leaderDot, { backgroundColor: player.color }]} />
            <Text style={styles.leaderName}>{player.name}</Text>
            <Text style={styles.leaderTeam}>{player.team}</Text>
          </View>
          <Text style={[styles.leaderValue, index === 0 && styles.leaderValueFirst]}>
            {player.value}
          </Text>
        </View>
      ))}
    </View>
  );
}

export default function PlayerStatsScreen() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPlayers = topPlayers.filter(player => {
    const matchesFilter = activeFilter === 'All' || player.game === activeFilter;
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          player.fullName.toLowerCase().includes(searchQuery.toLowerCase());
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
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
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
        {/* Top Players - Horizontal Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOP PLAYERS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.playersRow}
          >
            {filteredPlayers.slice(0, 6).map(player => (
              <View key={player.id} style={styles.horizontalPlayerCard}>
                <View style={styles.hPlayerRank}>
                  <Text style={styles.hRankText}>#{player.rank}</Text>
                </View>
                <View style={[styles.hPlayerAvatar, { backgroundColor: player.teamColor }]}>
                  <Text style={styles.hAvatarText}>{player.name.charAt(0)}</Text>
                </View>
                <Text style={styles.hPlayerName}>{player.name}</Text>
                <Text style={styles.hPlayerTeam}>{player.teamAbbr}</Text>
                <View style={styles.hStatBox}>
                  <Text style={styles.hStatValue}>{player.mainStat}</Text>
                  <Text style={styles.hStatLabel}>{player.mainStatLabel}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Leaderboards */}
        <View style={styles.section}>
          <Text style={styles.sectionTitlePadded}>LEADERBOARDS</Text>
          {statCategories.map(category => (
            <StatLeaderCard key={category.id} category={category} />
          ))}
        </View>

        {/* Full Player List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>ALL PLAYERS</Text>
          </View>
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
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
    marginTop: Spacing.lg,
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
  // Horizontal Player Cards
  playersRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  horizontalPlayerCard: {
    width: 100,
    backgroundColor: '#111',
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: 'center',
  },
  hPlayerRank: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#222',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  hRankText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.accentCyan,
  },
  hPlayerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.sm,
  },
  hAvatarText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: '#000',
  },
  hPlayerName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  hPlayerTeam: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  hStatBox: {
    marginTop: Spacing.sm,
    alignItems: 'center',
  },
  hStatValue: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.accentCyan,
  },
  hStatLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  // Leaderboard Cards
  leaderCard: {
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  leaderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  leaderTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  leaderGame: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
  },
  leaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  leaderRank: {
    width: 20,
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textMuted,
    textAlign: 'center',
  },
  leaderRankFirst: {
    color: Colors.accentYellow,
  },
  leaderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  leaderName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  leaderTeam: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  leaderValue: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  leaderValueFirst: {
    color: Colors.accentCyan,
  },
  // Vertical Player Cards
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.xs,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  playerRank: {
    width: 28,
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  playerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  avatarText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: '#000',
  },
  playerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  playerName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  playerTeam: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  playerStat: {
    alignItems: 'flex-end',
    marginRight: Spacing.sm,
  },
  statValue: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.accentCyan,
  },
  statLabel: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  trendIcon: {
    width: 20,
    alignItems: 'center',
  },
});
