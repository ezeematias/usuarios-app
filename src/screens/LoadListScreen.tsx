import { ImageBackground, Text, TouchableOpacity, View, Image, ActivityIndicator, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { getDownloadURL, ref } from 'firebase/storage'
import { FontAwesome } from '@expo/vector-icons';
import styles from "../styles/Style";

import Modal from "react-native-modal";


const LoadList = () => {

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  const [isModalSpinnerVisible, setModalSpinnerVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleReturn = () => {

    if (auth.currentUser?.email == "admin@gmail.com") {
      navigation.replace("Home");
    }
    else {
      auth
        .signOut()
        .then(() => {
          navigation.replace("Login")
        })
        .catch(error => alert(error.message))
    }
  }

  async function handlerSingOut() {
    await auth
      .signOut()
      .then(() => { navigation.replace('Index') })
      .catch((error: any) => alert(error.message))
  }

  function handlerBack() {
    navigation.replace('Home');
  }

  useFocusEffect(
    useCallback(() => {
      getDocuments();
      toggleSpinnerAlert();
    }, []))

  const toggleSpinnerAlert = () => {
    setModalSpinnerVisible(true);
    setTimeout(() => {
      setModalSpinnerVisible(false);
    }, 3500);
  };

  const getDocuments = async () => {
    setLoading(true);
    setData([]);
    try {
      const querySnapshot = await (await getDocs(query(collection(db, "usuariosInfo"), orderBy('lastName', 'asc'), orderBy('name', 'asc'))));

      querySnapshot.forEach(async (doc) => {
        const res: any = { ...doc.data(), id: doc.id };
        const imageUrl = await getDownloadURL(ref(storage, res.image));
        setData((arr: any) => [...arr, { ...res, imageUrl: imageUrl }]);
      });
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };



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

        <Text style={styles.title}>Lista de usuarios</Text>
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
    <View style={styles.container}>
    <ImageBackground
    source={require("../../assets/background.png")}
    resizeMode="cover"
    style={styles.image}    >
          {loading}

        <View style={stylesLoad.body}>
          <ScrollView>
            {data.map((item: any) => (
              <View style={stylesLoad.cardStyle}>
                <Image resizeMode='cover' style={{ flex: 1, borderRadius: 10 }} source={{ uri: item.imageUrl }} />
                <View style={{ padding: 10, justifyContent: 'space-between', height: 100 }}>
                  <View>
                    <Text style={stylesLoad.tableHeaderText}>{item.lastName} {item.name}</Text>
                    <Text style={stylesLoad.tableCellText}>{item.dni}</Text>
                    <Text style={stylesLoad.tableCellText}>{item.email}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View>
          <Modal isVisible={isModalSpinnerVisible}>
            <ActivityIndicator size="large" color="3c8e99" />
          </Modal>
        </View>

      </ImageBackground>
    </View>
  );
}
export default LoadList

import { StyleSheet } from 'react-native'
import { auth, db, storage } from '../database/firebase';
import { RootStackParamList } from '../../App';

const stylesLoad = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3c8e99',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  exitSection: {
    flex: 1,
    width: '90%',
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 20
  },
  exitText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  exitButton: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: '30%',
    padding: 15,
    marginRight: 60,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  buttonImageExit: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
  },
  buttonImageVote: {
    height: 50,
    width: 50,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  body: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    marginTop: 10,
    marginBottom: 10,
  },
  tableCell: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 2,
  },
  tableHeaderText: {
    color: 'black',
    fontSize: 20,

  },
  tableCellText: {
    color: 'black',
    fontSize: 15,
  },
  cardStyle: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    height: 300,
    width: '95%',
    margin: 10,
    borderRadius: 10,
    borderWidth: 2
  }
});
