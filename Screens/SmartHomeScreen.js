import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../Styles/SmartHomeScreenStyle';

export const SmartHome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Home</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.column}>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Usage')}>
            
            <Icon name="bar-chart" size={30} color="#000" />

            <Text style={styles.buttonText}>Energy Graph</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Graph')}>
          <Icon name="attach-money" size={30} color="#000" />
            <Text style={styles.buttonText}> Energy Usage</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('ControlEnergy')}>
            <Icon name="settings-power" size={30} color="#000" />
            <Text style={styles.buttonText}>Control Devices</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.column}>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Temperature')}>
            <Icon name="thermostat" size={30} color="#000" />
            <Text style={styles.buttonText}>Temperature</Text>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Light')}>
            <Icon name="brightness-6" size={30} color="#000" />
            <Text style={styles.buttonText}>Light Intensity</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate('Setting')}>
            <Icon name="settings" size={30} color="#000" />
            <Text style={styles.buttonText}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
