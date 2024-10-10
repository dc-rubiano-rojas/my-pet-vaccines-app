import { Stack } from 'expo-router';
import React from 'react';

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
 
        </Stack>
    );
}

export default Layout;
