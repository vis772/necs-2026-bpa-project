import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/theme';

// Game tabs
const gameTabs = ['All Games', 'Valorant', 'Rocket League', 'Smash Bros'];

// Stat categories
const statCategories = ['Players', 'Teams', 'Leaders'];

// Top players data
const topPlayers = [
  {
    id: 1,
    rank: 1,
    name: 'Phantom',
    realName: 'Alex Chen',
    team: 'Nova Vanguard',
    teamAbbr: 'NV',
    teamColor: '#00f0ff',
    game: 'Valorant',
    mainStat: { label: 'K/D', value: '1.75' },
    stats: { kills: 156, deaths: 89, assists: 45 },
    trending: 'up',
  },
  {
    id: 2,
    rank: 2,
    name: 'Reaper',
    realName: 'Ryan Kim',
    team: 'Shadow Elite',
    teamAbbr: 'SE',
    teamColor: '#ff4655',
    game: 'Valorant',
    mainStat: { label: 'K/D', value: '1.49' },
    stats: { kills: 142, deaths: 95, assists: 38 },
    trending: 'same',
  },
  {
    id: 3,
    rank: 3,
    name: 'Turbo',
    realName: 'Jake Reynolds',
    team: 'Supersonic Racers',
    teamAbbr: 'SR',
    teamColor: '#0080ff',
    game: 'Rocket League',
    mainStat: { label: 'Goals', value: '24' },
    stats: { goals: 24, assists: 18, saves: 12 },
    trending: 'up',
  },
  {
    id: 4,
    rank: 4,
    name: 'Lightning',
    realName: 'Leo Nakamura',
    team: 'Smash Masters',
    teamAbbr: 'SM',
    teamColor: '#e60012',
    game: 'Smash Bros',
    mainStat: { label: 'Win%', value: '82%' },
    stats: { wins: 18, losses: 4, kos: 156 },
    trending: 'up',
  },
  {
    id: 5,
    rank: 5,
    name: 'Blaze',
    realName: 'Nathan Harris',
    team: 'Titan Force',
    teamAbbr: 'TF',
    teamColor: '#ffd700',
    game: 'Valorant',
    mainStat: { label: 'K/D', value: '1.42' },
    stats: { kills: 128, deaths: 90, assists: 52 },
    trending: 'down',
  },
];

// Team standings
const teamStandings = [
  { rank: 1, team: 'Nova Vanguard', abbr: 'NV', color: '#00f0ff', wins: 4, losses: 0, game: 'Valorant' },
  { rank: 2, team: 'Shadow Elite', abbr: 'SE', color: '#ff4655', wins: 3, losses: 1, game: 'Valorant' },
  { rank: 3, team: 'Smash Masters', abbr: 'SM', color: '#e60012', wins: 4, losses: 0, game: 'Smash Bros' },
  { rank: 4, team: 'Supersonic Racers', abbr: 'SR', color: '#0080ff', wins: 3, losses: 1, game: 'Rocket League' },
];

function TeamLogo({ abbr, color, size = 40 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{abbr}</Text>
    </View>
  );
}

