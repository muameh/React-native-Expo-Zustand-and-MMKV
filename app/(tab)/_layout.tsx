import { View, Text } from 'react-native'
import React, { use } from 'react'
import { Tabs } from 'expo-router'
import { useCartStore } from '../../store/cartStore';


export default function TabLayout() {
    const itemsCount = useCartStore((state) => state.itemsCount);

    return (
        <Tabs screenOptions={{
            headerTitleAlign: 'center',
            headerRight: () => (
                <Text style={{ marginRight: 10, fontSize: 18, fontWeight: 'bold' }}>
                    {itemsCount}
                </Text>
            ),
        }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ focused }: { focused: boolean }) =>
                        <Text style={{
                            fontSize: 22,
                            color: focused ? '#000' : '#999',
                            opacity: focused ? 1 : 0.6,
                        }}>🏠</Text>
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: 'Cart',
                    tabBarIcon: ({ focused }: { focused: boolean }) =>
                        <Text style={{
                            fontSize: 22,
                            color: focused ? '#000' : '#999',
                            opacity: focused ? 1 : 0.4,
                        }}>🛒</Text>
                }}
            />

        </Tabs>
    )
}