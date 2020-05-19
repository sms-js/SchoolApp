import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  Picker,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import DatePicker from 'react-native-datepicker';
import {editOnlineExam} from '../api/fetchOnlineExams';

export default function ControlOnlineExams(props) {
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
  //const [test, setTest] = useState('2');

  const removeClassHandler = (id) => {
    setClassesFor((prevClasses) => {
      return prevClasses.filter((classe) => classe.value != id);
    });
    setSubjects((prevSubjects) => {
      return prevSubjects.filter((subject) => subject.classe != id);
    });
  };

  const removeAllClassesHandler = () => {
    setClassesFor((prevClasses) => {
      return prevClasses.filter((classe) => classe.value === 0);
    });
    setSubjects((prevSubjects) => {
      return prevSubjects.filter((subject) => subject.classe === 0);
    });
  };

  const addClassHandler = (id, value) => {
    setClassesFor((prevClasses) => {
      return [...prevClasses, {value: id, label: value}];
    });
  };

  const removeQuestionHandler = (index) => {
    setQuestions((prevQuestions) => {
      return prevQuestions.filter(
        (question) => prevQuestions.indexOf(question) != index,
      );
    });
  };

  const removeAllQuestionsHandler = () => {
    setQuestions((prevQuestions) => {
      return prevQuestions.filter(
        (question) => prevQuestions.indexOf(question) === prevQuestions.length,
      );
    });
  };

  /*const TanswerHandler = async (index, Tanswer) => {
    questions[index]['Tanswer'] = Tanswer;
  };*/

  const addQuestionHandler = (
    //id,
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
        ,
        /*{
          id: id,
          questionText: questionText,
          answers: [
             {answer1: answer1},
            {answer2: answer2},
            {answer3: answer3},
            {answer4: answer4},
            answer1,
            answer2,
            answer3,
            answer4,
          ],
          Tanswer: Tanswer,
        }*/ {
          questionText: questionText,
          answer1: answer1,
          answer2: answer2,
          answer3: answer3,
          answer4: answer4,
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
        exam = exam + '"ans1' + '":"' + questions[i]['answer1'] + '",';
        exam = exam + '"ans2' + '":"' + questions[i]['answer2'] + '",';
        exam = exam + '"ans3' + '":"' + questions[i]['answer3'] + '",';
        exam = exam + '"ans4' + '":"' + questions[i]['answer4'] + '",';
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
        classe = classe + '"' + classesFor[i]['value'] + '"]';
      } else {
        classe = classe + '"' + classesFor[i]['value'] + '",';
      }
    }
    /*console.log(props.navigation.state.params.exam.id);
    console.log(title);
    console.log(description);
    console.log(classe);
    console.log(user['id']);
    console.log(subject);
    console.log(date);
    console.log(endDate);
    console.log(exam);*/
    try {
      const res = await editOnlineExam(
        props.navigation.state.params.exam.id,
        title,
        description,
        classe,
        user['id'],
        subject,
        date,
        endDate,
        exam,
      );
      if (res == 'Record(s) updated successfully') {
        Alert.alert('Exam update', 'Exam updated successfully !', [
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
      if (
        props.navigation.state.params.exam.examClass[i] ==
        props.navigation.state.params.classes[i].value
      ) {
        classesFor.push(props.navigation.state.params.classes[i]);
        getMyClassSubjects(props.navigation.state.params.classes[i].value);
      }
    }
    /*clsss.unshift({
      label: 'All classes',
      value: 0,
    });*/
    setClasses(clsss);
    setDate(props.navigation.state.params.exam.examDate);
    setEndDate(props.navigation.state.params.exam.ExamEndDate);
    setTitle(props.navigation.state.params.exam.examTitle);
    setDescription(props.navigation.state.params.exam.examDescription);
    setQuestions(props.navigation.state.params.exam.examQuestion);
    setSubject(props.navigation.state.params.exam.subjectId);
    /*setQuestionTxt(
      props.navigation.state.params.exam.examQuestion[0].questionText,
    );*/
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
              props.navigation.openDrawer();
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
          Edit Online Exam
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Dropdown
          label="Add classes"
          data={classes}
          onChangeText={(value) => {
            /*if (value == 0) {
              let clsss = [];
              for (let i = 1; i < classes.length; i++) {
                clsss.push({
                  id: classes[i]['value'],
                  className: classes[i]['label'],
                });
              }
              setClassesFor(clsss);

              for (let i = 1; i < classes.length; i++) {
                getMyClassSubjects(classes[i].value);
              }
            } else {*/
            if (classesFor.length > 0) {
              let b = 0;
              for (let i = 0; i < classesFor.length; i++) {
                if (classesFor[i]['id'] == value) {
                  b = 1;
                }
              }
              if (b == 0) {
                //for (let i = 1; i < classes.length; i++) {
                for (let i = 0; i < classes.length; i++) {
                  if (classes[i]['value'] == value) {
                    addClassHandler(value, classes[i]['label']);
                    getMyClassSubjects(value);
                  }
                }
              } else {
                Alert.alert('Exam classes', 'Class added already !');
              }
            } else {
              //for (let i = 1; i < classes.length; i++) {
              for (let i = 0; i < classes.length; i++) {
                if (classes[i]['value'] == value) {
                  addClassHandler(value, classes[i]['label']);
                  getMyClassSubjects(value);
                }
              }
            }

            // }
          }}
        />
        <Dropdown
          label="Exam subject"
          value={props.navigation.state.params.exam.subjectId}
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
                <Text style={{width: '80%'}}>{item.label}</Text>
                <Button
                  title="remove"
                  onPress={() => {
                    removeClassHandler(item.value);
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
          value={title}
          style={styles.input2}
          onChangeText={(value) => {
            setTitle(value);
          }}
        />
        <TextInput
          value={description}
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
          minDate={1 + '/' + 1 + '/' + new Date().getFullYear()}
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
          minDate={1 + '/' + 1 + '/' + new Date().getFullYear()}
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
            initial={-1}
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
                            //questions.length + 1,
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
        <FlatList
          data={questions}
          renderItem={({item}) => (
            <View style={styles.question}>
              <Text>Question : </Text>
              <TextInput
                style={styles.input}
                defaultValue={item.questionText}
                onChangeText={(value) => {
                  item.questionText = value;
                }}
              />
              <Text>Answer 1 : </Text>
              <TextInput
                style={styles.input}
                defaultValue={item.answer1}
                onChangeText={(value) => {
                  item.answer1 = value;
                }}
              />
              <Text>Answer 2 : </Text>
              <TextInput
                style={styles.input}
                defaultValue={item.answer2}
                onChangeText={(value) => {
                  item.answer2 = value;
                }}
              />
              <Text>Answer 3 : </Text>
              <TextInput
                style={styles.input}
                defaultValue={item.answer3}
                onChangeText={(value) => {
                  item.answer3 = value;
                }}
              />
              <Text>Answer 4 : </Text>
              <TextInput
                style={styles.input}
                defaultValue={item.answer4}
                onChangeText={(value) => {
                  item.answer4 = value;
                }}
              />
              <Text>Correct answer : </Text>
              <Text>Answer{item.Tanswer}</Text>
              <RadioForm
                radio_props={[
                  {label: 'Answer1', value: 1},
                  {label: 'Answer2', value: 2},
                  {label: 'Answer3', value: 3},
                  {label: 'Answer4', value: 4},
                ]}
                onPress={(value) => {
                  item.Tanswer = value;
                }}
                initial={item.Tanswer}
              />
              <Text />
              <Button
                title="remove question"
                onPress={() => {
                  removeQuestionHandler(questions.indexOf(item));
                }}
              />
            </View>
          )}
        />
        {questions.length > 1 ? (
          <Button
            title="remove all"
            onPress={() => {
              removeAllQuestionsHandler();
            }}
          />
        ) : null}
        <Text />
        <Button
          title="update exam"
          onPress={() => {
            //submitExam();
            /*console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.ExamEndDate);
            console.log(endDate);
            console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.examDate);
            console.log(date);
            console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.examTitle);
            console.log(title);
            console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.examDescription);
            console.log(description);
            console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.subjectId);
            console.log(subject);
            console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.examClass);
            console.log(classesFor.map((obj) => obj.value));
            console.log('////////////////////////');
            console.log(props.navigation.state.params.exam.examQuestion);
            console.log(questions);*/
            let b = 1;
            for (
              let i = 0;
              i < props.navigation.state.params.exam.examQuestion.length;
              i++
            ) {
              if (
                classesFor[i]['value'] !=
                props.navigation.state.params.exam.examQuestion[i]
              ) {
                b = 0;
              }
            }
            if (
              props.navigation.state.params.exam.ExamEndDate === endDate &&
              props.navigation.state.params.exam.subjectId === subject &&
              // props.navigation.state.params.exam.examClass === classe &&
              b == 0 &&
              props.navigation.state.params.exam.examDate === date &&
              props.navigation.state.params.exam.examDescription ===
                description &&
              props.navigation.state.params.exam.examTitle === title &&
              props.navigation.state.params.exam.examQuestion === questions
            ) {
              Alert.alert('Exam update', 'No changes applied !');
            } else {
              submitExam();
            }
          }}
        />
        <Text />
        <Button
          title="qs"
          onPress={() => {
            console.log(questions);
          }}
        />
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
/*
 <Picker
                  selectedValue={item.Tanswer}
                  onValueChange={(itemValue) => {
                    item.Tanswer = itemValue;
                  }}>
                  <Picker.Item label="Answer 1" value="1" />
                  <Picker.Item label="Answer 2" value="2" />
                  <Picker.Item label="Answer 3" value="3" />
                  <Picker.Item label="Answer 4" value="4" />
                </Picker>
*/
