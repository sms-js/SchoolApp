import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchTeacherAssignments,
  fetchClassTeacherAssignments,
  fetchSubjectTeacherAssignments,
  insertTeacherAssignments,
} from '../api/fetchAssignments';
import {useAuth} from '../../../context/Authentication';

export default function Assignments(props) {
  const {user} = useAuth();
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
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text style={{alignSelf: 'center'}}>Assignments</Text>
          <Text />
          <Button
            title="Show my assignments"
            onPress={() => {
              fetchTeacherAssignments(user['id']);
            }}
          />
          <Text />
          <Button
            title="Show my assignments for class 1"
            onPress={() => {
              fetchClassTeacherAssignments(user['id'], 1);
            }}
          />
          <Text />
          <Button
            title="Show my assignments for subject 1"
            onPress={() => {
              fetchSubjectTeacherAssignments(user['id'], 1);
            }}
          />
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
          <Text />
          <Button
            title="Login Screen"
            onPress={() => {
              props.properties.navigation.navigate('Login');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {borderColor: 'lightblue', borderWidth: 1, margin: 5},
  textinput: {borderColor: 'lightblue', borderWidth: 1, padding: 10, margin: 5},
  button: {alignSelf: 'center'},
});
