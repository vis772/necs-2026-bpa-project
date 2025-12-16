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

const games = [
  { id: 'valorant', name: 'Valorant', color: '#ff4655' },
  { id: 'rocket', name: 'Rocket League', color: '#0080ff' },
  { id: 'smash', name: 'Smash Bros', color: '#e60012' },
];

const tabs = ['Bracket', 'Standings', 'Schedule'];

const bracketData = {
  valorant: {
    rounds: [
      {
        name: 'Quarterfinals',
        date: 'May 8',
        matches: [
          {
            id: 1,
            time: '10:00 AM',
            team1: { name: 'Nova Vanguard', abbr: 'NV', seed: 1, score: 2, color: '#00f0ff' },
            team2: { name: 'Shadow Elite', abbr: 'SE', seed: 8, score: 1, color: '#ff4655' },
            status: 'live',
            map: 'Map 3 • Haven',
          },
          {
            id: 2,
            time: '12:00 PM',
            team1: { name: 'Titan Force', abbr: 'TF', seed: 4, score: null, color: '#ffd700' },
            team2: { name: 'Cyber Guardians', abbr: 'CG', seed: 5, score: null, color: '#22c55e' },
            status: 'upcoming',
          },
          {
            id: 3,
            time: '2:00 PM',
            team1: { name: 'Phoenix Rising', abbr: 'PR', seed: 3, score: 2, color: '#ff6b35' },
            team2: { name: 'Dark Knights', abbr: 'DK', seed: 6, score: 0, color: '#6b7280' },
            status: 'final',
          },
          {
            id: 4,
            time: '4:00 PM',
            team1: { name: 'Storm Surge', abbr: 'SS', seed: 2, score: 2, color: '#8b5cf6' },
            team2: { name: 'Iron Wall', abbr: 'IW', seed: 7, score: 1, color: '#78716c' },
            status: 'final',
          },
        ],
      },
      {
        name: 'Semifinals',
        date: 'May 9',
        matches: [
          {
            id: 5,
            time: '2:00 PM',
            team1: { name: 'Winner QF1', abbr: '?', seed: null, score: null, color: '#444' },
            team2: { name: 'Winner QF2', abbr: '?', seed: null, score: null, color: '#444' },
            status: 'pending',
          },
          {
            id: 6,
            time: '5:00 PM',
            team1: { name: 'Phoenix Rising', abbr: 'PR', seed: 3, score: null, color: '#ff6b35' },
            team2: { name: 'Storm Surge', abbr: 'SS', seed: 2, score: null, color: '#8b5cf6' },
            status: 'upcoming',
          },
        ],
      },
      {
        name: 'Grand Finals',
        date: 'May 10',
        matches: [
          {
            id: 7,
            time: '7:00 PM',
            team1: { name: 'Winner SF1', abbr: '?', seed: null, score: null, color: '#444' },
            team2: { name: 'Winner SF2', abbr: '?', seed: null, score: null, color: '#444' },
            status: 'pending',
          },
        ],
      },
    ],
  },
  rocket: {
    rounds: [
      {
        name: 'Semifinals',
        date: 'May 8',
        matches: [
          {
            id: 1,
            time: '11:00 AM',
            team1: { name: 'Supersonic Racers', abbr: 'SR', seed: 1, score: 3, color: '#0080ff' },
            team2: { name: 'Aerial Experts', abbr: 'AE', seed: 4, score: 2, color: '#8b5cf6' },
            status: 'live',
            map: 'Overtime',
          },
          {
            id: 2,
            time: '1:00 PM',
            team1: { name: 'Boost Overload', abbr: 'BO', seed: 2, score: null, color: '#22c55e' },
            team2: { name: 'Goal Storm', abbr: 'GS', seed: 3, score: null, color: '#f59e0b' },
            status: 'upcoming',
          },
        ],
      },
      {
        name: 'Grand Finals',
        date: 'May 9',
        matches: [
          {
            id: 3,
            time: '6:00 PM',
            team1: { name: 'Winner SF1', abbr: '?', seed: null, score: null, color: '#444' },
            team2: { name: 'Winner SF2', abbr: '?', seed: null, score: null, color: '#444' },
            status: 'pending',
          },
        ],
      },
    ],
  },
  smash: {
    rounds: [
      {
        name: 'Semifinals',
        date: 'May 8',
        matches: [
          {
            id: 1,
            time: '3:00 PM',
            team1: { name: 'Smash Masters', abbr: 'SM', seed: 1, score: null, color: '#e60012' },
            team2: { name: 'Knockout Brigade', abbr: 'KB', seed: 4, score: null, color: '#ff00aa' },
            status: 'upcoming',
          },
          {
            id: 2,
            time: '5:00 PM',
            team1: { name: 'Stock Crushers', abbr: 'SC', seed: 2, score: 3, color: '#22c55e' },
            team2: { name: 'Final Destination', abbr: 'FD', seed: 3, score: 1, color: '#ffd700' },
            status: 'final',
          },
        ],
      },
      {
        name: 'Grand Finals',
        date: 'May 9',
        matches: [
          {
            id: 3,
            time: '8:00 PM',
            team1: { name: 'Winner SF1', abbr: '?', seed: null, score: null, color: '#444' },
            team2: { name: 'Stock Crushers', abbr: 'SC', seed: 2, score: null, color: '#22c55e' },
            status: 'pending',
          },
        ],
      },
    ],
  },
};

