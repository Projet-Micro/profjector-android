import { View, StyleSheet, Animated } from 'react-native'
import React,{useEffect,useRef, useState} from 'react'
export default function Suspense() {
    let colorValue = useRef(new Animated.Value(0)).current;
    const [animatedStyle, setAnimatedStyle] = useState<any>(null)   
    const interpolateColor = colorValue.interpolate({
        inputRange: [0, 150],
        outputRange: ["#D8D4FC","#D8DFFF"]
        })    
    useEffect(() => {

        setAnimatedStyle({
            backgroundColor : interpolateColor
        })
Animated.loop(
  Animated.sequence([
    Animated.timing(colorValue, {
      toValue: 150,
      duration: 2000,
      useNativeDriver:true
    })
  ])
).start()
    },[])
    return (
        <View style={{ paddingTop:15,paddingBottom:15}}>
            <View style={styles.skeletonContainer}>
                    <View style={styles.squareDimensions}>
                    <Animated.View style={[styles.squareContainer,animatedStyle]} />
                    </View>
                    <View style={styles.skeletonTextContainer}>
                        <View>
                            <Animated.View style={[styles.skeletonTitleContainer,animatedStyle]} />
                        </View>
                        <View>
                            <Animated.View style={[styles.skeletonTagsContainer,animatedStyle]} />
                        </View>
                        <Animated.View style={[styles.skeletonDescriptionContainer,animatedStyle]}>
                        </Animated.View>
                    </View>
                </View>

            </View>
    )
}
const styles = StyleSheet.create({
    skeletonContainer: {
        flexDirection: 'row',
        marginBottom:5
    },
    skeletonTextContainer: {
        flexDirection: 'column',
        flexGrow: 1,
        marginLeft: 5,
    },
    squareDimensions: {
        width: 70,
        height: 70
    },
    squareContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D8D4FC',
        borderRadius:5
    },
    skeletonTitleContainer: {
        width: '100%',
        height: 25,
        backgroundColor: '#D8D4FC',
        marginBottom: 5,
        borderRadius:10
    },
    skeletonTagsContainer: {
        width: '25%',
        height: 15,
        backgroundColor: '#D8D4FC',
        borderRadius: 10,
        marginBottom: 5
    },
    skeletonDescriptionContainer: {
        height: 15,
        backgroundColor: '#D8D4FC',
        width:'100%',
        borderRadius:10,
    },
  });