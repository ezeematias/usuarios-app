import { ImageBackground, Text, TouchableOpacity, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { auth } from '../database/firebase';
import { RootStackParamList } from '../../App';
import styles from "../styles/Style";
import { FontAwesome } from '@expo/vector-icons';
import * as app from '../screens/LoginScreen';

const HomeScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  let admin = app.admin;

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch((error: { message: any; }) => alert(error.message))
  }

  const createUser = () => {
    navigation.replace("LoadForm")
  }

  const loadUserList = () => {
    navigation.replace("LoadList")
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleSignOut}>
          <FontAwesome name="power-off" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <Text style={styles.title}>Gestión de usuarios</Text>
      ),
      headerTitle: () => (
        <Text style={styles.title}></Text>
      ),
      headerTintColor: "#fff",
      headerTitleAlign: 'center',
      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: '#896867',
      }
    });
  }, []);

  return (
    <ImageBackground
      source={require("../../assets/background.png")}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          {admin &&
          <TouchableOpacity onPress={createUser} style={styles.buttonHome}>
            <Text style={styles.textHome}>Nuevo Usuario</Text>
          </TouchableOpacity>
          }

          <TouchableOpacity onPress={loadUserList} style={[styles.buttonHome, styles.buttonOutline]}>
            <Text style={styles.textHomeUser}>Usuarios del sistema</Text>
          </TouchableOpacity>

        </View>
      </View>
    </ImageBackground>
  );
}

export default HomeScreen