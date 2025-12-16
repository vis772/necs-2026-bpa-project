import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

const tabs = ['Home', 'Clips & Highlights', 'Schedule', 'Brackets'];

const favorites = [
  { id: 1, name: 'NV', fullName: 'Nova Vanguard', color: '#00f0ff' },
  { id: 2, name: 'SE', fullName: 'Shadow Elite', color: '#ff4655' },
  { id: 3, name: 'TF', fullName: 'Titan Force', color: '#ffd700' },
  { id: 4, name: 'CG', fullName: 'Cyber Guardians', color: '#22c55e' },
  { id: 5, name: 'VAL', fullName: 'Valorant', color: '#ff4655' },
  { id: 6, name: 'RL', fullName: 'Rocket League', color: '#0080ff' },
  { id: 7, name: 'SSB', fullName: 'Smash Bros', color: '#e60012' },
];

const liveMatches = [
  {
    id: 1,
    game: 'VALORANT',
    channel: 'NECS • PLAYOFFS',
    team1: { name: 'Nova Vanguard', abbr: 'NV', score: 2, color: '#00f0ff' },
    team2: { name: 'Shadow Elite', abbr: 'SE', score: 1, color: '#ff4655' },
    status: 'live',
    time: 'Map 3',
    map: 'Haven',
  },
  {
    id: 2,
    game: 'ROCKET LEAGUE',
    channel: 'NECS • SEMIFINALS',
    team1: { name: 'Supersonic Racers', abbr: 'SR', score: 3, color: '#0080ff' },
    team2: { name: 'Aerial Experts', abbr: 'AE', score: 2, color: '#8b5cf6' },
    status: 'live',
    time: 'OT',
    map: null,
  },
];

const myGames = [
  {
    id: 3,
    game: 'VALORANT',
    team1: { name: 'Phoenix Rising', abbr: 'PR', score: 2, color: '#ff6b35' },
    team2: { name: 'Dark Knights', abbr: 'DK', score: 0, color: '#6b7280' },
    status: 'final',
    hasHighlights: true,
  },
  {
    id: 4,
    game: 'SMASH BROS',
    team1: { name: 'Stock Crushers', abbr: 'SC', score: 3, color: '#22c55e' },
    team2: { name: 'Final Destination', abbr: 'FD', score: 1, color: '#ffd700' },
    status: 'final',
    hasHighlights: true,
  },
];

const upcomingGames = [
  {
    id: 5,
    game: 'VALORANT',
    channel: 'NECS • QUARTERFINALS',
    team1: { name: 'Titan Force', abbr: 'TF', color: '#ffd700' },
    team2: { name: 'Cyber Guardians', abbr: 'CG', color: '#22c55e' },
    time: '12:00 PM',
    date: 'Today',
  },
  {
    id: 6,
    game: 'SMASH BROS',
    channel: 'NECS • SEMIFINALS',
    team1: { name: 'Smash Masters', abbr: 'SM', color: '#e60012' },
    team2: { name: 'Knockout Brigade', abbr: 'KB', color: '#ff00aa' },
    time: '4:00 PM',
    date: 'Today',
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
        <Text style={styles.favoriteAbbr}>{item.name}</Text>
      </View>
      <Text style={styles.favoriteName}>{item.name}</Text>
    </TouchableOpacity>
  );
}

function TeamLogo({ team, size = 40 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: team.color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{team.abbr}</Text>
    </View>
  );
}

function LiveMatchCard({ match }) {
  return (
    <TouchableOpacity style={styles.liveMatchCard} activeOpacity={0.8}>
      {/* Featured Image Area */}
      <View style={[styles.matchImageArea, { backgroundColor: `${match.team1.color}30` }]}>
        <View style={styles.matchTeamsOverlay}>
          <TeamLogo team={match.team1} size={60} />
          <Text style={styles.vsText}>VS</Text>
          <TeamLogo team={match.team2} size={60} />
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      {/* Score Section */}
      <View style={styles.matchScoreSection}>
        <View style={styles.scoreRow}>
          <View style={styles.teamInfo}>
            <TeamLogo team={match.team1} size={32} />
            <Text style={styles.teamName}>{match.team1.name}</Text>
          </View>
          <View style={styles.scoreInfo}>
            <Text style={styles.scoreText}>{match.team1.score}</Text>
            <View style={styles.liveTimeBox}>
              <Text style={styles.liveTimeText}>{match.time}</Text>
            </View>
          </View>
        </View>
        <View style={styles.scoreRow}>
          <View style={styles.teamInfo}>
            <TeamLogo team={match.team2} size={32} />
            <Text style={styles.teamName}>{match.team2.name}</Text>
          </View>
          <Text style={styles.scoreText}>{match.team2.score}</Text>
        </View>
        <Text style={styles.channelText}>{match.channel}</Text>
      </View>
    </TouchableOpacity>
  );
}

