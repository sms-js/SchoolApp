import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchAttendance, fetchStudentsAttendance} from '../api/fetchAttendance';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {fetchClassStudents} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function Attendance(props) {
  const {user} = useAuth();
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [classe, setClasse] = useState();
  const [classes, setClasses] = useState();
  const [subjects, setSubjects] = useState();
  const [subject, setSubject] = useState();
  const [date, setDate] = useState();
  const [attendance, setAttendance] = useState();
  const dateHandler = (value) => {
    setDate(value);
  };

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

  const getMyClassStudents = async (classId) => {
    const res = await fetchClassStudents(classId);
    if (res) {
      /*let d = res.map((item) => {
        return {label: item.fullName, value: item.id};
      });
      setStudents(d);*/
      let d = res;
      d.unshift({fullName: 'All students', id: 0});
      setStudents(d);
      // setStudents(res);
    }
  };

  const getStudentAttendance = async (classId, subjectId, studentId, date) => {
    var res = [];
    if (studentId == 0) {
      res = await fetchStudentsAttendance(classId, subjectId, date);
    } else {
      res = await fetchAttendance(classId, subjectId, studentId, date);
    }
    if (res) {
      let a = res.map((obj) => {
        switch (obj.status) {
          case '0':
            obj.status = 'Absent';
            return obj;

          case '1':
            obj.status = 'Present';
            return obj;

          case '2':
            obj.status = 'Late';
            return obj;

          case '3':
            obj.status = 'Late with excuse';
            return obj;

          case '4':
            obj.status = 'Early dismissal';
            return obj;

          default:
            obj.status = 'Unspecified';
            return obj;
        }
      });
      setAttendance(a);
    } else {
      setAttendance();
    }
  };
  React.useEffect(() => {
    getMyClasses();
    let today = new Date();
    let date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    setDate(date);
    /*if (classe && subject && date && student) {
      getStudentAttendance(classe, subject, student, date);
    }*/
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
          Attendance
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Dropdown
          label="My classes"
          data={classes}
          onChangeText={(value) => {
            setAttendance();
            setSubjects();
            setSubject();
            setStudent(0);
            setClasse(value);
            getMyClassSubjects(value);
            getMyClassStudents(value);
          }}
        />
        <Dropdown
          label="My class subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            if (classe) {
              getStudentAttendance(classe, value, student, date);
            }
          }}
        />
        <Dropdown
          label="My class students"
          data={students.map((item) => {
            return {label: item.fullName, value: item.id};
          })}
          onChangeText={(value) => {
            setStudent(value);
            if (subject && classe) {
              getStudentAttendance(classe, subject, value, date);
            }
          }}
        />
        <Text />
        <DatePicker
          style={{width: '97%'}}
          date={date}
          mode="date"
          placeholder="select date"
          format="MM/DD/YYYY"
          minDate="01/01/1930"
          maxDate={
            new Date().getMonth() +
            1 +
            '/' +
            new Date().getDate() +
            '/' +
            new Date().getFullYear()
          }
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 8,
            },
            dateInput: {borderColor: 'lightblue', marginLeft: 50},

            // ... You can check the source to find the other keys.
          }}
          onDateChange={(value) => {
            dateHandler(value);
            if (subject && classe) {
              getStudentAttendance(classe, subject, student, value);
            }
          }}
        />
        <Text />
        <FlatList
          data={attendance}
          renderItem={({item}) =>
            item.status ? (
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
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{item.subjectTitle}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{item.date}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{item.status}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )
          }
        />
        <Text />
        <Button
          title="control attendance"
          onPress={() => {
            if (classe && subject && date && students && attendance) {
              let cc = [];
              let c = {};
              for (let i = 0; i < classes.length; i++) {
                cc.push(classes[i]);
              }
              cc.map((obj) => {
                if (obj.value == classe) {
                  c = obj;
                }
              });
              let ss = [];
              let s = {};
              for (let i = 0; i < subjects.length; i++) {
                ss.push(subjects[i]);
              }
              ss.map((obj) => {
                if (obj.value == subject) {
                  s = obj;
                }
              });
              let a = [];
              for (let i = 0; i < attendance.length; i++) {
                a.push(attendance[i]);
              }
              a.map((obj) => {
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

                  case 'Unspecified':
                    obj.status = 5;
                    return obj;
                }
              });
              props.properties.navigation.navigate('ControlAttendance', {
                classe: c,
                subject: s,
                date: date,
                students: students,
                attendance: a,
              });
              setAttendance();
            } else {
              alert('Select Class / Subject / Date !');
            }
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
