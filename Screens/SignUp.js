import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../Styles/LoginSignupStyle';

export function SignUp({ navigation }) {
  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateUsername = (username) => {
      return /^[a-zA-Z0-9]{3,15}$/.test(username);
  };

  const validateEmail = (email) => {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
  };

  const handleLogin = () => {
      if (!validateUsername(user)) {
          Alert.alert('Error', 'Username should be between 3 and 15 characters and should not contain special characters.');
      } else if (!validateEmail(email)) {
          Alert.alert('Error', 'Please enter a valid email address.');
      } else {
          // Signup logic here
          console.log('User:', user);
          console.log('Email:', email);
          console.log('Password:', password);
      }
  };

  return (
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.title}>Sign Up</Text>
          </View>
          <View style={styles.form}>
              <View style={styles.inputContainer}>
                  <MaterialIcons name="person" size={20} color="#888" />
                  <TextInput
                      style={styles.input}
                      placeholder="Username"
                      value={user}
                      onChangeText={setUser}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <MaterialIcons name="email" size={20} color="#888" />
                  <TextInput
                      style={styles.input}
                      placeholder="E-mail"
                      value={email}
                      onChangeText={setEmail}
                  />
              </View>
              <View style={styles.inputContainer}>
                  <MaterialIcons name="lock" size={20} color="#888" />
                  <TextInput
                      style={styles.input}
                      placeholder="Password"
                      secureTextEntry={true}
                      value={password}
                      onChangeText={setPassword}
                  />
              </View>
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                  <Text style={styles.buttonText}>Create Account</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.createAccount} onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.createText}>
                      I have already account? Login
                  </Text>
              </TouchableOpacity>
          </View>
      </View>
  );
}
