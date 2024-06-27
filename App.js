import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './Screens/Login';
import { SmartHome } from './Screens/SmartHomeScreen';
import { SignUp } from './Screens/SignUp';
import { Light } from './Screens/LightIntensity';
import { Temperature } from './Screens/TemperatureScreen';
import { Graph } from './Screens/GraphScreen';
import { ControlEnergy } from './Screens/ControlEnergyScreen';
import { Usage } from './Screens/UsageScreen';
import { Setting } from './Screens/SettingScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name='SignUp' 
          component={SignUp} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="SmartHomeScreen" 
          component={SmartHome} 
          options={{ 
            headerShown: false
            // title: "Welcome To Smart Home",
            // headerStyle: {
            //   backgroundColor: '#808080', // Use the same background color as the header
            // },
            // headerTintColor: '#fff', // Text color
            // headerTitleStyle: {
            //   fontSize: 24,
            //   fontWeight: 'bold',
            // },
          }} 
        />
        <Stack.Screen name="Graph" component={Graph}/>
        <Stack.Screen name="Temperature" component={Temperature}/>
        <Stack.Screen name= "Light" component={Light}/>
        <Stack.Screen name="ControlEnergy" component={ControlEnergy}/>
        <Stack.Screen name="Usage" component={Usage}/>
        <Stack.Screen name= "Setting" component={Setting}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
