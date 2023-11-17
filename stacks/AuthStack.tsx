import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();
import { Login } from '../screens/LoginScreen';
export const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
      headerShown: false
  }}>
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};