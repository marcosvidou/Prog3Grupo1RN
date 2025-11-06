import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeMenu from "./HomeMenu";
import Comentar from "../screens/Comentar";


const Stack = createNativeStackNavigator();

export default function StackNavegation() {
    return (
    
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeMenu" component={HomeMenu} />
            <Stack.Screen name="Comentar" component={Comentar} />
        </Stack.Navigator>
    
    );}