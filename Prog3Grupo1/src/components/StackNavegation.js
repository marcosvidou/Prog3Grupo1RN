import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddComment from "../screens/AddComment";
import Home from "../screens/Home";


const Stack = createNativeStackNavigator();

export default function StackNavegation() {
    return (
    
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="AddComment" component={AddComment} />
        </Stack.Navigator>
    
    );}