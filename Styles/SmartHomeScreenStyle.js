import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E0E0E0',
    },
    header: {
      backgroundColor: '#808080',
      padding: 50,
      alignItems: 'center',
    },
    headerText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
    },
    buttonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      padding: 20,
    },
    column: {
      width: '45%',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingRight: 20,
    },
    button: {
      width: '100%',
      height: 100,
      backgroundColor: '#C0C0C0',
      marginBottom: 10,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: 16,
      fontWeight: 'bold',
      marginTop: 10,
    },
  });
  