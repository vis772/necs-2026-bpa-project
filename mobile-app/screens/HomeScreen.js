import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

// Featured match data
const featuredMatch = {
  id: 1,
  game: 'VALORANT',
  stage: 'GRAND FINALS',
  status: 'LIVE',
  team1: { name: 'Nova Vanguard', abbr: 'NV', score: 2, color: '#00f0ff' },
  team2: { name: 'Shadow Elite', abbr: 'SE', score: 1, color: '#ff4655' },
  currentMap: 'Haven',
  mapScore: '11-9',
  viewers: '124.5K',
};

// Live matches
const liveMatches = [
  {
    id: 2,
    game: 'ROCKET LEAGUE',
    stage: 'Semifinal',
    team1: { abbr: 'SR', score: 3, color: '#0080ff' },
    team2: { abbr: 'AE', score: 2, color: '#8b5cf6' },
    time: 'OT',
  },
  {
    id: 3,
    game: 'SMASH BROS',
    stage: 'Winners Final',
    team1: { abbr: 'SM', score: 2, color: '#e60012' },
    team2: { abbr: 'KB', score: 1, color: '#ffd700' },
    time: 'Game 4',
  },
];

// Upcoming matches
const upcomingMatches = [
  {
    id: 4,
    time: '4:00 PM',
    game: 'VALORANT',
    team1: { abbr: 'TF', name: 'Titan Force', color: '#ffd700' },
    team2: { abbr: 'CG', name: 'Cyber Guardians', color: '#22c55e' },
  },
  {
    id: 5,
    time: '6:00 PM',
    game: 'ROCKET LEAGUE',
    team1: { abbr: 'BO', name: 'Boost Overload', color: '#ff6b35' },
    team2: { abbr: 'GS', name: 'Goal Storm', color: '#0080ff' },
  },
];

// News highlights
const newsHighlights = [
  { id: 1, title: 'Phantom dominates with 35 kills', tag: 'MVP Performance' },
  { id: 2, title: 'Upset! Aerial Experts take Game 1', tag: 'Breaking' },
  { id: 3, title: 'Championship predictions are in', tag: 'Analysis' },
];

function TeamLogo({ abbr, color, size = 48 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{abbr}</Text>
    </View>
  );
}

function FeaturedMatchCard({ match }) {
  return (
    <View style={styles.featuredCard}>
      {/* Live Badge */}
      <View style={styles.featuredHeader}>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <Text style={styles.featuredStage}>{match.stage}</Text>
        <View style={styles.viewersContainer}>
          <Ionicons name="eye" size={14} color={Colors.textSecondary} />
          <Text style={styles.viewersText}>{match.viewers}</Text>
        </View>
      </View>

      {/* Teams & Score */}
      <View style={styles.featuredContent}>
        <View style={styles.featuredTeam}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} size={64} />
          <Text style={styles.featuredTeamName}>{match.team1.name}</Text>
        </View>

        <View style={styles.featuredScoreSection}>
          <View style={styles.scoreContainer}>
            <Text style={[styles.bigScore, match.team1.score > match.team2.score && styles.winningScore]}>
              {match.team1.score}
            </Text>
            <Text style={styles.scoreDivider}>:</Text>
            <Text style={[styles.bigScore, match.team2.score > match.team1.score && styles.winningScore]}>
              {match.team2.score}
            </Text>
          </View>
          <Text style={styles.mapInfo}>{match.currentMap} • {match.mapScore}</Text>
        </View>

        <View style={styles.featuredTeam}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} size={64} />
          <Text style={styles.featuredTeamName}>{match.team2.name}</Text>
        </View>
      </View>

      {/* Watch Button */}
      <TouchableOpacity style={styles.watchButton}>
        <Ionicons name="play-circle" size={20} color={Colors.bgPrimary} />
        <Text style={styles.watchButtonText}>Watch Now</Text>
      </TouchableOpacity>
    </View>
  );
}

function LiveMatchMini({ match }) {
  return (
    <TouchableOpacity style={styles.liveMatchMini}>
      <View style={styles.miniHeader}>
        <View style={styles.miniLiveDot} />
        <Text style={styles.miniGame}>{match.game}</Text>
      </View>
      <View style={styles.miniTeams}>
        <View style={styles.miniTeamRow}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} size={28} />
          <Text style={styles.miniScore}>{match.team1.score}</Text>
        </View>
        <View style={styles.miniTeamRow}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} size={28} />
          <Text style={styles.miniScore}>{match.team2.score}</Text>
        </View>
      </View>
      <Text style={styles.miniTime}>{match.time}</Text>
    </TouchableOpacity>
  );
}

