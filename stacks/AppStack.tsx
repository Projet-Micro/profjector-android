import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/HomeScreen';
import { View , StyleSheet,Text } from 'react-native'
const Stack = createStackNavigator();
import { useEffect } from 'react';
import { loadProjectors, logOutProfessor } from '../index';
import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { getFirstLetter } from '../utils/getFirstLetter';
import { GlobalState } from '../store/types';
  const MainStack = createStackNavigator();
export const AppStack = () => {
    useEffect(() => {
      loadProjectors();
    }, [])
  const logOut = () => {
    AsyncStorage.clear();
    logOutProfessor()
  }

  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Main" 
      component={MainStackScreen}/>
    </Stack.Navigator>
  );
};
const MainStackScreen = () => {
    const professor = useSelector((state: GlobalState) => state.professors.professor.professorInfo);
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Home" component={Home}   options={{ headerTitleAlign:"left",
      headerTintColor :'#3536E6',
      headerRight:() =>
      {
        return <View style={styles.nav}>
        <View style={styles.shape}>
        </View>
        <View>
          <TouchableOpacity>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatarText}>{getFirstLetter(professor?.firstName)}</Text></View>
          </TouchableOpacity>
        </View>
    </View>
      }  
      }}/>
    </MainStack.Navigator>  
  )
}
const styles = StyleSheet.create({
  container: 
  {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20,
  },
  nav: 
  {
      flexDirection : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 10,
  },
  shape :
  {
      flexDirection : 'row',
      width: 50,
      height: 10,
  },
  avatarContainer: {
    width: 35,
    height: 35,
    backgroundColor: "#3536E6",
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight:10,
  },
  avatarText: {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold'
  }
});