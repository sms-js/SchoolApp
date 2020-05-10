import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchOnlineExams,
  fetchSubjectOnlineExams,
  fetchExamMark,
} from '../api/fetchOnlineExams';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function OnlineExams(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState();
  const [subject, setSubject] = useState();
  const [onlineExams, setOnlineExams] = useState();

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
  const getMyOnlineExams = async (classId, studentId, subjectId) => {
    var res = [];
    if (subjectId == 0) {
      res = await fetchOnlineExams(
        classId,
        studentId,
        new Date().getMonth() +
          1 +
          '/' +
          new Date().getDate() +
          '/' +
          new Date().getFullYear(),
      );
    } else {
      res = await fetchSubjectOnlineExams(
        classId,
        subjectId,
        studentId,
        new Date().getMonth() +
          1 +
          '/' +
          new Date().getDate() +
          '/' +
          new Date().getFullYear(),
      );
    }
    if (res) {
      setOnlineExams(res);
    } else {
      setOnlineExams([]);
    }
  };
  React.useEffect(() => {
    getMyClassSubjects(user['studentClass']);
    setSubject(0);
    getMyOnlineExams(
      user['studentClass'],
      user['id'],
      0,
      new Date().getMonth() +
        1 +
        '/' +
        new Date().getDate() +
        '/' +
        new Date().getFullYear(),
    );
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
          Online Exams
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Dropdown
          label="My class subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            getMyOnlineExams(user['studentClass'], user['id'], value);
          }}
        />
        <Text />
        <FlatList
          data={onlineExams}
          renderItem={({item}) => {
            switch (item.status) {
              case 0:
                return (
                  <View style={styles.view}>
                    <Text>{item.subjectTitle}</Text>
                    <Text>{item.examTitle}</Text>
                    <Text>{item.examDescription}</Text>
                    <Text>{item.examDate}</Text>
                    <Text style={{color: 'red'}}>{item.ExamEndDate}</Text>
                    <TouchableOpacity
                      style={styles.opacity}
                      onPress={() => {
                        Alert.alert('Online Exam', 'Exam end date passed !');
                      }}>
                      <Text>Take Exam</Text>
                    </TouchableOpacity>
                  </View>
                );
              case 1:
                return (
                  <View style={styles.view}>
                    <Text>{item.subjectTitle}</Text>
                    <Text>{item.examTitle}</Text>
                    <Text>{item.examDescription}</Text>
                    <Text>{item.examDate}</Text>
                    <Text style={{color: 'green'}}>{item.ExamEndDate}</Text>
                    <TouchableOpacity
                      style={styles.opacity}
                      onPress={() => {
                        props.properties.navigation.navigate('TakeOnlineExam', {
                          exam: item,
                        });
                      }}>
                      <Text>Take Exam</Text>
                    </TouchableOpacity>
                  </View>
                );
              case 2:
                return (
                  <View style={styles.view}>
                    <Text>{item.subjectTitle}</Text>
                    <Text>{item.examTitle}</Text>
                    <Text>{item.examDescription}</Text>
                    <Text>{item.examDate}</Text>
                    <Text style={{color: 'green'}}>{item.ExamEndDate}</Text>
                    <TouchableOpacity
                      style={styles.opacity}
                      onPress={async () => {
                        const res = await fetchExamMark(item.id, user['id']);

                        props.properties.navigation.navigate('OnlineExamMark', {
                          mark: res,
                        });
                      }}>
                      <Text>View My Mark</Text>
                    </TouchableOpacity>
                  </View>
                );
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: 'lightblue',
    borderRadius: 25,
    /*flex: 1,
    justifyContent: 'center',
    alignItems: 'center',*/
  },
  opacity: {
    height: 40,
    width: '50%',
    backgroundColor: 'lightblue',
    borderRadius: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});
