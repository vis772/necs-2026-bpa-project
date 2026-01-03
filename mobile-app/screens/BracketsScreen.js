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

// Date options
const dates = [
  { id: 1, day: 'Wed', date: '6', month: 'May', label: 'Day 1', hasGames: true },
  { id: 2, day: 'Thu', date: '7', month: 'May', label: 'Day 2', hasGames: true },
  { id: 3, day: 'Fri', date: '8', month: 'May', label: 'Day 3', hasGames: true, isToday: true },
  { id: 4, day: 'Sat', date: '9', month: 'May', label: 'Day 4', hasGames: true },
  { id: 5, day: 'Sun', date: '10', month: 'May', label: 'Day 5', hasGames: true },
];

// Game tabs
const gameTabs = ['Valorant', 'Rocket League', 'Smash Bros'];

// Bracket data by date
const bracketData = {
  3: { // Day 3 - May 8 (Today)
    valorant: {
      round: 'Quarterfinals',
      matches: [
        {
          id: 1,
          time: '10:00 AM',
          status: 'completed',
          team1: { abbr: 'NV', name: 'Nova Vanguard', score: 2, winner: true, color: '#00f0ff' },
          team2: { abbr: 'CG', name: 'Cyber Guardians', score: 0, color: '#22c55e' },
        },
        {
          id: 2,
          time: '12:00 PM',
          status: 'live',
          team1: { abbr: 'SE', name: 'Shadow Elite', score: 1, color: '#ff4655' },
          team2: { abbr: 'TF', name: 'Titan Force', score: 1, color: '#ffd700' },
        },
      ],
    },
    rocketLeague: {
      round: 'Semifinals',
      matches: [
        {
          id: 3,
          time: '2:00 PM',
          status: 'upcoming',
          team1: { abbr: 'SR', name: 'Supersonic Racers', color: '#0080ff' },
          team2: { abbr: 'AE', name: 'Aerial Experts', color: '#8b5cf6' },
        },
        {
          id: 4,
          time: '4:00 PM',
          status: 'upcoming',
          team1: { abbr: 'BO', name: 'Boost Overload', color: '#ff6b35' },
          team2: { abbr: 'GS', name: 'Goal Storm', color: '#0080ff' },
        },
      ],
    },
    smash: {
      round: 'Winners Bracket',
      matches: [
        {
          id: 5,
          time: '6:00 PM',
          status: 'upcoming',
          team1: { abbr: 'SM', name: 'Smash Masters', color: '#e60012' },
          team2: { abbr: 'KB', name: 'Knockout Brigade', color: '#ff00aa' },
        },
      ],
    },
  },
};

