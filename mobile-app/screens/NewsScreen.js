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

// News categories
const categories = ['For You', 'Breaking', 'Analysis', 'Interviews', 'Videos'];

// Featured article
const featuredArticle = {
  id: 1,
  category: 'BREAKING',
  title: 'Nova Vanguard advances to Grand Finals after dominant performance',
  subtitle: 'Phantom leads the way with 35 kills in crucial Game 3 victory',
  time: '15 min ago',
  author: 'NECS Staff',
  readTime: '3 min read',
  isVideo: false,
};

// News articles
const newsArticles = [
  {
    id: 2,
    category: 'Analysis',
    title: 'Championship predictions: Who will take home the title?',
    time: '1 hour ago',
    author: 'Expert Panel',
    hasVideo: false,
  },
  {
    id: 3,
    category: 'Interview',
    title: '"We came here to win" - Reaper discusses Shadow Elite\'s journey',
    time: '2 hours ago',
    author: 'Sarah Chen',
    hasVideo: true,
  },
  {
    id: 4,
    category: 'Highlights',
    title: 'Top 10 plays from Day 2 of NECS 2026',
    time: '4 hours ago',
    author: 'NECS Media',
    hasVideo: true,
  },
  {
    id: 5,
    category: 'Breaking',
    title: 'Supersonic Racers pull off upset in Rocket League semifinals',
    time: '5 hours ago',
    author: 'NECS Staff',
    hasVideo: false,
  },
  {
    id: 6,
    category: 'Feature',
    title: 'The rise of Lightning: How Smash Masters became the team to beat',
    time: '6 hours ago',
    author: 'Mike Torres',
    hasVideo: false,
  },
];

// Quick updates
const quickUpdates = [
  { id: 1, text: 'Titan Force confirms full roster for semifinal matchup', time: '30m' },
  { id: 2, text: 'Venue at full capacity for Day 3 of competition', time: '45m' },
  { id: 3, text: 'MVP voting now open for Valorant matches', time: '1h' },
];

