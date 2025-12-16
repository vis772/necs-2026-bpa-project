import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, FontSizes, BorderRadius } from '../constants/theme';

const channels = [
  { id: 'general', name: 'General Chat', icon: 'chatbubbles', unread: 12, online: '2.4K' },
  { id: 'valorant', name: 'Valorant', icon: 'game-controller', unread: 5, online: '1.8K' },
  { id: 'rocket', name: 'Rocket League', icon: 'game-controller', unread: 0, online: '892' },
  { id: 'smash', name: 'Smash Bros', icon: 'game-controller', unread: 3, online: '756' },
  { id: 'predictions', name: 'Predictions', icon: 'trophy', unread: 8, online: '1.2K' },
];

const messages = [
  {
    id: 1,
    user: 'NECS_Official',
    avatar: '🏆',
    avatarColor: '#ffd700',
    message: '🎉 REMINDER: Grand Finals start at 6PM EST! Don\'t miss it! #NECS2026',
    time: '5m',
    likes: 156,
    isPinned: true,
    isVerified: true,
  },
  {
    id: 2,
    user: 'GamingPro2026',
    avatar: '🎮',
    avatarColor: '#00f0ff',
    message: 'This tournament is insane! Nova Vanguard looking unstoppable right now 🔥',
    time: '2m',
    likes: 24,
    isVerified: false,
  },
  {
    id: 3,
    user: 'EsportsEnthusiast',
    avatar: '⚡',
    avatarColor: '#8b5cf6',
    message: 'Anyone else think Phantom is the MVP so far? That 4K ace was legendary!',
    time: '8m',
    likes: 42,
    isVerified: false,
  },
  {
    id: 4,
    user: 'StreamerSam',
    avatar: '📺',
    avatarColor: '#ff4655',
    message: 'Production quality has been amazing this year. Great job to the whole team! 👏',
    time: '12m',
    likes: 67,
    isVerified: true,
  },
  {
    id: 5,
    user: 'NewViewer123',
    avatar: '👋',
    avatarColor: '#22c55e',
    message: 'First time watching NECS - this is so much better than I expected!',
    time: '15m',
    likes: 31,
    isVerified: false,
  },
  {
    id: 6,
    user: 'CompetitiveGamer',
    avatar: '🎯',
    avatarColor: '#f59e0b',
    message: 'The bracket reset potential is real. Shadow Elite could come back!',
    time: '18m',
    likes: 19,
    isVerified: false,
  },
];

const quickReactions = ['🔥', '👏', '💯', '🎉', '❤️', '😮'];

