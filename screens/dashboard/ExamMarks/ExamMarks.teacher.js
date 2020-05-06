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
import {fetchExamMarks} from '../api/fetchExamMarks';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {fetchClassStudents} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function ExamMarks(props) {
  const {user} = useAuth();
  const [students, setStudents] = useState([]);
  const [student, setStudent] = useState();
  const [classe, setClasse] = useState();
  const [classes, setClasses] = useState();
  const [subjects, setSubjects] = useState();
  const [subject, setSubject] = useState();
  const [examMarks, setExamMarks] = useState();

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
      //d.unshift({fullName: 'All students', id: 0});
      //setStudents(d);
      setStudents(res);
    }
  };

  const getStudentExamMarks = async (classId, subjectId, studentId) => {
    var res = [];
    if (studentId == 0) {
      // res = await fetchStudentsAttendance(classId, subjectId);
    } else {
      res = await fetchExamMarks(classId, subjectId, studentId);
    }
    if (res) {
      setExamMarks(res);
    } else {
      setExamMarks([]);
    }
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
          ExamMarks
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Dropdown
          label="My classes"
          data={classes}
          onChangeText={(value) => {
            setExamMarks();
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
              getStudentExamMarks(classe, value, student);
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
              getStudentExamMarks(classe, subject, value);
            }
          }}
        />
        <Text />
        <FlatList
          data={examMarks}
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
                <Text>Subject : {item.subjectTitle}</Text>
                <Text>Exam : {item.examTitle}</Text>
                <Text>Exam description : </Text>
                <Text>{item.examDescription}</Text>
                <Text>Exam date : {item.examDate}</Text>
                <Text>Exam mark : {item.examMark}</Text>
                {item.attendanceMark != '' ? (
                  <Text>Attendance mark : {item.attendanceMark}</Text>
                ) : null}
              </View>
            </View>
          )}
        />
        <Text />
        <Button
          title="control exam marks"
          onPress={() => {
            props.properties.navigation.navigate('ControlExamMarks');
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
