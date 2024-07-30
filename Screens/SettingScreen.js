import AsyncStorage from "@react-native-async-storage/async-storage";
import { get, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import db from "../databse";
import { TouchableOpacity } from "react-native-gesture-handler";

export function Setting({ navigation }) {
    const [user, setUser] = useState()
    useEffect(() => {
        (async () => {
            try {
                let user_ = await AsyncStorage.getItem("user")
                console.log(user_)
                user_ = JSON.parse(user_)
                console.log(user_)
                const userRef = ref(db, `users/${user_.userName}`)
                const userSnapshot = await get(userRef)
                if (userSnapshot.exists()) {
                    const userData = userSnapshot.val()
                    console.log(userData)
                    setUser(prev => userData)
                }
            } catch (e) {
                console.log(e)
            }
        })()
    }, [])

    console.log(user)
    const logout = async () => {
        try {
            await AsyncStorage.removeItem("user")
            navigation.navigate("Login")
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.heading}>User Info</Text>
                <View style={styles.textView}><Text style={[styles.text, { width: 80 }]}>Name</Text><Text style={styles.text}>{user?.name} </Text></View>
                <View style={styles.textView}><Text style={[styles.text, { width: 80 }]}>User name</Text><Text style={styles.text}>{user?.userName}</Text></View>

            </View>
            <TouchableOpacity onPress={logout}><Text style={styles.button}>Logout</Text></TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        flex: 1,
        alignItems: "center"
    },
    card: {
        paddingVertical: 30,
        paddingHorizontal: 30,
        borderRadius: 5,
        height: 200,
        width: 350,
        marginVertical: 50,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },

    textView: {
        paddingVertical: 20,
        display: "flex",
        flexDirection: "row",


    },
    text: {

        fontSize: 15,
        fontWeight: "bold",
        marginHorizontal: 10

    },
    button: {

        backgroundColor: "#117A65",
        width: 300,
        height: 40,
        color: "white",
        textAlign: "center",
        fontWeight: "bold",
        paddingVertical: 5,
        borderRadius: 8,
        fontSize: 15,



    }

});