function DatePicker({ selectedDate, onSelectDate }) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.dateRow}
    >
      {dates.map(date => {
        const isSelected = selectedDate === date.id;
        return (
          <TouchableOpacity
            key={date.id}
            style={[
              styles.dateItem,
              isSelected && styles.dateItemSelected,
              date.isToday && !isSelected && styles.dateItemToday,
            ]}
            onPress={() => onSelectDate(date.id)}
          >
            <Text style={[styles.dateDay, isSelected && styles.dateDaySelected]}>
              {date.day}
            </Text>
            <Text style={[styles.dateNum, isSelected && styles.dateNumSelected]}>
              {date.date}
            </Text>
            <Text style={[styles.dateLabel, isSelected && styles.dateLabelSelected]}>
              {date.label}
            </Text>
            {date.hasGames && !isSelected && (
              <View style={styles.dateDot} />
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function GameTabs({ selectedGame, onSelectGame }) {
  return (
    <View style={styles.gameTabsContainer}>
      {gameTabs.map(game => {
        const isSelected = selectedGame === game;
        return (
          <TouchableOpacity
            key={game}
            style={[styles.gameTab, isSelected && styles.gameTabSelected]}
            onPress={() => onSelectGame(game)}
          >
            <Text style={[styles.gameTabText, isSelected && styles.gameTabTextSelected]}>
              {game}
            </Text>
            {isSelected && <View style={styles.gameTabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function TeamLogo({ abbr, color, size = 36 }) {
  return (
    <View style={[styles.teamLogo, { width: size, height: size, backgroundColor: color }]}>
      <Text style={[styles.teamLogoText, { fontSize: size * 0.35 }]}>{abbr}</Text>
    </View>
  );
}

function BracketMatch({ match }) {
  const isLive = match.status === 'live';
  const isCompleted = match.status === 'completed';
  const isUpcoming = match.status === 'upcoming';

  return (
    <View style={styles.bracketMatch}>
      {/* Time Column */}
      <View style={styles.timeColumn}>
        <Text style={styles.matchTime}>{match.time}</Text>
        {isLive && (
          <View style={styles.liveTag}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>LIVE</Text>
          </View>
        )}
        {isCompleted && <Text style={styles.finalTag}>FINAL</Text>}
      </View>

      {/* Match Box */}
      <View style={[styles.matchBox, isLive && styles.matchBoxLive]}>
        {/* Team 1 */}
        <View style={[styles.teamRow, match.team1.winner && styles.winnerRow]}>
          <TeamLogo abbr={match.team1.abbr} color={match.team1.color} />
          <Text style={[styles.teamName, match.team1.winner && styles.winnerName]}>
            {match.team1.name}
          </Text>
          {(isLive || isCompleted) && (
            <Text style={[styles.teamScore, match.team1.winner && styles.winnerScore]}>
              {match.team1.score}
            </Text>
          )}
          {match.team1.winner && (
            <Ionicons name="checkmark-circle" size={18} color={Colors.statusCompleted} />
          )}
        </View>

        {/* Divider */}
        <View style={styles.matchDivider} />

        {/* Team 2 */}
        <View style={[styles.teamRow, match.team2.winner && styles.winnerRow]}>
          <TeamLogo abbr={match.team2.abbr} color={match.team2.color} />
          <Text style={[styles.teamName, match.team2.winner && styles.winnerName]}>
            {match.team2.name}
          </Text>
          {(isLive || isCompleted) && (
            <Text style={[styles.teamScore, match.team2.winner && styles.winnerScore]}>
              {match.team2.score}
            </Text>
          )}
          {match.team2.winner && (
            <Ionicons name="checkmark-circle" size={18} color={Colors.statusCompleted} />
          )}
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity style={styles.actionButton}>
        {isLive && <Ionicons name="play-circle" size={32} color={Colors.statusLive} />}
        {isCompleted && <Ionicons name="videocam" size={24} color={Colors.accentBlue} />}
        {isUpcoming && <Ionicons name="notifications-outline" size={24} color={Colors.textMuted} />}
      </TouchableOpacity>
    </View>
  );
}

function RoundSection({ round, matches }) {
  return (
    <View style={styles.roundSection}>
      <Text style={styles.roundTitle}>{round}</Text>
      <View style={styles.matchesList}>
        {matches.map(match => (
          <BracketMatch key={match.id} match={match} />
        ))}
      </View>
    </View>
  );
}

export default function BracketsScreen() {
  const [selectedDate, setSelectedDate] = useState(3); // Default to "today"
  const [selectedGame, setSelectedGame] = useState('Valorant');

  const currentData = bracketData[selectedDate];
  const gameKey = selectedGame.toLowerCase().replace(' ', '');
  const gameData = currentData?.[gameKey === 'rocketleague' ? 'rocketLeague' : gameKey];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Brackets</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="expand-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <View style={styles.datePickerSection}>
        <DatePicker selectedDate={selectedDate} onSelectDate={setSelectedDate} />
      </View>

      {/* Game Tabs */}
      <GameTabs selectedGame={selectedGame} onSelectGame={setSelectedGame} />

      {/* Bracket Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {gameData ? (
          <RoundSection round={gameData.round} matches={gameData.matches} />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="calendar-outline" size={48} color={Colors.textMuted} />
            <Text style={styles.emptyText}>No matches scheduled</Text>
            <Text style={styles.emptySubtext}>Check back later for updates</Text>
          </View>
        )}

        {/* Full Bracket Link */}
        <TouchableOpacity style={styles.fullBracketButton}>
          <Text style={styles.fullBracketText}>View Full Tournament Bracket</Text>
          <Ionicons name="arrow-forward" size={18} color={Colors.accentBlue} />
        </TouchableOpacity>

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
  headerButton: {
    padding: Spacing.sm,
  },
  // Date Picker
  datePickerSection: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
    paddingBottom: Spacing.md,
  },
  dateRow: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.bgCard,
    minWidth: 70,
  },
  dateItemSelected: {
    backgroundColor: Colors.accentBlue,
  },
  dateItemToday: {
    borderWidth: 2,
    borderColor: Colors.accentBlue,
  },
  dateDay: {
    fontSize: FontSizes.xs,
    fontWeight: '500',
    color: Colors.textMuted,
    textTransform: 'uppercase',
  },
  dateDaySelected: {
    color: Colors.bgPrimary,
  },
  dateNum: {
    fontSize: FontSizes['2xl'],
    fontWeight: '700',
    color: Colors.textPrimary,
    marginVertical: 2,
  },
  dateNumSelected: {
    color: Colors.bgPrimary,
  },
  dateLabel: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  dateLabelSelected: {
    color: Colors.bgPrimary,
  },
  dateDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accentBlue,
    marginTop: Spacing.xs,
  },
  // Game Tabs
  gameTabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  gameTab: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    position: 'relative',
  },
  gameTabSelected: {},
  gameTabText: {
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  gameTabTextSelected: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  gameTabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.lg,
    right: Spacing.lg,
    height: 3,
    backgroundColor: Colors.accentBlue,
    borderRadius: BorderRadius.full,
  },
  // Content
  content: {
    flex: 1,
  },
  roundSection: {
    padding: Spacing.lg,
  },
  roundTitle: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    letterSpacing: 0.5,
  },
  matchesList: {
    gap: Spacing.lg,
  },
  // Bracket Match
  bracketMatch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  timeColumn: {
    width: 70,
    alignItems: 'center',
  },
  matchTime: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  liveTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
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
  finalTag: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    marginTop: 4,
  },
  matchBox: {
    flex: 1,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  matchBoxLive: {
    borderWidth: 1,
    borderColor: Colors.statusLive,
  },
  teamRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    gap: Spacing.md,
  },
  winnerRow: {
    backgroundColor: 'rgba(63, 185, 80, 0.1)',
  },
  teamLogo: {
    borderRadius: BorderRadius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamLogoText: {
    fontWeight: '800',
    color: '#000',
  },
  teamName: {
    flex: 1,
    fontSize: FontSizes.md,
    fontWeight: '500',
    color: Colors.textSecondary,
  },
  winnerName: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  teamScore: {
    fontSize: FontSizes.xl,
    fontWeight: '700',
    color: Colors.textMuted,
  },
  winnerScore: {
    color: Colors.textPrimary,
  },
  matchDivider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginHorizontal: Spacing.md,
  },
  actionButton: {
    padding: Spacing.sm,
  },
  // Empty State
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing['4xl'],
  },
  emptyText: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textSecondary,
    marginTop: Spacing.md,
  },
  emptySubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  // Full Bracket Button
  fullBracketButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.xl,
    paddingVertical: Spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
  },
  fullBracketText: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.accentBlue,
  },
});
