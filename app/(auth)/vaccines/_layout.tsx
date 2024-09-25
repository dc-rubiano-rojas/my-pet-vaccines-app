import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="[id]"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />
            <Stack.Screen
                name="form"
                options={{
                    headerShown: false,
                    presentation: 'modal',
                }}
            />

        </Stack>
    );
}

const styles = StyleSheet.create({})

export default Layout;
