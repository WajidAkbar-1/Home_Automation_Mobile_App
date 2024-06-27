import { 
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity, 
  Alert,
} from 'react-native';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { styles } from '../Styles/LoginSignupStyle';

export function Login({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please enter email and password');
    } else if (!validateEmail(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
    } else {
      // login logic here
      console.log('Email:', email);
      console.log('Password:', password);
      navigation.navigate('SmartHomeScreen');
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
            placeholder="E-mail"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>
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
