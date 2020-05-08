import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {server, defaultUserImageURL} from '../../../utils/config';
import {insertExamMarks, updateExamMarks} from '../api/fetchExamMarks';

import {Dropdown} from 'react-native-material-dropdown';

export default function ControlExamMarks(props) {
  const [students, setStudents] = useState([]);
  const [examMarkValue, setexamMarkValue] = useState([]);
  const [examAttendanceMarkValue, setexamAttendanceMarkValue] = useState([]);
  const [examMarkComments, setExamMarkComments] = useState([]);
  const [examMarkId, setExamMarkId] = useState([]);
  const [examId, setExamId] = useState([]);

  const [exam, setExam] = useState();

  const examMarkInsertHandler = (
    id,
    student,
    exam,
    attendance,
    comment,
    type,
  ) => {
    let b = 0;
    let n = 0;
    if (students.length > 0) {
      for (let i = 0; i < students.length; i++) {
        if (students[i] == student) {
          b = 1;
          n = i;
        }
      }
      switch (type) {
        case 'exam':
          if (b == 0) {
            students.push(student);
            examId.push(id);
            examMarkValue.push(exam);
            examAttendanceMarkValue.push(attendance);
            examMarkComments.push(comment);
          } else {
            examMarkValue[n] = exam;
          }
          break;

        case 'attendance':
          if (b == 0) {
            students.push(student);
            examId.push(id);
            examMarkValue.push(exam);
            examAttendanceMarkValue.push(attendance);
            examMarkComments.push(comment);
          } else {
            examAttendanceMarkValue[n] = attendance;
          }
          break;

        case 'comment':
          if (b == 0) {
            students.push(student);
            examId.push(id);
            examMarkValue.push(exam);
            examAttendanceMarkValue.push(attendance);
            examMarkComments.push(comment);
          } else {
            examMarkComments[n] = comment;
          }
          break;
      }
    } else {
      students.push(student);
      examId.push(id);
      examMarkValue.push(exam);
      examAttendanceMarkValue.push(attendance);
      examMarkComments.push(comment);
    }
  };

  const examMarkUpdateHandler = (
    id,
    student,
    exam,
    attendance,
    comment,
    type,
  ) => {
    let b = 0;
    let n = 0;
    if (students.length > 0) {
      for (let i = 0; i < students.length; i++) {
        if (students[i] == student) {
          b = 1;
          n = i;
        }
      }
      switch (type) {
        case 'exam':
          if (b == 0) {
            students.push(student);
            examMarkId.push(id);
            examMarkValue.push(exam);
            examAttendanceMarkValue.push(attendance);
            examMarkComments.push(comment);
          } else {
            //examMarkId[n] = id;
            examMarkValue[n] = exam;
            //examAttendanceMarkValue[n] = attendance;
            //examMarkComments[n] = comment;
          }
          break;

        case 'attendance':
          if (b == 0) {
            students.push(student);
            examMarkId.push(id);
            examMarkValue.push(exam);
            examAttendanceMarkValue.push(attendance);
            examMarkComments.push(comment);
          } else {
            //examMarkId[n] = id;
            //examMarkValue[n] = exam;
            examAttendanceMarkValue[n] = attendance;
            //examMarkComments[n] = comment;
          }
          break;

        case 'comment':
          if (b == 0) {
            students.push(student);
            examMarkId.push(id);
            examMarkValue.push(exam);
            examAttendanceMarkValue.push(attendance);
            examMarkComments.push(comment);
          } else {
            //examMarkId[n] = id;
            //examMarkValue[n] = exam;
            //examAttendanceMarkValue[n] = attendance;
            examMarkComments[n] = comment;
          }
          break;
      }
    } else {
      students.push(student);
      examMarkId.push(id);
      examMarkValue.push(exam);
      examAttendanceMarkValue.push(attendance);
      examMarkComments.push(comment);
    }
  };

  const updateMyExamMarks = async () => {
    try {
      var r = [];
      var e = [];
      for (let i = 0; i < students.length; i++) {
        const res = await updateExamMarks(
          examMarkId[i],
          examMarkValue[i],
          examAttendanceMarkValue[i],
          examMarkComments[i],
        );
        if (res == 'Record(s) updated successfully') {
          r.push(res);
        } else {
          e.push(res);
        }
      }
    } catch (error) {
      alert(error);
    }
    let c1 = r.length;
    let c2 = e.length;
    Alert.alert(
      'Update Status',
      'Exam marks updated successfuly : ' +
        c1 +
        '\nUpdate errors encountered : ' +
        c2,
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  const insertMyExamMarks = async () => {
    try {
      var r = [];
      var e = [];
      for (let i = 0; i < students.length; i++) {
        const res = await insertExamMarks(
          examId[i],
          props.navigation.state.params.classe.value,
          props.navigation.state.params.subject.value,
          students[i],
          examMarkValue[i],
          examAttendanceMarkValue[i],
          examMarkComments[i],
        );
        if (res == 'New record created successfully') {
          r.push(res);
        } else {
          e.push(res);
        }
      }
    } catch (error) {
      alert(error);
    }
    let c1 = r.length;
    let c2 = e.length;
    Alert.alert(
      'Insert Status',
      'Exam marks added successfuly : ' +
        c1 +
        '\nInsert errors encountered : ' +
        c2,
      [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate('ExamMarks');
          },
        },
      ],
      {cancelable: false},
    );
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
          Control Exam Marks
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        {props.navigation.state.params.examMarks ? (
          <View>
            <Text />
            <Text>Update exam marks for : </Text>
            <Text>{props.navigation.state.params.classe.label}</Text>
            <Text>{props.navigation.state.params.subject.label}</Text>
            <Text />
            <FlatList
              data={props.navigation.state.params.examMarks}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: 'lightblue',
                    borderWidth: 1,
                    borderRadius: 25,
                    margin: 5,
                    padding: 10,
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      style={styles.profile}
                      source={
                        item.photo == ''
                          ? {
                              uri: defaultUserImageURL,
                            }
                          : {
                              uri: server + 'uploads/profile/' + item.photo,
                            }
                      }
                    />
                    <Text>{item.fullName}</Text>
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <Text>Exam : {item.examTitle}</Text>
                    <Text>Exam description : </Text>
                    <Text>{item.examDescription}</Text>
                    <Text>Exam date : {item.examDate}</Text>
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                      <Text style={{textAlignVertical: 'center', width: '60%'}}>
                        Exam mark :{' '}
                      </Text>
                      <TextInput
                        style={{
                          borderColor: 'lightblue',
                          borderWidth: 1,
                          width: '30%',
                        }}
                        defaultValue={item.examMark}
                        onChangeText={(value) => {
                          examMarkUpdateHandler(
                            item.id,
                            item.studentId,
                            value,
                            item.attendanceMark,
                            item.markComments,
                            'exam',
                          );
                        }}
                      />
                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                      <Text style={{textAlignVertical: 'center', width: '60%'}}>
                        Attendance mark :{' '}
                      </Text>
                      <TextInput
                        style={{
                          borderColor: 'lightblue',
                          borderWidth: 1,
                          width: '30%',
                        }}
                        defaultValue={item.attendanceMark}
                        onChangeText={(value) => {
                          examMarkUpdateHandler(
                            item.id,
                            item.studentId,
                            item.examMark,
                            value,
                            item.markComments,
                            'attendance',
                          );
                        }}
                      />
                    </View>
                    <Text>Mark comments : </Text>
                    <TextInput
                      style={{
                        borderColor: 'lightblue',
                        borderWidth: 1,
                        height: 60,
                        width: '90%',
                        textAlignVertical: 'top',
                      }}
                      defaultValue={item.markComments}
                      onChangeText={(value) => {
                        examMarkUpdateHandler(
                          item.id,
                          item.studentId,
                          item.examMark,
                          item.attendanceMark,
                          value,
                          'comment',
                        );
                      }}
                    />
                  </View>
                </View>
              )}
            />
            <Text />
            <Button
              title="update exam marks"
              onPress={() => {
                /*console.log(examMarkId);
                console.log(examMarkValue);
                console.log(examMarkComments);*/
                if (students[0]) {
                  updateMyExamMarks();
                  setStudents([]);
                  setExamMarkId([]);
                  setexamMarkValue([]);
                  setExamMarkComments([]);
                } else {
                  Alert.alert('Update Status', 'No changes applied');
                }
              }}
            />
          </View>
        ) : (
          <View>
            <Text />
            <Text>Insert exam marks for : </Text>
            <Text>{props.navigation.state.params.classe.label}</Text>
            <Text>{props.navigation.state.params.subject.label}</Text>
            <Dropdown
              label="Exams"
              data={props.navigation.state.params.exams.map((obj) => {
                return {label: obj.examTitle, value: obj.id};
              })}
              onChangeText={(value) => {
                for (
                  let i = 0;
                  i < props.navigation.state.params.exams.length;
                  i++
                ) {
                  if (props.navigation.state.params.exams[i]['id'] == value) {
                    setExam(props.navigation.state.params.exams[i]);
                  }
                }
              }}
            />
            {exam ? (
              <View>
                <Text>{exam['examTitle']}</Text>
                <Text>{exam['examDescription']}</Text>
                <Text>{exam['examDate']}</Text>
              </View>
            ) : null}
            <Text />
            <FlatList
              data={props.navigation.state.params.students}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    borderColor: 'lightblue',
                    borderWidth: 1,
                    borderRadius: 25,
                    margin: 5,
                    padding: 10,
                  }}>
                  <View style={{flex: 1}}>
                    <Image
                      style={styles.profile}
                      source={
                        item.photo == ''
                          ? {
                              uri: defaultUserImageURL,
                            }
                          : {
                              uri: server + 'uploads/profile/' + item.photo,
                            }
                      }
                    />
                    <Text>{item.fullName}</Text>
                  </View>
                  <View
                    style={{
                      flex: 3,
                    }}>
                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                      <Text style={{textAlignVertical: 'center', width: '60%'}}>
                        Exam mark :{' '}
                      </Text>
                      <TextInput
                        style={{
                          borderColor: 'lightblue',
                          borderWidth: 1,
                          width: '30%',
                        }}
                        defaultValue=""
                        onChangeText={(value) => {
                          examMarkInsertHandler(
                            exam['id'],
                            props.navigation.state.params.classe.value,
                            item.id,
                            value,
                            '',
                            '',
                            'exam',
                          );
                        }}
                      />
                    </View>

                    <View style={{flexDirection: 'row', marginBottom: 5}}>
                      <Text style={{textAlignVertical: 'center', width: '60%'}}>
                        Attendance mark :{' '}
                      </Text>
                      <TextInput
                        style={{
                          borderColor: 'lightblue',
                          borderWidth: 1,
                          width: '30%',
                        }}
                        defaultValue={item.attendanceMark}
                        onChangeText={(value) => {
                          examMarkUpdateHandler(
                            exam['id'],
                            props.navigation.state.params.classe.value,
                            item.id,
                            '',
                            value,
                            '',
                            'attendance',
                          );
                        }}
                      />
                    </View>
                    <Text>Mark comments : </Text>
                    <TextInput
                      style={{
                        borderColor: 'lightblue',
                        borderWidth: 1,
                        height: 60,
                        width: '90%',
                        textAlignVertical: 'top',
                      }}
                      defaultValue={item.markComments}
                      onChangeText={(value) => {
                        examMarkUpdateHandler(
                          exam['id'],
                          props.navigation.state.params.classe.value,
                          item.id,
                          '',
                          '',
                          value,
                          'comment',
                        );
                      }}
                    />
                  </View>
                </View>
              )}
            />
            <Text />
            <Button
              title="insert exam marks"
              onPress={() => {
                console.log(examId);
                console.log(examMarkValue);
                console.log(examAttendanceMarkValue);
                console.log(examMarkComments);
                /*let n = [];
                for (
                  let i = 0;
                  i < props.navigation.state.params.students.length;
                  i++
                ) {
                  let b = 0;

                  for (let j = 0; j < students.length; j++) {
                    if (
                      props.navigation.state.params.students[i]['id'] ==
                      students[j]
                    ) {
                      b = 1;
                    }
                  }
                  if (b == 0) {
                    n.push(props.navigation.state.params.students[i]['id']);
                  }
                }
                for (let i = 0; i < n.length; i++) {
                  students.push(n[i]);
                  examMarkValue.push('');
                  examAttendanceMarkValue.push('');
                  examMarkComments.push('');
                }
                insertMyExamMarks();*/
              }}
            />
          </View>
        )}
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('ExamMarks');
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 5,
    marginTop: 20,
    resizeMode: 'center',
  },
});
/*
if (b == 0) {
        students.push(student);
        examId.push(id);
        examMarkValue.push(exam);
        examAttendanceMarkValue.push(attendance);
        examMarkComments.push(comment);
      } else {
        examMarkValue[n] = exam;
        examAttendanceMarkValue[n] = attendance;
        examMarkComments[n] = comment;
      }*/