function ChannelCard({ channel, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.channelCard, isActive && styles.channelCardActive]}
      onPress={onPress}
    >
      <View style={[styles.channelIcon, isActive && styles.channelIconActive]}>
        <Ionicons name={channel.icon} size={18} color={isActive ? '#000' : Colors.textMuted} />
      </View>
      <View style={styles.channelInfo}>
        <Text style={[styles.channelName, isActive && styles.channelNameActive]}>
          #{channel.name}
        </Text>
        <Text style={styles.channelOnline}>{channel.online} online</Text>
      </View>
      {channel.unread > 0 && (
        <View style={styles.unreadBadge}>
          <Text style={styles.unreadText}>{channel.unread}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

function MessageCard({ message }) {
  const [liked, setLiked] = useState(false);

  return (
    <View style={[styles.messageCard, message.isPinned && styles.pinnedMessage]}>
      {message.isPinned && (
        <View style={styles.pinnedBadge}>
          <Ionicons name="pin" size={12} color={Colors.accentCyan} />
          <Text style={styles.pinnedText}>Pinned</Text>
        </View>
      )}
      <View style={styles.messageHeader}>
        <View style={[styles.avatar, { backgroundColor: message.avatarColor }]}>
          <Text style={styles.avatarEmoji}>{message.avatar}</Text>
        </View>
        <View style={styles.messageUserInfo}>
          <View style={styles.userNameRow}>
            <Text style={styles.userName}>{message.user}</Text>
            {message.isVerified && (
              <Ionicons name="checkmark-circle" size={14} color={Colors.accentCyan} />
            )}
            <Text style={styles.messageTime}>{message.time}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.messageText}>{message.message}</Text>
      <View style={styles.messageActions}>
        <TouchableOpacity
          style={[styles.likeButton, liked && styles.likeButtonActive]}
          onPress={() => setLiked(!liked)}
        >
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={16}
            color={liked ? Colors.statusLive : Colors.textMuted}
          />
          <Text style={[styles.likeCount, liked && styles.likeCountActive]}>
            {message.likes + (liked ? 1 : 0)}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyButton}>
          <Ionicons name="chatbubble-outline" size={14} color={Colors.textMuted} />
          <Text style={styles.replyText}>Reply</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton}>
          <Ionicons name="share-outline" size={14} color={Colors.textMuted} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [activeChannel, setActiveChannel] = useState('general');
  const [messageText, setMessageText] = useState('');
  const scrollRef = useRef(null);

  const currentChannel = channels.find(c => c.id === activeChannel);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="menu" size={24} color={Colors.textPrimary} />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>#{currentChannel?.name}</Text>
          <View style={styles.onlineIndicator}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>{currentChannel?.online} online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="people-outline" size={22} color={Colors.textPrimary} />
        </TouchableOpacity>
      </View>

      {/* Channel Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.channelsRow}
      >
        {channels.map(channel => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            isActive={activeChannel === channel.id}
            onPress={() => setActiveChannel(channel.id)}
          />
        ))}
      </ScrollView>

      {/* Quick Reactions */}
      <View style={styles.quickReactionsRow}>
        {quickReactions.map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={styles.quickReactionButton}
            onPress={() => setMessageText(prev => prev + emoji)}
          >
            <Text style={styles.quickReactionEmoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={90}
      >
        {/* Messages */}
        <ScrollView
          ref={scrollRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="add-circle" size={28} color={Colors.textMuted} />
          </TouchableOpacity>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder={`Message #${currentChannel?.name}`}
              placeholderTextColor={Colors.textMuted}
              value={messageText}
              onChangeText={setMessageText}
              multiline
            />
            <TouchableOpacity style={styles.emojiButton}>
              <Ionicons name="happy-outline" size={22} color={Colors.textMuted} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={[styles.sendButton, messageText.trim() && styles.sendButtonActive]}
            disabled={!messageText.trim()}
          >
            <Ionicons
              name="send"
              size={18}
              color={messageText.trim() ? '#000' : Colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
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
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: FontSizes.md,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  onlineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.statusCompleted,
  },
  onlineText: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  channelsRow: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
  },
  channelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  channelCardActive: {
    backgroundColor: Colors.accentCyan,
  },
  channelIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  channelIconActive: {
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  channelInfo: {
    gap: 2,
  },
  channelName: {
    fontSize: FontSizes.sm,
    fontWeight: '500',
    color: Colors.textPrimary,
  },
  channelNameActive: {
    color: '#000',
    fontWeight: '600',
  },
  channelOnline: {
    fontSize: 10,
    color: Colors.textMuted,
  },
  unreadBadge: {
    backgroundColor: Colors.statusLive,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    minWidth: 20,
    alignItems: 'center',
  },
  unreadText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#fff',
  },
  quickReactionsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: Spacing.sm,
    gap: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#111',
  },
  quickReactionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickReactionEmoji: {
    fontSize: 18,
  },
  keyboardView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: Spacing.md,
    gap: Spacing.md,
  },
  messageCard: {
    backgroundColor: '#111',
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
  },
  pinnedMessage: {
    borderLeftWidth: 3,
    borderLeftColor: Colors.accentCyan,
  },
  pinnedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  pinnedText: {
    fontSize: FontSizes.xs,
    color: Colors.accentCyan,
    fontWeight: '600',
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 18,
  },
  messageUserInfo: {
    flex: 1,
  },
  userNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  userName: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  messageTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
    marginLeft: 'auto',
  },
  messageText: {
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  messageActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    marginTop: Spacing.md,
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: BorderRadius.sm,
  },
  likeButtonActive: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  likeCount: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  likeCountActive: {
    color: Colors.statusLive,
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  replyText: {
    fontSize: FontSizes.sm,
    color: Colors.textMuted,
  },
  shareButton: {
    marginLeft: 'auto',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a',
    gap: Spacing.sm,
  },
  attachButton: {
    padding: 4,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: '#111',
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    minHeight: 44,
  },
  textInput: {
    flex: 1,
    fontSize: FontSizes.sm,
    color: Colors.textPrimary,
    maxHeight: 100,
    paddingTop: 0,
    paddingBottom: 0,
  },
  emojiButton: {
    padding: 4,
    marginLeft: Spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonActive: {
    backgroundColor: Colors.accentCyan,
  },
});
