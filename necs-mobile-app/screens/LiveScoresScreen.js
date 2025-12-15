import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';
import ScreenHeader from '../components/ScreenHeader';
import GameTabs from '../components/GameTabs';

const matchesData = {
  'Valorant': [
    {
      id: 1,
      status: 'live',
      round: 'Quarterfinal 1',
      team1: { name: 'Nova Vanguard', abbr: 'NV', record: '8-2', score: 2 },
      team2: { name: 'Shadow Elite', abbr: 'SE', record: '7-3', score: 1 },
    },
    {
      id: 2,
      status: 'upcoming',
      time: '12:00 PM',
      round: 'Quarterfinal 2',
      team1: { name: 'Titan Force', abbr: 'TF', record: '6-4', score: null },
      team2: { name: 'Cyber Guardians', abbr: 'CG', record: '7-3', score: null },
    },
    {
      id: 3,
      status: 'final',
      round: 'Group Stage',
      team1: { name: 'Nova Vanguard', abbr: 'NV', record: '7-2', score: 2 },
      team2: { name: 'Cyber Guardians', abbr: 'CG', record: '6-3', score: 0 },
    },
  ],
  'Rocket League': [
    {
      id: 4,
      status: 'live',
      round: 'Semifinal 1',
      team1: { name: 'Supersonic Racers', abbr: 'SR', record: '5-1', score: 3 },
      team2: { name: 'Aerial Experts', abbr: 'AE', record: '4-2', score: 2 },
    },
    {
      id: 5,
      status: 'upcoming',
      time: '2:00 PM',
      round: 'Semifinal 2',
      team1: { name: 'Boost Overload', abbr: 'BO', record: '5-1', score: null },
      team2: { name: 'Goal Storm', abbr: 'GS', record: '4-2', score: null },
    },
  ],
  'Smash': [
    {
      id: 6,
      status: 'upcoming',
      time: '4:00 PM',
      round: 'Semifinal 1',
      team1: { name: 'Smash Masters', abbr: 'SM', record: '6-0', score: null },
      team2: { name: 'Knockout Brigade', abbr: 'KB', record: '5-1', score: null },
    },
  ],
};

function MatchCard({ match }) {
  const isLive = match.status === 'live';
  const isFinal = match.status === 'final';
  const isUpcoming = match.status === 'upcoming';

  const team1Winning = match.team1.score > match.team2.score;
  const team2Winning = match.team2.score > match.team1.score;

  return (
    <View style={[styles.matchCard, isLive && styles.matchCardLive]}>
      {/* Match Header */}
      <View style={styles.matchHeader}>
        <View style={styles.statusContainer}>
          {isLive && <View style={styles.statusDot} />}
          <Text style={[
            styles.statusText,
            isLive && styles.statusLive,
            isFinal && styles.statusFinal,
            isUpcoming && styles.statusUpcoming,
          ]}>
            {isLive ? 'Live Now' : isFinal ? 'Final' : match.time}
          </Text>
        </View>
        <Text style={styles.roundText}>{match.round}</Text>
      </View>

      {/* Teams */}
      <View style={styles.teamsContainer}>
        {/* Team 1 */}
        <View style={styles.team}>
          <View style={styles.teamLogo}>
            <Text style={styles.teamLogoText}>{match.team1.abbr}</Text>
          </View>
          <View style={styles.teamInfo}>
            <Text style={styles.teamName}>{match.team1.name}</Text>
            <Text style={styles.teamRecord}>{match.team1.record}</Text>
          </View>
        </View>

        {/* Score */}
        <View style={styles.scoreContainer}>
          <Text style={[styles.score, team1Winning && styles.scoreWinning]}>
            {match.team1.score ?? '-'}
          </Text>
          <Text style={styles.scoreDivider}>{isUpcoming ? 'vs' : '-'}</Text>
          <Text style={[styles.score, team2Winning && styles.scoreWinning]}>
            {match.team2.score ?? '-'}
          </Text>
        </View>

        {/* Team 2 */}
        <View style={[styles.team, styles.teamRight]}>
          <View style={styles.teamInfo}>
            <Text style={[styles.teamName, styles.textRight]}>{match.team2.name}</Text>
            <Text style={[styles.teamRecord, styles.textRight]}>{match.team2.record}</Text>
          </View>
          <View style={styles.teamLogo}>
            <Text style={styles.teamLogoText}>{match.team2.abbr}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default function LiveScoresScreen() {
  const [activeGame, setActiveGame] = useState('Valorant');
  const matches = matchesData[activeGame] || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Live"
        highlightedWord="Scores"
        subtitle="May 8, 2026 • Day 3"
      />

      <GameTabs activeTab={activeGame} onTabPress={setActiveGame} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.matchesList}
        showsVerticalScrollIndicator={false}
      >
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  scrollView: {
    flex: 1,
  },
  matchesList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
    gap: Spacing.md,
  },
  matchCard: {
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    padding: Spacing.base,
    marginBottom: Spacing.md,
  },
  matchCardLive: {
    borderColor: Colors.statusLive,
    shadowColor: Colors.statusLive,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.statusLive,
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusLive: {
    color: Colors.statusLive,
  },
  statusFinal: {
    color: Colors.statusCompleted,
  },
  statusUpcoming: {
    color: Colors.statusUpcoming,
  },
  roundText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    fontWeight: '500',
  },
  teamsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  team: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  teamRight: {
    justifyContent: 'flex-end',
  },
  teamLogo: {
    width: 44,
    height: 44,
    backgroundColor: Colors.bgElevated,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    fontSize: FontSizes.base,
    fontWeight: '700',
    color: Colors.accentCyan,
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  teamRecord: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: 2,
  },
  textRight: {
    textAlign: 'right',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  score: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 24,
    textAlign: 'center',
  },
  scoreWinning: {
    color: Colors.accentCyan,
  },
  scoreDivider: {
    fontSize: FontSizes.base,
    color: Colors.textMuted,
  },
});

