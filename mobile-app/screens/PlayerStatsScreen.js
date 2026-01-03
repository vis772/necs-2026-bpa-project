import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

const games = ['All Games', 'Valorant', 'Rocket League', 'Smash Bros'];

const teams = [
  { id: 1, name: 'Nova Vanguard', abbr: 'NV', color: '#00f0ff', wins: 12, losses: 2, rank: 1 },
  { id: 2, name: 'Shadow Elite', abbr: 'SE', color: '#ff4655', wins: 10, losses: 4, rank: 2 },
  { id: 3, name: 'Supersonic Racers', abbr: 'SR', color: '#0080ff', wins: 11, losses: 3, rank: 3 },
  { id: 4, name: 'Titan Force', abbr: 'TF', color: '#ffd700', wins: 9, losses: 5, rank: 4 },
  { id: 5, name: 'Smash Masters', abbr: 'SM', color: '#e60012', wins: 8, losses: 6, rank: 5 },
  { id: 6, name: 'Aerial Experts', abbr: 'AE', color: '#8b5cf6', wins: 7, losses: 7, rank: 6 },
];

const topPlayers = [
  { id: 1, rank: 1, name: 'Phantom', team: 'NV', teamColor: '#00f0ff', game: 'Valorant', stat: '1.42', statLabel: 'K/D' },
  { id: 2, rank: 2, name: 'Reaper', team: 'SE', teamColor: '#ff4655', game: 'Valorant', stat: '1.38', statLabel: 'K/D' },
  { id: 3, rank: 3, name: 'Turbo', team: 'SR', teamColor: '#0080ff', game: 'Rocket League', stat: '24', statLabel: 'Goals' },
  { id: 4, rank: 4, name: 'Lightning', team: 'SM', teamColor: '#e60012', game: 'Smash Bros', stat: '87%', statLabel: 'Win%' },
  { id: 5, rank: 5, name: 'Blaze', team: 'TF', teamColor: '#ffd700', game: 'Valorant', stat: '1.35', statLabel: 'K/D' },
];

const leaders = [
  { category: 'Kills', players: [
    { name: 'Phantom', team: 'NV', color: '#00f0ff', value: '187' },
    { name: 'Reaper', team: 'SE', color: '#ff4655', value: '172' },
    { name: 'Blaze', team: 'TF', color: '#ffd700', value: '165' },
  ]},
  { category: 'Assists', players: [
    { name: 'Storm', team: 'NV', color: '#00f0ff', value: '94' },
    { name: 'Shadow', team: 'SE', color: '#ff4655', value: '88' },
    { name: 'Volt', team: 'TF', color: '#ffd700', value: '82' },
  ]},
  { category: 'Goals', players: [
    { name: 'Turbo', team: 'SR', color: '#0080ff', value: '24' },
    { name: 'Flip', team: 'AE', color: '#8b5cf6', value: '21' },
    { name: 'Boost', team: 'SR', color: '#0080ff', value: '18' },
  ]},
];

// Horizontal Rectangle Team Card
function TeamCard({ team }) {
  return (
    <TouchableOpacity style={styles.teamCard} activeOpacity={0.7}>
      <View style={[styles.teamLogo, { backgroundColor: team.color }]}>
        <Text style={styles.teamLogoText}>{team.abbr}</Text>
      </View>
      <View style={styles.teamInfo}>
        <Text style={styles.teamName}>{team.name}</Text>
        <Text style={styles.teamRecord}>{team.wins}-{team.losses}</Text>
      </View>
      <View style={styles.teamRank}>
        <Text style={styles.rankLabel}>RANK</Text>
        <Text style={styles.rankValue}>#{team.rank}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="#444" />
    </TouchableOpacity>
  );
}

function PlayerRow({ player, index }) {
  return (
    <View style={styles.playerRow}>
      <Text style={[styles.playerRank, index === 0 && styles.firstRank]}>{player.rank}</Text>
      <View style={[styles.playerDot, { backgroundColor: player.teamColor }]} />
      <View style={styles.playerInfo}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.playerTeam}>{player.team} · {player.game}</Text>
      </View>
      <View style={styles.playerStatBox}>
        <Text style={styles.playerStatValue}>{player.stat}</Text>
        <Text style={styles.playerStatLabel}>{player.statLabel}</Text>
      </View>
    </View>
  );
}

