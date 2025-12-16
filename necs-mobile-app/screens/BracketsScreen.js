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

const games = ['Valorant', 'Rocket League', 'Smash Bros'];
const gameColors = {
  'Valorant': '#ff4655',
  'Rocket League': '#0080ff',
  'Smash Bros': '#e60012',
};

const tabs = ['Bracket', 'Standings', 'Schedule'];

const bracketData = {
  'Valorant': {
    rounds: [
      {
        name: 'Quarterfinals',
        matches: [
          {
            id: 1,
            team1: { name: 'Nova Vanguard', abbr: 'NV', seed: 1, score: 2, color: '#00f0ff' },
            team2: { name: 'Shadow Elite', abbr: 'SE', seed: 8, score: 1, color: '#ff4655' },
            status: 'live',
            time: 'Map 3',
          },
          {
            id: 2,
            team1: { name: 'Titan Force', abbr: 'TF', seed: 4, score: null, color: '#ffd700' },
            team2: { name: 'Cyber Guardians', abbr: 'CG', seed: 5, score: null, color: '#22c55e' },
            status: 'upcoming',
            time: '12:00 PM',
          },
          {
            id: 3,
            team1: { name: 'Phoenix Rising', abbr: 'PR', seed: 3, score: 2, color: '#ff6b35' },
            team2: { name: 'Dark Knights', abbr: 'DK', seed: 6, score: 0, color: '#6b7280' },
            status: 'final',
          },
          {
            id: 4,
            team1: { name: 'Storm Surge', abbr: 'SS', seed: 2, score: 2, color: '#8b5cf6' },
            team2: { name: 'Iron Wall', abbr: 'IW', seed: 7, score: 1, color: '#78716c' },
            status: 'final',
          },
        ],
      },
      {
        name: 'Semifinals',
        matches: [
          {
            id: 5,
            team1: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            team2: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            status: 'pending',
          },
          {
            id: 6,
            team1: { name: 'Phoenix Rising', abbr: 'PR', seed: 3, score: null, color: '#ff6b35' },
            team2: { name: 'Storm Surge', abbr: 'SS', seed: 2, score: null, color: '#8b5cf6' },
            status: 'upcoming',
            time: '4:00 PM',
          },
        ],
      },
      {
        name: 'Grand Finals',
        matches: [
          {
            id: 7,
            team1: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            team2: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            status: 'pending',
          },
        ],
      },
    ],
  },
};

const standingsData = {
  'Valorant': [
    { rank: 1, team: 'Nova Vanguard', abbr: 'NV', color: '#00f0ff', wins: 4, losses: 0, diff: '+8' },
    { rank: 2, team: 'Storm Surge', abbr: 'SS', color: '#8b5cf6', wins: 3, losses: 1, diff: '+5' },
    { rank: 3, team: 'Phoenix Rising', abbr: 'PR', color: '#ff6b35', wins: 3, losses: 1, diff: '+4' },
    { rank: 4, team: 'Titan Force', abbr: 'TF', color: '#ffd700', wins: 2, losses: 2, diff: '+1' },
    { rank: 5, team: 'Cyber Guardians', abbr: 'CG', color: '#22c55e', wins: 2, losses: 2, diff: '-1' },
    { rank: 6, team: 'Shadow Elite', abbr: 'SE', color: '#ff4655', wins: 1, losses: 3, diff: '-3' },
    { rank: 7, team: 'Dark Knights', abbr: 'DK', color: '#6b7280', wins: 1, losses: 3, diff: '-5' },
    { rank: 8, team: 'Iron Wall', abbr: 'IW', color: '#78716c', wins: 0, losses: 4, diff: '-9' },
  ],
};

function GameTab({ game, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.gameTab, isActive && { backgroundColor: gameColors[game] }]}
      onPress={onPress}
    >
      <Text style={[styles.gameTabText, isActive && styles.gameTabTextActive]}>{game}</Text>
    </TouchableOpacity>
  );
}

function ViewTab({ label, isActive, onPress }) {
  return (
    <TouchableOpacity style={[styles.viewTab, isActive && styles.viewTabActive]} onPress={onPress}>
      <Text style={[styles.viewTabText, isActive && styles.viewTabTextActive]}>{label}</Text>
      {isActive && <View style={styles.viewTabIndicator} />}
    </TouchableOpacity>
  );
}

function TeamLogo({ team, size = 32 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: team.color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{team.abbr}</Text>
    </View>
  );
}

