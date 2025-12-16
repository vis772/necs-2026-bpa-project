import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');

const tabs = ['For You', 'Following', 'Live', 'Games'];

const featuredVideos = [
  {
    id: 1,
    title: 'Nova Vanguard vs Shadow Elite - Grand Finals Highlights',
    thumbnail: '🏆',
    thumbnailColor: '#00f0ff',
    duration: '12:34',
    views: '245K',
    time: '2 hours ago',
    isLive: false,
    channel: 'NECS Official',
  },
  {
    id: 2,
    title: 'LIVE: Quarterfinals - Titan Force vs Cyber Guardians',
    thumbnail: '🔴',
    thumbnailColor: '#ff4655',
    duration: 'LIVE',
    views: '48K watching',
    time: '',
    isLive: true,
    channel: 'NECS Official',
  },
];

const clips = [
  {
    id: 3,
    title: 'Phantom 4K ACE - Insane Clutch!',
    thumbnail: '🎯',
    thumbnailColor: '#ff4655',
    duration: '0:48',
    views: '189K',
    player: 'Phantom',
    team: 'Nova Vanguard',
  },
  {
    id: 4,
    title: 'Reaper 1v5 Clutch',
    thumbnail: '💀',
    thumbnailColor: '#8b5cf6',
    duration: '1:23',
    views: '312K',
    player: 'Reaper',
    team: 'Shadow Elite',
  },
  {
    id: 5,
    title: 'Insane Aerial Goal',
    thumbnail: '🚀',
    thumbnailColor: '#0080ff',
    duration: '0:32',
    views: '89K',
    player: 'Turbo',
    team: 'Supersonic Racers',
  },
  {
    id: 6,
    title: 'Zero-to-Death Combo',
    thumbnail: '💥',
    thumbnailColor: '#e60012',
    duration: '0:28',
    views: '67K',
    player: 'Lightning',
    team: 'Smash Masters',
  },
];

const fullMatches = [
  {
    id: 7,
    title: 'Semifinals Game 1 - Full Match',
    teams: [
      { abbr: 'NV', color: '#00f0ff' },
      { abbr: 'TF', color: '#ffd700' },
    ],
    score: '2-1',
    duration: '1:45:22',
    views: '98K',
  },
  {
    id: 8,
    title: 'Group Stage - Day 2 Recap',
    teams: [
      { abbr: 'SE', color: '#ff4655' },
      { abbr: 'CG', color: '#22c55e' },
    ],
    score: '2-0',
    duration: '1:12:08',
    views: '67K',
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

function FeaturedVideoCard({ video }) {
  return (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
      <View style={[styles.featuredThumbnail, { backgroundColor: `${video.thumbnailColor}30` }]}>
        <Text style={styles.featuredEmoji}>{video.thumbnail}</Text>
        {video.isLive ? (
          <View style={styles.liveBadgeFeatured}>
            <View style={styles.liveDot} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        ) : (
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{video.duration}</Text>
          </View>
        )}
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <Ionicons name="play" size={32} color="#fff" />
          </View>
        </View>
      </View>
      <View style={styles.featuredInfo}>
        <Text style={styles.featuredTitle} numberOfLines={2}>{video.title}</Text>
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredChannel}>{video.channel}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.featuredViews}>{video.views}</Text>
          {video.time && (
            <>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.featuredTime}>{video.time}</Text>
            </>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ClipCard({ clip }) {
  return (
    <TouchableOpacity style={styles.clipCard} activeOpacity={0.8}>
      <View style={[styles.clipThumbnail, { backgroundColor: `${clip.thumbnailColor}30` }]}>
        <Text style={styles.clipEmoji}>{clip.thumbnail}</Text>
        <View style={styles.durationBadgeSmall}>
          <Text style={styles.durationTextSmall}>{clip.duration}</Text>
        </View>
      </View>
      <View style={styles.clipInfo}>
        <Text style={styles.clipTitle} numberOfLines={2}>{clip.title}</Text>
        <Text style={styles.clipPlayer}>{clip.player} • {clip.team}</Text>
        <Text style={styles.clipViews}>{clip.views} views</Text>
      </View>
    </TouchableOpacity>
  );
}

function MatchCard({ match }) {
  return (
    <TouchableOpacity style={styles.matchCard} activeOpacity={0.8}>
      <View style={styles.matchTeams}>
        {match.teams.map((team, index) => (
          <React.Fragment key={index}>
            <View style={[styles.matchTeamLogo, { backgroundColor: team.color }]}>
              <Text style={styles.matchTeamAbbr}>{team.abbr}</Text>
            </View>
            {index === 0 && (
              <View style={styles.matchScoreBadge}>
                <Text style={styles.matchScoreText}>{match.score}</Text>
              </View>
            )}
          </React.Fragment>
        ))}
      </View>
      <View style={styles.matchInfo}>
        <Text style={styles.matchTitle} numberOfLines={1}>{match.title}</Text>
        <View style={styles.matchMeta}>
          <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
          <Text style={styles.matchDuration}>{match.duration}</Text>
          <Text style={styles.metaDot}>•</Text>
          <Text style={styles.matchViews}>{match.views}</Text>
        </View>
      </View>
      <Ionicons name="play-circle" size={36} color={Colors.accentCyan} />
    </TouchableOpacity>
  );
}

export default function ReplaysScreen() {
  const [activeTab, setActiveTab] = useState('For You');
  const [searchQuery, setSearchQuery] = useState('');

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

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Videos */}
        <View style={styles.section}>
          {featuredVideos.map(video => (
            <FeaturedVideoCard key={video.id} video={video} />
          ))}
        </View>

        {/* Clips */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>CLIPS & HIGHLIGHTS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.clipsRow}
          >
            {clips.map(clip => (
              <ClipCard key={clip.id} clip={clip} />
            ))}
          </ScrollView>
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
            <MatchCard key={match.id} match={match} />
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
    paddingTop: Spacing.md,
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
  seeAllText: {
    fontSize: FontSizes.sm,
    color: Colors.accentCyan,
    fontWeight: '600',
  },
  featuredCard: {
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.md,
  },
  featuredThumbnail: {
    height: 200,
    borderRadius: BorderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  featuredEmoji: {
    fontSize: 64,
  },
  liveBadgeFeatured: {
    position: 'absolute',
    top: Spacing.sm,
    left: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.statusLive,
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
  liveBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  durationBadge: {
    position: 'absolute',
    bottom: Spacing.sm,
    right: Spacing.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
  },
  durationText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: '#fff',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredInfo: {
    paddingTop: Spacing.md,
  },
  featuredTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xs,
  },
  featuredChannel: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  metaDot: {
    color: Colors.textMuted,
    marginHorizontal: 6,
  },
  featuredViews: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  featuredTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  clipsRow: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  clipCard: {
    width: 160,
  },
  clipThumbnail: {
    height: 100,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  clipEmoji: {
    fontSize: 36,
  },
  durationBadgeSmall: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  durationTextSmall: {
    fontSize: 10,
    fontWeight: '600',
    color: '#fff',
  },
  clipInfo: {
    paddingTop: Spacing.sm,
  },
  clipTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  clipPlayer: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 4,
  },
  clipViews: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  matchCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    gap: Spacing.md,
  },
  matchTeams: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  matchTeamLogo: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchTeamAbbr: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#000',
  },
  matchScoreBadge: {
    backgroundColor: '#222',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  matchScoreText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  matchInfo: {
    flex: 1,
  },
  matchTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  matchMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  matchDuration: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  matchViews: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
});
