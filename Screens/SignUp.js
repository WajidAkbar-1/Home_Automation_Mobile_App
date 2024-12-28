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
import { ref, set } from 'firebase/database';
import db from '../databse';

export function SignUp({ navigation }) {
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const validateName = (name) => {
        return name.length >= 3;
    };

    const validateUserName = (userName) => {
        return userName.length >= 5
    };

    const validatePassword = (pass) => {
        return pass.length >= 6
    }


    const addUser = async (name, userName, password) => {
        try {

            const userRef = ref(db, `users/${userName}`);
           await set(userRef, {
                name,
                userName,
                password

            })
            Alert.alert("User Registered Successfully");
            navigation.navigate("Login")
        } catch (error) {

            console.log(error)
            Alert.alert("An Error occured");

        }

    }
    const handleLogin = () => {
        if (!validateName(name)) {
            Alert.alert('Error', 'Name should be greater than 3 characters');
        } else if (!validateUserName(userName)) {
            Alert.alert('Error', 'Please enter a userName min 5 characters.');
        }
        else if (!validatePassword(password)) {
            Alert.alert('Error', 'Please enter password min 6 characters');

        }
        else {

            // Signup logic here
            console.log('name:', name);
            console.log('Email:', userName);
            console.log('Password:', password);
            addUser(name, userName, password)




        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Sign Up</Text>
            </View>
            <View style={styles.form}>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="account-circle" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <MaterialIcons name="person" size={20} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="User name"
                        value={userName}
                        onChangeText={setUserName}
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
