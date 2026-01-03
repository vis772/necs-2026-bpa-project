import React from 'react';
import { StatusBar, View, StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Import screens
import HomeScreen from './screens/HomeScreen';
import GamesScreen from './screens/GamesScreen';
import BracketsScreen from './screens/BracketsScreen';
import StatsScreen from './screens/StatsScreen';
import NewsScreen from './screens/NewsScreen';
import MoreScreen from './screens/MoreScreen';

// Import theme
import { Colors, Spacing, TabIcons } from './constants/theme';

const Tab = createBottomTabNavigator();

// Custom dark theme for navigation
const NECSTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.accentBlue,
    background: Colors.bgPrimary,
    card: Colors.tabBarBg,
    text: Colors.textPrimary,
    border: Colors.borderSubtle,
    notification: Colors.statusLive,
  },
};

// Tab configuration: 3 left - Home (center) - 2 right
const tabs = [
  { name: 'News', component: NewsScreen, icon: TabIcons.news },
  { name: 'Games', component: GamesScreen, icon: TabIcons.games },
  { name: 'Brackets', component: BracketsScreen, icon: TabIcons.brackets },
  { name: 'Home', component: HomeScreen, icon: TabIcons.home },
  { name: 'Stats', component: StatsScreen, icon: TabIcons.stats },
  { name: 'More', component: MoreScreen, icon: TabIcons.more },
];

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor={Colors.bgPrimary} />
      <NavigationContainer theme={NECSTheme}>
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarStyle: styles.tabBar,
            tabBarActiveTintColor: Colors.tabActive,
            tabBarInactiveTintColor: Colors.tabInactive,
            tabBarLabelStyle: styles.tabLabel,
            tabBarIcon: ({ focused, color }) => {
              const tab = tabs.find(t => t.name === route.name);
              const iconName = focused ? tab.icon.active : tab.icon.inactive;
              const isHome = route.name === 'Home';
              
              return (
                <View style={[
                  styles.tabIconWrapper,
                  isHome && styles.homeTabWrapper,
                  isHome && focused && styles.homeTabActive
                ]}>
                  <Ionicons 
                    name={iconName} 
                    size={isHome ? 26 : 22} 
                    color={isHome && focused ? Colors.bgPrimary : color} 
                  />
                </View>
              );
            },
          })}
        >
          {tabs.map((tab) => (
            <Tab.Screen
              key={tab.name}
              name={tab.name}
              component={tab.component}
              options={{
                tabBarLabel: tab.name === 'Home' ? '' : tab.name,
              }}
            />
          ))}
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: Colors.tabBarBg,
    borderTopColor: Colors.borderSubtle,
    borderTopWidth: 1,
    height: Platform.OS === 'ios' ? 88 : 64,
    paddingTop: 8,
    paddingBottom: Platform.OS === 'ios' ? 28 : 8,
    paddingHorizontal: 8,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 2,
  },
  tabIconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
  },
  homeTabWrapper: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.bgElevated,
    marginTop: -20,
    borderWidth: 3,
    borderColor: Colors.bgPrimary,
  },
  homeTabActive: {
    backgroundColor: Colors.accentBlue,
  },
});
