import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchStudentAssignments,
  fetchStudentSubjectAssignments,
  clearAssignments,
} from '../api/fetchAssignments';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function Library(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const getSubjects = async () => {
    const res = await fetchClassSubjects(user['studentClass']);
    if (res) {
      let d = res.map((item) => {
        return {label: item.subjectTitle, value: item.id};
      });
      d.unshift({label: 'All my subjects', value: 0});
      setSubjects(d);
    }
  };
  const getMyClassAssignments = async (classId) => {
    const res = await fetchStudentAssignments(classId);
    setAssignments(res);
  };
  const getMySubjectAssignments = async (subjectId) => {
    const res = await fetchStudentSubjectAssignments(subjectId);
    setAssignments(res);
  };
  React.useEffect(() => {
    getSubjects();
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
          Assignments
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Text />
        <Dropdown
          label="My class Subjects"
          data={subjects}
          onChangeText={(value) => {
            if (value == 0) {
              getMyClassAssignments(user['studentClass']);
            } else {
              getMySubjectAssignments(value);
            }
          }}
        />
        <Text />
        <FlatList
          data={assignments}
          renderItem={({item}) => {
            if (item.AssignFile != '') {
              return (
                <View
                  style={{
                    margin: 5,
                    padding: 10,
                    borderColor: 'lightblue',
                    borderWidth: 1,
                    borderRadius: 15,
                  }}>
                  <Text>Title : {item.AssignTitle}</Text>
                  <Text>Description : </Text>
                  <Text>{item.AssignDescription}</Text>
                  <Text>Subject : {item.subjectTitle}</Text>
                  <Text>Deadline : {item.AssignDeadLine}</Text>
                  <Button title="Download" />
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    margin: 5,
                    padding: 10,
                    borderColor: 'lightblue',
                    borderWidth: 1,
                    borderRadius: 15,
                  }}>
                  <Text>Title : {item.AssignTitle}</Text>
                  <Text>Description : </Text>
                  <Text>{item.AssignDescription}</Text>
                  <Text>Subject : {item.subjectTitle}</Text>
                  <Text>Deadline : {item.AssignDeadLine}</Text>
                </View>
              );
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
