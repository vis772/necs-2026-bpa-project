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
            team1: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            team2: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
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
            team1: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            team2: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
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
            team1: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
            team2: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
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
            team1: { name: 'TBD', abbr: '?', seed: null, score: null, color: '#333' },
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

function ViewTab({ label, isActive, onPress, color }) {
  return (
    <TouchableOpacity style={[styles.viewTab, isActive && styles.viewTabActive]} onPress={onPress}>
      <Text style={[styles.viewTabText, isActive && styles.viewTabTextActive]}>{label}</Text>
      {isActive && <View style={[styles.viewTabIndicator, { backgroundColor: color }]} />}
    </TouchableOpacity>
  );
}

// Clean horizontal bracket match card
function BracketMatchCard({ match, gameColor }) {
  const isLive = match.status === 'live';
  const isFinal = match.status === 'final';
  const isPending = match.status === 'pending';
  const team1Won = isFinal && match.team1.score > match.team2.score;
  const team2Won = isFinal && match.team2.score > match.team1.score;

  return (
    <TouchableOpacity 
      style={[styles.matchCard, isLive && { borderLeftWidth: 3, borderLeftColor: gameColor }]}
      activeOpacity={0.7}
    >
      {/* Match Header */}
      <View style={styles.matchHeader}>
        <View style={styles.matchTimeBox}>
          <Text style={styles.matchTime}>{match.time}</Text>
        </View>
        {isLive && (
          <View style={[styles.statusBadge, { backgroundColor: '#d00' }]}>
            <View style={styles.liveDot} />
            <Text style={styles.statusText}>LIVE</Text>
          </View>
        )}
        {isFinal && (
          <View style={[styles.statusBadge, { backgroundColor: '#333' }]}>
            <Text style={styles.statusText}>FINAL</Text>
          </View>
        )}
        {isPending && (
          <View style={[styles.statusBadge, { backgroundColor: '#222' }]}>
            <Text style={styles.statusText}>TBD</Text>
          </View>
        )}
        {match.status === 'upcoming' && (
          <View style={[styles.statusBadge, { backgroundColor: '#1a3a1a' }]}>
            <Text style={[styles.statusText, { color: '#4ade80' }]}>UPCOMING</Text>
          </View>
        )}
      </View>

      {/* Team 1 - Horizontal Rectangle */}
      <View style={[styles.teamRow, team1Won && styles.winnerRow]}>
        {match.team1.seed && <Text style={styles.seedText}>{match.team1.seed}</Text>}
        <View style={[styles.teamLogo, { backgroundColor: match.team1.color }]}>
          <Text style={styles.teamLogoText}>{match.team1.abbr}</Text>
        </View>
        <Text style={[styles.teamName, team1Won && styles.winnerName]} numberOfLines={1}>
          {match.team1.name}
        </Text>
        <Text style={[styles.scoreText, team1Won && styles.winnerScore]}>
          {match.team1.score ?? '-'}
        </Text>
      </View>

      {/* Team 2 - Horizontal Rectangle */}
      <View style={[styles.teamRow, team2Won && styles.winnerRow]}>
        {match.team2.seed && <Text style={styles.seedText}>{match.team2.seed}</Text>}
        <View style={[styles.teamLogo, { backgroundColor: match.team2.color }]}>
          <Text style={styles.teamLogoText}>{match.team2.abbr}</Text>
        </View>
        <Text style={[styles.teamName, team2Won && styles.winnerName]} numberOfLines={1}>
          {match.team2.name}
        </Text>
        <Text style={[styles.scoreText, team2Won && styles.winnerScore]}>
          {match.team2.score ?? '-'}
        </Text>
      </View>

      {/* Map Info */}
      {match.map && (
        <View style={styles.mapInfo}>
          <Ionicons name="game-controller" size={12} color={gameColor} />
          <Text style={[styles.mapText, { color: gameColor }]}>{match.map}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

// Clean horizontal standings row
function StandingsRow({ team, isQualified, gameColor }) {
  return (
    <TouchableOpacity style={[styles.standingsRow, isQualified && styles.qualifiedRow]} activeOpacity={0.7}>
      <View style={[styles.rankCircle, isQualified && { backgroundColor: gameColor }]}>
        <Text style={[styles.rankNumber, isQualified && { color: '#000' }]}>{team.rank}</Text>
      </View>
      <View style={[styles.teamLogoSmall, { backgroundColor: team.color }]}>
        <Text style={styles.teamLogoSmallText}>{team.abbr}</Text>
      </View>
      <Text style={styles.standingsTeamName} numberOfLines={1}>{team.team}</Text>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>W</Text>
          <Text style={styles.statValue}>{team.wins}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>L</Text>
          <Text style={styles.statValue}>{team.losses}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>+/-</Text>
          <Text style={[
            styles.statValue,
            team.diff.startsWith('+') ? styles.positiveDiff : styles.negativeDiff
          ]}>{team.diff}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function ScheduleCard({ schedule, gameColor }) {
  return (
    <View style={styles.scheduleCard}>
      <Text style={styles.scheduleDate}>{schedule.date}</Text>
      {schedule.matches.map((match, index) => (
        <TouchableOpacity 
          key={index} 
          style={[styles.scheduleMatch, match.status === 'live' && { borderLeftWidth: 3, borderLeftColor: gameColor }]}
          activeOpacity={0.7}
        >
          <View style={styles.scheduleTimeCol}>
            <Text style={[styles.scheduleTime, { color: gameColor }]}>{match.time}</Text>
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
          {match.status === 'live' ? (
            <TouchableOpacity style={[styles.watchBtn, { backgroundColor: gameColor }]}>
              <Ionicons name="play" size={14} color="#fff" />
            </TouchableOpacity>
          ) : (
            <Ionicons name="chevron-forward" size={18} color="#444" />
          )}
        </TouchableOpacity>
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
        <Text style={styles.headerTitle}>Brackets</Text>
        <TouchableOpacity>
          <Ionicons name="share-outline" size={22} color="#fff" />
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
            color={currentGame.color}
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
            {standings.map((team, index) => (
              <StandingsRow 
                key={team.rank} 
                team={team} 
                isQualified={index < Math.ceil(standings.length / 2)}
                gameColor={currentGame.color}
              />
            ))}
            <View style={styles.qualifiedLegend}>
              <View style={[styles.qualifiedDot, { backgroundColor: currentGame.color }]} />
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
  },
  gameTabsRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 10,
  },
  gameTab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#111',
    borderRadius: 20,
  },
  gameTabText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#888',
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
    paddingVertical: 14,
    alignItems: 'center',
    position: 'relative',
  },
  viewTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  viewTabTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  viewTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    height: 3,
    borderRadius: 2,
  },
  content: {
    flex: 1,
  },
  // Bracket Styles
  bracketContainer: {
    padding: 16,
  },
  roundSection: {
    marginBottom: 24,
  },
  roundHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  roundDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  roundName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  roundDate: {
    fontSize: 12,
    color: '#666',
  },
  // Match Card - Clean Horizontal Layout
  matchCard: {
    backgroundColor: '#111',
    borderRadius: 10,
    marginBottom: 10,
    overflow: 'hidden',
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  matchTimeBox: {
    backgroundColor: '#0a0a0a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  matchTime: {
    fontSize: 12,
    fontWeight: '600',
    color: '#888',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  // Team Row - Horizontal Rectangle
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 10,
  },
  winnerRow: {
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
  },
  seedText: {
    width: 18,
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
  },
  teamLogo: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#000',
  },
  teamName: {
    flex: 1,
    fontSize: 14,
    color: '#aaa',
  },
  winnerName: {
    color: '#fff',
    fontWeight: '600',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#555',
    minWidth: 24,
    textAlign: 'center',
  },
  winnerScore: {
    color: '#00f0ff',
  },
  mapInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingBottom: 10,
    marginLeft: 60,
  },
  mapText: {
    fontSize: 11,
    fontWeight: '600',
  },
  // Standings - Horizontal Rectangles
  standingsContainer: {
    padding: 16,
  },
  standingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    gap: 10,
  },
  qualifiedRow: {
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
  },
  rankCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rankNumber: {
    fontSize: 12,
    fontWeight: '700',
    color: '#888',
  },
  teamLogoSmall: {
    width: 32,
    height: 32,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoSmallText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#000',
  },
  standingsTeamName: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  statBox: {
    alignItems: 'center',
    minWidth: 28,
  },
  statLabel: {
    fontSize: 9,
    color: '#555',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  positiveDiff: {
    color: '#4ade80',
  },
  negativeDiff: {
    color: '#f87171',
  },
  qualifiedLegend: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 16,
  },
  qualifiedDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  qualifiedText: {
    fontSize: 12,
    color: '#666',
  },
  // Schedule Styles
  scheduleContainer: {
    padding: 16,
  },
  scheduleCard: {
    marginBottom: 20,
  },
  scheduleDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  scheduleMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 14,
    marginBottom: 8,
    gap: 12,
  },
  scheduleTimeCol: {
    alignItems: 'center',
    minWidth: 65,
  },
  scheduleTime: {
    fontSize: 13,
    fontWeight: '600',
  },
  liveBadgeTiny: {
    backgroundColor: '#d00',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 4,
  },
  liveBadgeTinyText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  scheduleInfo: {
    flex: 1,
  },
  scheduleTeams: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  scheduleRound: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  watchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
