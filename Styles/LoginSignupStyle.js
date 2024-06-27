import {StyleSheet} from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cccccc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header: {
      position: 'absolute',
      alignItems: 'center',
      top: 80,
    },
    title: {
      fontSize: 54,
      fontWeight: 'bold',
      color: '#333',
    },
    form: {
      padding: 20,
      width: '90%',
      backgroundColor: '#d9d9d9',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    inputContainer: {
      backgroundColor: '#f2f2f2',
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderWidth: 1,
      borderColor: '#ddd',
      borderRadius: 5,
      marginBottom: 10,
    },
    input: {
      flex: 1,
      marginLeft: 10,
    },
    forgotPassword: {
      alignItems: 'flex-end',
      marginBottom: 10,
    },
    forgotText: {
      color: '#007bff',
    },
    button: {
      backgroundColor: '#007bff',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    createAccount: {
      marginTop: 10,
      alignItems: 'center',
    },
    createText: {
      color: '#007bff',
    },
  });