function BracketMatchCard({ match, gameColor }) {
  const isLive = match.status === 'live';
  const isFinal = match.status === 'final';
  const isPending = match.status === 'pending';
  const team1Won = isFinal && match.team1.score > match.team2.score;
  const team2Won = isFinal && match.team2.score > match.team1.score;

  return (
    <View style={[styles.bracketMatch, isLive && { borderColor: gameColor, borderWidth: 1 }]}>
      {/* Status */}
      <View style={styles.matchStatus}>
        {isLive && (
          <View style={[styles.statusBadge, { backgroundColor: 'rgba(239, 68, 68, 0.2)' }]}>
            <View style={styles.liveDot} />
            <Text style={styles.liveStatusText}>LIVE</Text>
            <Text style={styles.timeText}>{match.time}</Text>
          </View>
        )}
        {match.status === 'upcoming' && (
          <View style={[styles.statusBadge, { backgroundColor: '#222' }]}>
            <Ionicons name="time-outline" size={12} color={Colors.textMuted} />
            <Text style={styles.upcomingText}>{match.time}</Text>
          </View>
        )}
        {isFinal && (
          <Text style={styles.finalStatusText}>FINAL</Text>
        )}
        {isPending && (
          <Text style={styles.pendingStatusText}>TBD</Text>
        )}
      </View>

      {/* Team 1 */}
      <View style={[styles.matchTeamRow, team1Won && styles.winnerRow]}>
        {match.team1.seed && (
          <Text style={styles.seedText}>{match.team1.seed}</Text>
        )}
        <TeamLogo team={match.team1} size={28} />
        <Text style={[styles.teamName, team1Won && styles.winnerName]} numberOfLines={1}>
          {match.team1.name}
        </Text>
        <Text style={[styles.scoreText, team1Won && styles.winnerScore]}>
          {match.team1.score ?? '-'}
        </Text>
      </View>

      {/* Team 2 */}
      <View style={[styles.matchTeamRow, team2Won && styles.winnerRow]}>
        {match.team2.seed && (
          <Text style={styles.seedText}>{match.team2.seed}</Text>
        )}
        <TeamLogo team={match.team2} size={28} />
        <Text style={[styles.teamName, team2Won && styles.winnerName]} numberOfLines={1}>
          {match.team2.name}
        </Text>
        <Text style={[styles.scoreText, team2Won && styles.winnerScore]}>
          {match.team2.score ?? '-'}
        </Text>
      </View>
    </View>
  );
}

function StandingsRow({ team, isQualified }) {
  return (
    <View style={[styles.standingsRow, isQualified && styles.qualifiedRow]}>
      <View style={styles.standingsLeft}>
        <View style={[styles.rankCircle, isQualified && { backgroundColor: Colors.accentCyan }]}>
          <Text style={[styles.rankNumber, isQualified && { color: '#000' }]}>{team.rank}</Text>
        </View>
        <View style={[styles.teamLogoSmall, { backgroundColor: team.color }]}>
          <Text style={styles.teamLogoSmallText}>{team.abbr}</Text>
        </View>
        <Text style={styles.standingsTeamName}>{team.team}</Text>
      </View>
      <View style={styles.standingsRight}>
        <Text style={styles.standingsStat}>{team.wins}</Text>
        <Text style={styles.standingsStat}>{team.losses}</Text>
        <Text style={[
          styles.standingsDiff,
          team.diff.startsWith('+') ? styles.positiveDiff : styles.negativeDiff
        ]}>{team.diff}</Text>
      </View>
    </View>
  );
}

