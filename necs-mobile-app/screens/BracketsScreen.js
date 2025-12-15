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
import ScreenHeader from '../components/ScreenHeader';

const games = ['Valorant', 'Rocket League', 'Smash'];

const bracketsData = {
  'Valorant': {
    quarterfinals: [
      {
        id: 1,
        status: 'live',
        team1: { name: 'Nova Vanguard', abbr: 'NV', score: 2, winner: true },
        team2: { name: 'Shadow Elite', abbr: 'SE', score: 1, winner: false },
      },
      {
        id: 2,
        status: 'upcoming',
        team1: { name: 'Titan Force', abbr: 'TF', score: null, winner: false },
        team2: { name: 'Cyber Guardians', abbr: 'CG', score: null, winner: false },
      },
    ],
    semifinals: [
      {
        id: 3,
        status: 'upcoming',
        team1: { name: 'Nova Vanguard', abbr: 'NV', score: null, winner: false },
        team2: { name: 'TBD', abbr: '?', score: null, winner: false },
      },
      {
        id: 4,
        status: 'upcoming',
        team1: { name: 'TBD', abbr: '?', score: null, winner: false },
        team2: { name: 'TBD', abbr: '?', score: null, winner: false },
      },
    ],
    finals: [
      {
        id: 5,
        status: 'upcoming',
        team1: { name: 'TBD', abbr: '?', score: null, winner: false },
        team2: { name: 'TBD', abbr: '?', score: null, winner: false },
      },
    ],
  },
};

function BracketMatch({ match }) {
  return (
    <View style={styles.bracketMatch}>
      <View style={[styles.bracketTeam, match.team1.winner && styles.bracketTeamWinner]}>
        <View style={styles.bracketTeamInfo}>
          <View style={styles.bracketTeamLogo}>
            <Text style={styles.bracketTeamAbbr}>{match.team1.abbr}</Text>
          </View>
          <Text style={styles.bracketTeamName}>{match.team1.name}</Text>
        </View>
        <Text style={[styles.bracketScore, match.team1.winner && styles.bracketScoreWinner]}>
          {match.team1.score ?? '-'}
        </Text>
      </View>
      <View style={[styles.bracketTeam, match.team2.winner && styles.bracketTeamWinner]}>
        <View style={styles.bracketTeamInfo}>
          <View style={styles.bracketTeamLogo}>
            <Text style={styles.bracketTeamAbbr}>{match.team2.abbr}</Text>
          </View>
          <Text style={styles.bracketTeamName}>{match.team2.name}</Text>
        </View>
        <Text style={[styles.bracketScore, match.team2.winner && styles.bracketScoreWinner]}>
          {match.team2.score ?? '-'}
        </Text>
      </View>
    </View>
  );
}

function BracketStage({ title, status, statusType, matches }) {
  return (
    <View style={styles.bracketStage}>
      <View style={styles.stageHeader}>
        <Text style={styles.stageTitle}>{title}</Text>
        <View style={[
          styles.statusBadge,
          statusType === 'live' && styles.statusBadgeLive,
          statusType === 'completed' && styles.statusBadgeCompleted,
        ]}>
          <Text style={[
            styles.statusText,
            statusType === 'live' && styles.statusTextLive,
            statusType === 'completed' && styles.statusTextCompleted,
          ]}>
            {status}
          </Text>
        </View>
      </View>
      <View style={styles.matchups}>
        {matches.map((match) => (
          <BracketMatch key={match.id} match={match} />
        ))}
      </View>
    </View>
  );
}

export default function BracketsScreen() {
  const [activeGame, setActiveGame] = useState('Valorant');
  const bracket = bracketsData[activeGame] || bracketsData['Valorant'];

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Bracket"
        highlightedWord="Updates"
        subtitle="Tournament progression"
      />

      {/* Game Selector */}
      <View style={styles.gameSelector}>
        {games.map((game) => (
          <TouchableOpacity
            key={game}
            style={[styles.gameBtn, activeGame === game && styles.gameBtnActive]}
            onPress={() => setActiveGame(game)}
          >
            <Text style={[styles.gameBtnText, activeGame === game && styles.gameBtnTextActive]}>
              {game}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Hint */}
      <View style={styles.hint}>
        <Ionicons name="information-circle" size={16} color={Colors.accentCyan} />
        <Text style={styles.hintText}>Teams advance upward through the bracket</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Quarterfinals */}
        <BracketStage
          title="Quarterfinals"
          status="In Progress"
          statusType="live"
          matches={bracket.quarterfinals}
        />

        {/* Semifinals */}
        <BracketStage
          title="Semifinals"
          status="Upcoming"
          statusType="upcoming"
          matches={bracket.semifinals}
        />

        {/* Finals */}
        <BracketStage
          title="Grand Final"
          status="May 10"
          statusType="upcoming"
          matches={bracket.finals}
        />

        {/* Champion Placeholder */}
        <View style={styles.championContainer}>
          <View style={styles.championBadge}>
            <Ionicons name="trophy" size={16} color={Colors.accentCyan} />
            <Text style={styles.championText}>Champion TBD</Text>
          </View>
        </View>
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
  content: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['2xl'],
  },
  gameSelector: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  gameBtn: {
    flex: 1,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    alignItems: 'center',
  },
  gameBtnActive: {
    backgroundColor: Colors.accentCyan,
    borderColor: Colors.accentCyan,
  },
  gameBtnText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  gameBtnTextActive: {
    color: Colors.bgPrimary,
  },
  hint: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.base,
    padding: Spacing.md,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.md,
  },
  hintText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  bracketStage: {
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    padding: Spacing.base,
    marginBottom: Spacing.lg,
  },
  stageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.base,
    paddingBottom: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  stageTitle: {
    fontSize: FontSizes.base,
    fontWeight: '600',
    color: Colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.lg,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  statusBadgeLive: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  statusBadgeCompleted: {
    backgroundColor: 'rgba(34, 197, 94, 0.1)',
  },
  statusText: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.accentCyan,
    textTransform: 'uppercase',
  },
  statusTextLive: {
    color: Colors.statusLive,
  },
  statusTextCompleted: {
    color: Colors.statusCompleted,
  },
  matchups: {
    gap: Spacing.md,
  },
  bracketMatch: {
    backgroundColor: Colors.bgElevated,
    borderRadius: BorderRadius.md,
    overflow: 'hidden',
  },
  bracketTeam: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderDefault,
  },
  bracketTeamWinner: {
    backgroundColor: 'rgba(0, 240, 255, 0.08)',
  },
  bracketTeamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  bracketTeamLogo: {
    width: 28,
    height: 28,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bracketTeamAbbr: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accentCyan,
  },
  bracketTeamName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  bracketScore: {
    fontSize: FontSizes.md,
    fontWeight: '700',
    color: Colors.textMuted,
    fontFamily: 'monospace',
  },
  bracketScoreWinner: {
    color: Colors.accentCyan,
  },
  championContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.base,
  },
  championBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.accentCyan,
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  championText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentCyan,
  },
});

