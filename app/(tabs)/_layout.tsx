import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { useAuth } from '@/contexts/AuthContext';
import { Image } from 'react-native';

export default function TabLayout() {
  const loggedIn = useAuth().isLoggedIn;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#1877F2',
        tabBarInactiveTintColor: '#00000050',
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/Home.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'WISHLIST',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/Heart.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: 'ORDERS',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/Bag.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      
      <Tabs.Screen
        name="account"
        options={{
          title: 'ACCOUNT',
          href: loggedIn ? '/(tabs)/account' : null,
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/ProfilePic.png')}
              style={{
                width: 35,
                height: 35,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />

      <Tabs.Screen
          name="login"
          options={{
            title: 'login',
            href: loggedIn ? null : '/(tabs)/login',
            tabBarIcon: ({ color }) => (
              <Image
                source={require('../../assets/images/Profile.png')}
                style={{
                  width: 28,
                  height: 28,
                  tintColor: color,
                }}
                resizeMode="contain"
              />
            ),
          }}
        />
      
    </Tabs>
  );
}
