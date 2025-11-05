import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Register from "./src/screens/Register";
import Login from "./src/screens/Login";
import StackNavegation from './src/components/StackNavegation';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="StackNavegation" component={StackNavegation} />
      </Stack.Navigator>
    </NavigationContainer>
  );}