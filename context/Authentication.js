import React from 'react';
import {AsyncStorage} from 'react-native';
import Loading from '../Components/loading';

const AuthContext = React.createContext({});

const AuthProvider = (props) => {
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState(undefined);

  React.useEffect(() => {
    login();
  }, []);

  if (!loading) {
    return <Loading img={require('../assets/splash01.json')} />;
  }
  async function login() {
    setLoading(false);

    const accessToken = await AsyncStorage.getItem('accessToken');
    if (accessToken) {
      setTimeout(() => {
        setUser({
          role: 'student',
        });
        setLoading(true);
      }, 5000);
    } else {
      setTimeout(() => {
        setUser({
          role: 'user',
        });
        setLoading(true);
      }, 5000);
      console.log('no token');
      setLoading(true);
    }
  }

  async function logout() {
    setUser(undefined);
    setLoading(false);
    await AsyncStorage.removeItem('accessToken');
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
