import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import db from "../databse";
import { get, limitToLast, orderByKey, query, ref } from "firebase/database";
export function Light() {
    const [lightIntensity, setLightIntensity] = useState(0);
    useEffect(() => {
        (async () => {
         
            try {
                
                const sensorRef = ref(db, "/room_data");
                // Query the latest document by ordering the data by key in descending order and limiting to 1
                const latestQuery = query(sensorRef, orderByKey(), limitToLast(1));
                const dataSnapShot = await get(latestQuery);
                if (dataSnapShot.exists()) {
                    setLightIntensity(prev=>dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]]["light_intensity"])
                  // setSensorData(prev => dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]])
                
                }
            } catch (error) {
                console.log(error)
            }
        
        })()
      }, [])
    return (
        <View style={styles.main}>
            <Text style={styles.heading}>Light Intensity</Text>
            <View style={styles.container}>
                <View style={styles.circle}>

                    <Text style={styles.text}>{lightIntensity} lux</Text>
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
        fontFamily: "Cochin"
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