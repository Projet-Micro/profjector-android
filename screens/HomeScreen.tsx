import React from 'react'
import { View,StyleSheet } from 'react-native'
import ProjectorCards from '../components/ProjectorCard';
type ProjectorInfo = {
  id: number,
  serialNumber: number,
  comment: string,
}
type MainStackParamList = {
    BorrowModal: ProjectorInfo,
    Home : undefined
}
import { NativeStackScreenProps } from '@react-navigation/native-stack';
type Props = NativeStackScreenProps<MainStackParamList, 'Home'>;
export default function Home({ navigation,route } : Props) {
    return (
        <View style={styles.container}>
            <ProjectorCards navigation={navigation} route={route}></ProjectorCards>
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