function UpcomingMatchCard({ match }) {
  return (
    <TouchableOpacity style={styles.upcomingCard}>
      <View style={styles.upcomingTime}>
        <Text style={styles.upcomingTimeText}>{match.time}</Text>
        <Text style={styles.upcomingGame}>{match.game}</Text>
      </View>
      <View style={styles.upcomingTeams}>
        <View style={styles.upcomingTeamRow}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} size={32} />
          <Text style={styles.upcomingTeamName}>{match.team1.name}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.upcomingTeamRow}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} size={32} />
          <Text style={styles.upcomingTeamName}>{match.team2.name}</Text>
        </View>
      </View>
      <Ionicons name="notifications-outline" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

function NewsCard({ item }) {
  return (
    <TouchableOpacity style={styles.newsCard}>
      <View style={styles.newsTag}>
        <Text style={styles.newsTagText}>{item.tag}</Text>
      </View>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Ionicons name="arrow-forward" size={16} color={Colors.accentBlue} />
    </TouchableOpacity>
  );
}

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <View>
            <Text style={styles.headerTitle}>NECS 2026</Text>
            <Text style={styles.headerSubtitle}>Day 3 • May 8</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
            <View style={styles.notificationBadge} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Featured Match */}
        <View style={styles.section}>
          <FeaturedMatchCard match={featuredMatch} />
        </View>

        {/* More Live Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.sectionLiveDot} />
              <Text style={styles.sectionTitle}>ALSO LIVE</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.liveRow}>
            {liveMatches.map(match => (
              <LiveMatchMini key={match.id} match={match} />
            ))}
          </ScrollView>
        </View>

        {/* News Highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOP STORIES</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {newsHighlights.map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>COMING UP</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Full Schedule</Text>
            </TouchableOpacity>
          </View>
          {upcomingMatches.map(match => (
            <UpcomingMatchCard key={match.id} match={match} />
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
    backgroundColor: Colors.bgPrimary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    fontSize: FontSizes.xl,
    fontWeight: '800',
    color: Colors.bgPrimary,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  headerSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.sm,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.statusLive,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  sectionLiveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.statusLive,
  },
  sectionTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
    letterSpacing: 1,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentBlue,
  },
  // Featured Card
  featuredCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  featuredHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.statusLiveGlow,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.statusLive,
  },
  liveText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.statusLive,
  },
  featuredStage: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentGold,
    marginLeft: Spacing.md,
    flex: 1,
  },
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewersText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  featuredContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xl,
  },
  featuredTeam: {
    alignItems: 'center',
    flex: 1,
  },
  featuredTeamName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.sm,
    textAlign: 'center',
  },
  featuredScoreSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bigScore: {
    fontSize: FontSizes['5xl'],
    fontWeight: '800',
    color: Colors.textMuted,
  },
  winningScore: {
    color: Colors.textPrimary,
  },
  scoreDivider: {
    fontSize: FontSizes['4xl'],
    fontWeight: '300',
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  mapInfo: {
    fontSize: FontSizes.sm,
    color: Colors.statusLive,
    fontWeight: '500',
    marginTop: Spacing.xs,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accentBlue,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  watchButtonText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.bgPrimary,
  },
  // Live Mini Cards
  liveRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  liveMatchMini: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    width: 140,
    ...Shadows.sm,
  },
  miniHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: Spacing.sm,
  },
  miniLiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.statusLive,
  },
  miniGame: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  miniTeams: {
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  miniTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miniScore: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  miniTime: {
    fontSize: FontSizes.xs,
    color: Colors.statusLive,
    fontWeight: '500',
    textAlign: 'center',
  },
  // Team Logo
  teamLogo: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    fontWeight: '800',
    color: '#000',
  },
  // News Cards
  newsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  newsTag: {
    backgroundColor: Colors.accentNavy,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.sm,
  },
  newsTagText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.accentBlue,
  },
  newsTitle: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  // Upcoming Cards
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.bgCard,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.md,
  },
  upcomingTime: {
    alignItems: 'center',
    minWidth: 60,
  },
  upcomingTimeText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  upcomingGame: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  upcomingTeams: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  upcomingTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  upcomingTeamName: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  vsText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});

