import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchTeacherSubjects,
  fetchTeacherClassSubjects,
} from '../api/fetchSubjects';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function Subjects(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState([]);
  const [drop, setDrop] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const getMyClasses = async () => {
    const res = await fetchTeacherClasses(user['id']);
    setClasses(res);
    let d = res.map((item) => {
      return {label: item.className, value: item.id};
    });
    d.unshift({label: 'All my subjects', value: 0});
    setDrop(d);
  };

  const getMySubjects = async () => {
    const res = await fetchTeacherSubjects(user['id']);
    setSubjects(res);
  };
  const getMyClassSubjects = async (classId) => {
    const res = await fetchTeacherClassSubjects(user['id'], classId);
    setSubjects(res);
  };
  React.useEffect(() => {
    getMyClasses();
    getMySubjects();
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
          Subjects
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20, marginBottom: 80}}>
        <View>
          <Text />
          <Dropdown
            label="My class Subjects"
            data={drop}
            onChangeText={(value) => {
              if (value == 0) {
                getMySubjects();
              } else {
                getMyClassSubjects(value);
              }
            }}
          />
          <Text />
          <FlatList
            data={subjects}
            renderItem={({item}) => (
              <View
                style={{
                  margin: 5,
                  padding: 10,
                  borderColor: 'lightblue',
                  borderWidth: 1,
                  borderRadius: 15,
                  flexDirection: 'row',
                }}>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text>{item.subjectTitle}</Text>
                </View>
                <View style={{flex: 1, justifyContent: 'center'}}>
                  <Text style={{alignSelf: 'center'}}>{item.className}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}
