import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {useAuth} from '../../../context/Authentication';
import {server, defaultUserImageURL} from '../../../utils/config';
import {Dropdown} from 'react-native-material-dropdown';

export default function Subjects(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState([]);

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
    ch.push({label: names[i] + "'s subjects", value: ids[i]});
  }

  const showMySubjects = async (studentId) => {
    const studentClass = await fetchStudentClass(studentId);
    const res = await fetchClassSubjects(studentClass[0]['studentClass']);
    setSubjects(res);
    console.log(subjects);
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
          Subjects
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20, marginBottom: 80}}>
        <Text />
        <View>
          <Dropdown
            label="Children Subjects"
            data={ch}
            onChangeText={(value) => {
              showMySubjects(value);
            }}
          />
          <Text />
          <FlatList
            data={subjects}
            renderItem={({item}) => {
              if (item.photo == '') {
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 5,
                        padding: 10,
                        borderColor: 'lightblue',
                        borderWidth: 1,
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            borderBottomColor: 'lightblue',
                            borderBottomWidth: 1,
                          }}>
                          Subject
                        </Text>

                        <Text
                          style={{
                            flex: 8,
                            alignSelf: 'center',
                            textAlignVertical: 'center',
                          }}>
                          {item.subjectTitle}
                        </Text>
                      </View>
                      <View style={{flex: 5, marginLeft: 5}}>
                        <Text
                          style={{
                            flex: 1,
                            alignSelf: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightblue',
                          }}>
                          Teacher
                        </Text>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <View>
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 100,
                                margin: 5,
                                resizeMode: 'center',
                              }}
                              source={{
                                uri: defaultUserImageURL,
                              }}
                            />
                            <Text>{item.username}</Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center'}}>Name :</Text>
                            <Text style={{alignSelf: 'center'}}>
                              {item.fullName}
                            </Text>
                          </View>
                          <View style={{flex: 2, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center'}}>Email :</Text>
                            <Text style={{alignSelf: 'center'}}>
                              {item.email}
                            </Text>
                          </View>
                        </View>
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
                          backScreen: 'Subjects',
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
                  <View>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 5,
                        padding: 10,
                        borderColor: 'lightblue',
                        borderWidth: 1,
                        borderRadius: 20,
                      }}>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                        }}>
                        <Text
                          style={{
                            flex: 1,
                            borderBottomColor: 'lightblue',
                            borderBottomWidth: 1,
                          }}>
                          Subject
                        </Text>

                        <Text
                          style={{
                            flex: 8,
                            alignSelf: 'center',
                            textAlignVertical: 'center',
                          }}>
                          {item.subjectTitle}
                        </Text>
                      </View>
                      <View style={{flex: 5, marginLeft: 5}}>
                        <Text
                          style={{
                            flex: 1,
                            alignSelf: 'center',
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightblue',
                          }}>
                          Teacher
                        </Text>
                        <View
                          style={{
                            flex: 2,
                            justifyContent: 'center',
                            flexDirection: 'row',
                          }}>
                          <View>
                            <Image
                              style={{
                                width: 40,
                                height: 40,
                                borderRadius: 100,
                                margin: 5,
                                resizeMode: 'center',
                              }}
                              source={{
                                uri: server + 'uploads/profile/' + item.photo,
                              }}
                            />
                            <Text>{item.username}</Text>
                          </View>
                          <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center'}}>Name :</Text>
                            <Text style={{alignSelf: 'center'}}>
                              {item.fullName}
                            </Text>
                          </View>
                          <View style={{flex: 2, justifyContent: 'center'}}>
                            <Text style={{alignSelf: 'center'}}>Email :</Text>
                            <Text style={{alignSelf: 'center'}}>
                              {item.email}
                            </Text>
                          </View>
                        </View>
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
                          backScreen: 'Subjects',
                        });
                      }}>
                      <Text style={{alignSelf: 'center'}}>
                        Show teacher info
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
