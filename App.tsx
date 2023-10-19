import { NavigationContainer } from '@react-navigation/native';
import React,{ useEffect } from 'react';
import { Router } from './router/Router';
import { Provider } from 'react-redux';
import store from './store/index'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
export default function App() {
    const [fontsLoaded] = useFonts({
    "MarkPro": require('./assets/fonts/markprofont.otf'),
    "MarkProBold": require('./assets/fonts/markprofontbold.ttf')
  });
      async function prepare() {
      await SplashScreen.preventAutoHideAsync();
  }
  useEffect(() => {
    prepare();
  }, [fontsLoaded])
  if (!fontsLoaded) {
    return undefined;
  }
  else
  {
    SplashScreen.hideAsync();  
  }
  return (
    <Provider store={store}>
        <Router></Router>
    </Provider>
  );
}