function CategoryTabs({ selected, onSelect }) {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categoriesRow}
    >
      {categories.map(cat => (
        <TouchableOpacity
          key={cat}
          style={[styles.categoryTab, selected === cat && styles.categoryTabActive]}
          onPress={() => onSelect(cat)}
        >
          <Text style={[styles.categoryText, selected === cat && styles.categoryTextActive]}>
            {cat}
          </Text>
          {selected === cat && <View style={styles.categoryIndicator} />}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

function FeaturedCard({ article }) {
  return (
    <TouchableOpacity style={styles.featuredCard} activeOpacity={0.8}>
      <View style={styles.featuredImagePlaceholder}>
        <View style={styles.playButtonOverlay}>
          {article.isVideo && (
            <Ionicons name="play-circle" size={48} color="rgba(255,255,255,0.9)" />
          )}
        </View>
        <View style={styles.featuredBadge}>
          <Text style={styles.featuredBadgeText}>{article.category}</Text>
        </View>
      </View>
      <View style={styles.featuredContent}>
        <Text style={styles.featuredTitle}>{article.title}</Text>
        <Text style={styles.featuredSubtitle}>{article.subtitle}</Text>
        <View style={styles.featuredMeta}>
          <Text style={styles.featuredAuthor}>{article.author}</Text>
          <Text style={styles.featuredDot}>•</Text>
          <Text style={styles.featuredTime}>{article.time}</Text>
          <Text style={styles.featuredDot}>•</Text>
          <Text style={styles.featuredReadTime}>{article.readTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

function NewsCard({ article }) {
  return (
    <TouchableOpacity style={styles.newsCard} activeOpacity={0.7}>
      <View style={styles.newsImagePlaceholder}>
        {article.hasVideo && (
          <View style={styles.videoIcon}>
            <Ionicons name="play" size={16} color="#fff" />
          </View>
        )}
      </View>
      <View style={styles.newsContent}>
        <View style={styles.newsCategoryRow}>
          <Text style={styles.newsCategory}>{article.category}</Text>
        </View>
        <Text style={styles.newsTitle} numberOfLines={2}>{article.title}</Text>
        <View style={styles.newsMeta}>
          <Text style={styles.newsAuthor}>{article.author}</Text>
          <Text style={styles.newsTime}>{article.time}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.bookmarkBtn}>
        <Ionicons name="bookmark-outline" size={20} color={Colors.textMuted} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

function QuickUpdate({ item }) {
  return (
    <TouchableOpacity style={styles.quickUpdate}>
      <View style={styles.quickDot} />
      <Text style={styles.quickText} numberOfLines={1}>{item.text}</Text>
      <Text style={styles.quickTime}>{item.time}</Text>
    </TouchableOpacity>
  );
}

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('For You');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>News</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="bookmark-outline" size={22} color={Colors.textPrimary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Category Tabs */}
      <CategoryTabs selected={selectedCategory} onSelect={setSelectedCategory} />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Quick Updates */}
        <View style={styles.quickUpdatesSection}>
          <View style={styles.quickUpdatesHeader}>
            <Ionicons name="flash" size={16} color={Colors.accentGold} />
            <Text style={styles.quickUpdatesTitle}>QUICK UPDATES</Text>
          </View>
          {quickUpdates.map(item => (
            <QuickUpdate key={item.id} item={item} />
          ))}
        </View>

        {/* Featured Article */}
        <View style={styles.section}>
          <FeaturedCard article={featuredArticle} />
        </View>

        {/* News List */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>LATEST</Text>
          </View>
          {newsArticles.map(article => (
            <NewsCard key={article.id} article={article} />
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
  headerRight: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  headerButton: {
    padding: Spacing.sm,
  },
  // Categories
  categoriesRow: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  categoryTab: {
    paddingVertical: Spacing.xs,
    position: 'relative',
  },
  categoryTabActive: {},
  categoryText: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textMuted,
  },
  categoryTextActive: {
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  categoryIndicator: {
    position: 'absolute',
    bottom: -Spacing.sm,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: Colors.accentBlue,
    borderRadius: 1,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingTop: Spacing.md,
  },
  sectionHeader: {
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.textMuted,
    letterSpacing: 0.5,
  },
  // Quick Updates
  quickUpdatesSection: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    backgroundColor: Colors.bgCard,
    marginHorizontal: Spacing.lg,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  quickUpdatesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  quickUpdatesTitle: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: Colors.accentGold,
    letterSpacing: 1,
  },
  quickUpdate: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  quickDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accentBlue,
  },
  quickText: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
  },
  quickTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  // Featured Card
  featuredCard: {
    marginHorizontal: Spacing.lg,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    ...Shadows.sm,
  },
  featuredImagePlaceholder: {
    height: 160,
    backgroundColor: Colors.bgElevated,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  playButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuredBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.statusLive,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
  },
  featuredBadgeText: {
    fontSize: FontSizes.xs,
    fontWeight: '700',
    color: '#fff',
  },
  featuredContent: {
    padding: Spacing.md,
  },
  featuredTitle: {
    fontSize: FontSizes.lg,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 24,
    marginBottom: Spacing.sm,
  },
  featuredSubtitle: {
    fontSize: FontSizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  featuredMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featuredAuthor: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.accentBlue,
  },
  featuredDot: {
    color: Colors.textMuted,
    marginHorizontal: Spacing.sm,
  },
  featuredTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  featuredReadTime: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  // News Card
  newsCard: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderSubtle,
  },
  newsImagePlaceholder: {
    width: 68,
    height: 68,
    backgroundColor: Colors.bgCard,
    borderRadius: BorderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  newsContent: {
    flex: 1,
    justifyContent: 'center',
  },
  newsCategoryRow: {
    marginBottom: Spacing.xs,
  },
  newsCategory: {
    fontSize: FontSizes.xs,
    fontWeight: '600',
    color: Colors.accentBlue,
    textTransform: 'uppercase',
  },
  newsTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 20,
    marginBottom: Spacing.xs,
  },
  newsMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  newsAuthor: {
    fontSize: FontSizes.xs,
    color: Colors.textSecondary,
  },
  newsTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  bookmarkBtn: {
    padding: Spacing.sm,
    justifyContent: 'center',
  },
});

