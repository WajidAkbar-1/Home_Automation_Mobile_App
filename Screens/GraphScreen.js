import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import db from "../databse";
import { get, limitToLast, orderByKey, query, ref } from "firebase/database";
import axios from "axios";
export function Graph() {
    const [predictedConsumption, setPredictedConsumption] = useState(0);
    useEffect(() => {
        (async () => {
            try {

                const sensorRef = ref(db, "/room_data");
                // Query the latest document by ordering the data by key in descending order and limiting to 1
                const latestQuery = query(sensorRef, orderByKey(), limitToLast(1));
                const dataSnapShot = await get(latestQuery);
                if (dataSnapShot.exists()) {
                    console.log(dataSnapShot.val())
                    const res = await axios.post("http://192.168.159.100:5000/predict", {
                        humidity: dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]]["humidity"],
                        temprature: dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]]["temprature"],
                        time: dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]]["timestamp"]
                    })
                    const data = res.data
                    console.log(data)
                    setPredictedConsumption(prev => data["power_consumption_prediction"].toFixed(2))
                }



            } catch (error) {
                console.log(error)
            }

        })()
    }, [])
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Energy Prediction</Text>
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Text style={styles.text}>{predictedConsumption} wh</Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: "#F5FCFF"
    },
    container: {

        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'

    },
    heading: {
        marginTop: 20,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
    }
    ,
    circle: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: '#174a78',
        borderWidth: 10,
        // create shadow for outside border of circle   








        // backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center'

    },
    text: {
        fontSize: 40,
        //best font family for temprature 
        color: "#00d394"



    }

}
)