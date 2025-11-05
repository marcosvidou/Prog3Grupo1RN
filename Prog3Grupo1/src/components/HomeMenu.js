import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


import Home from "../screens/Home";
import Profile from "../screens/Profile";

import CrearPosteo from "../screens/CrearPosteo";

const Tab = createBottomTabNavigator();

export default function HomeMenu() {
    return (
    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>
        <Tab.Screen name="Home" 
        component={Home} 
        options={{tabBarIcon: () =>
        <AntDesign name="apple" size={24} color="black" />}
        }/>
        <Tab.Screen name="CrearPosteo" 
        component={CrearPosteo} 
        options={{tabBarIcon: () =>
        <AntDesign name="apple" size={24} color="black" />}
        }/>
        <Tab.Screen name="Profile" 
        component={Profile} 
        options={{tabBarIcon: () => 
        <MaterialCommunityIcons name="face-man-profile" size={24} color="black" />}
        }/>
    </Tab.Navigator>
    );
}