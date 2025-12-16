import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

const tabs = ['Home', 'Schedule', 'Standings'];

const favorites = [
  { id: 1, abbr: 'NV', name: 'Nova', color: '#00f0ff' },
  { id: 2, abbr: 'SE', name: 'Shadow', color: '#ff4655' },
  { id: 3, abbr: 'TF', name: 'Titan', color: '#ffd700' },
  { id: 4, abbr: 'CG', name: 'Cyber', color: '#22c55e' },
  { id: 5, abbr: 'VAL', name: 'Valorant', color: '#ff4655' },
  { id: 6, abbr: 'RL', name: 'Rocket', color: '#0080ff' },
];

const liveMatches = [
  {
    id: 1,
    game: 'VALORANT',
    round: 'Quarterfinal 1',
    team1: { name: 'Nova Vanguard', abbr: 'NV', score: 2, color: '#00f0ff' },
    team2: { name: 'Shadow Elite', abbr: 'SE', score: 1, color: '#ff4655' },
    status: 'live',
    time: 'Map 3 • Haven',
    viewers: '24.5K',
  },
  {
    id: 2,
    game: 'ROCKET LEAGUE',
    round: 'Semifinal 1',
    team1: { name: 'Supersonic Racers', abbr: 'SR', score: 3, color: '#0080ff' },
    team2: { name: 'Aerial Experts', abbr: 'AE', score: 2, color: '#8b5cf6' },
    status: 'live',
    time: 'Overtime',
    viewers: '18.2K',
  },
];

const upcomingMatches = [
  {
    id: 3,
    game: 'VALORANT',
    round: 'Quarterfinal 2',
    team1: { name: 'Titan Force', abbr: 'TF', color: '#ffd700' },
    team2: { name: 'Cyber Guardians', abbr: 'CG', color: '#22c55e' },
    time: '12:00 PM',
    date: 'Today',
  },
  {
    id: 4,
    game: 'VALORANT',
    round: 'Semifinal 1',
    team1: { name: 'Winner QF1', abbr: '?', color: '#444' },
    team2: { name: 'Winner QF2', abbr: '?', color: '#444' },
    time: '4:00 PM',
    date: 'Today',
  },
  {
    id: 5,
    game: 'SMASH BROS',
    round: 'Semifinal 1',
    team1: { name: 'Smash Masters', abbr: 'SM', color: '#e60012' },
    team2: { name: 'Knockout Brigade', abbr: 'KB', color: '#ff00aa' },
    time: '6:00 PM',
    date: 'Today',
  },
];

const completedMatches = [
  {
    id: 6,
    game: 'VALORANT',
    round: 'Group A - Match 4',
    team1: { name: 'Phoenix Rising', abbr: 'PR', score: 2, color: '#ff6b35' },
    team2: { name: 'Dark Knights', abbr: 'DK', score: 0, color: '#6b7280' },
    status: 'final',
  },
  {
    id: 7,
    game: 'VALORANT',
    round: 'Group B - Match 3',
    team1: { name: 'Storm Surge', abbr: 'SS', score: 2, color: '#8b5cf6' },
    team2: { name: 'Iron Wall', abbr: 'IW', score: 1, color: '#78716c' },
    status: 'final',
  },
  {
    id: 8,
    game: 'SMASH BROS',
    round: 'Winners Bracket',
    team1: { name: 'Stock Crushers', abbr: 'SC', score: 3, color: '#22c55e' },
    team2: { name: 'Final Destination', abbr: 'FD', score: 1, color: '#ffd700' },
    status: 'final',
  },
];

function TabItem({ label, isActive, onPress }) {
  return (
    <TouchableOpacity style={[styles.tab, isActive && styles.tabActive]} onPress={onPress}>
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{label}</Text>
      {isActive && <View style={styles.tabIndicator} />}
    </TouchableOpacity>
  );
}

