import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {server, defaultUserImageURL} from '../../../utils/config';
import {
  fetchOnlineExams,
  fetchSubjectOnlineExams,
  fetchExamMark,
} from '../api/fetchOnlineExams';

export default function OnlineExams(props) {
  const {user} = useAuth();
  const [subjects, setSubjects] = useState();
  const [children, setChildren] = useState();
  const [child, setChild] = useState();
  const [classe, setClasse] = useState();
  const [subject, setSubject] = useState();
  const [onlineExams, setOnlineExams] = useState();

  const getMyChildSubjects = async (studentId) => {
    setChild(studentId);
    const res = await fetchStudentClass(studentId);
    setClasse(res[0]['studentClass']);
    const res1 = await fetchClassSubjects(res[0]['studentClass']);
    if (res1) {
      let d = res1.map((item) => {
        return {label: item.subjectTitle, value: item.id};
      });
      d.unshift({label: 'All subjects', value: 0});
      setSubjects(d);
    }
  };

  const getMyChildOnlineExams = async (classId, subjectId, studentId) => {
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
          label="Children online exams"
          data={children}
          onChangeText={(value) => {
            setOnlineExams([]);
            setSubjects([]);
            setSubject(0);
            getMyChildSubjects(value);
            getMyChildOnlineExams(classe, 0, value);
          }}
        />
        <Dropdown
          label="My child class subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            if (child) {
              getMyChildOnlineExams(classe, value, child);
            }
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
                    <Text
                      style={{
                        color: 'red',
                        alignSelf: 'center',
                        fontSize: 30,
                      }}>
                      Missed this exam !
                    </Text>
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
                    <Text
                      style={{
                        color: 'green',
                        alignSelf: 'center',
                        fontSize: 30,
                      }}>
                      Still didn't take exam !
                    </Text>
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
                        const res = await fetchExamMark(item.id, child);

                        props.properties.navigation.navigate('OnlineExamMark', {
                          exam: item,
                          mark: res,
                          backScreen: 'OnlineExams',
                        });
                      }}>
                      <Text>View My Child's Mark</Text>
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
    /*flexDirection: 'row',
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 25,
    margin: 5,
    padding: 10,*/
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
    width: '70%',
    backgroundColor: 'lightblue',
    borderRadius: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
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
renderItem={({item}) => {
            switch (item.status) {
              case 0:
                return (
                  <View style={styles.view}>
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
                    <View style={{flex: 3}}>
                      <Text>{item.subjectTitle}</Text>
                      <Text>{item.examTitle}</Text>
                      <Text>{item.examDescription}</Text>
                      <Text>{item.examDate}</Text>
                      <Text style={{color: 'red'}}>{item.ExamEndDate}</Text>
                      <Text
                        style={{
                          color: 'red',
                          alignSelf: 'center',
                          fontSize: 30,
                        }}>
                        Missed this exam !
                      </Text>
                    </View>
                  </View>
                );
              case 1:
                return (
                  <View style={styles.view}>
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
                    <View style={{flex: 3}}>
                      <Text>{item.subjectTitle}</Text>
                      <Text>{item.examTitle}</Text>
                      <Text>{item.examDescription}</Text>
                      <Text>{item.examDate}</Text>
                      <Text style={{color: 'green'}}>{item.ExamEndDate}</Text>
                      <Text
                        style={{
                          color: 'green',
                          alignSelf: 'center',
                          fontSize: 30,
                        }}>
                        Still didn't take exam !
                      </Text>
                    </View>
                  </View>
                );
              case 2:
                return (
                  <View style={styles.view}>
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
                    <View style={{flex: 3}}>
                      <Text>{item.subjectTitle}</Text>
                      <Text>{item.examTitle}</Text>
                      <Text>{item.examDescription}</Text>
                      <Text>{item.examDate}</Text>
                      <Text style={{color: 'green'}}>{item.ExamEndDate}</Text>
                      <TouchableOpacity
                        style={styles.opacity}
                        onPress={async () => {
                          const res = await fetchExamMark(item.id, child);

                          props.properties.navigation.navigate(
                            'OnlineExamMark',
                            {
                              mark: res,
                            },
                          );
                        }}>
                        <Text>View My Child's Mark</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
            }
          }}
*/
