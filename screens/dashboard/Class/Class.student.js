import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClass, fetchClassTeacher} from '../api/fetchClasses';
import {fetchDormitory} from '../api/fetchDormitory';
import {useAuth} from '../../../context/Authentication';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function Class(props) {
  const {user} = useAuth();
  const [classe, setClasse] = useState([{}]);
  const [teachers, setTeachers] = useState([]);
  const [dormitory, setDormitory] = useState([{}]);
  /*const showMyClass = () => {
    fetchClass(user['studentClass'])
      .then(async (res) => {
        setClasse(res);

        fetchClassTeacher(res[0]['classTeacher'])
          .then(async (res) => {
            setTeachers(res);
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });

    fetchDormitory(classe[0]['dormitoryId'])
      .then(async (res) => {
        setDormitory(res);
      })
      .catch((error) => {
        alert(error);
      });
  };*/
  React.useEffect(() => {
    showMyClass();
  }, []);
  const showMyClass = async () => {
    try {
      const res = await fetchClass(user['studentClass']);
      setClasse(res);
      //console.log(res);
      const res2 = await fetchClassTeacher(res[0]['classTeacher']);
      setTeachers(res2);
      // console.log(res2);
      const res3 = await fetchDormitory(res[0]['dormitoryId']);
      setDormitory(res3);
      // console.log(res3);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <View>
      <Header
        style={{
          backgroundColor: 'white',
          flexDirection: 'row',
        }}>
        <Left style={{width: '15%'}}>
          <Icon
            name="menu"
            onPress={() => {
              props.properties.navigation.openDrawer();
            }}
          />
        </Left>
        <Text
          style={{
            width: '70%',
            textAlignVertical: 'center',
            textAlign: 'center',
            fontSize: 25,
          }}>
          Class
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20, marginBottom: 80}}>
        <Text />
        <View>
          <Text />
          <Button
            title="Show my class"
            onPress={() => {
              showMyClass();
            }}
          />
          <View style={styles.container}>
            <Text style={{alignSelf: 'center'}}>{classe[0]['className']}</Text>
            <Text />
            <Text>Teachers :</Text>
            <Text />
            <FlatList
              data={teachers}
              renderItem={({item}) => {
                if (item.photo == '') {
                  return (
                    <View style={styles.teachers}>
                      <View
                        style={{
                          justifyContent: 'center',
                          padding: 5,
                          borderRightWidth: 1,
                          borderRightColor: 'lightblue',
                        }}>
                        <Image
                          style={styles.image}
                          source={{
                            uri: defaultUserImageURL,
                          }}
                        />
                        <Text>{item.username}</Text>
                      </View>
                      <View
                        style={{
                          flex: 2,
                          justifyContent: 'center',
                          padding: 5,
                          borderRightWidth: 1,
                          borderRightColor: 'lightblue',
                        }}>
                        <Text>Name</Text>
                        <Text />
                        <Text>{item.fullName}</Text>
                      </View>
                      <View
                        style={{flex: 3, justifyContent: 'center', padding: 5}}>
                        <Text>Email</Text>
                        <Text />
                        <Text>{item.email}</Text>
                      </View>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.teachers}>
                      <View>
                        <Image
                          style={styles.image}
                          source={{
                            uri: server + 'uploads/profile/' + item.photo,
                          }}
                        />
                        <Text>{item.username}</Text>
                      </View>
                      <Text>{item.fullName}</Text>
                      <Text>{item.email}</Text>
                    </View>
                  );
                }
              }}
            />
            <Text />
            <Text>Class dormitory :</Text>
            <Text />
            <View style={styles.dormitory}>
              <Text style={{alignSelf: 'center'}}>
                {dormitory[0]['dormitory']}
              </Text>
              <Text />
              <Text>Dormitory description :</Text>
              <Text>{dormitory[0]['dormDesc']}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 20,
  },
  teachers: {
    marginBottom: 5,
    padding: 5,
    flexDirection: 'row',
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 20,
  },
  dormitory: {
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 20,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 5,
    resizeMode: 'center',
  },
  user: {fontSize: 15},
});
/*

*/
