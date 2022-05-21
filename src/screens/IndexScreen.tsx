import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity, Image, ImageBackground } from "react-native";
import styles from "../styles/Style";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const IndexScreen = () => {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handlerSignUp = () => {
        navigation.replace('SignUp');
    }

    const handlerSingIn = () => {
        navigation.replace('Login');
    }

    return (
            <ImageBackground
                source={require("../../assets/background.png")}
                resizeMode="repeat"
                style={styles.image}
                >
        <View style={styles.container}>

                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        onPress={handlerSingIn}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                <Image
                    source={require('../../assets/user.png')}
                    resizeMode="contain"
                    style={styles.logo}
                />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handlerSignUp}
                        style={styles.buttonRegister}>
                        <Text style={styles.buttonRegisterText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ImageBackground>


    );
}

export default IndexScreen
