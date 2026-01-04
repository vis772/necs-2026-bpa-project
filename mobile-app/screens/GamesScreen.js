import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius, Shadows } from '../constants/theme';

const { width } = Dimensions.get('window');

// Story highlights - key moments
const storyHighlights = [
  { id: 1, type: 'play', title: "Phantom's 4K", team: 'NV', color: '#00f0ff', isNew: true },
  { id: 2, type: 'injury', title: 'Player Update', team: 'SE', color: '#ff4655', isNew: true },
  { id: 3, type: 'highlight', title: 'OT Winner', team: 'SR', color: '#0080ff', isNew: false },
  { id: 4, type: 'news', title: 'Breaking', team: 'NECS', color: Colors.accentGold, isNew: true },
  { id: 5, type: 'stats', title: 'MVP Alert', team: 'SM', color: '#e60012', isNew: false },
];

// Game filters
const gameFilters = ['All', 'Valorant', 'Rocket League', 'Smash Bros'];

// Matches data
const matches = [
  {
    id: 1,
    status: 'live',
    game: 'VALORANT',
    broadcast: 'Twitch',
    stage: 'Grand Finals',
    team1: { name: 'Nova Vanguard', abbr: 'NV', record: '4-0', score: 2, color: '#00f0ff' },
    team2: { name: 'Shadow Elite', abbr: 'SE', record: '3-1', score: 1, color: '#ff4655' },
    time: 'Map 3 • 11-9',
    quarter: 'Haven',
  },
  {
    id: 2,
    status: 'live',
    game: 'ROCKET LEAGUE',
    broadcast: 'YouTube',
    stage: 'Semifinal 1',
    team1: { name: 'Supersonic Racers', abbr: 'SR', record: '3-1', score: 3, color: '#0080ff' },
    team2: { name: 'Aerial Experts', abbr: 'AE', record: '2-2', score: 2, color: '#8b5cf6' },
    time: 'Overtime',
    quarter: 'Game 5',
  },
  {
    id: 3,
    status: 'upcoming',
    game: 'VALORANT',
    broadcast: 'Twitch',
    stage: 'Semifinal 2',
    team1: { name: 'Titan Force', abbr: 'TF', record: '3-1', color: '#ffd700' },
    team2: { name: 'Cyber Guardians', abbr: 'CG', record: '2-2', color: '#22c55e' },
    time: '4:00 PM',
    quarter: 'Today',
  },
  {
    id: 4,
    status: 'final',
    game: 'SMASH BROS',
    broadcast: 'Twitch',
    stage: 'Winners Bracket',
    team1: { name: 'Smash Masters', abbr: 'SM', record: '4-0', score: 3, color: '#e60012', winner: true },
    team2: { name: 'Stock Crushers', abbr: 'SC', record: '2-2', score: 1, color: '#22c55e' },
    time: 'FINAL',
    quarter: '',
  },
  {
    id: 5,
    status: 'final',
    game: 'ROCKET LEAGUE',
    broadcast: 'YouTube',
    stage: 'Quarterfinal',
    team1: { name: 'Boost Overload', abbr: 'BO', record: '2-2', score: 2, color: '#ff6b35' },
    team2: { name: 'Goal Storm', abbr: 'GS', record: '3-1', score: 3, color: '#0080ff', winner: true },
    time: 'FINAL',
    quarter: '',
  },
];