function FavoriteItem({ item }) {
  return (
    <TouchableOpacity style={styles.favoriteItem}>
      <View style={[styles.favoriteCircle, { backgroundColor: item.color }]}>
        <Text style={styles.favoriteAbbr}>{item.abbr}</Text>
      </View>
      <Text style={styles.favoriteName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

function TeamLogo({ abbr, color, size = 32 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{abbr}</Text>
    </View>
  );
}

function LiveMatchCard({ match }) {
  return (
    <TouchableOpacity style={styles.liveMatchCard} activeOpacity={0.8}>
      <View style={styles.matchHeader}>
        <View style={styles.matchHeaderLeft}>
          <View style={styles.liveBadge}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          <Text style={styles.matchGame}>{match.game}</Text>
        </View>
        <View style={styles.viewersBox}>
          <Ionicons name="eye" size={12} color={Colors.textMuted} />
          <Text style={styles.viewersText}>{match.viewers}</Text>
        </View>
      </View>
      
      <View style={styles.matchContent}>
        <View style={styles.teamSection}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} size={40} />
          <Text style={styles.teamNameLive}>{match.team1.abbr}</Text>
        </View>
        
        <View style={styles.scoreSection}>
          <View style={styles.scoresRow}>
            <Text style={[styles.scoreText, match.team1.score > match.team2.score && styles.winningScore]}>
              {match.team1.score}
            </Text>
            <Text style={styles.scoreDash}>-</Text>
            <Text style={[styles.scoreText, match.team2.score > match.team1.score && styles.winningScore]}>
              {match.team2.score}
            </Text>
          </View>
          <Text style={styles.matchTime}>{match.time}</Text>
        </View>
        
        <View style={styles.teamSection}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} size={40} />
          <Text style={styles.teamNameLive}>{match.team2.abbr}</Text>
        </View>
      </View>
      
      <View style={styles.matchFooter}>
        <Text style={styles.roundText}>{match.round}</Text>
        <TouchableOpacity style={styles.watchButton}>
          <Ionicons name="play" size={14} color="#000" />
          <Text style={styles.watchButtonText}>Watch</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

function UpcomingMatchCard({ match }) {
  return (
    <TouchableOpacity style={styles.upcomingCard} activeOpacity={0.7}>
      <View style={styles.upcomingHeader}>
        <Text style={styles.upcomingGame}>{match.game}</Text>
        <Text style={styles.upcomingTime}>{match.time}</Text>
      </View>
      <View style={styles.upcomingTeams}>
        <View style={styles.upcomingTeam}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} size={28} />
          <Text style={styles.upcomingTeamName}>{match.team1.abbr}</Text>
        </View>
        <Text style={styles.vsText}>VS</Text>
        <View style={styles.upcomingTeam}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} size={28} />
          <Text style={styles.upcomingTeamName}>{match.team2.abbr}</Text>
        </View>
      </View>
      <Text style={styles.upcomingRound}>{match.round}</Text>
    </TouchableOpacity>
  );
}

function CompletedMatchCard({ match }) {
  const team1Won = match.team1.score > match.team2.score;
  const team2Won = match.team2.score > match.team1.score;
  
  return (
    <TouchableOpacity style={styles.completedCard} activeOpacity={0.7}>
      <View style={styles.completedRow}>
        <View style={styles.completedTeam}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} size={24} />
          <Text style={[styles.completedTeamName, team1Won && styles.winnerName]}>
            {match.team1.name}
          </Text>
        </View>
        <Text style={[styles.completedScore, team1Won && styles.winnerScore]}>
          {match.team1.score}
        </Text>
      </View>
      <View style={styles.completedRow}>
        <View style={styles.completedTeam}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} size={24} />
          <Text style={[styles.completedTeamName, team2Won && styles.winnerName]}>
            {match.team2.name}
          </Text>
        </View>
        <Text style={[styles.completedScore, team2Won && styles.winnerScore]}>
          {match.team2.score}
        </Text>
      </View>
      <View style={styles.completedFooter}>
        <Text style={styles.completedMeta}>{match.game} • {match.round}</Text>
        <TouchableOpacity style={styles.highlightsButton}>
          <Text style={styles.highlightsText}>Highlights</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

export default function LiveScoresScreen() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scores</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <View style={styles.tabsRow}>
        {tabs.map(tab => (
          <TabItem
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Favorites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitlePadded}>FAVORITES</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.favoritesRow}
          >
            {favorites.map(fav => (
              <FavoriteItem key={fav.id} item={fav} />
            ))}
          </ScrollView>
        </View>

        {/* Live Now */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.liveIndicatorSmall} />
              <Text style={styles.sectionTitle}>LIVE NOW</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {liveMatches.map(match => (
            <LiveMatchCard key={match.id} match={match} />
          ))}
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UPCOMING TODAY</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upcomingRow}
          >
            {upcomingMatches.map(match => (
              <UpcomingMatchCard key={match.id} match={match} />
            ))}
          </ScrollView>
        </View>

        {/* Completed */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>COMPLETED</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {completedMatches.map(match => (
            <CompletedMatchCard key={match.id} match={match} />
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
  headerRight: {
    flexDirection: 'row',
  },
  tabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
    paddingHorizontal: Spacing.md,
  },
  tab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    position: 'relative',
  },
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  tabTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: Colors.accentCyan,
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
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
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
    marginBottom: Spacing.sm,
  },
  liveIndicatorSmall: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.statusLive,
  },
  seeAllText: {
    fontSize: FontSizes.sm,
    color: Colors.accentCyan,
    fontWeight: '600',
  },
  favoritesRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
  },
  favoriteItem: {
    alignItems: 'center',
    gap: 4,
  },
  favoriteCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteAbbr: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#000',
  },
  favoriteName: {
    fontSize: 10,
    color: Colors.textMuted,
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
  // Live Match Card
  liveMatchCard: {
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  matchHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
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
    fontSize: 10,
    fontWeight: '700',
    color: Colors.statusLive,
  },
  matchGame: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  viewersBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewersText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  matchContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.md,
  },
  teamSection: {
    alignItems: 'center',
    flex: 1,
  },
  teamNameLive: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginTop: Spacing.xs,
  },
  scoreSection: {
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  scoresRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.textMuted,
  },
  winningScore: {
    color: Colors.textPrimary,
  },
  scoreDash: {
    fontSize: FontSizes.xl,
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  matchTime: {
    fontSize: FontSizes.xs,
    color: Colors.statusLive,
    marginTop: 4,
    fontWeight: '500',
  },
  matchFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  roundText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  watchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.accentCyan,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  watchButtonText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#000',
  },
  // Upcoming Card
  upcomingRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  upcomingCard: {
    width: 160,
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  upcomingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  upcomingGame: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  upcomingTime: {
    fontSize: FontSizes.xs,
    color: Colors.accentCyan,
    fontWeight: '600',
  },
  upcomingTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  upcomingTeam: {
    alignItems: 'center',
    gap: 4,
  },
  upcomingTeamName: {
    fontSize: FontSizes.xs,
    color: Colors.textPrimary,
    fontWeight: '500',
  },
  vsText: {
    fontSize: 10,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  upcomingRound: {
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  // Completed Card
  completedCard: {
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  completedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  completedTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  completedTeamName: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  winnerName: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  completedScore: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textMuted,
    minWidth: 24,
    textAlign: 'center',
  },
  winnerScore: {
    color: Colors.textPrimary,
  },
  completedFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Spacing.sm,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  completedMeta: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  highlightsButton: {
    backgroundColor: '#222',
    paddingHorizontal: Spacing.md,
    paddingVertical: 4,
    borderRadius: BorderRadius.full,
  },
  highlightsText: {
    fontSize: FontSizes.xs,
    color: Colors.accentCyan,
    fontWeight: '600',
  },
});
