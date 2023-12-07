import React from 'react'
import { View,StyleSheet } from 'react-native'
import ProjectorCards from '../components/ProjectorCard';
import Toast from '../components/Toast';
type ProjectorType = {
    id: number,
    serialNumber: number,
    comment: string,
    rent: boolean,
}
type RootStackParamList = {
    BorrowModal: ProjectorType,
    Home : undefined
}
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import store from '../store';
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
export default function Home({ navigation,route } : Props) {
    return (
        <Provider store={store}>
        <View style={styles.container}>
            <ProjectorCards navigation={navigation} route={route}></ProjectorCards>
            <Toast></Toast>
        </View>
        </Provider>
    )
}
const styles = StyleSheet.create({
    container: 
    {
        flex: 1,
        backgroundColor: '#FAFAFA',
        paddingTop: 20,
        paddingBottom: 20,
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