function StoryCircle({ item }) {
  return (
    <TouchableOpacity style={styles.storyContainer}>
      <View style={[styles.storyCircle, { borderColor: item.color }, item.isNew && styles.storyCircleNew]}>
        <View style={[styles.storyInner, { backgroundColor: item.color }]}>
          <Text style={styles.storyTeam}>{item.team}</Text>
        </View>
      </View>
      <Text style={styles.storyTitle} numberOfLines={1}>{item.title}</Text>
      {item.isNew && <View style={styles.storyNewDot} />}
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

function ScoreCard({ match }) {
  const isLive = match.status === 'live';
  const isFinal = match.status === 'final';
  const isUpcoming = match.status === 'upcoming';

  return (
    <TouchableOpacity style={styles.scoreCard} activeOpacity={0.7}>
      {/* Header */}
      <View style={styles.scoreCardHeader}>
        <View style={styles.scoreCardHeaderLeft}>
          {isLive && (
            <View style={styles.liveIndicator}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE</Text>
            </View>
          )}
          {isFinal && <Text style={styles.finalText}>FINAL</Text>}
          {isUpcoming && <Text style={styles.upcomingText}>{match.time}</Text>}
          <Text style={styles.gameLabel}>{match.game}</Text>
        </View>
        <View style={styles.broadcastBadge}>
          <Ionicons name="tv-outline" size={12} color={Colors.textMuted} />
          <Text style={styles.broadcastText}>{match.broadcast}</Text>
        </View>
      </View>

      {/* Teams & Scores */}
      <View style={styles.teamsContainer}>
        {/* Team 1 */}
        <View style={styles.teamRow}>
          <View style={styles.teamInfo}>
            <TeamLogo abbr={match.team1.abbr} color={match.team1.color} />
            <View style={styles.teamDetails}>
              <Text style={[styles.teamName, match.team1.winner && styles.winnerText]}>
                {match.team1.name}
              </Text>
              <Text style={styles.teamRecord}>{match.team1.record}</Text>
            </View>
          </View>
          {(isLive || isFinal) && (
            <Text style={[styles.score, match.team1.winner && styles.winnerScore]}>
              {match.team1.score}
            </Text>
          )}
        </View>

        {/* Team 2 */}
        <View style={styles.teamRow}>
          <View style={styles.teamInfo}>
            <TeamLogo abbr={match.team2.abbr} color={match.team2.color} />
            <View style={styles.teamDetails}>
              <Text style={[styles.teamName, match.team2.winner && styles.winnerText]}>
                {match.team2.name}
              </Text>
              <Text style={styles.teamRecord}>{match.team2.record}</Text>
            </View>
          </View>
          {(isLive || isFinal) && (
            <Text style={[styles.score, match.team2.winner && styles.winnerScore]}>
              {match.team2.score}
            </Text>
          )}
        </View>
      </View>

      {/* Footer */}
      <View style={styles.scoreCardFooter}>
        <Text style={styles.stageText}>{match.stage}</Text>
        {isLive && (
          <View style={styles.liveInfo}>
            <Text style={styles.quarterText}>{match.quarter}</Text>
            <Text style={styles.timeText}>{match.time}</Text>
          </View>
        )}
        {isFinal && (
          <TouchableOpacity style={styles.highlightsBtn}>
            <Text style={styles.highlightsBtnText}>Highlights</Text>
            <Ionicons name="play" size={12} color={Colors.accentBlue} />
          </TouchableOpacity>
        )}
        {isUpcoming && (
          <TouchableOpacity style={styles.notifyBtn}>
            <Ionicons name="notifications-outline" size={16} color={Colors.accentBlue} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function GamesScreen() {
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filteredMatches = selectedFilter === 'All' 
    ? matches 
    : matches.filter(m => m.game.toLowerCase().includes(selectedFilter.toLowerCase().split(' ')[0]));

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Games</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="calendar-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="filter-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Story Highlights Row */}
        <View style={styles.storiesSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.storiesRow}
          >
            {storyHighlights.map(item => (
              <StoryCircle key={item.id} item={item} />
            ))}
          </ScrollView>
        </View>

        {/* Game Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {gameFilters.map(filter => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>
                {filter}
              </Text>
              {selectedFilter === filter && <View style={styles.filterIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Score Cards */}
        <View style={styles.scoresSection}>
          {filteredMatches.map(match => (
            <ScoreCard key={match.id} match={match} />
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
    paddingVertical: Spacing.sm,
  },
  headerTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.sm,
  },
  content: {
    flex: 1,
  },
  // Stories Section
  storiesSection: {
    paddingTop: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: Spacing.lg,
  },
  storiesRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  storyContainer: {
    alignItems: 'center',
    width: 70,
    position: 'relative',
  },
  storyCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: Colors.borderDefault,
    padding: 3,
  },
  storyCircleNew: {
    borderWidth: 3,
  },
  storyInner: {
    flex: 1,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyTeam: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: '#000',
  },
  storyTitle: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
    marginTop: Spacing.xs,
    textAlign: 'center',
  },
  storyNewDot: {
    position: 'absolute',
    top: 0,
    right: 4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.statusLive,
    borderWidth: 2,
    borderColor: Colors.bgPrimary,
  },
  // Filters
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.xs,
    paddingBottom: Spacing.sm,
    gap: Spacing.xl,
  },
  filterChip: {
    paddingVertical: Spacing.xs,
  },
  filterChipActive: {},
  filterText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  filterTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  filterIndicator: {
    marginTop: Spacing.xs,
    height: 2,
    backgroundColor: Colors.accentBlue,
    borderRadius: 1,
  },
  // Scores Section
  scoresSection: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  // Score Card
  scoreCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.card,
  },
  scoreCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  scoreCardHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.statusLiveGlow,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.statusLive,
  },
  liveText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.statusLive,
  },
  finalText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  upcomingText: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.accentBlue,
  },
  gameLabel: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  broadcastBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.bgElevated,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  broadcastText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  // Teams
  teamsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    flex: 1,
  },
  teamLogo: {
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    fontWeight: '800',
    color: '#000',
  },
  teamDetails: {
    flex: 1,
  },
  teamName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  winnerText: {
    color: Colors.textPrimary,
  },
  teamRecord: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  score: {
    fontSize: FontSizes['3xl'],
    fontWeight: '800',
    color: Colors.textMuted,
    minWidth: 40,
    textAlign: 'right',
  },
  winnerScore: {
    color: Colors.textPrimary,
  },
  // Footer
  scoreCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.borderSubtle,
    paddingTop: Spacing.md,
  },
  stageText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  liveInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  quarterText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  timeText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.statusLive,
  },
  highlightsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  highlightsBtnText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentBlue,
  },
  notifyBtn: {
    padding: Spacing.xs,
  },
});

