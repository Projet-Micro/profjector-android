import React from 'react'
import { View,StyleSheet } from 'react-native'
import ProjectorCards from '../components/ProjectorCard';
export default function Home() {
    return (
        <View style={styles.container}>
            <ProjectorCards></ProjectorCards>
        </View>
    )
}
const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        backgroundColor: '#eaeaa',
        padding: 20,
    },
    nav: 
    {
        flexDirection : 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        backgroundColor: "#D8D4FC"
    },
    shape :
    {
        flexDirection : 'row',
        width: 50,
        height: 10,
    }
  });