export default function BracketsScreen() {
  const [activeGame, setActiveGame] = useState('Valorant');
  const [activeView, setActiveView] = useState('Bracket');

  const gameColor = gameColors[activeGame];
  const bracket = bracketData[activeGame];
  const standings = standingsData[activeGame] || [];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="chevron-back" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Brackets</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="share-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Game Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gameTabsRow}
      >
        {games.map(game => (
          <GameTab
            key={game}
            game={game}
            isActive={activeGame === game}
            onPress={() => setActiveGame(game)}
          />
        ))}
      </ScrollView>

      {/* View Tabs */}
      <View style={styles.viewTabsRow}>
        {tabs.map(tab => (
          <ViewTab
            key={tab}
            label={tab}
            isActive={activeView === tab}
            onPress={() => setActiveView(tab)}
          />
        ))}
      </View>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {activeView === 'Bracket' && bracket && (
          <View style={styles.bracketContainer}>
            {bracket.rounds.map((round, roundIndex) => (
              <View key={roundIndex} style={styles.roundSection}>
                <View style={styles.roundHeader}>
                  <View style={[styles.roundLine, { backgroundColor: gameColor }]} />
                  <Text style={styles.roundName}>{round.name}</Text>
                  <View style={[styles.roundLineRight, { backgroundColor: '#222' }]} />
                </View>
                {round.matches.map(match => (
                  <BracketMatchCard key={match.id} match={match} gameColor={gameColor} />
                ))}
              </View>
            ))}
          </View>
        )}

        {activeView === 'Standings' && (
          <View style={styles.standingsContainer}>
            <View style={styles.standingsHeader}>
              <Text style={styles.standingsHeaderText}>Team</Text>
              <View style={styles.standingsHeaderRight}>
                <Text style={styles.standingsHeaderStat}>W</Text>
                <Text style={styles.standingsHeaderStat}>L</Text>
                <Text style={styles.standingsHeaderStat}>+/-</Text>
              </View>
            </View>
            {standings.map((team, index) => (
              <StandingsRow key={team.rank} team={team} isQualified={index < 4} />
            ))}
            <View style={styles.qualifiedLegend}>
              <View style={[styles.qualifiedDot, { backgroundColor: Colors.accentCyan }]} />
              <Text style={styles.qualifiedText}>Qualified for Playoffs</Text>
            </View>
          </View>
        )}

        {activeView === 'Schedule' && (
          <View style={styles.scheduleContainer}>
            <Text style={styles.scheduleDate}>Today • May 8</Text>
            <View style={styles.scheduleCard}>
              <Text style={styles.scheduleTime}>12:00 PM</Text>
              <View style={styles.scheduleMatch}>
                <Text style={styles.scheduleTeams}>Titan Force vs Cyber Guardians</Text>
                <Text style={styles.scheduleRound}>Quarterfinal 2</Text>
              </View>
            </View>
            <View style={styles.scheduleCard}>
              <Text style={styles.scheduleTime}>4:00 PM</Text>
              <View style={styles.scheduleMatch}>
                <Text style={styles.scheduleTeams}>Phoenix Rising vs Storm Surge</Text>
                <Text style={styles.scheduleRound}>Semifinal 2</Text>
              </View>
            </View>
            <View style={styles.scheduleCard}>
              <Text style={styles.scheduleTime}>7:00 PM</Text>
              <View style={styles.scheduleMatch}>
                <Text style={styles.scheduleTeams}>TBD vs TBD</Text>
                <Text style={styles.scheduleRound}>Grand Finals</Text>
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
    backgroundColor: '#000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.sm,
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
  gameTabsRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    gap: Spacing.sm,
  },
  gameTab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: '#111',
    borderRadius: BorderRadius.full,
  },
  gameTabText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  gameTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  viewTabsRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  viewTab: {
    flex: 1,
    paddingVertical: Spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  viewTabActive: {},
  viewTabText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  viewTabTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  viewTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.lg,
    right: Spacing.lg,
    height: 3,
    backgroundColor: Colors.accentCyan,
  },
  content: {
    flex: 1,
  },
  bracketContainer: {
    padding: Spacing.md,
  },
  roundSection: {
    marginBottom: Spacing.xl,
  },
  roundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  roundLine: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: Spacing.sm,
  },
  roundName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  roundLineRight: {
    flex: 1,
    height: 1,
    marginLeft: Spacing.md,
  },
  bracketMatch: {
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  matchStatus: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: Spacing.sm,
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
  liveStatusText: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.statusLive,
  },
  timeText: {
    fontSize: 10,
    color: Colors.textMuted,
    marginLeft: 4,
  },
  upcomingText: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  finalStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  pendingStatusText: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  matchTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  winnerRow: {
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
  },
  seedText: {
    width: 20,
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    textAlign: 'center',
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
  teamName: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  winnerName: {
    color: Colors.accentCyan,
    fontWeight: '600',
  },
  scoreText: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textMuted,
    minWidth: 24,
    textAlign: 'center',
  },
  winnerScore: {
    color: Colors.accentCyan,
  },
  standingsContainer: {
    padding: Spacing.md,
  },
  standingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#222',
  },
  standingsHeaderText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  standingsHeaderRight: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  standingsHeaderStat: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    width: 28,
    textAlign: 'center',
  },
  standingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  qualifiedRow: {
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
  },
  standingsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flex: 1,
  },
  rankCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  teamLogoSmall: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoSmallText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#000',
  },
  standingsTeamName: {
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  standingsRight: {
    flexDirection: 'row',
    gap: Spacing.xl,
  },
  standingsStat: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    width: 28,
    textAlign: 'center',
  },
  standingsDiff: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    width: 28,
    textAlign: 'center',
  },
  positiveDiff: {
    color: Colors.statusCompleted,
  },
  negativeDiff: {
    color: Colors.statusLive,
  },
  qualifiedLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.md,
  },
  qualifiedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  qualifiedText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  scheduleContainer: {
    padding: Spacing.md,
  },
  scheduleDate: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  scheduleCard: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  scheduleTime: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentCyan,
    width: 80,
  },
  scheduleMatch: {
    flex: 1,
  },
  scheduleTeams: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  scheduleRound: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
});
