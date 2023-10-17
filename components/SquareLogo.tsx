import { View,StyleSheet,Text } from 'react-native'
import React from 'react'
import { Svg, Path, Rect, Circle, Line } from 'react-native-svg'  
type Style = {
    style:
    {
        marginTop: number;
    };
};
export default function SquareLogo({ style } : Style) {
    return (
        <View style={[styles.container,style]}>
            <View>     
                    <Svg width="55" height="55" viewBox="0 0 282 10" fill="none">
                        <Rect y="6" width="282" height="88" rx="20" fill="white"/>
                        <Circle cx="170" cy="50" r="50" fill="white"/>
                        <Path d="M207 50C207 71.5391 190.211 89 169.5 89C148.789 89 132 71.5391 132 50C132 28.4609 148.789 11 169.5 11C190.211 11 207 28.4609 207 50Z" fill="#3536E6"/>
                        <Circle cx="187.5" cy="36.5" r="7.5" fill="white"/>
                        <Line y1="47.5" x2="120" y2="47.5" stroke="#3536E6" strokeWidth="5"/>
                        <Line x1="220" y1="47.5" x2="282" y2="47.5" stroke="#3536E6" strokeWidth="5"/>
                        <Rect x="20" y="19" width="60" height="15" fill="#3536E6"/>
                        <Path d="M24 94H70V99C70 107.284 63.2843 114 55 114H39C30.7157 114 24 107.284 24 99V94Z" fill="white"/>
                        <Path d="M210 94H256V99C256 107.284 249.284 114 241 114H225C216.716 114 210 107.284 210 99V94Z" fill="white" />
                    </Svg>
            </View>
            <View style={styles.logoNameContainer}>
                <Text style={styles.logoName}><Text style={{color : '#05B2DC'}}>Prof</Text>jector</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: 70,
        height: 70,
        backgroundColor: '#3536E6',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        
    },
    logoNameContainer: {
        paddingBottom:10
    },
    logoName: {
        fontSize: 10,
        fontFamily: 'MarkPro',
        color: 'white'
    }
})