import React from 'react';
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
const CARD_SIZE = (width - Spacing.lg * 3) / 2;

// Grid items
const gridItems = [
  { id: 1, title: 'Teams', icon: 'people', color: Colors.accentBlue, badge: null },
  { id: 2, title: 'Players', icon: 'person', color: Colors.accentGold, badge: null },
  { id: 3, title: 'Standings', icon: 'podium', color: Colors.statusCompleted, badge: null },
  { id: 4, title: 'Schedule', icon: 'calendar', color: '#8b5cf6', badge: null },
  { id: 5, title: 'Replays', icon: 'play-circle', color: Colors.statusLive, badge: '12' },
  { id: 6, title: 'Chat', icon: 'chatbubbles', color: '#ff6b35', badge: '99+' },
  { id: 7, title: 'Tickets', icon: 'ticket', color: Colors.accentBrown, badge: null },
  { id: 8, title: 'Event Info', icon: 'information-circle', color: Colors.textBeige, badge: null },
];

// Quick links
const quickLinks = [
  { id: 1, title: 'Watch Live', subtitle: 'Stream on Twitch & YouTube', icon: 'videocam' },
  { id: 2, title: 'Fantasy League', subtitle: 'Pick your dream team', icon: 'star' },
  { id: 3, title: 'Predictions', subtitle: 'Vote for match winners', icon: 'trophy' },
];

// Settings items
const settingsItems = [
  { id: 1, title: 'Notifications', icon: 'notifications-outline' },
  { id: 2, title: 'Dark Mode', icon: 'moon-outline', hasToggle: true, enabled: true },
  { id: 3, title: 'Language', icon: 'language-outline', value: 'English' },
  { id: 4, title: 'About NECS', icon: 'information-circle-outline' },
  { id: 5, title: 'Help & Support', icon: 'help-circle-outline' },
];

function GridCard({ item }) {
  return (
    <TouchableOpacity style={styles.gridCard} activeOpacity={0.7}>
      <View style={[styles.gridIconContainer, { backgroundColor: item.color + '20' }]}>
        <Ionicons name={item.icon} size={28} color={item.color} />
      </View>
      <Text style={styles.gridTitle}>{item.title}</Text>
      {item.badge && (
        <View style={styles.gridBadge}>
          <Text style={styles.gridBadgeText}>{item.badge}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function QuickLinkCard({ item }) {
  return (
    <TouchableOpacity style={styles.quickLinkCard} activeOpacity={0.7}>
      <View style={styles.quickLinkIcon}>
        <Ionicons name={item.icon} size={24} color={Colors.accentBlue} />
      </View>
      <View style={styles.quickLinkContent}>
        <Text style={styles.quickLinkTitle}>{item.title}</Text>
        <Text style={styles.quickLinkSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
    </TouchableOpacity>
  );
}

function SettingsItem({ item }) {
  return (
    <TouchableOpacity style={styles.settingsItem} activeOpacity={0.7}>
      <Ionicons name={item.icon} size={22} color={Colors.textSecondary} />
      <Text style={styles.settingsTitle}>{item.title}</Text>
      {item.value && <Text style={styles.settingsValue}>{item.value}</Text>}
      {item.hasToggle ? (
        <View style={[styles.toggle, item.enabled && styles.toggleEnabled]}>
          <View style={[styles.toggleKnob, item.enabled && styles.toggleKnobEnabled]} />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={18} color={Colors.textMuted} />
      )}
    </TouchableOpacity>
  );
}

export default function MoreScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="settings-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* User Card */}
        <TouchableOpacity style={styles.userCard} activeOpacity={0.8}>
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={28} color={Colors.bgPrimary} />
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>Sign In</Text>
            <Text style={styles.userSubtext}>Access your favorites & preferences</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </TouchableOpacity>

        {/* Grid Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPLORE</Text>
          <View style={styles.grid}>
            {gridItems.map(item => (
              <GridCard key={item.id} item={item} />
            ))}
          </View>
        </View>

        {/* Quick Links */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>QUICK LINKS</Text>
          <View style={styles.quickLinksCard}>
            {quickLinks.map((item, index) => (
              <View key={item.id}>
                <QuickLinkCard item={item} />
                {index < quickLinks.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SETTINGS</Text>
          <View style={styles.settingsCard}>
            {settingsItems.map((item, index) => (
              <View key={item.id}>
                <SettingsItem item={item} />
                {index < settingsItems.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>NECS 2026</Text>
          <Text style={styles.appVersion}>Version 1.0.0</Text>
          <Text style={styles.appCopyright}>© 2026 National Esports Championship Series</Text>
        </View>

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
  content: {
    flex: 1,
  },
  // User Card
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Spacing.lg,
    padding: Spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    gap: Spacing.md,
    ...Shadows.sm,
  },
  userAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.accentBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  userSubtext: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  // Sections
  section: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: Spacing.md,
  },
  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  gridCard: {
    width: CARD_SIZE,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    position: 'relative',
    ...Shadows.sm,
  },
  gridIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  gridTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  gridBadge: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: Colors.statusLive,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    minWidth: 24,
    alignItems: 'center',
  },
  gridBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#fff',
  },
  // Quick Links
  quickLinksCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  quickLinkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  quickLinkIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accentNavy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickLinkContent: {
    flex: 1,
  },
  quickLinkTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  quickLinkSubtitle: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderSubtle,
    marginHorizontal: Spacing.lg,
  },
  // Settings
  settingsCard: {
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    gap: Spacing.md,
  },
  settingsTitle: {
    flex: 1,
    fontSize: FontSizes.md,
    color: Colors.textPrimary,
  },
  settingsValue: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  toggle: {
    width: 48,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.bgElevated,
    padding: 2,
    justifyContent: 'center',
  },
  toggleEnabled: {
    backgroundColor: Colors.accentBlue,
  },
  toggleKnob: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.textMuted,
  },
  toggleKnobEnabled: {
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
  },
  // App Info
  appInfo: {
    alignItems: 'center',
    paddingVertical: Spacing['3xl'],
  },
  appName: {
    fontSize: FontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  appVersion: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
    marginTop: Spacing.xs,
  },
  appCopyright: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginTop: Spacing.sm,
  },
});

