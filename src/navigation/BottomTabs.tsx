/* eslint-disable react/no-unstable-nested-components */
// import { Icon } from '@/components/';
// import useColorScheme from '@/hooks/useColorScheme';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import colors from '../theme/colors';
import { RootTabParamList } from './types';
import {
  FutureWeather,
  HomeScreen,
  MarineTideWeather,
  WeeklyWeather,
} from '../screens';
import { Icon } from '../components';
// import { ProfileScreen } from '@/screens/profile';
// import { EventsScreen, HomeScreen } from '@/screens/Home';

/**
 * Bottom Tab.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName="HomeScreen">
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Current',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-inactive'}
              color={color}
              size={16}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="MarineTideWeather"
        component={MarineTideWeather}
        options={{
          headerShown: false,
          title: 'Marine',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'transfer' : 'transfer-inactive'}
              color={color}
              size={16}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="FutureWeather"
        component={FutureWeather}
        options={{
          headerShown: false,
          title: 'Future',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'user' : 'user-inactive'}
              color={color}
              size={16}
              fill={color}
            />
          ),
        }}
      />

      <BottomTab.Screen
        name="WeeklyWeather"
        component={WeeklyWeather}
        options={{
          headerShown: false,
          title: 'Weekly',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'user' : 'user-inactive'}
              color={color}
              size={16}
              fill={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
