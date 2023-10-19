import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/HomeScreen';
const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false
  }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};