function PlayerCard({ player, isTop3 }) {
  return (
    <TouchableOpacity style={[styles.playerCard, isTop3 && styles.playerCardTop3]} activeOpacity={0.7}>
      {/* Rank */}
      <View style={[styles.rankContainer, isTop3 && styles.rankContainerTop3]}>
        <Text style={[styles.rankText, isTop3 && styles.rankTextTop3]}>{player.rank}</Text>
      </View>

      {/* Player Info */}
      <View style={styles.playerInfo}>
        <View style={styles.playerHeader}>
          <TeamLogo abbr={player.teamAbbr} color={player.teamColor} size={36} />
          <View style={styles.playerNames}>
            <Text style={styles.playerName}>{player.name}</Text>
            <Text style={styles.playerRealName}>{player.realName}</Text>
          </View>
        </View>
        <View style={styles.playerMeta}>
          <Text style={styles.playerTeam}>{player.team}</Text>
          <View style={styles.gameBadge}>
            <Text style={styles.gameText}>{player.game}</Text>
          </View>
        </View>
      </View>

      {/* Main Stat */}
      <View style={styles.mainStatContainer}>
        <Text style={styles.mainStatValue}>{player.mainStat.value}</Text>
        <Text style={styles.mainStatLabel}>{player.mainStat.label}</Text>
        <View style={styles.trendingContainer}>
          {player.trending === 'up' && (
            <Ionicons name="trending-up" size={16} color={Colors.statusCompleted} />
          )}
          {player.trending === 'down' && (
            <Ionicons name="trending-down" size={16} color={Colors.statusLive} />
          )}
          {player.trending === 'same' && (
            <Ionicons name="remove" size={16} color={Colors.textMuted} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function StandingsRow({ team }) {
  return (
    <TouchableOpacity style={styles.standingsRow} activeOpacity={0.7}>
      <Text style={styles.standingsRank}>{team.rank}</Text>
      <TeamLogo abbr={team.abbr} color={team.color} size={32} />
      <View style={styles.standingsTeamInfo}>
        <Text style={styles.standingsTeamName}>{team.team}</Text>
        <Text style={styles.standingsGame}>{team.game}</Text>
      </View>
      <View style={styles.standingsRecord}>
        <Text style={styles.winsText}>{team.wins}W</Text>
        <Text style={styles.lossesText}>{team.losses}L</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

export default function StatsScreen() {
  const [selectedGame, setSelectedGame] = useState('All Games');
  const [selectedCategory, setSelectedCategory] = useState('Players');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Game Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gameTabsRow}
      >
        {gameTabs.map(game => (
          <TouchableOpacity
            key={game}
            style={[styles.gameTab, selectedGame === game && styles.gameTabActive]}
            onPress={() => setSelectedGame(game)}
          >
            <Text style={[styles.gameTabText, selectedGame === game && styles.gameTabTextActive]}>
              {game}
            </Text>
            {selectedGame === game && <View style={styles.gameTabIndicator} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category Tabs */}
      <View style={styles.categoryTabs}>
        {statCategories.map(cat => (
          <TouchableOpacity
            key={cat}
            style={[styles.categoryTab, selectedCategory === cat && styles.categoryTabActive]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={[styles.categoryTabText, selectedCategory === cat && styles.categoryTabTextActive]}>
              {cat}
            </Text>
            {selectedCategory === cat && <View style={styles.categoryIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {selectedCategory === 'Players' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>TOP PERFORMERS</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>
            {topPlayers.map((player, index) => (
              <PlayerCard key={player.id} player={player} isTop3={index < 3} />
            ))}
          </View>
        )}

        {selectedCategory === 'Teams' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>STANDINGS</Text>
            </View>
            <View style={styles.standingsCard}>
              {teamStandings.map(team => (
                <StandingsRow key={team.rank} team={team} />
              ))}
            </View>
          </View>
        )}

        {selectedCategory === 'Leaders' && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>STAT LEADERS</Text>
            </View>
            <View style={styles.leadersGrid}>
              <View style={styles.leaderCard}>
                <Text style={styles.leaderLabel}>Most Kills</Text>
                <TeamLogo abbr="NV" color="#00f0ff" size={48} />
                <Text style={styles.leaderName}>Phantom</Text>
                <Text style={styles.leaderValue}>156</Text>
              </View>
              <View style={styles.leaderCard}>
                <Text style={styles.leaderLabel}>Most Goals</Text>
                <TeamLogo abbr="SR" color="#0080ff" size={48} />
                <Text style={styles.leaderName}>Turbo</Text>
                <Text style={styles.leaderValue}>24</Text>
              </View>
              <View style={styles.leaderCard}>
                <Text style={styles.leaderLabel}>Best Win%</Text>
                <TeamLogo abbr="SM" color="#e60012" size={48} />
                <Text style={styles.leaderName}>Lightning</Text>
                <Text style={styles.leaderValue}>82%</Text>
              </View>
              <View style={styles.leaderCard}>
                <Text style={styles.leaderLabel}>Most Assists</Text>
                <TeamLogo abbr="TF" color="#ffd700" size={48} />
                <Text style={styles.leaderName}>Blaze</Text>
                <Text style={styles.leaderValue}>52</Text>
              </View>
            </View>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerButton: {
    padding: Spacing.sm,
  },
  // Game Tabs
  gameTabsRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.xl,
  },
  gameTab: {
    paddingVertical: Spacing.xs,
    position: 'relative',
  },
  gameTabActive: {},
  gameTabText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  gameTabTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  gameTabIndicator: {
    position: 'absolute',
    bottom: -Spacing.xs,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.accentBlue,
    borderRadius: 1,
  },
  // Category Tabs
  categoryTabs: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  categoryTab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    position: 'relative',
  },
  categoryTabActive: {},
  categoryTabText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  categoryTabTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.xl,
    right: Spacing.xl,
    height: 3,
    backgroundColor: Colors.accentBlue,
    borderRadius: BorderRadius.full,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: Spacing.sm,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentBlue,
  },
  // Player Card
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.xs,
    padding: Spacing.sm,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  playerCardTop3: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.accentGold,
  },
  rankContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.bgElevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankContainerTop3: {
    backgroundColor: Colors.accentGold,
  },
  rankText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
  },
  rankTextTop3: {
    color: Colors.bgPrimary,
  },
  playerInfo: {
    flex: 1,
  },
  playerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  playerNames: {},
  playerName: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  playerRealName: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  playerMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginLeft: 44,
  },
  playerTeam: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  gameBadge: {
    backgroundColor: Colors.bgElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  gameText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  mainStatContainer: {
    alignItems: 'center',
    minWidth: 60,
  },
  mainStatValue: {
    fontSize: FontSizes['2xl'],
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  mainStatLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  trendingContainer: {
    marginTop: Spacing.xs,
  },
  // Team Logo
  teamLogo: {
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    fontWeight: '800',
    color: '#000',
  },
  // Standings
  standingsCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  standingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  standingsRank: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
    width: 24,
    textAlign: 'center',
  },
  standingsTeamInfo: {
    flex: 1,
  },
  standingsTeamName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  standingsGame: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  standingsRecord: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  winsText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.statusCompleted,
  },
  lossesText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  // Leaders Grid
  leadersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  leaderCard: {
    width: '47%',
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: 'center',
    ...Shadows.sm,
  },
  leaderLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: Spacing.md,
  },
  leaderName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
  },
  leaderValue: {
    fontSize: FontSizes['3xl'],
    fontWeight: '800',
    color: Colors.accentBlue,
    marginTop: Spacing.xs,
  },
});

