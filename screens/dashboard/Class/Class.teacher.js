import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  //fetchClass,
  fetchTeacherClasses,
  fetchClassTeacher,
  fetchClassStudents,
  fetchStudentParents,
} from '../api/fetchClasses';
import {fetchDormitory} from '../api/fetchDormitory';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';
//import TeacherClassesPicker from '../../../Components/TeacherClassPicker';

export default function Class(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState([{}]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [parents, setParents] = useState([]);
  const [dormitory, setDormitory] = useState([{}]);
  const [classe, setClasse] = useState();
  const [classesNames, setClassesNames] = useState([]);

  const showMyClass = (value) => {
    fetchClassStudents(classes[value]['id'])
      .then(async (res) => {
        setStudents(res);
        console.log(res[0]);
      })
      .catch((error) => {
        alert(error);
      });

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

  const showStudentParents = async (studentId) => {
    const res = await fetchStudentParents(studentId);
    setParents(res);
  };

  React.useEffect(() => {
    var classesNames = [];
    fetchTeacherClasses(user['id'])
      .then((res) => {
        setClasses(res);
        for (let i = 0; i < res.length; i++) {
          classesNames.push({
            label: res[i]['className'],
            value: i,
          });
        }
        setClassesNames(classesNames);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  /**/

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
      <ScrollView style={{margin: 10, marginBottom: 80}}>
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
          <Text>Students :</Text>
          <Text />
          <FlatList
            data={students}
            renderItem={({item}) => {
              if (item.photo == '') {
                return (
                  <View>
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
                    <TouchableOpacity
                      onPress={() => {
                        showStudentParents(item.id);
                        alert(parents[0]['parent']['fullName']);
                      }}>
                      <Text>Show parents info</Text>
                    </TouchableOpacity>
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
    width: 40,
    height: 40,
    borderRadius: 100,
    margin: 5,
    resizeMode: 'center',
  },
  user: {fontSize: 15},
});
/*
<TeacherClassesPicker
          userId={user['id']}
          setClasses={(value) => {
            setClasses(value);
          }}
          setClasse={(value) => {
            setClasse(value);
          }}
          showMyClass={(value) => {
            showMyClass(value);
          }}
        />
*/
