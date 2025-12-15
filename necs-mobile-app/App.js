import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

import { Colors } from './constants/theme';

// Import Screens
import LiveScoresScreen from './screens/LiveScoresScreen';
import PlayerStatsScreen from './screens/PlayerStatsScreen';
import ReplaysScreen from './screens/ReplaysScreen';
import BracketsScreen from './screens/BracketsScreen';
import ChatScreen from './screens/ChatScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            primary: Colors.accentCyan,
            background: Colors.bgPrimary,
            card: Colors.bgSecondary,
            text: Colors.textPrimary,
            border: Colors.borderDefault,
            notification: Colors.statusLive,
          },
        }}
      >
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: Colors.accentCyan,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case 'Scores':
                  iconName = focused ? 'trophy' : 'trophy-outline';
                  break;
                case 'Players':
                  iconName = focused ? 'people' : 'people-outline';
                  break;
                case 'Replays':
                  iconName = focused ? 'play-circle' : 'play-circle-outline';
                  break;
                case 'Brackets':
                  iconName = focused ? 'git-network' : 'git-network-outline';
                  break;
                case 'Chat':
                  iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
                  break;
                default:
                  iconName = 'ellipse';
              }

              return <Ionicons name={iconName} size={22} color={color} />;
            },
          })}
        >
          <Tab.Screen name="Scores" component={LiveScoresScreen} />
          <Tab.Screen name="Players" component={PlayerStatsScreen} />
          <Tab.Screen name="Replays" component={ReplaysScreen} />
          <Tab.Screen name="Brackets" component={BracketsScreen} />
          <Tab.Screen name="Chat" component={ChatScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPrimary,
  },
  tabBar: {
    backgroundColor: Colors.bgSecondary,
    borderTopColor: Colors.borderDefault,
    borderTopWidth: 1,
    height: 85,
    paddingTop: 8,
    paddingBottom: 25,
  },
  tabBarLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
});

