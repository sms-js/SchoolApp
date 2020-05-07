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
import {updateAttendance} from '../api/fetchAttendance';

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
  const insertMyAttendance = async () => {};
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
        <Text />
        <Text>Control attendance for : </Text>
        <Text>{props.navigation.state.params.classe.label}</Text>
        <Text>{props.navigation.state.params.subject.label}</Text>
        <Text>{props.navigation.state.params.date}</Text>
        <Text />
        {props.navigation.state.params.attendance ? (
          <View>
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
                        /*let b = 0;
                        if (attendanceValue.length > 0) {
                          for (let i = 0; i < attendanceValue.length; i++) {
                            if (attendanceValue[i] == value) {
                              b = 1;
                            }
                          }
                          if ((b = 0)) {
                            attendanceValue.push(value);
                          }
                        } else {
                          attendanceValue.push(value);
                        }

                        b = 0;
                        if (students.length > 0) {
                          for (let i = 0; i < attendanceValue.length; i++) {
                            if (students[i] == item.studentId) {
                              b = 1;
                            }
                          }
                          if ((b = 0)) {
                            students.push(item.studentId);
                          }
                        } else {
                          students.push(item.studentId);
                        }

                        b = 0;
                        if (attendanceId.length > 0) {
                          for (let i = 0; i < attendanceValue.length; i++) {
                            if (attendanceId[i] == item.id) {
                              b = 1;
                            }
                          }
                          if ((b = 0)) {
                            attendanceId.push(item.id);
                          }
                        } else {
                          attendanceId.push(item.id);
                        }*/
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
            <Text>!!!!!!</Text>
            <Text />
            <Button
              title="insert attendance"
              onPress={() => {
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
/*
{props.navigation.state.params.classes.map((obj) => {
          if (obj.value == props.navigation.state.params.classe) {
            return <Text>{obj.label}</Text>;
          }
        })}
        {props.navigation.state.params.subjects.map((obj) => {
          if (obj.value == props.navigation.state.params.subject) {
            return <Text>{obj.label}</Text>;
          }
        })}

        .map((obj) => {
                switch (obj.status) {
                  case 'Absent':
                    obj.status = 0;
                    return obj;

                  case 'Present':
                    obj.status = 1;
                    return obj;

                  case 'Late':
                    obj.status = 2;
                    return obj;

                  case 'Late with excuse':
                    obj.status = 3;
                    return obj;

                  case 'Early dismissal':
                    obj.status = 4;
                    return obj;
                }
              })
*/
