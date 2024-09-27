import React from 'react';
import { Stack, Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '@/constants';

const Layout = () => {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: COLORS.secondary }} >
            <Tabs.Screen
                name="home"
                options={{
                    headerShown: false,
                    title: 'Home',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={24} name="home" color={color} />,
                }}
            />
            <Tabs.Screen
                name="pet-register"
                options={{
                    headerShown: false,
                    title: 'Pet Register',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={24} name="registered" color={color} />,
                }}
            />

            <Tabs.Screen
                name="user-profile"
                options={{
                    headerShown: false,
                    title: 'Profile',
                    tabBarIcon: ({ color }) =>
                        <FontAwesome size={24} name="user-plus" color={color} />,
                }}
            />
            <Tabs.Screen
                name="vaccines"
                options={{
                    href: null,
                    headerShown: false
                }}
            />
        </Tabs>
    )
}

export default Layout;
