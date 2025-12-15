import React, { useState } from 'react';
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
import ScreenHeader from '../components/ScreenHeader';

const channels = ['#general', '#valorant', '#rocketleague', '#smash'];

const messagesData = [
  {
    id: 1,
    author: 'MaxGamer',
    initials: 'MG',
    color: '#ff4655',
    time: '2:34 PM',
    badge: null,
    message: 'That Phantom clutch was absolutely insane! 🔥',
  },
  {
    id: 2,
    author: 'ShadowFan92',
    initials: 'SF',
    color: '#22c55e',
    time: '2:35 PM',
    badge: 'VIP',
    message: "Nova Vanguard is looking unstoppable today. Their coordination is on another level!",
  },
  {
    id: 3,
    author: 'EsportsPro',
    initials: 'EP',
    color: '#8b5cf6',
    time: '2:36 PM',
    badge: null,
    message: 'Who else is hyped for the Rocket League semifinals later? 🚀',
  },
  {
    id: 4,
    author: 'TechNinja',
    initials: 'TN',
    color: '#f59e0b',
    time: '2:37 PM',
    badge: 'MOD',
    badgeColor: Colors.accentCyan,
    message: "Remember to keep the chat respectful everyone! Let's enjoy the matches together 🎮",
  },
  {
    id: 5,
    author: 'ArenaKing',
    initials: 'AK',
    color: '#ec4899',
    time: '2:38 PM',
    badge: null,
    message: 'First time at NECS and this venue is incredible! Nashville knows how to do esports!',
  },
  {
    id: 6,
    author: 'ValorantFan',
    initials: 'VF',
    color: '#06b6d4',
    time: '2:39 PM',
    badge: null,
    message: "Storm's controller plays are so clean. That smoke timing was perfect!",
  },
  {
    id: 7,
    author: 'GamerLegend',
    initials: 'GL',
    color: '#10b981',
    time: '2:40 PM',
    badge: null,
    message: "Can't wait for the Smash finals tomorrow. Lightning vs Combo is going to be epic! 💥",
  },
  {
    id: 8,
    author: 'RocketPower',
    initials: 'RP',
    color: '#f97316',
    time: '2:41 PM',
    badge: null,
    message: 'Supersonic Racers all the way! Their aerial game is unmatched 🚗💨',
  },
];

function ChannelTab({ channel, isActive, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.channelTab, isActive && styles.channelTabActive]}
      onPress={onPress}
    >
      <Text style={[styles.channelText, isActive && styles.channelTextActive]}>
        {channel}
      </Text>
    </TouchableOpacity>
  );
}

function Message({ msg }) {
  return (
    <View style={styles.message}>
      <View style={[styles.messageAvatar, { backgroundColor: msg.color }]}>
        <Text style={styles.messageInitials}>{msg.initials}</Text>
      </View>
      <View style={styles.messageContent}>
        <View style={styles.messageHeader}>
          <Text style={styles.messageAuthor}>{msg.author}</Text>
          {msg.badge && (
            <View style={[styles.messageBadge, msg.badgeColor && { backgroundColor: msg.badgeColor }]}>
              <Text style={styles.messageBadgeText}>{msg.badge}</Text>
            </View>
          )}
          <Text style={styles.messageTime}>{msg.time}</Text>
        </View>
        <Text style={styles.messageText}>{msg.message}</Text>
      </View>
    </View>
  );
}

export default function ChatScreen() {
  const [activeChannel, setActiveChannel] = useState('#general');
  const [inputMessage, setInputMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title="Community"
        highlightedWord="Chat"
        subtitle="1,247 fans online"
      />

      {/* Channel Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.channelTabs}
      >
        {channels.map((channel) => (
          <ChannelTab
            key={channel}
            channel={channel}
            isActive={activeChannel === channel}
            onPress={() => setActiveChannel(channel)}
          />
        ))}
      </ScrollView>

      <KeyboardAvoidingView
        style={styles.chatContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100}
      >
        {/* Messages */}
        <ScrollView
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messagesData.map((msg) => (
            <Message key={msg.id} msg={msg} />
          ))}
        </ScrollView>

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor={Colors.textMuted}
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={20} color={Colors.bgPrimary} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  channelTabs: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
    gap: Spacing.xs,
  },
  channelTab: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    marginRight: Spacing.xs,
  },
  channelTabActive: {
    backgroundColor: Colors.accentCyan,
    borderColor: Colors.accentCyan,
  },
  channelText: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textMuted,
  },
  channelTextActive: {
    color: Colors.bgPrimary,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.base,
    gap: Spacing.md,
  },
  message: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  messageAvatar: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageInitials: {
    fontSize: FontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  messageAuthor: {
    fontSize: FontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
  },
  messageBadge: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    backgroundColor: Colors.accentOrange,
    borderRadius: BorderRadius.sm,
  },
  messageBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: Colors.bgPrimary,
    textTransform: 'uppercase',
  },
  messageTime: {
    fontSize: FontSizes.xs,
    color: Colors.textMuted,
  },
  messageText: {
    fontSize: FontSizes.base,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.base,
    backgroundColor: Colors.bgSecondary,
    borderTopWidth: 1,
    borderTopColor: Colors.borderDefault,
    gap: Spacing.sm,
  },
  input: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.bgTertiary,
    borderRadius: BorderRadius['2xl'],
    borderWidth: 1,
    borderColor: Colors.borderDefault,
    fontSize: FontSizes.base,
    color: Colors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: Colors.accentCyan,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

