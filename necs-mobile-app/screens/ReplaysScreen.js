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

const { width } = Dimensions.get('window');

const tabs = ['For You', 'Live', 'Highlights', 'Full Matches'];

const liveStreams = [
  {
    id: 1,
    title: 'NECS 2026 Day 3 - Playoffs',
    channel: 'NECS Official',
    viewers: '48.2K',
    game: 'Valorant',
    color: '#ff4655',
  },
  {
    id: 2,
    title: 'Rocket League Semifinals',
    channel: 'NECS Official',
    viewers: '22.1K',
    game: 'Rocket League',
    color: '#0080ff',
  },
];

const highlights = [
  {
    id: 3,
    title: 'Phantom 4K ACE - Insane Clutch on Haven!',
    player: 'Phantom',
    team: 'Nova Vanguard',
    teamColor: '#00f0ff',
    duration: '0:48',
    views: '189K',
    time: '2h ago',
  },
  {
    id: 4,
    title: 'Reaper 1v5 Clutch - Match Point Save',
    player: 'Reaper',
    team: 'Shadow Elite',
    teamColor: '#ff4655',
    duration: '1:23',
    views: '312K',
    time: '3h ago',
  },
  {
    id: 5,
    title: 'Insane Aerial Goal in OT',
    player: 'Turbo',
    team: 'Supersonic Racers',
    teamColor: '#0080ff',
    duration: '0:32',
    views: '89K',
    time: '4h ago',
  },
  {
    id: 6,
    title: 'Zero-to-Death Fox Combo',
    player: 'Lightning',
    team: 'Smash Masters',
    teamColor: '#e60012',
    duration: '0:28',
    views: '67K',
    time: '5h ago',
  },
  {
    id: 7,
    title: 'Best Operator Shots - Day 3',
    player: 'Various',
    team: 'NECS',
    teamColor: '#00f0ff',
    duration: '8:45',
    views: '156K',
    time: '6h ago',
  },
  {
    id: 8,
    title: 'Top 10 Plays of the Day',
    player: 'Various',
    team: 'NECS',
    teamColor: '#ffd700',
    duration: '12:34',
    views: '245K',
    time: '8h ago',
  },
];

