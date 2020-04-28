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
import {fetchClass, fetchClassTeacher} from '../api/fetchClasses';
import {fetchDormitory} from '../api/fetchDormitory';
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {fetchTeacherInfo} from '../api/fetchTeacherInfo';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function Class(props) {
  const {user} = useAuth();
  const [children, setChildren] = useState([]);
  const [classe, setClasse] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [dormitory, setDormitory] = useState([{}]);

  const showChildClass = async (childId) => {
    fetchStudentClass(childId)
      .then(async (res) => {
        fetchClass(res[0]['studentClass'])
          .then(async (res) => {
            console.log(res);
            setClasse(res);

            fetchClassTeacher(res[0]['classTeacher'])
              .then(async (res) => {
                console.log(res);
                setTeachers(res);
              })
              .catch((error) => {
                alert(error);
              });

            fetchDormitory(res[0]['dormitoryId'])
              .then(async (res) => {
                console.log(res);
                setDormitory(res);
              })
              .catch((error) => {
                alert(error);
              });
          })
          .catch((error) => {
            alert(error);
          });
      })
      .catch((error) => {
        alert(error);
      });
    /* try {
      const res1 = await fetchStudentClass(childId);
      console.log(res1);
      setClasse(res1);

      const res2 = await fetchClassTeacher(res1[0]['classTeacher']);
      console.log(res2);
      setTeachers(res2);

      const res3 = await fetchDormitory(res1[0]['dormitoryId']);
      console.log(res3);
      setDormitory(res3);
    } catch (error) {
      alert(error);
    }*/
  };

  const teacherInfo = async (teacherId) => {
    const res = fetchTeacherInfo(teacherId);
    return res[0];
  };

  React.useEffect(() => {
    String.prototype.extract = function (prefix, suffix) {
      let s = this;
      var i = s.indexOf(prefix);
      if (i >= 0) {
        s = s.substring(i + prefix.length);
      } else {
        return '';
      }
      if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
          s = s.substring(0, i);
        } else {
          return '';
        }
      }
      return s;
    };

    let s = user['parentOf'];
    let ids = [];
    let names = [];
    s = s.extract('[', ']');
    let a = '';
    let b = '';
    let c = '';
    let d = '';
    while (s != '') {
      a = s.extract('{', '}');
      s = s.substring(1);
      b = a.extract('"student":', ',');
      names.push(b.extract('"', '"'));
      s = s.substring('"student":'.length + b.length + 1);
      c = a.substring('"student":'.length + b.length + 1);
      d = c.extract('', ',');
      s = s.substring(d.length + 1);
      d = c.substring(d.length + 1 + '"id":'.length);
      ids.push(parseInt(d));
      s = s.substring('"id":'.length + d.length + 2);
    }
    let ch = [];
    for (let i = 0; i < ids.length; i++) {
      ch.push({label: names[i] + "'s class", value: ids[i]});
    }
    setChildren(ch);
  }, []);

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
      <ScrollView style={{margin: 20}}>
        <Text />
        <Dropdown
          label="Children classes"
          data={children}
          onChangeText={(value) => {
            if (value == 0) {
            } else {
              showChildClass(value);
            }
          }}
        />
        <Text />
        <View style={styles.container}>
          <Text style={{alignSelf: 'center'}}>
            {classe[0] ? classe[0]['className'] : 'Class Name'}
          </Text>
          <Text />
          <Text>Teachers :</Text>
          <Text />
          <FlatList
            data={teachers}
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
                      style={{
                        height: 30,
                        width: '60%',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        backgroundColor: 'lightblue',
                        borderRadius: 30,
                        marginBottom: 5,
                      }}
                      onPress={() => {
                        /*fetchTeacherInfo(item.id)
                          .then(async (res) => {
                            console.log(res);
                          })
                          .catch((error) => {
                            alert(error);
                          });*/
                        props.properties.navigation.navigate('TeacherInfo', {
                          teacher: item,
                          backScreen: 'Class',
                        });
                      }}>
                      <Text style={{alignSelf: 'center'}}>
                        Show teacher info
                      </Text>
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
