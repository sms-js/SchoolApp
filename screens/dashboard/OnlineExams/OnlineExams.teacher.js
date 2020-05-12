import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import {
  fetchTeacherOnlineExams,
  fetchTeacherSubjectOnlineExams,
} from '../api/fetchOnlineExams';

export default function OnlineExams(props) {
  const {user} = useAuth();
  const [classe, setClasse] = useState();
  const [classes, setClasses] = useState();
  const [subjects, setSubjects] = useState();
  const [subject, setSubject] = useState();
  const [onlineExams, setOnlineExams] = useState();

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
      d.unshift({label: 'All subjects', value: 0});
      setSubjects(d);
    }
  };

  const getMyOnlineExams = async (classId, subjectId, teacherId) => {
    var res = [];
    if (subjectId == 0) {
      res = await fetchTeacherOnlineExams(
        classId,
        teacherId,
        new Date().getMonth() +
          1 +
          '/' +
          new Date().getDate() +
          '/' +
          new Date().getFullYear(),
      );
    } else {
      res = await fetchTeacherSubjectOnlineExams(
        classId,
        subjectId,
        teacherId,
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
      setOnlineExams();
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
          Online Exams
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Dropdown
          label="My classes"
          data={classes}
          onChangeText={(value) => {
            setOnlineExams();
            setSubjects();
            setSubject();
            setClasse(value);
            getMyClassSubjects(value);
            getMyOnlineExams(value, 0, user['id']);
          }}
        />
        <Dropdown
          label="My class subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            if (classe) {
              getMyOnlineExams(classe, value, user['id']);
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
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Marks</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                    </View>
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
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Marks</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                    </View>
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
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Marks</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Edit</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.opacity}>
                        <Text>Delete</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
            }
          }}
        />
        <Text />
        <Button
          title="add exam"
          onPress={() => {
            props.properties.navigation.navigate('AddOnlineExam', {
              classes: classes,
            });
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
    width: '25%',
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
