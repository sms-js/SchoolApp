import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchClass,
  fetchTeacherClasses,
  fetchClassTeacher,
} from '../api/fetchClasses';
import {fetchDormitory} from '../api/fetchDormitory';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function Class(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState([{}]);
  const [teachers, setTeachers] = useState([]);
  const [dormitory, setDormitory] = useState([{}]);
  const [classe, setClasse] = useState();

  const showMyClass = (value) => {
    fetchClassTeacher(classes[value]['classTeacher'])
      .then(async (res) => {
        setTeachers(res);
      })
      .catch((error) => {
        alert(error);
      });

    fetchDormitory(classes[value]['dormitoryId'])
      .then(async (res) => {
        setDormitory(res);
      })
      .catch((error) => {
        alert(error);
      });
  };

  var classesNames = [];

  fetchTeacherClasses(user['id'])
    .then(async (res) => {
      setClasses(res);
    })
    .catch((error) => {
      alert(error);
    });
  for (let i = 0; i < classes.length; i++) {
    classesNames.push({
      label: classes[i]['className'],
      value: i,
    });
  }

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
              props.navigation.openDrawer();
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
        <Dropdown
          label="My classes"
          data={classesNames}
          onChangeText={(value) => {
            showMyClass(value);
            setClasse(value);
          }}
        />

        <Text />
        <View style={styles.container}>
          <Text style={{alignSelf: 'center'}}>
            {classe ? classes[classe]['className'] : 'Class Name'}
          </Text>
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
