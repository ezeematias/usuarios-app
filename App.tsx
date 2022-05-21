import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import IndexScreen from './src/screens/IndexScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import LoadFormScreen from './src/screens/LoadFormScreen';
import LoadListScreen from './src/screens/LoadListScreen';
import AnimatedLottieView from 'lottie-react-native';
import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';


export type RootStackParamList = {
  Home: any;
  Login: any;
  Index: any;
  SignUp: any;
  LoadForm: any;
  LoadList: any;
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {

  const [lottieLoad, setLottieLoad] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLottieLoad(true)
    }, 4000);
  }, [])

  if (!lottieLoad) {
    return (
      <AnimatedLottieView duration={4000}
        autoPlay
        style={styles.splash}
        source={require('./assets/animation.json')}
      />)
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#896867'
    },
  };

  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Index" component={IndexScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="LoadForm" component={LoadFormScreen} />
        <Stack.Screen name="LoadList" component={LoadListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#896867',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  splash: {    
    backgroundColor: '#896867',
  },
});


