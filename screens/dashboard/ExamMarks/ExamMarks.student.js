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
import {fetchExamMarks, fetchSubjectsExamMarks} from '../api/fetchExamMarks';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function ExamMarks(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState();
  const [subject, setSubject] = useState();
  const [examMarks, setExamMarks] = useState();

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
  const getMyExamMarks = async (classId, subjectId, studentId) => {
    var res = [];
    if (subjectId == 0) {
      res = await fetchSubjectsExamMarks(classId, studentId);
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
    getMyClassSubjects(user['studentClass']);
    setSubject(0);
    getMyExamMarks(user['studentClass'], 0, user['id']);
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
          label="My class subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            getMyExamMarks(user['studentClass'], value, user['id']);
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
                {item.markComments != '' ? (
                  <View>
                    <Text>Mark comments : </Text>
                    <Text>{item.markComments}</Text>
                  </View>
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
