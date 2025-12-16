import React from 'react';
import { StatusBar, View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import LiveScoresScreen from './screens/LiveScoresScreen';
import PlayerStatsScreen from './screens/PlayerStatsScreen';
import ReplaysScreen from './screens/ReplaysScreen';
import BracketsScreen from './screens/BracketsScreen';
import ChatScreen from './screens/ChatScreen';

// Import theme
import { Colors, Spacing, FontSizes } from './constants/theme';

const Tab = createBottomTabNavigator();

// Custom dark theme for navigation
const NECSTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.accentCyan,
    background: '#000',
    card: '#000',
    text: Colors.textPrimary,
    border: '#1a1a1a',
    notification: Colors.statusLive,
  },
};

const tabConfig = {
  Scores: {
    icon: 'football',
    iconOutline: 'football-outline',
  },
  Stats: {
    icon: 'stats-chart',
    iconOutline: 'stats-chart-outline',
  },
  Watch: {
    icon: 'play-circle',
    iconOutline: 'play-circle-outline',
  },
  Brackets: {
    icon: 'git-network',
    iconOutline: 'git-network-outline',
  },
  Chat: {
    icon: 'chatbubbles',
    iconOutline: 'chatbubbles-outline',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer theme={NECSTheme}>
        <Tab.Navigator
          initialRouteName="Scores"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: Colors.accentCyan,
            tabBarInactiveTintColor: Colors.textMuted,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ focused, color, size }) => {
              const config = tabConfig[route.name];
              const iconName = focused ? config.icon : config.iconOutline;
              return (
                <View style={styles.tabIconWrapper}>
                  <Ionicons name={iconName} size={22} color={color} />
                </View>
              );
            },
          })}
        >
          <Tab.Screen
            name="Scores"
            component={LiveScoresScreen}
            options={{
              tabBarBadge: 2,
              tabBarBadgeStyle: styles.badge,
            }}
          />
          <Tab.Screen
            name="Stats"
            component={PlayerStatsScreen}
          />
          <Tab.Screen
            name="Watch"
            component={ReplaysScreen}
          />
          <Tab.Screen
            name="Brackets"
            component={BracketsScreen}
          />
          <Tab.Screen
            name="Chat"
            component={ChatScreen}
            options={{
              tabBarBadge: 12,
              tabBarBadgeStyle: styles.badge,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#000',
    borderTopColor: '#1a1a1a',
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 84 : 60,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 24 : 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  tabIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    backgroundColor: Colors.statusLive,
    fontSize: 10,
    fontWeight: '700',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
  },
});
