import { StyleSheet, Text, SafeAreaView,View,TextInput,TouchableOpacity } from 'react-native';
import React,{ useEffect,useState } from 'react';
import SquareLogo from './components/SquareLogo';
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { authenticateProfessor } from './index.js';
import { Path, Svg } from 'react-native-svg';
export default function App() {
  const [credentials, setCredentials] = useState({
    email: {
      email: '',
      error: '',
      touched : false,
    },
    password: {
      password: '',
      error: '',
      touched : false,
    }
  })
    const validateEmail = (email : string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const validatePassword = (password: string) => password.length > 6;
  const handlePasswordSubmit = (password: string) => {
    if (!validatePassword(password)) {
        setCredentials({
          ...credentials, password: {
          password,
          error: ' Password length must be greater than 6 characters.',
          touched : credentials.password.touched
        }

      })
    }
    else {
        setCredentials({
        ...credentials, password: {
          password,
          error: '',
          touched : credentials.password.touched
          
        }
      })
    }
  }
  const submitCredentials = () => {
    authenticateProfessor({
      email:credentials.email.email,
      password:credentials.password.password
    })
  }
  const handleEmailSubmit = (email : string) => {
    if (!validateEmail(email)) {
      setCredentials({
        ...credentials, email: {
          email,
          error: 'The email should follow the pattern : a@a.com .',
          touched : credentials.email.touched
        }

      })
    }
    else {
        setCredentials({
        ...credentials, email: {
          email,
          error: '',
          touched : credentials.email.touched
          
        }
      })
    }
  } 
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
    <SafeAreaView style={styles.container}>
      <View style={{position:"absolute",bottom:0,left:0}}>
        <Svg viewBox="-60 -20 200 200" width="500" height="500" style={{ transform:[{scaleY:2},{scaleX:0.5}]}}>
          <Path fill="#D8D4FC" d="M57,-39.6C70.9,-28.1,77,-4.5,69.2,10.3C61.4,25.1,39.7,31.2,24,31.8C8.3,32.3,-1.3,27.4,-17.3,24.2C-33.4,21,-55.8,19.4,-59.7,11.1C-63.6,2.8,-48.9,-12.2,-35.8,-23.6C-22.8,-35,-11.4,-42.7,5.1,-46.7C21.6,-50.8,43.1,-51.2,57,-39.6Z" transform="translate(100 100)" />
        </Svg>
      </View>
      <View style={{position:"absolute",top:0,left:0}}>
        <Svg viewBox="45 20 200 200" width="500" height="500" style={{ transform:[{scaleY:3},{scaleX:1.4}]}}>
          <Path fill="#D8D4FC" d="M10.6,7.4C-3.2,30.1,-43.1,39,-49.2,20.7C-55.4,2.5,-27.7,-43,-7.7,-47.4C12.2,-51.9,24.5,-15.4,10.6,7.4Z" transform="translate(100 100)" />
        </Svg>
      </View>
      <View>
        <SquareLogo style={styles.logo} />
      </View>
      <Text style={styles.subTitle}>Sign in to continue</Text>
      <View style={styles.formContainer}>
        <View style={[styles.inputStyle,
          {
            backgroundColor: credentials.email.error.length === 0 || !credentials.email.touched ? '#f8f4fc' : '#ffe3e3',
            borderWidth: credentials.email.error.length === 0 || !credentials.email.touched ? 0 : 2,
            borderColor : credentials.email.error.length === 0 || !credentials.email.touched ? '' : 'red'}]}>
            <Text style={styles.inputLabel}>Email</Text>
          <TextInput
            autoCapitalize='none'
            style={styles.inputLabel}
            keyboardType='email-address'
            selectionColor={'#D6D6FA'}
            onChangeText={text => handleEmailSubmit(text)}
            onBlur={() => {
              setCredentials({
                ...credentials,
                email: {
                  touched: true,
                  email: credentials.email.email,
                  error: credentials.email.error,
                }
              })
            }}
          />
          </View>
          {(credentials.email.error && credentials.email.touched) && <Text style={styles.errorMessage}>{credentials.email.error}</Text>}
        <View style={[styles.inputStyle,
          {
            backgroundColor: credentials.password.error.length === 0 || !credentials.password.touched ? '#f8f4fc' : '#ffe3e3',
            borderWidth: credentials.password.error.length === 0 || !credentials.password.touched ? 0 : 2,
            borderColor : credentials.password.error.length === 0 || !credentials.password.touched ? '' : 'red'
          }]} >
            <Text style={styles.inputLabel} >Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.inputLabel}
            selectionColor={'#D6D6FA'}
            onChangeText={text => handlePasswordSubmit(text)}
            onBlur={() => setCredentials({
              ...credentials,
              password: {
                touched: true,
                password: credentials.password.password,
                error: credentials.password.error,
              }
            })}
          />
          </View>
          {(credentials.password.error && credentials.password.touched) && <Text style={styles.errorMessage}>{credentials.password.error}</Text>}
          <View>
          <Text style={styles.forgotPasswordLink}>Forgot password ?</Text>
        </View>
        <TouchableOpacity onPress={submitCredentials} style={{ marginTop:60 }}>
          <View style={styles.submitButtonContainer}>
            <Text style={styles.submitButtonText}>Login</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.forgotPasswordLink}>Don't have an account ?&nbsp;
        <Text style={{
          color: "#3536E6",
          textDecorationLine: 'underline',
        }}>Register</Text>
      </Text>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 25,
    marginTop: 15,
    fontFamily: 'MarkPro'
  },
  subTitle: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'MarkPro'
  },
  logo: {
    marginTop: 80,
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '95%',
    paddingLeft: '2.5%',
    paddingRight: '2.5%'
  },
  inputStyle:{
    width: '100%',
    marginTop: 50,
    padding: 15,
    borderRadius:10,
  },
  inputLabel: {
    color: 'grey',
    fontFamily: 'MarkPro',
  },
  forgotPasswordLink :{
    marginTop: 20,
    fontFamily:'MarkProBold'
  },
  errorMessage: {
    color: 'red',
    fontFamily: 'MarkProBold',
  },
  submitButtonContainer: {
    backgroundColor: '#3536E6',
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  submitButtonText: {
    color: 'white',
    fontFamily: 'MarkProBold'

  }
});
