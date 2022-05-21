import { StyleSheet } from "react-native";

const primaryColor = '#fff';
const secondaryColor = '#4a4b4a';
const tertiaryColor = '#e9505b';
const fourthColor = '#b03e4b';
const buttonBorderRadius = 100;

export default StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',   
        width: '100%',     
    },
    qr: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',   
        resizeMode:"cover"
    },
    buttonAccessContainer: {
        flexDirection: 'row',
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',  
        marginTop: '10%', 
    },
    logo: {
        width: '100%',
        height: '80%',
        top: '10%',
    },
    logoHome: {
        width: '100%',
        height: '20%',
        marginTop: '10%',
    },
    logoLogin: {
        width: '100%',
        height: '30%',
    },
    inputContainer: {
        width: '80%', 
    },
    input: {
        backgroundColor: tertiaryColor,
        color: 'white',        
        paddingHorizontal: 20,
        paddingVertical: 5,
        borderRadius: buttonBorderRadius,
        marginBottom: 5,
        borderColor: fourthColor,
        borderWidth: 10,
    },
    inputAdd: {
        backgroundColor: tertiaryColor,
        color: 'white',        
        paddingHorizontal: 20,
        paddingVertical: 3,
        borderRadius: buttonBorderRadius,
        marginBottom: 5,
        borderColor: fourthColor,
        borderWidth: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
      },

    buttonContainer: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '5%',
    },
    button: {
        backgroundColor: primaryColor,
        width: '100%',
        padding: 50,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',        
        
    },
    buttonHome: {
        backgroundColor: primaryColor,
        width: '100%',
        padding: 50,
        paddingVertical: 80,
        borderRadius: buttonBorderRadius,        
        textAlign: 'center',
        fontSize: 40,   
        borderColor: primaryColor,
        borderWidth: 10,  
        marginBottom: '10%',   
    },
    buttonLogin: {
        backgroundColor: primaryColor,
        width: '100%',
        padding: 10,
        borderRadius: buttonBorderRadius,
        alignItems: 'center', 
        borderWidth: 10,     
        borderColor: primaryColor,  
    },
    buttonRole: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        marginHorizontal: '5%',
        
    },
    buttonError: {
        backgroundColor: secondaryColor,
        width: '100%',
        padding: 15,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        marginBottom: '5%',
    },
    buttonOutline: {
        backgroundColor: fourthColor,
        marginTop: 5,
        borderColor: primaryColor,
        borderWidth: 10,
    },
    buttonRegister: {       
        width: '100%',
        padding: 5,
        borderRadius: buttonBorderRadius,
        alignItems: 'center',
        marginTop: '5%',
        borderColor: primaryColor,
        borderWidth: 10,
        backgroundColor: fourthColor,
    },
    buttonOutlineRole: {
        marginTop: 5,
        borderColor: secondaryColor,        
    },
    buttonText: {
        color: fourthColor,
        fontWeight: '700',
        fontSize: 16,
    },
    title: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonRegisterText: {        
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineTextRole: {
        color: primaryColor,
        fontWeight: '700',
        fontSize: 16,
    },
    spinnerTextStyle: {
        color: 'white',
    },
    spinContainer: {
        position: 'absolute',
        display: 'flex',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        top: 0,
        height: '100%',
        width: '100%',
        zIndex: 100,
    },
    textHome:{
        fontSize: 20,
        color: fourthColor,
        fontWeight: 'bold',  
        textAlign: 'center',
      width: '100%',
    },
    textHomeUser:{
        fontSize: 20,
        color: primaryColor,
        fontWeight: 'bold',  
        width: '100%',
        textAlign: 'center',
    },
    textDescription:{
        fontSize: 20,
        marginTop: '10%', 
        color: secondaryColor,
        fontWeight: 'bold',  
        textAlign: 'center',
        margin: 5,
    },  
    camQr:{
        height:100, 
        width:100, 
        borderRadius:15, 
        backgroundColor: '#fff',
        margin:10,
        alignItems: 'center',
    }

    
})