const standingsData = {
  valorant: [
    { rank: 1, team: 'Nova Vanguard', abbr: 'NV', color: '#00f0ff', wins: 4, losses: 0, diff: '+8' },
    { rank: 2, team: 'Storm Surge', abbr: 'SS', color: '#8b5cf6', wins: 3, losses: 1, diff: '+5' },
    { rank: 3, team: 'Phoenix Rising', abbr: 'PR', color: '#ff6b35', wins: 3, losses: 1, diff: '+4' },
    { rank: 4, team: 'Titan Force', abbr: 'TF', color: '#ffd700', wins: 2, losses: 2, diff: '+1' },
    { rank: 5, team: 'Cyber Guardians', abbr: 'CG', color: '#22c55e', wins: 2, losses: 2, diff: '-1' },
    { rank: 6, team: 'Shadow Elite', abbr: 'SE', color: '#ff4655', wins: 1, losses: 3, diff: '-3' },
    { rank: 7, team: 'Dark Knights', abbr: 'DK', color: '#6b7280', wins: 1, losses: 3, diff: '-5' },
    { rank: 8, team: 'Iron Wall', abbr: 'IW', color: '#78716c', wins: 0, losses: 4, diff: '-9' },
  ],
  rocket: [
    { rank: 1, team: 'Supersonic Racers', abbr: 'SR', color: '#0080ff', wins: 3, losses: 0, diff: '+6' },
    { rank: 2, team: 'Boost Overload', abbr: 'BO', color: '#22c55e', wins: 2, losses: 1, diff: '+3' },
    { rank: 3, team: 'Goal Storm', abbr: 'GS', color: '#f59e0b', wins: 1, losses: 2, diff: '-2' },
    { rank: 4, team: 'Aerial Experts', abbr: 'AE', color: '#8b5cf6', wins: 0, losses: 3, diff: '-7' },
  ],
  smash: [
    { rank: 1, team: 'Smash Masters', abbr: 'SM', color: '#e60012', wins: 3, losses: 0, diff: '+7' },
    { rank: 2, team: 'Stock Crushers', abbr: 'SC', color: '#22c55e', wins: 2, losses: 1, diff: '+4' },
    { rank: 3, team: 'Final Destination', abbr: 'FD', color: '#ffd700', wins: 1, losses: 2, diff: '-3' },
    { rank: 4, team: 'Knockout Brigade', abbr: 'KB', color: '#ff00aa', wins: 0, losses: 3, diff: '-8' },
  ],
};

