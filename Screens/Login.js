import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../Styles/LoginSignupStyle';
import db from "../databse"
import { get, ref } from 'firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function Login({ navigation }) {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const validateUserName = (userName) => {
    return userName.length >= 5
  };


  const LoginUser = async (userName, password) => {
    try {
      const userRef = ref(db, `users/${userName}`)
      const userSnapshot = await get(userRef);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.val()

        if (userData.password === password) {
          console.log(userName, password)
          console.log(userData)

          await AsyncStorage.setItem("user", JSON.stringify({ userName }))

          navigation.navigate('SmartHomeScreen');

        }


      }
      else {
        Alert.alert("user name or password incorrect")
      }
    } catch (error) {
      console.log(error)
    }

  }
  const handleLogin = () => {
    if (userName === '' || password === '') {
      Alert.alert('Error', 'Please enter user Name and password');
    } else if (!validateUserName(userName)) {
      Alert.alert('Error', 'Please enter a valid user Name address');
    } else {
      // login logic her
      LoginUser(userName, password)

    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Sign In</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <MaterialIcons name="email" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="UserName"
            value={userName}
            onChangeText={(text) => setUserName(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <MaterialIcons name="lock" size={20} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createAccount} onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.createText}>
            Don't have an account? Create
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
