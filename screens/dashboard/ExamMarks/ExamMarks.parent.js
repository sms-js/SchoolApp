import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchExamMarks} from '../api/fetchExamMarks';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function ExamMarks(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState();
  const [children, setChildren] = useState();
  const [child, setChild] = useState();
  const [classe, setClasse] = useState();
  const [subject, setSubject] = useState();
  const [examMarks, setExamMarks] = useState();

  const getMyChildSubjects = async (studentId) => {
    setChild(studentId);
    const res = await fetchStudentClass(studentId);
    setClasse(res[0]['studentClass']);
    const res1 = await fetchClassSubjects(res[0]['studentClass']);
    if (res1) {
      let d = res1.map((item) => {
        return {label: item.subjectTitle, value: item.id};
      });
      //d.unshift({label: 'All subjects', value: 0});
      setSubjects(d);
    }
  };

  const getMyChildExamMarks = async (classId, subjectId, studentId) => {
    var res = [];
    if (subjectId == 0) {
      //res = await fetchSubjectsAttendance(classId, studentId);
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
    String.prototype.extract = function (prefix, suffix) {
      let s = this;
      var i = s.indexOf(prefix);
      if (i >= 0) {
        s = s.substring(i + prefix.length);
      } else {
        return '';
      }
      if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
          s = s.substring(0, i);
        } else {
          return '';
        }
      }
      return s;
    };

    let s = user['parentOf'];
    let ids = [];
    let names = [];
    s = s.extract('[', ']');
    let a = '';
    let b = '';
    let c = '';
    let d = '';
    while (s != '') {
      a = s.extract('{', '}');
      s = s.substring(1);
      b = a.extract('"student":', ',');
      names.push(b.extract('"', '"'));
      s = s.substring('"student":'.length + b.length + 1);
      c = a.substring('"student":'.length + b.length + 1);
      d = c.extract('', ',');
      s = s.substring(d.length + 1);
      d = c.substring(d.length + 1 + '"id":'.length);
      ids.push(parseInt(d));
      s = s.substring('"id":'.length + d.length + 2);
    }
    let ch = [];
    for (let i = 0; i < ids.length; i++) {
      ch.push({label: names[i] + "'s exam marks", value: ids[i]});
    }
    setChildren(ch);
    //getMyClassSubjects(user['studentClass']);

    //setSubject(0);
    //getMyExamMarks(user['studentClass'], 0, user['id']);
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
          Exam Marks
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Dropdown
          label="Children attendance"
          data={children}
          onChangeText={(value) => {
            setExamMarks([]);
            setSubjects([]);
            setSubject(0);
            getMyChildSubjects(value);
            //getMyChildExamMarks(classe, 0, value);
          }}
        />
        <Dropdown
          label="My child class subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            if (child) {
              getMyChildExamMarks(classe, value, child);
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
