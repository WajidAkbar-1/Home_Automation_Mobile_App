import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions,StyleSheet } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { ref, get, query,limitToLast  } from "firebase/database";
import db from './databse';


const Chart = () => {

    const [consumption, setConsumption] = useState([]);
    useEffect(() => {

        (async () => {
            try {
                const consumptionRef = ref(db, "/room_data");
                const consumptionQuery = query(consumptionRef, limitToLast(5));
                const consumptionData = await get(consumptionQuery);
                console.log(Object.values(consumptionData.val()))
                setConsumption(prev => Object.values(consumptionData.val()))
            } catch (error) {
                console.log(error)
            }
        })()

    }, [])

    if(consumption.length === 0){
        return <Text>Loading...</Text>
    }


    return (
        <View>
            <Text style={styles.heading}>consumption chart</Text>
            <LineChart
                data={{
                    labels:["1","2","3","4","5"],
                    // labels:consumption?.map((data,index)=>{ 
                        
                    //     const options = {
                    //         timeZone: 'Asia/Karachi',
                    //         hour12: true, 
                    //         hour: 'numeric',
                    //         minute: 'numeric'
                    //     };
                    //     return new Date(data.timestamp).toLocaleTimeString('en-PK', options)
                    //   }) ,
        
                    datasets: [
                        {
                            // data:consumption?.map((data,index)=>data["consumption"]) 
                            data:[1,2,3,4,5]
                        }
                    ]
                }}
                width={Dimensions.get("window").width} 
                height={400}
                
                yAxisSuffix="wh"
                yAxisInterval={1} 
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, 
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 20,
                    borderRadius: 16
                }}
            />
        </View>
    )
}


const styles = StyleSheet.create({


    heading:{

        fontSize: 30,
        textAlign: "center",
        fontWeight: "bold",
        marginBottom: 20
    
    }
})
export default Chart
