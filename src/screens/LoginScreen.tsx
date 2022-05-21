import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, ImageBackground } from "react-native";
import { auth } from "../database/firebase";
import styles from "../styles/Style";
import { signInWithEmailAndPassword} from "firebase/auth";
import { RootStackParamList } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Spinner from "react-native-loading-spinner-overlay/lib";

export type FormData={
    email:string;
    password:string;
    passwordRepeat?:string;
}

export let admin = false;

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

    const handlerLogin = async () => {
        setLoading(true);
        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential: { user: any; }) => {
                const user = userCredential.user;
                console.log("Logged in with", user.email);
                navigation.replace('Home');
            })
            .catch(error => {
                switch (error.code) {
                    case 'auth/invalid-email':
                    case 'auth/user-not-found':
                    case 'auth/wrong-password':
                    case 'auth/internal-error':
                    case 'auth/too-many-requests':
                        setMessageError("Credenciales inválidas");
                        break;
                    default:
                        setMessageError(error.message);
                        break;
                }
            }).finally(() => { setLoading(false) });
    }

    const setMessageError = (message: string) => {
        setMessage(message);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }

    const guestLogin = () => {
        setEmail("invitado@gmail.com");
        setPassword("123456");  
        admin = false;
    }
    
    const adminLogin = () => {
        setEmail("admin@monsters.com");
        setPassword("123456");
        admin = true;     
        
    }
    
    const supplierLogin = () => {
        setEmail("usuario@monsters.com");
        setPassword("123456");
        admin = false;
       
    }

    const handlerBack = () => {
        navigation.replace('Index');
    }

    return (
        <ImageBackground
            source={require("../../assets/background.png")}
            resizeMode="repeat"
            style={styles.image}
        >

            <View style={styles.container}>
                {loading && <View style={styles.spinContainer}>
                    <Spinner
                        visible={loading}
                        textStyle={styles.spinnerTextStyle}
                    />
                </View>}
                <Image
                    source={require('../../assets/user.png')}
                    resizeMode="contain"
                    style={styles.logoLogin}
                />

                <View style={styles.inputContainer}>
                    {!!message ? <TouchableOpacity
                        style={styles.buttonError}
                        onPress={() => setMessage("")}
                    >
                        <Text style={styles.buttonOutlineText}>{message}</Text>
                    </TouchableOpacity> : null}

                    <TextInput placeholder="Correo electrónico"
                        value={email}
                        placeholderTextColor= 'white'
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />

                    <TextInput placeholder="Contraseña"
                        value={password}
                        placeholderTextColor= 'white'
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>

                <View style={styles.buttonContainer} >
                    <TouchableOpacity
                        onPress={handlerLogin}

                        style={styles.buttonLogin}
                    >
                        <Text style={styles.buttonText}>Iniciar Sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handlerBack}
                        style={[styles.buttonLogin, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Volver</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonAccessContainer} >
                    <TouchableOpacity
                        onPress={guestLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineText}>Invitado</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={adminLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineText}>Admin</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={supplierLogin}
                        style={[styles.buttonRole, styles.buttonOutlineRole]}
                    >
                        <Text style={styles.buttonOutlineText}>Usuario</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}
export default LoginScreen