const scheduleData = {
  valorant: [
    { date: 'Today • May 8', matches: [
      { time: '10:00 AM', teams: 'Nova Vanguard vs Shadow Elite', round: 'Quarterfinal 1', status: 'live' },
      { time: '12:00 PM', teams: 'Titan Force vs Cyber Guardians', round: 'Quarterfinal 2', status: 'upcoming' },
    ]},
    { date: 'Tomorrow • May 9', matches: [
      { time: '2:00 PM', teams: 'Winner QF1 vs Winner QF2', round: 'Semifinal 1', status: 'upcoming' },
      { time: '5:00 PM', teams: 'Phoenix Rising vs Storm Surge', round: 'Semifinal 2', status: 'upcoming' },
    ]},
    { date: 'May 10', matches: [
      { time: '7:00 PM', teams: 'Winner SF1 vs Winner SF2', round: 'Grand Finals', status: 'upcoming' },
    ]},
  ],
  rocket: [
    { date: 'Today • May 8', matches: [
      { time: '11:00 AM', teams: 'Supersonic Racers vs Aerial Experts', round: 'Semifinal 1', status: 'live' },
      { time: '1:00 PM', teams: 'Boost Overload vs Goal Storm', round: 'Semifinal 2', status: 'upcoming' },
    ]},
    { date: 'Tomorrow • May 9', matches: [
      { time: '6:00 PM', teams: 'Winner SF1 vs Winner SF2', round: 'Grand Finals', status: 'upcoming' },
    ]},
  ],
  smash: [
    { date: 'Today • May 8', matches: [
      { time: '3:00 PM', teams: 'Smash Masters vs Knockout Brigade', round: 'Semifinal 1', status: 'upcoming' },
    ]},
    { date: 'Tomorrow • May 9', matches: [
      { time: '8:00 PM', teams: 'Winner SF1 vs Stock Crushers', round: 'Grand Finals', status: 'upcoming' },
    ]},
  ],
};

function GameTab({ game, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.gameTab, isActive && { backgroundColor: game.color }]}
      onPress={onPress}
    >
      <Text style={[styles.gameTabText, isActive && styles.gameTabTextActive]}>{game.name}</Text>
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

