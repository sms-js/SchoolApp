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
import {fetchAttendance} from '../api/fetchAttendance';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {fetchClassStudents} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

export default function Attendance(props) {
  const {user} = useAuth();
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState([]);
  const [classe, setClasse] = useState([]);
  const [classes, setClasses] = useState([]);
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
      setStudents(res);
    }
  };

  const getStudentAttendance = async (classId, subjectId, studentId, date) => {
    const res = await fetchAttendance(classId, subjectId, studentId, date);
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
        }
      });
      setAttendance(a);
    } else {
      setAttendance([]);
    }
  };
  React.useEffect(() => {
    getMyClasses();
    let today = new Date();
    let date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    setDate(date);
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
            setAttendance([]);
            setSubjects([]);
            setSubject('');
            setStudent('');
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
            if (date && student && classe) {
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
            if (date && student && classe) {
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
            if (subject && classe && student) {
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
            ) : (
              <View />
            )
          }
        />
        <Text />
        <Button
          title="control attendance"
          onPress={() => {
            props.properties.navigation.navigate('ControlAttendance');
          }}
        />
      </ScrollView>
    </View>
  );
}
