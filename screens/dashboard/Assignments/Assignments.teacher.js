import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchTeacherAssignments,
  fetchClassTeacherAssignments,
  fetchSubjectTeacherAssignments,
  insertTeacherAssignments,
  clearAssignments,
} from '../api/fetchAssignments';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function Assignments(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState([]);
  const [classe, setClasse] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const getMyClasses = async () => {
    try {
      const res = await fetchTeacherClasses(user['id']);
      let c = res.map((item) => {
        return {label: item.className, value: item.id};
      });
      c.unshift({label: 'All my classes', value: 0});
      setClasses(c);
    } catch (error) {
      alert(error);
    }
  };
  const getMyClassSubjects = async (classId) => {
    const res = await fetchClassSubjects(classId);
    if (res) {
      let d = res.map((item) => {
        return {label: item.subjectTitle, value: item.id};
      });
      d.unshift({label: 'All subjects', value: 0});
      setSubjects(d);
    }
  };
  const getMyAssignments = async () => {
    const res = await fetchTeacherAssignments(user['id']);
    setAssignments(res);
  };
  const getMyClassAssignments = async (classId) => {
    const res = await fetchClassTeacherAssignments(user['id'], classId);
    setAssignments(res);
  };
  const getMySubjectAssignments = async (subjectId) => {
    const res = await fetchSubjectTeacherAssignments(user['id'], subjectId);
    setAssignments(res);
  };

  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [assignmentClass, setAssignmentClass] = useState('');
  const [assignmentSubject, setAssignmentSubject] = useState('');
  const [assignmentDeadLine, setAssignmentDeadLine] = useState('');
  const [assignmentFile, setAssignmentFile] = useState('');
  const assignmentTitleHandler = (title) => {
    setAssignmentTitle(title);
  };
  const assignmentDescriptionHandler = (description) => {
    setAssignmentDescription(description);
  };
  const assignmentclasseHandler = (classe) => {
    setAssignmentClass(classe);
  };
  const assignmentSubjectHandler = (subject) => {
    setAssignmentSubject(subject);
  };
  const assignmentDeadLineHandler = (deadLine) => {
    setAssignmentDeadLine(deadLine);
  };
  const assignmentFileHandler = (file) => {
    setAssignmentFile(file);
  };
  React.useEffect(() => {
    getMyClasses();
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
        <Dropdown
          label="My classes"
          data={classes}
          onChangeText={(value) => {
            if (value == 0) {
              setSubjects([]);
              getMyAssignments();
            } else {
              setClasse(value);
              getMyClassSubjects(value);
            }
          }}
        />
        <Text />
        <Dropdown
          label="My class subjects"
          data={subjects}
          onChangeText={(value) => {
            if (value == 0) {
              getMyClassAssignments(classe);
            } else {
              getMySubjectAssignments(value);
            }
          }}
        />
        <Text />
        <FlatList
          data={assignments}
          renderItem={({item}) => {
            if (assignments) {
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
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {borderColor: 'lightblue', borderWidth: 1, margin: 5},
  textinput: {borderColor: 'lightblue', borderWidth: 1, padding: 10, margin: 5},
  button: {alignSelf: 'center'},
});
/*
  <View style={styles.view}>
            <TextInput
              placeholder="Assignment Title"
              onChangeText={assignmentTitleHandler}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Assignment Description"
              onChangeText={assignmentDescriptionHandler}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Assignment Class"
              onChangeText={assignmentclasseHandler}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Assignment Subject"
              onChangeText={assignmentSubjectHandler}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Assignment DeadLine"
              onChangeText={assignmentDeadLineHandler}
              style={styles.textinput}
            />
            <TextInput
              placeholder="Assignment File"
              onChangeText={assignmentFileHandler}
              style={styles.textinput}
            />
            <Button
              title="add assignment"
              style={styles.button}
              onPress={() => {
                insertTeacherAssignments(
                  assignmentClass,
                  assignmentSubject,
                  user['id'],
                  assignmentTitle,
                  setAssignmentDescription,
                  setAssignmentFile,
                  setAssignmentDeadLine,
                );
              }}
            />
          </View>
*/