function BracketMatchCard({ match, gameColor }) {
  const isLive = match.status === 'live';
  const isFinal = match.status === 'final';
  const isPending = match.status === 'pending';
  const team1Won = isFinal && match.team1.score > match.team2.score;
  const team2Won = isFinal && match.team2.score > match.team1.score;

  return (
    <View style={[styles.bracketMatch, isLive && { borderLeftWidth: 3, borderLeftColor: gameColor }]}>
      <View style={styles.matchTimeCol}>
        <Text style={styles.matchTime}>{match.time}</Text>
        {isLive && (
          <View style={styles.liveBadgeSmall}>
            <View style={styles.liveDotSmall} />
            <Text style={styles.liveBadgeText}>LIVE</Text>
          </View>
        )}
        {isFinal && <Text style={styles.finalBadge}>Final</Text>}
        {isPending && <Text style={styles.pendingBadge}>TBD</Text>}
        {match.status === 'upcoming' && <Text style={styles.upcomingBadge}>Upcoming</Text>}
      </View>
      
      <View style={styles.matchTeamsCol}>
        <View style={[styles.matchTeamRow, team1Won && styles.winnerRow]}>
          {match.team1.seed && <Text style={styles.seedText}>{match.team1.seed}</Text>}
          <View style={[styles.teamLogo, { backgroundColor: match.team1.color }]}>
            <Text style={styles.teamLogoText}>{match.team1.abbr}</Text>
          </View>
          <Text style={[styles.teamName, team1Won && styles.winnerName]}>{match.team1.name}</Text>
          <Text style={[styles.scoreText, team1Won && styles.winnerScore]}>
            {match.team1.score ?? '-'}
          </Text>
        </View>
        <View style={[styles.matchTeamRow, team2Won && styles.winnerRow]}>
          {match.team2.seed && <Text style={styles.seedText}>{match.team2.seed}</Text>}
          <View style={[styles.teamLogo, { backgroundColor: match.team2.color }]}>
            <Text style={styles.teamLogoText}>{match.team2.abbr}</Text>
          </View>
          <Text style={[styles.teamName, team2Won && styles.winnerName]}>{match.team2.name}</Text>
          <Text style={[styles.scoreText, team2Won && styles.winnerScore]}>
            {match.team2.score ?? '-'}
          </Text>
        </View>
        {match.map && <Text style={styles.mapText}>{match.map}</Text>}
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

function ScheduleCard({ schedule, gameColor }) {
  return (
    <View style={styles.scheduleCard}>
      <Text style={styles.scheduleDate}>{schedule.date}</Text>
      {schedule.matches.map((match, index) => (
        <View key={index} style={[
          styles.scheduleMatch,
          match.status === 'live' && { borderLeftWidth: 3, borderLeftColor: gameColor }
        ]}>
          <View style={styles.scheduleTimeCol}>
            <Text style={styles.scheduleTime}>{match.time}</Text>
            {match.status === 'live' && (
              <View style={styles.liveBadgeTiny}>
                <Text style={styles.liveBadgeTinyText}>LIVE</Text>
              </View>
            )}
          </View>
          <View style={styles.scheduleInfo}>
            <Text style={styles.scheduleTeams}>{match.teams}</Text>
            <Text style={styles.scheduleRound}>{match.round}</Text>
          </View>
          {match.status === 'live' && (
            <TouchableOpacity style={[styles.watchBtn, { backgroundColor: gameColor }]}>
              <Ionicons name="play" size={12} color="#fff" />
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
}

export default function BracketsScreen() {
  const [activeGame, setActiveGame] = useState('valorant');
  const [activeView, setActiveView] = useState('Bracket');

  const currentGame = games.find(g => g.id === activeGame);
  const bracket = bracketData[activeGame];
  const standings = standingsData[activeGame] || [];
  const schedule = scheduleData[activeGame] || [];

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
            key={game.id}
            game={game}
            isActive={activeGame === game.id}
            onPress={() => setActiveGame(game.id)}
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

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeView === 'Bracket' && bracket && (
          <View style={styles.bracketContainer}>
            {bracket.rounds.map((round, roundIndex) => (
              <View key={roundIndex} style={styles.roundSection}>
                <View style={styles.roundHeader}>
                  <View style={[styles.roundDot, { backgroundColor: currentGame.color }]} />
                  <View>
                    <Text style={styles.roundName}>{round.name}</Text>
                    <Text style={styles.roundDate}>{round.date}</Text>
                  </View>
                </View>
                {round.matches.map(match => (
                  <BracketMatchCard key={match.id} match={match} gameColor={currentGame.color} />
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
              <StandingsRow key={team.rank} team={team} isQualified={index < Math.ceil(standings.length / 2)} />
            ))}
            <View style={styles.qualifiedLegend}>
              <View style={[styles.qualifiedDot, { backgroundColor: Colors.accentCyan }]} />
              <Text style={styles.qualifiedText}>Qualified for Playoffs</Text>
            </View>
          </View>
        )}

        {activeView === 'Schedule' && (
          <View style={styles.scheduleContainer}>
            {schedule.map((day, index) => (
              <ScheduleCard key={index} schedule={day} gameColor={currentGame.color} />
            ))}
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
  // Bracket Styles
  bracketContainer: {
    padding: Spacing.md,
  },
  roundSection: {
    marginBottom: Spacing.xl,
  },
  roundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  roundDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  roundName: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  roundDate: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  bracketMatch: {
    flexDirection: 'row',
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  matchTimeCol: {
    width: 70,
    padding: Spacing.sm,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  liveBadgeSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    marginTop: 4,
  },
  liveDotSmall: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: Colors.statusLive,
  },
  liveBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.statusLive,
  },
  finalBadge: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 4,
  },
  pendingBadge: {
    fontSize: 9,
    color: Colors.textMuted,
    marginTop: 4,
  },
  upcomingBadge: {
    fontSize: 9,
    color: Colors.statusUpcoming,
    marginTop: 4,
  },
  matchTeamsCol: {
    flex: 1,
    padding: Spacing.sm,
  },
  matchTeamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    gap: Spacing.sm,
  },
  winnerRow: {
    backgroundColor: 'rgba(0, 240, 255, 0.05)',
    marginHorizontal: -Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.sm,
  },
  seedText: {
    width: 16,
    fontSize: 10,
    color: Colors.textMuted,
    textAlign: 'center',
  },
  teamLogo: {
    width: 24,
    height: 24,
    borderRadius: BorderRadius.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#000',
  },
  teamName: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
  },
  winnerName: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  scoreText: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textMuted,
    minWidth: 20,
    textAlign: 'center',
  },
  winnerScore: {
    color: Colors.accentCyan,
  },
  mapText: {
    fontSize: 10,
    color: Colors.statusLive,
    marginTop: 4,
    marginLeft: 40,
  },
  // Standings Styles
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
  // Schedule Styles
  scheduleContainer: {
    padding: Spacing.md,
  },
  scheduleCard: {
    marginBottom: Spacing.lg,
  },
  scheduleDate: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    marginBottom: Spacing.sm,
  },
  scheduleMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.xs,
  },
  scheduleTimeCol: {
    width: 70,
    alignItems: 'center',
  },
  scheduleTime: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentCyan,
  },
  liveBadgeTiny: {
    backgroundColor: Colors.statusLive,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    marginTop: 4,
  },
  liveBadgeTinyText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#fff',
  },
  scheduleInfo: {
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
  watchBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