const fullMatches = [
  {
    id: 9,
    title: 'Nova Vanguard vs Shadow Elite',
    round: 'Quarterfinal 1',
    game: 'Valorant',
    team1: { abbr: 'NV', color: '#00f0ff' },
    team2: { abbr: 'SE', color: '#ff4655' },
    score: '2-1',
    duration: '1:45:22',
    views: '98K',
  },
  {
    id: 10,
    title: 'Phoenix Rising vs Dark Knights',
    round: 'Group A - Match 4',
    game: 'Valorant',
    team1: { abbr: 'PR', color: '#ff6b35' },
    team2: { abbr: 'DK', color: '#6b7280' },
    score: '2-0',
    duration: '58:32',
    views: '67K',
  },
  {
    id: 11,
    title: 'Stock Crushers vs Final Destination',
    round: 'Winners Bracket',
    game: 'Smash Bros',
    team1: { abbr: 'SC', color: '#22c55e' },
    team2: { abbr: 'FD', color: '#ffd700' },
    score: '3-1',
    duration: '42:18',
    views: '45K',
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

function LiveStreamCard({ stream }) {
  return (
    <TouchableOpacity style={styles.liveStreamCard} activeOpacity={0.8}>
      <View style={[styles.streamThumbnail, { backgroundColor: `${stream.color}20` }]}>
        <View style={styles.streamContent}>
          <Ionicons name="play-circle" size={48} color={stream.color} />
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
        <View style={styles.viewersBadge}>
          <Ionicons name="eye" size={12} color="#fff" />
          <Text style={styles.viewersText}>{stream.viewers}</Text>
        </View>
      </View>
      <View style={styles.streamInfo}>
        <Text style={styles.streamTitle} numberOfLines={1}>{stream.title}</Text>
        <Text style={styles.streamChannel}>{stream.channel} • {stream.game}</Text>
      </View>
    </TouchableOpacity>
  );
}

function HighlightCard({ highlight }) {
  return (
    <TouchableOpacity style={styles.highlightCard} activeOpacity={0.7}>
      <View style={[styles.highlightThumbnail, { backgroundColor: `${highlight.teamColor}20` }]}>
        <View style={[styles.highlightIcon, { backgroundColor: highlight.teamColor }]}>
          <Text style={styles.highlightInitial}>{highlight.player.charAt(0)}</Text>
        </View>
        <View style={styles.durationBadge}>
          <Text style={styles.durationText}>{highlight.duration}</Text>
        </View>
        <View style={styles.playOverlaySmall}>
          <Ionicons name="play" size={20} color="#fff" />
        </View>
      </View>
      <View style={styles.highlightInfo}>
        <Text style={styles.highlightTitle} numberOfLines={2}>{highlight.title}</Text>
        <Text style={styles.highlightMeta}>{highlight.player} • {highlight.team}</Text>
        <Text style={styles.highlightStats}>{highlight.views} views • {highlight.time}</Text>
      </View>
    </TouchableOpacity>
  );
}

function FullMatchCard({ match }) {
  return (
    <TouchableOpacity style={styles.matchCard} activeOpacity={0.7}>
      <View style={styles.matchTeams}>
        <View style={[styles.matchTeamLogo, { backgroundColor: match.team1.color }]}>
          <Text style={styles.matchTeamAbbr}>{match.team1.abbr}</Text>
        </View>
        <View style={styles.matchScoreBox}>
          <Text style={styles.matchScore}>{match.score}</Text>
        </View>
        <View style={[styles.matchTeamLogo, { backgroundColor: match.team2.color }]}>
          <Text style={styles.matchTeamAbbr}>{match.team2.abbr}</Text>
        </View>
      </View>
      <View style={styles.matchInfo}>
        <Text style={styles.matchTitle} numberOfLines={1}>{match.title}</Text>
        <Text style={styles.matchMeta}>{match.game} • {match.round}</Text>
        <View style={styles.matchStats}>
          <View style={styles.matchStatItem}>
            <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.matchStatText}>{match.duration}</Text>
          </View>
          <View style={styles.matchStatItem}>
            <Ionicons name="eye-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.matchStatText}>{match.views}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.playButton}>
        <Ionicons name="play" size={20} color={Colors.accentCyan} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default function ReplaysScreen() {
  const [activeTab, setActiveTab] = useState('For You');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="search" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Watch</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="download-outline" size={22} color={Colors.textPrimary} />
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Live Streams */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionTitleRow}>
              <View style={styles.liveIndicator} />
              <Text style={styles.sectionTitle}>LIVE NOW</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.liveStreamRow}
          >
            {liveStreams.map(stream => (
              <LiveStreamCard key={stream.id} stream={stream} />
            ))}
          </ScrollView>
        </View>

        {/* Highlights */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CLIPS & HIGHLIGHTS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.highlightsGrid}>
            {highlights.map(highlight => (
              <HighlightCard key={highlight.id} highlight={highlight} />
            ))}
          </View>
        </View>

        {/* Full Matches */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>FULL MATCHES</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {fullMatches.map(match => (
            <FullMatchCard key={match.id} match={match} />
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
  tabsContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  tabsContent: {
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
  liveIndicator: {
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
  // Live Stream Cards
  liveStreamRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  liveStreamCard: {
    width: 260,
  },
  streamThumbnail: {
    height: 140,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  streamContent: {
    alignItems: 'center',
  },
  liveBadge: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.statusLive,
    paddingHorizontal: 8,
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
  viewersBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  viewersText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  streamInfo: {
    paddingTop: Spacing.sm,
  },
  streamTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  streamChannel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  // Highlight Cards
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
  },
  highlightCard: {
    width: (width - Spacing.md * 2 - Spacing.sm) / 2,
    marginBottom: Spacing.sm,
  },
  highlightThumbnail: {
    height: 90,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  highlightIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightInitial: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: '#000',
  },
  durationBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  durationText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  playOverlaySmall: {
    position: 'absolute',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightInfo: {
    paddingTop: Spacing.sm,
  },
  highlightTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 16,
  },
  highlightMeta: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 4,
  },
  highlightStats: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  // Match Cards
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  matchTeamLogo: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchTeamAbbr: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  matchScoreBox: {
    backgroundColor: '#222',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  matchScore: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  matchInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  matchTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  matchMeta: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  matchStats: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginTop: 4,
  },
  matchStatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  matchStatText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
