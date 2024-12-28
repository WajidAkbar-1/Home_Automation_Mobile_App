import React from 'react'
import db from '../databse';
import { ref, set, get, onValue, query, limitToLast, orderByKey } from "firebase/database";
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



export function ControlEnergy() {
    const [relayState, setRelayState] = useState({});
    const [sensorsData, setSensorData] = useState({});
    const [refresh, SetRefresh] = useState(false);
    

    const updateRelayState = async (relay) => {
        setRelayState((prev) => ({
            ...prev,
            [relay]: !prev[relay],
        }));
        // Update Firebase asynchronously
        (async () => {
            try {
                const relayRef = ref(db, `/relays/${relay}`);
                await set(relayRef, !relayState[relay]); // Toggle the value
            } catch (error) {
                console.error('Error updating relay state:', error);
                // If there's an error updating Firebase, revert the local state
                setRelayState((prev) => ({
                    ...prev,
                    [relay]: !prev[relay],
                }));
            }
        })();
    }
    useEffect(() => {
        (async () => {
            const relayRef = ref(db, "/relays");
            onValue(relayRef, (snapshot) => {
                if (snapshot.exists()) {
                    setRelayState(snapshot.val())
                    console.log(snapshot.val())
                }
            })
            const sensorRef = ref(db, "/sensorData");
            // Query the latest document by ordering the data by key in descending order and limiting to 1
            const latestQuery = query(sensorRef, orderByKey(), limitToLast(1));
            const dataSnapShot = await get(latestQuery);
            if (dataSnapShot.exists()) {
                console.log(dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]])
                setSensorData(prev => dataSnapShot.val()[Object.keys(dataSnapShot.val())[0]])
                console.log(sensorsData)
            }
        })()
    }, [refresh])
    const toggleRefresh = () => {
        SetRefresh(prev => !prev)
    }
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Control Switches</Text>
            {/* <TouchableOpacity
                onPress={toggleRefresh}
                style={styles.refresh}
            >
                <Text>Refresh</Text>
            </TouchableOpacity> */}
            <View style={styles.main}>
                {/* <View style={styles.sensorTextContainer}>
                    <Text style={styles.sensorText}> Humidity   <Text style={styles.sensordata}>{sensorsData?.humidity}</Text></Text>
                    <Text style={styles.sensorText}> Temperature  <Text style={styles.sensordata}>{sensorsData?.temperature}</Text></Text>
                    <Text style={styles.sensorText}>  Light Intensity <Text style={styles.sensordata}>{sensorsData?.lightIntensity}</Text></Text>
                </View> */}
                <View style={styles.buttonContiner}>
                    {Object.keys(relayState)?.map((relay) => (
                        <TouchableOpacity
                            key={relay}
                            style={[styles?.button, { backgroundColor: relayState[relay] ? "brown" : "gray" }]}
                            onPress={() => updateRelayState(relay)}
                        >
                            <Text style={styles?.buttonText}>{relay}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,

    },
    main: {
        alignItems: 'center',
        marginTop: 150
    }
    ,
    sensorTextContainer: {
        textAlign: "center",
        display: 'flex',
        flexWrap: "no-wrap",
        marginBottom: 30,
        rowGap: 20,
    },
    sensorText: {
        fontSize: 20,
        fontWeight: "bold",
        borderWidth: 2,
        borderColor: "black",
        padding: 5, marginBottom: 3,
        borderRadius: 15,
    },
    sensordata: {
        color: "purple",
    },
    buttonContiner: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: "space-evenly",
        columnGap: 100,
        padding: 20,
        rowGap: 100
    },


    button: {
        paddingHorizontal: 15,
        paddingVertical: 30,
        borderWidth: 2,
        borderRadius: 50,
        backgroundColor: "brown"
    }

    ,
    buttonText: {
        fontSize: 20,
        textTransform: 'capitalize',
        color: "white"
    },
    heading: {
        marginTop: 30,
        fontSize: 35,
        fontWeight: "bold",
        textAlign: "center",
        fontFamily: "Cochin"
    },
    refresh: {
        marginLeft: "auto",
        paddingHorizontal: 20
    }
});
export default ControlEnergy