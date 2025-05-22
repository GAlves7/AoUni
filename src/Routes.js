import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { LinearGradient } from 'expo-linear-gradient'
import { Ionicons } from '@expo/vector-icons'

import Feed from './screens/BarraNavegacao/Feed'
import Pesquisar from './screens/BarraNavegacao/Pesquisar'
import Groups from './screens/BarraNavegacao/Grupos'
import Notificacoes from './screens/BarraNavegacao/Notificacoes'
import Perfil from './screens/BarraNavegacao/Perfil'

const Tab = createBottomTabNavigator()

export default function Routes(){
    return(

        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarBackground: () => (
                    <LinearGradient
                        colors={['#160161', '#2602a8']}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}        
                    />
                ),
                tabBarStyle:{
                    height: 75,
                    backgroundColor: 'transparent',
                    borderTopWidth: 0, 
                    position: 'absolute', 
                },
                tabBarActiveTintColor: "#fff",
                tabBarInactiveTintColor: "#ccc",
                tabBarShowLabel: false,
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName
                    switch(route.name){
                        case 'Feed':
                            iconName = focused ? 'home' : 'home-outline'
                            break
                        case 'Pesquisar':
                            iconName = focused ? 'search' : 'search-outline'
                            break
                        case 'Grupos':
                            iconName = focused ? 'chatbox' : 'chatbox-outline'
                            break
                        case 'Notificacoes':
                            iconName = focused ? 'notifications' : 'notifications-outline'
                            break
                        case 'Perfil':
                            iconName = focused ? 'person' : 'person-outline'
                            break
                        default:
                            iconName = 'circle'
                    }

                    return <Ionicons name={iconName} size={size} color={color} />
                },
            })}
        >

            <Tab.Screen name="Feed" component={Feed} />
            <Tab.Screen name="Pesquisar" component={Pesquisar} />
            <Tab.Screen name="Grupos" component={Groups} />
            <Tab.Screen name="Notificacoes" component={Notificacoes} />
            <Tab.Screen name="Perfil" component={Perfil} />
            

        </Tab.Navigator>

    )
}