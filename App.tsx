import 'react-native-gesture-handler';
import React,{ useEffect } from 'react';
import { Router } from './router/Router';
import { Provider } from 'react-redux';
import store from './store/index'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import Toast from './components/Toast';
export default function App() {
    const [fontsLoaded] = useFonts({
    "MarkPro": require('./assets/fonts/markprofont.otf'),
    "MarkProBold": require('./assets/fonts/markprofontbold.ttf'),
    "MarkProLight": require('./assets/fonts/markprofontlight.ttf'),
    "MarkProLightBit":require('./assets/fonts/markprofontlightbit.ttf')
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
        <Toast></Toast>
    </Provider>
  );
}
