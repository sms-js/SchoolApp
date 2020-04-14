import React from 'react';
import {View, AsyncStorage, Text} from 'react-native';
import {NavigationContext} from 'react-navigation';
import {fetchUserInfo} from '../api/fetchUserInfo';

const AuthContext = React.createContext({});

const AuthProvider = (props) => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    login();
  }, []);

  if (!loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text> Loading ... </Text>
      </View>
    );
  }
  async function login() {
    setLoading(false);
    const accessToken = await AsyncStorage.getItem('accessToken');
    const userName = await AsyncStorage.getItem('userName');
    if (accessToken) {
      setTimeout(() => {
        fetchUserInfo(userName)
          .then(async (res) => {
            setUser(res[0]);
          })
          .catch((error) => {});
        /*setUser({
          role: 'student',
        });*/
        setLoading(true);
      }, 1000);
    } else {
      console.log('no token');
      setLoading(true);
    }
  }

  async function logout() {
    setLoading(false);
    setUser(undefined);
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('userName');
    setLoading(true);
  }

  return <AuthContext.Provider value={{user, login, logout}} {...props} />;
};

function useAuth() {
  const context = React.useContext(AuthContext);
  if (Object.keys(context).length === 0) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export {AuthProvider, useAuth};
