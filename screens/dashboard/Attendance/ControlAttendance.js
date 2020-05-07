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
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {server, defaultUserImageURL} from '../../../utils/config';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {updateAttendance, insertAttendance} from '../api/fetchAttendance';

export default function ControlAttendance(props) {
  const [students, setStudents] = useState([]);
  const [attendanceValue, setAttendanceValue] = useState([]);
  const [attendanceId, setAttendanceId] = useState([]);

  const updateMyAttendance = async () => {
    try {
      var r = [];
      var e = [];
      for (let i = 0; i < students.length; i++) {
        const res = await updateAttendance(
          attendanceId[i],
          props.navigation.state.params.classe.value,
          props.navigation.state.params.subject.value,
          students[i],
          props.navigation.state.params.date,
          attendanceValue[i],
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
      'Attendance updated successfuly : ' +
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
  const insertMyAttendance = async () => {
    try {
      var r = [];
      var e = [];
      for (let i = 0; i < students.length; i++) {
        const res = await insertAttendance(
          props.navigation.state.params.classe.value,
          props.navigation.state.params.subject.value,
          students[i],
          props.navigation.state.params.date,
          attendanceValue[i],
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
      'Attendance added successfuly : ' +
        c1 +
        '\nInsert errors encountered : ' +
        c2,
      [
        {
          text: 'OK',
          onPress: () => {
            props.navigation.navigate('Attendance');
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
          Control Attendance
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        {props.navigation.state.params.attendance[0] ? (
          <View>
            <Text />
            <Text>Update attendance for : </Text>
            <Text>{props.navigation.state.params.classe.label}</Text>
            <Text>{props.navigation.state.params.subject.label}</Text>
            <Text>{props.navigation.state.params.date}</Text>
            <Text />
            <FlatList
              data={props.navigation.state.params.attendance}
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
                    <RadioForm
                      radio_props={[
                        {label: 'Absent', value: 0},
                        {label: 'Present', value: 1},
                        {label: 'Late', value: 2},
                        {label: 'Late with excuse', value: 3},
                        {label: 'Early dismissal', value: 4},
                        {label: 'Unspecified', value: 5},
                      ]}
                      initial={
                        props.navigation.state.params.attendance[
                          props.navigation.state.params.attendance.indexOf(item)
                        ].status
                      }
                      onPress={(value) => {
                        let b = 0;
                        let n = 0;
                        if (students.length > 0) {
                          for (let i = 0; i < students.length; i++) {
                            if (students[i] == item.studentId) {
                              b = 1;
                              n = i;
                            }
                          }
                          if (b == 0) {
                            students.push(item.studentId);
                            attendanceId.push(item.id);
                            attendanceValue.push(value);
                          } else {
                            attendanceId[n] = item.id;
                            attendanceValue[n] = value;
                          }
                        } else {
                          students.push(item.studentId);
                          attendanceId.push(item.id);
                          attendanceValue.push(value);
                        }
                      }}
                    />
                  </View>
                </View>
              )}
            />
            <Text />
            <Button
              title="update attendance"
              onPress={() => {
                if (students[0]) {
                  updateMyAttendance();
                  setStudents([]);
                  setAttendanceId([]);
                  setAttendanceValue([]);
                } else {
                  Alert.alert('Update Status', 'No changes applied');
                }
              }}
            />
          </View>
        ) : (
          <View>
            <Text />
            <Text>Insert attendance for : </Text>
            <Text>{props.navigation.state.params.classe.label}</Text>
            <Text>{props.navigation.state.params.subject.label}</Text>
            <Text>Date : {props.navigation.state.params.date}</Text>
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
                    <RadioForm
                      radio_props={[
                        {label: 'Absent', value: 0},
                        {label: 'Present', value: 1},
                        {label: 'Late', value: 2},
                        {label: 'Late with excuse', value: 3},
                        {label: 'Early dismissal', value: 4},
                        {label: 'Unspecified', value: 5},
                      ]}
                      initial={5}
                      onPress={(value) => {
                        let b = 0;
                        let n = 0;
                        if (students.length > 0) {
                          for (let i = 0; i < students.length; i++) {
                            if (students[i] == item.id) {
                              b = 1;
                              n = i;
                            }
                          }
                          if (b == 0) {
                            students.push(item.id);
                            //attendanceId.push(item.id);
                            attendanceValue.push(value);
                          } else {
                            //attendanceId[n] = item.id;
                            attendanceValue[n] = value;
                            /*Alert.alert(
                              'Insert Status',
                              'Attendance already added for : ' + item.fullName,
                            );*/
                          }
                        } else {
                          students.push(item.id);
                          //attendanceId.push(item.id);
                          attendanceValue.push(value);
                        }
                      }}
                    />
                  </View>
                </View>
              )}
            />
            <Text />
            <Button
              title="insert attendance"
              onPress={() => {
                let n = [];
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
                  attendanceValue.push(5);
                }
                insertMyAttendance();
              }}
            />
          </View>
        )}

        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('Attendance');
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
