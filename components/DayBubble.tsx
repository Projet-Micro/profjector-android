import { View, Text, StyleSheet } from 'react-native'
import { getDay } from '../utils/date';
type Props = {
    day: string;
    num: string;
    margin?: number;
}
export default function DayBubble({day,num,margin} : Props) {
    return (
        <View style={{flexDirection:'column',marginRight:margin}}>
            <View style={styles.textContainer}>
                <Text>{day}</Text>
            </View>
            <View style={[styles.bubbleContainer, num === getDay().toString() ? styles.selectedBubbleContainer : {}]}>
                <Text style={[styles.numText,num === getDay().toString() ? styles.selectedNumText : {}]}>{num}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    bubbleContainer: {
        justifyContent: 'center',
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#3536E6',
        borderRadius: 25,
    },
    textContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
    },
    numText: {
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#3536E6'
    },
    selectedBubbleContainer: {
        backgroundColor : '#3536E6'
    },
    selectedNumText: {
        color : 'white'
    }
})