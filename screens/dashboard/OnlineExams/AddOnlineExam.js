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
  TextInput,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
//import {fetchTeacherClasses} from '../api/fetchClasses';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import {addOnlineExam} from '../api/fetchOnlineExams';

export default function AddOnlineExam(props) {
  const {user} = useAuth();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [endDate, setEndDate] = useState();
  const [classes, setClasses] = useState();
  //const [classe, setClasse] = useState();
  const [classesFor, setClassesFor] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subject, setSubject] = useState();
  const [questions, setQuestions] = useState([]);
  const [questionTxt, setQuestionTxt] = useState('');
  //const [questionId, setQuestionId] = useState('');
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [Tans, setTans] = useState('');

  const removeClassHandler = (id) => {
    setClassesFor((prevClasses) => {
      return prevClasses.filter((classe) => classe.id != id);
    });
    setSubjects((prevSubjects) => {
      return prevSubjects.filter((subject) => subject.classe != id);
    });
  };

  const removeAllClassesHandler = () => {
    setClassesFor((prevClasses) => {
      return prevClasses.filter((classe) => classe.id === 0);
    });
    setSubjects((prevSubjects) => {
      return prevSubjects.filter((subject) => subject.classe === 0);
    });
  };

  const addClassHandler = (id, value) => {
    setClassesFor((prevClasses) => {
      return [...prevClasses, {id: id, className: value}];
    });
  };

  const removeQuestionHandler = (id) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.filter((question) => question.id != id);
    });
  };

  const removeAllQuestionsHandler = () => {
    setQuestions((prevQuestions) => {
      return prevQuestions.filter((question) => question.id === 0);
    });
  };

  const addQuestionHandler = (
    id,
    questionText,
    answer1,
    answer2,
    answer3,
    answer4,
    Tanswer,
  ) => {
    setQuestions((prevQuestions) => {
      return [
        ...prevQuestions,
        {
          id: id,
          questionText: questionText,
          answers: [
            /* {answer1: answer1},
            {answer2: answer2},
            {answer3: answer3},
            {answer4: answer4},*/
            answer1,
            answer2,
            answer3,
            answer4,
          ],
          Tanswer: Tanswer,
        },
      ];
    });
  };

  const getMyClassSubjects = async (classId) => {
    const res = await fetchClassSubjects(classId);
    if (res) {
      let d = res.map((item) => {
        return {label: item.subjectTitle, value: item.id, classe: classId};
      });
      console.log(d);
      for (let i = 0; i < d.length; i++) {
        subjects.push(d[i]);
      }
    }
  };

  const submitExam = async () => {
    let exam = '[';
    for (let i = 0; i < questions.length; i++) {
      if (i == questions.length - 1) {
        exam = exam + '{"title":"' + questions[i]['questionText'] + '",';
        for (let j = 0; j < questions[i]['answers'].length; j++) {
          exam =
            exam + '"ans' + (j + 1) + '":"' + questions[i]['answers'][j] + '",';
        }
        exam = exam + '"Tans":"' + questions[i]['Tanswer'] + '"}]';
      } else {
        exam = exam + '{"title":"' + questions[i]['questionText'] + '",';
        for (let j = 0; j < questions[i]['answers'].length; j++) {
          exam =
            exam + '"ans' + (j + 1) + '":"' + questions[i]['answers'][j] + '",';
        }
        exam = exam + '"Tans":"' + questions[i]['Tanswer'] + '"},';
      }
    }
    let classe = '[';
    for (let i = 0; i < classesFor.length; i++) {
      if (i == classesFor.length - 1) {
        classe = classe + '"' + classesFor[i]['id'] + '"]';
      } else {
        classe = classe + '"' + classesFor[i]['id'] + '",';
      }
    }
    try {
      const res = await addOnlineExam(
        title,
        description,
        classe,
        user['id'],
        subject,
        date,
        endDate,
        exam,
      );
      if (res == 'New record created successfully') {
        Alert.alert('Exam submission', 'Exam submitted successfully !', [
          {
            text: 'OK',
            onPress: () => {
              props.navigation.navigate('OnlineExams');
            },
          },
        ]);
      }
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    let clsss = [];
    for (let i = 0; i < props.navigation.state.params.classes.length; i++) {
      clsss.push(props.navigation.state.params.classes[i]);
    }
    clsss.unshift({
      label: 'All classes',
      value: 0,
    });
    setClasses(clsss);
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
          Add Online Exam
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Dropdown
          label="Add classes"
          data={classes}
          onChangeText={(value) => {
            if (value == 0) {
              let clsss = [];
              for (let i = 1; i < classes.length; i++) {
                clsss.push({
                  id: classes[i]['value'],
                  className: classes[i]['label'],
                });
              }
              setClassesFor(clsss);
            } else {
              if (classesFor.length > 0) {
                let b = 0;
                for (let i = 0; i < classesFor.length; i++) {
                  if (classesFor[i]['id'] == value) {
                    b = 1;
                  }
                }
                if (b == 0) {
                  for (let i = 1; i < classes.length; i++) {
                    if (classes[i]['value'] == value) {
                      addClassHandler(value, classes[i]['label']);
                    }
                  }
                } else {
                  Alert.alert('Exam classes', 'Class added already !');
                }
              } else {
                for (let i = 1; i < classes.length; i++) {
                  if (classes[i]['value'] == value) {
                    addClassHandler(value, classes[i]['label']);
                  }
                }
              }
            }
            getMyClassSubjects(value);
          }}
        />
        <Dropdown
          label="Exam subject"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
          }}
        />
        <View
          style={{
            margin: 10,
          }}>
          <FlatList
            data={classesFor}
            renderItem={({item}) => (
              <View style={styles.classes}>
                <Text style={{width: '80%'}}>{item.className}</Text>
                <Button
                  title="remove"
                  onPress={() => {
                    removeClassHandler(item.id);
                  }}
                  style={{
                    margin: 5,
                  }}
                />
              </View>
            )}
          />
        </View>
        {classesFor.length > 1 ? (
          <View>
            <Text />
            <Button
              title="remove all"
              onPress={() => {
                removeAllClassesHandler();
              }}
            />
            <Text />
          </View>
        ) : null}
        <TextInput
          placeholder="Exam Title"
          style={styles.input2}
          onChangeText={(value) => {
            setTitle(value);
          }}
        />
        <TextInput
          placeholder="Exam Description"
          style={styles.input}
          onChangeText={(value) => {
            setDescription(value);
          }}
        />
        <DatePicker
          style={{width: '100%', marginBottom: 10}}
          date={date}
          mode="date"
          placeholder="select exam date"
          format="MM/DD/YYYY"
          maxDate={12 + '/' + 31 + '/' + new Date().getFullYear()}
          minDate={
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
          }}
          onDateChange={(value) => {
            setDate(value);
          }}
        />
        <DatePicker
          style={{width: '100%', marginBottom: 10}}
          date={endDate}
          mode="date"
          placeholder="select exam end date"
          format="MM/DD/YYYY"
          maxDate={12 + '/' + 31 + '/' + new Date().getFullYear()}
          minDate={
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
          }}
          onDateChange={(value) => {
            setEndDate(value);
          }}
        />
        <View style={styles.question}>
          <Text>Question : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Question'}
            onChangeText={(value) => {
              setQuestionTxt(value);
            }}
            value={questionTxt}
          />
          <Text>Answer 1 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Question'}
            onChangeText={(value) => {
              setAns1(value);
            }}
            value={ans1}
          />
          <Text>Answer 2 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            onChangeText={(value) => {
              setAns2(value);
            }}
            value={ans2}
          />
          <Text>Answer 3 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            onChangeText={(value) => {
              setAns3(value);
            }}
            value={ans3}
          />
          <Text>Answer 4 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            onChangeText={(value) => {
              setAns4(value);
            }}
            value={ans4}
          />
          <Text>Correct answer : </Text>
          <RadioForm
            radio_props={[
              {label: 'Answer1', value: 1},
              {label: 'Answer2', value: 2},
              {label: 'Answer3', value: 3},
              {label: 'Answer4', value: 4},
            ]}
            onPress={(value) => {
              setTans(value);
            }}
            initial={Tans}
          />
          <Text />
          <Button
            title="Add question"
            onPress={() => {
              if (!questionTxt) {
                Alert.alert('Add question', 'Enter question text !');
              } else {
                if (!ans1) {
                  Alert.alert('Add question', 'Enter answer 1 !');
                } else {
                  if (!ans2) {
                    Alert.alert('Add question', 'Enter answer 2 !');
                  } else {
                    if (!ans3) {
                      Alert.alert('Add question', 'Enter answer 3 !');
                    } else {
                      if (!ans4) {
                        Alert.alert('Add question', 'Enter answer 4 !');
                      } else {
                        if (!Tans) {
                          Alert.alert(
                            'Add question',
                            'Select correct answer !',
                          );
                        } else {
                          addQuestionHandler(
                            questions.length + 1,
                            questionTxt,
                            ans1,
                            ans2,
                            ans3,
                            ans4,
                            Tans,
                          );
                          setQuestionTxt('');
                          setAns1('');
                          setAns2('');
                          setAns3('');
                          setAns4('');
                          setTans('');
                          /*alert(
                            'Question : ' +
                              questionTxt +
                              '\nAnswer 1 : ' +
                              ans1 +
                              '\nAnswer 2 : ' +
                              ans2 +
                              '\nAnswer 3 : ' +
                              ans3 +
                              '\nAnswer 4 : ' +
                              ans4 +
                              '\nCorrect answer : ' +
                              Tans,
                          );*/
                        }
                      }
                    }
                  }
                }
              }
            }}
          />
        </View>
        <View>
          <FlatList
            data={questions}
            renderItem={({item}) => (
              <View style={styles.question}>
                <Text style={{alignSelf: 'center'}}>Question {item.id}</Text>
                <Text>{item.questionText}</Text>
                <Text
                  style={
                    questions[questions.indexOf(item)].Tanswer == 1
                      ? {color: 'green'}
                      : {}
                  }>
                  {item.answers[0]}
                </Text>
                <Text
                  style={
                    questions[questions.indexOf(item)].Tanswer == 2
                      ? {color: 'green'}
                      : {}
                  }>
                  {item.answers[1]}
                </Text>
                <Text
                  style={
                    questions[questions.indexOf(item)].Tanswer == 3
                      ? {color: 'green'}
                      : {}
                  }>
                  {item.answers[2]}
                </Text>
                <Text
                  style={
                    questions[questions.indexOf(item)].Tanswer == 4
                      ? {color: 'green'}
                      : {}
                  }>
                  {item.answers[3]}
                </Text>
                <Button
                  title="remove"
                  onPress={() => {
                    removeQuestionHandler(item.id);
                  }}
                />
              </View>
            )}
          />
        </View>
        {questions.length > 1 ? (
          <View>
            <Text />
            <Button
              title="remove all"
              onPress={() => {
                removeAllQuestionsHandler();
              }}
            />
          </View>
        ) : null}
        {questions.length > 0 ? (
          <View>
            <Text />
            <Button
              title="submit exam"
              onPress={() => {
                if (classesFor.length > 0) {
                  if (subject) {
                    if (title && description && date && endDate) {
                      submitExam();
                    } else {
                      Alert.alert('Exam submission', 'Enter exam details !');
                    }
                  } else {
                    Alert.alert('Exam submission', 'Enter exam subject !');
                  }
                } else {
                  Alert.alert('Exam submission', 'Enter exam class !');
                }
              }}
            />
          </View>
        ) : null}
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('OnlineExams');
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  classes: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 50,
    paddingTop: 10,
    paddingBottom: 10,
    alignItems: 'center',
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  question: {
    margin: 5,
    padding: 10,
    borderColor: 'lightblue',
    borderWidth: 3,
    borderRadius: 30,
    flexDirection: 'column',
  },
  text: {},
  input: {
    borderColor: 'lightblue',
    borderWidth: 1,
    height: 80,
    width: '100%',
    textAlignVertical: 'top',
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
  },
  input2: {
    borderColor: 'lightblue',
    borderWidth: 1,
    height: 50,
    width: '100%',
    marginTop: 10,
    marginBottom: 15,
    padding: 5,
  },
});