function LeaderCard({ data }) {
  return (
    <View style={styles.leaderCard}>
      <Text style={styles.leaderCategory}>{data.category}</Text>
      {data.players.map((player, idx) => (
        <View key={idx} style={styles.leaderRow}>
          <Text style={[styles.leaderRank, idx === 0 && styles.leaderFirst]}>{idx + 1}</Text>
          <View style={[styles.leaderDot, { backgroundColor: player.color }]} />
          <Text style={styles.leaderName}>{player.name}</Text>
          <Text style={styles.leaderTeamTag}>{player.team}</Text>
          <Text style={[styles.leaderValue, idx === 0 && styles.leaderValueFirst]}>{player.value}</Text>
        </View>
      ))}
    </View>
  );
}

export default function PlayerStatsScreen() {
  const [selectedGame, setSelectedGame] = useState('All Games');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats</Text>
        <TouchableOpacity>
          <Ionicons name="filter" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={18} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search players or teams"
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Game Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.gameFilters}
      >
        {games.map(game => (
          <TouchableOpacity
            key={game}
            style={[styles.gamePill, selectedGame === game && styles.gamePillActive]}
            onPress={() => setSelectedGame(game)}
          >
            <Text style={[styles.gamePillText, selectedGame === game && styles.gamePillTextActive]}>
              {game}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Teams Section - Horizontal Rectangles */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TEAMS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Full Standings →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.teamsContainer}>
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </View>
        </View>

        {/* Top Players */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>TOP PLAYERS</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Full List →</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.playersCard}>
            {topPlayers.map((player, idx) => (
              <PlayerRow key={player.id} player={player} index={idx} />
            ))}
          </View>
        </View>

        {/* Stat Leaders - Horizontal Cards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>STAT LEADERS</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.leadersRow}
          >
            {leaders.map((leader, idx) => (
              <LeaderCard key={idx} data={leader} />
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#fff',
  },
  gameFilters: {
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 8,
  },
  gamePill: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#222',
  },
  gamePillActive: {
    backgroundColor: '#d00',
    borderColor: '#d00',
  },
  gamePillText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#888',
  },
  gamePillTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  section: {
    marginTop: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
    letterSpacing: 1,
  },
  seeAll: {
    fontSize: 13,
    color: '#d00',
    fontWeight: '600',
  },
  // Teams - Horizontal Rectangles
  teamsContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  teamCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 14,
    gap: 12,
  },
  teamLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamLogoText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
  },
  teamInfo: {
    flex: 1,
  },
  teamName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  teamRecord: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  teamRank: {
    alignItems: 'flex-end',
    marginRight: 8,
  },
  rankLabel: {
    fontSize: 9,
    color: '#666',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  rankValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00f0ff',
  },
  // Players Card
  playersCard: {
    backgroundColor: '#111',
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a',
  },
  playerRank: {
    width: 24,
    fontSize: 14,
    fontWeight: '700',
    color: '#666',
    textAlign: 'center',
  },
  firstRank: {
    color: '#ffd700',
  },
  playerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  playerTeam: {
    fontSize: 11,
    color: '#888',
    marginTop: 2,
  },
  playerStatBox: {
    alignItems: 'flex-end',
  },
  playerStatValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#00f0ff',
  },
  playerStatLabel: {
    fontSize: 10,
    color: '#666',
  },
  // Leader Cards - Horizontal
  leadersRow: {
    paddingHorizontal: 16,
    gap: 10,
  },
  leaderCard: {
    width: 180,
    backgroundColor: '#111',
    borderRadius: 10,
    padding: 14,
  },
  leaderCategory: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leaderRank: {
    width: 18,
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
  },
  leaderFirst: {
    color: '#ffd700',
  },
  leaderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  leaderName: {
    flex: 1,
    fontSize: 13,
    color: '#fff',
  },
  leaderTeamTag: {
    fontSize: 10,
    color: '#666',
    marginRight: 8,
  },
  leaderValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#888',
  },
  leaderValueFirst: {
    color: '#00f0ff',
  },
});
