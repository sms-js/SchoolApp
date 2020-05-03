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
  insertTeacherAssignments,
  clearAssignments,
} from '../api/fetchAssignments';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function AddAssignment(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const getMyClasses = async () => {
    try {
      const res = await fetchTeacherClasses(user['id']);
      let c = res.map((item) => {
        return {label: item.className, value: item.id};
      });
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
      setSubjects(d);
    }
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
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Dropdown
          label="My classes"
          data={classes}
          onChangeText={(value) => {
            setAssignmentClass(value);
            getMyClassSubjects(value);
          }}
        />

        <Dropdown
          label="My class subjects"
          data={subjects}
          onChangeText={(value) => {
            setAssignmentSubject(value);
          }}
        />
        <Text />
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
          placeholder="Assignment DeadLine"
          onChangeText={assignmentDeadLineHandler}
          style={styles.textinput}
        />
        <TextInput
          placeholder="Assignment File"
          onChangeText={assignmentFileHandler}
          style={styles.textinput}
        />
        <Text />
        <Button
          title="add assignment"
          style={styles.button}
          onPress={async () => {
            insertTeacherAssignments(
              assignmentClass,
              assignmentSubject,
              user['id'],
              assignmentTitle,
              assignmentDescription,
              assignmentFile,
              assignmentDeadLine,
            );
          }}
        />
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('Assignments');
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
