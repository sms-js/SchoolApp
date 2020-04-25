import React, {useState} from 'react';
import {Text, ScrollView, View, Button, FlatList, Image} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchClassSubjects,
  fetchSubject,
  fetchSubjectTeacher,
} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function Subjects(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState([]);
  //const [teachersIds, setTeachersIds] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const showMySubjects = async () => {
    const res = await fetchClassSubjects(user['studentClass']);
    setSubjects(res);
    /*setTeachersIds(res.map((item) => item.teacherId));
    let str = '';
    for (let i = 0; i < teachersIds.length; i++) {
      if (i != teachersIds.length - 1) {
        str = str + teachersIds[i] + ',';
      } else {
        str = str + teachersIds[i];
      }
    }*/
    let t = [];
    for (let i = 0; i < res.length; i++) {
      let res2 = await fetchSubjectTeacher(res[i]['teacherId']);
      t.push(res2[0]);
    }
    setTeachers(t);
  };
  React.useEffect(() => {
    showMySubjects();
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
          Subjects
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5}}>
        <View>
          <Text />
          <Button title="Show my Subjects" onPress={() => {}} />
          <Text />
          <FlatList
            data={subjects}
            renderItem={({item}) => {
              if (teachers[subjects.indexOf(item)]['photo'] == '') {
                return (
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
                          <Text>
                            {teachers[subjects.indexOf(item)]['username']}
                          </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <Text style={{alignSelf: 'center'}}>Name :</Text>
                          <Text style={{alignSelf: 'center'}}>
                            {teachers[subjects.indexOf(item)]['fullName']}
                          </Text>
                        </View>
                        <View style={{flex: 2, justifyContent: 'center'}}>
                          <Text style={{alignSelf: 'center'}}>Email :</Text>
                          <Text style={{alignSelf: 'center'}}>
                            {teachers[subjects.indexOf(item)]['email']}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              } else {
                return (
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
                              uri:
                                server +
                                'uploads/profile/' +
                                teachers[subjects.indexOf(item)]['photo'],
                            }}
                          />
                          <Text>
                            {teachers[subjects.indexOf(item)]['username']}
                          </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <Text style={{alignSelf: 'center'}}>Name :</Text>
                          <Text style={{alignSelf: 'center'}}>
                            {teachers[subjects.indexOf(item)]['fullName']}
                          </Text>
                        </View>
                        <View style={{flex: 2, justifyContent: 'center'}}>
                          <Text style={{alignSelf: 'center'}}>Email :</Text>
                          <Text style={{alignSelf: 'center'}}>
                            {teachers[subjects.indexOf(item)]['email']}
                          </Text>
                        </View>
                      </View>
                    </View>
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