function ScoreCard({ match, showHighlights = false }) {
  const isLive = match.status === 'live';
  const isFinal = match.status === 'final';
  
  return (
    <TouchableOpacity style={styles.scoreCard} activeOpacity={0.7}>
      <View style={styles.scoreCardContent}>
        {/* Team 1 */}
        <View style={styles.scoreCardRow}>
          <View style={styles.scoreCardTeam}>
            <TeamLogo team={match.team1} size={28} />
            <Text style={styles.scoreCardTeamName}>{match.team1.name}</Text>
          </View>
          <Text style={[styles.scoreCardScore, match.team1.score > match.team2.score && styles.winningScore]}>
            {match.team1.score}
          </Text>
          {isLive && (
            <View style={styles.liveIndicatorSmall}>
              <Text style={styles.liveIndicatorText}>{match.time}</Text>
            </View>
          )}
        </View>
        
        {/* Team 2 */}
        <View style={styles.scoreCardRow}>
          <View style={styles.scoreCardTeam}>
            <TeamLogo team={match.team2} size={28} />
            <Text style={styles.scoreCardTeamName}>{match.team2.name}</Text>
          </View>
          <Text style={[styles.scoreCardScore, match.team2.score > match.team1.score && styles.winningScore]}>
            {match.team2.score}
          </Text>
          {isFinal && (
            <Text style={styles.finalText}>Final</Text>
          )}
        </View>
      </View>
      
      {showHighlights && match.hasHighlights && (
        <TouchableOpacity style={styles.highlightsButton}>
          <Text style={styles.highlightsButtonText}>Highlights</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

function UpcomingCard({ match }) {
  return (
    <TouchableOpacity style={styles.upcomingCard} activeOpacity={0.7}>
      <View style={styles.upcomingTeams}>
        <TeamLogo team={match.team1} size={36} />
        <View style={styles.upcomingVs}>
          <Text style={styles.upcomingVsText}>@</Text>
        </View>
        <TeamLogo team={match.team2} size={36} />
      </View>
      <View style={styles.upcomingInfo}>
        <Text style={styles.upcomingTime}>{match.time}</Text>
        <Text style={styles.upcomingDate}>{match.date}</Text>
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
            <Ionicons name="tv-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="settings-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}
        contentContainerStyle={styles.tabsContent}
      >
        {tabs.map(tab => (
          <TabItem
            key={tab}
            label={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Favorites */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>FAVORITES</Text>
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

        {/* Live Now - Featured */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>LIVE NOW</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.liveMatchesRow}
          >
            {liveMatches.map(match => (
              <LiveMatchCard key={match.id} match={match} />
            ))}
          </ScrollView>
        </View>

        {/* My Games */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>MY GAMES</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {myGames.map(match => (
            <ScoreCard key={match.id} match={match} showHighlights />
          ))}
        </View>

        {/* Upcoming */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>UPCOMING</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.upcomingRow}
          >
            {upcomingGames.map(match => (
              <UpcomingCard key={match.id} match={match} />
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
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.xs,
  },
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  tabsContent: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.lg,
  },
  tab: {
    paddingVertical: Spacing.md,
    position: 'relative',
  },
  tabActive: {},
  tabText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
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
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
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
    gap: Spacing.xs,
  },
  favoriteCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  favoriteAbbr: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#000',
  },
  favoriteName: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  liveMatchesRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  liveMatchCard: {
    width: 280,
    backgroundColor: '#111',
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
  },
  matchImageArea: {
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  matchTeamsOverlay: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  vsText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  liveBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.9)',
    paddingHorizontal: Spacing.sm,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  matchScoreSection: {
    padding: Spacing.md,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  teamName: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  scoreInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  scoreText: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 28,
    textAlign: 'right',
  },
  liveTimeBox: {
    backgroundColor: Colors.statusLive,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  liveTimeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  channelText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
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
  scoreCard: {
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  scoreCardContent: {
    padding: Spacing.md,
  },
  scoreCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  scoreCardTeam: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  scoreCardTeamName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  scoreCardScore: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textMuted,
    minWidth: 28,
    textAlign: 'center',
  },
  winningScore: {
    color: Colors.textPrimary,
  },
  liveIndicatorSmall: {
    backgroundColor: Colors.statusLive,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginLeft: Spacing.sm,
  },
  liveIndicatorText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  finalText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  highlightsButton: {
    backgroundColor: '#1a1a1a',
    paddingVertical: Spacing.sm,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#222',
  },
  highlightsButtonText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentCyan,
  },
  upcomingRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  upcomingCard: {
    width: 140,
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
  },
  upcomingTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  upcomingVs: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingVsText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '600',
  },
  upcomingInfo: {
    alignItems: 'center',
  },
  upcomingTime: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  upcomingDate: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
