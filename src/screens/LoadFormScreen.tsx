import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, StyleSheet, ActivityIndicator } from "react-native";
import Modal from "react-native-modal";

import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useForm } from 'react-hook-form';
import Toast from 'react-native-simple-toast';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from "firebase/firestore";

import { getBlob } from "../utils/utils";
import * as ImagePicker from "expo-image-picker";
import { auth, storage, db } from "../database/firebase";
import { RootStackParamList } from "../../App";
import { FontAwesome } from '@expo/vector-icons';
import styles from "../styles/Style";
import Spinner from "react-native-loading-spinner-overlay/lib";

type NewUser = {
  apellido: string;
  nombre: string;
  dni: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoadForm = () => {
  const [apellidoForm, setApellido] = useState("");
  const [nombreForm, setNombre] = useState("");
  const [dniForm, setDni] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [scanned, setScanned] = useState(false);
  const [openQR, setOpenQR] = useState(false);
  const { control, handleSubmit, getValues, formState: { errors }, reset, setValue } = useForm<NewUser>();
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeholderColor, setPlaceholderColor] = useState("#fff");

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleReturn = () => {
    navigation.replace("Home")
  }

  const resetForm = () => {
    setApellido("");
    setNombre("");
    setDni("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  useEffect(() => {
    (async () => {
      await Camera.requestCameraPermissionsAsync();
      await BarCodeScanner.requestPermissionsAsync();
    })();
  }, []);

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => { navigation.replace('Index') })
      .catch((error: any) => alert(error.message))
  }

  function handlerBack() {
    navigation.replace('Home');
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handlerSingOut}>
          <FontAwesome name="power-off" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={handlerBack}>
          <FontAwesome name="step-backward" size={24} color="#fff" />
        </TouchableOpacity>
      ),
      headerTitle: () => (

        <Text style={styles.title}>Cargar nuevo usuario</Text>
      ),
      headerTintColor: "#fff",
      headerTitleAlign: 'center',
      headerBackButtonMenuEnabled: false,
      headerStyle: {
        backgroundColor: '#896867',
      }
    });
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
    setOpenQR(false);
    const dataSplit = data.split('@');
    const dni = dataSplit[4].trim();
    const nombre = dataSplit[2].trim();
    const apellido = dataSplit[1].trim();
    setValue("dni", dni);
    setValue("nombre", nombre);
    setValue("apellido", apellido);
    setApellido(apellido);
    setNombre(nombre);
    setDni(dni);
    setPlaceholderColor("#fff");
    console.log(dni);
    console.log(nombre);
    console.log(apellido);
  };

  const handleOpenQR = () => {
    setScanned(false);
    setOpenQR(true);
  }

  const onSubmit = async () => {
    const values = getValues();
    let error = false;
    Object.values(values).map(value => {
      if (!value) {
        error = true;
        return;
      }
    })
    if (error) {
      Toast.showWithGravity(
        "Todos los campos son requeridos",
        Toast.LONG,
        Toast.CENTER);
      return;
    }
    if (!image) {
      Toast.showWithGravity(
        "Debe tomar una foto",
        Toast.LONG,
        Toast.CENTER);
      return;
    }
    if (values.password !== values.confirmPassword) {
      Toast.showWithGravity(
        "Las contraseñas no coinciden",
        Toast.LONG,
        Toast.CENTER);
    }
    setLoading(true);    
    await createUserWithEmailAndPassword(auth, values.email, values.password).then(async () => {      
      const blob: any = await getBlob(image);
      const fileName = image.substring(image.lastIndexOf("/") + 1);
      const fileRef = ref(storage, "usuariosFotos/" + fileName);
      await uploadBytes(fileRef, blob).then(async () => {
        await addDoc(collection(db, "usuariosInfo"), {
          lastName: values.apellido,
          name: values.nombre,
          dni: values.dni,
          email: values.email,
          image: fileRef.fullPath,
          creationDate: new Date()
        }).then(() => {
          setImage("");
        });
      });
      resetForm();
      reset();
      navigation.replace('Home');
      Toast.showWithGravity(
        "Usuario creado correctamente",
        Toast.LONG,
        Toast.CENTER);
    }).catch((error: any) => {
      Toast.showWithGravity(
        "El usuario ya existente",
        Toast.LONG,
        Toast.CENTER);
    }).finally(() => {

      setLoading(false);
    });
  }

  const handleCamera = async (type: any) => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      aspect: [4, 3],
      quality: 0.3,
    });
    if (!result.cancelled) {
      setImage(result["uri"]);
    }
  };

  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);

  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3000);
  };

  return (
    !openQR ?

      <ImageBackground
        source={require("../../assets/background.png")}
        resizeMode="cover"
        style={styles.image}
      >
        {loading && <View style={styles.spinContainer}>
          <Spinner
            visible={loading}
            textStyle={styles.spinnerTextStyle}
          />
        </View>}


        <View style={styles.container}>

          <View style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
            margin: 10
          }}>
            {!image ?
              <TouchableOpacity onPress={handleCamera} style={styles.camQr}>
                <Image
                  style={{ height: 100, width: 108, borderRadius: 20 }}
                  resizeMode="cover"
                  source={require("../../assets/camera.png")}
                />
              </TouchableOpacity> :
              <View>
                <Image style={{ height: 100, width: 100, borderRadius: 20, margin: 10 }} resizeMode="cover" source={{ uri: image }} />
              </View>
            }

            <TouchableOpacity onPress={handleOpenQR} style={styles.camQr}>
              <Image
                style={{ height: 100, width: 100, borderRadius: 20 }}
                resizeMode="cover"
                source={require("../../assets/qr.png")}
              />
            </TouchableOpacity>
          </View>


          <View style={styles.inputContainer}>

            <TextInput
              placeholder="Apellido"
              placeholderTextColor={placeholderColor}
              style={styles.input}
              value={apellidoForm}
              onChangeText={(text) => setValue("apellido", text)}
            />

            <TextInput
              placeholder="Nombre"
              value={nombreForm}
              placeholderTextColor={placeholderColor}
              style={styles.inputAdd}
              onChangeText={(text) => setValue("nombre", text)}
            />

            <TextInput
              placeholder="Número de documento"
              value={dniForm}
              placeholderTextColor={placeholderColor}
              style={styles.inputAdd}
              keyboardType={'numeric'}
              onChangeText={(text) => setValue("dni", text)}
            />

            <TextInput
              placeholder="Correo Electrónico"
              placeholderTextColor={placeholderColor}
              style={styles.inputAdd}              
              onChangeText={(text) => setValue("email",text)}
            />

            <TextInput
              placeholder="Contraseña"
              placeholderTextColor={placeholderColor}
              style={styles.inputAdd}
              onChangeText={(text) => setValue("password", text)}
              secureTextEntry
            />

            <TextInput
              placeholder="Confirmar Contraseña"
              placeholderTextColor={placeholderColor}
              style={styles.inputAdd}
              onChangeText={(text) => setValue("confirmPassword", text)}
              secureTextEntry
            />

            <TouchableOpacity onPress={onSubmit} style={styles.buttonRegister}>
              <Text style={styles.title}>Crear usuario</Text>
            </TouchableOpacity>
          </View>

        </View>

        <View>
          <Modal isVisible={isModalSpinnerVisible}>
            <ActivityIndicator size="large" color="#A4C3B2" />
          </Modal>
        </View>

      </ImageBackground>
      : <BarCodeScanner
        onBarCodeScanned={scanned && openQR ? undefined : handleBarCodeScanned}
        style={styles.qr} />
  );
}
export default LoadForm;