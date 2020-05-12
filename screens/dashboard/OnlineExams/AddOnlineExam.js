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
import {fetchTeacherClasses} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default function AddOnlineExam(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState();
  const [classesFor, setClassesFor] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [questionTxt, setQuestionTxt] = useState('');
  const [questionId, setQuestionId] = useState('');
  const [ans1, setAns1] = useState('');
  const [ans2, setAns2] = useState('');
  const [ans3, setAns3] = useState('');
  const [ans4, setAns4] = useState('');
  const [Tans, setTans] = useState('');

  const removeClassHandler = (id) => {
    setClassesFor((prevClasses) => {
      return prevClasses.filter((classe) => classe.id != id);
    });
  };

  const removeAllClassesHandler = () => {
    setClassesFor((prevClasses) => {
      return prevClasses.filter((classe) => classe.id === 0);
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
            {answer1: answer1},
            {answer2: answer2},
            {answer3: answer3},
            {answer4: answer4},
          ],
          Tanswer: Tanswer,
        },
      ];
    });
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
        <View style={styles.question}>
          <Text>Question : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Question'}
            onChangeText={(value) => {
              setQuestionTxt(value);
            }}
          />
          <Text>Answer 1 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Question'}
            onChangeText={(value) => {
              setAns1(value);
            }}
          />
          <Text>Answer 2 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            onChangeText={(value) => {
              setAns2(value);
            }}
          />
          <Text>Answer 3 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            onChangeText={(value) => {
              setAns3(value);
            }}
          />
          <Text>Answer 4 : </Text>
          <TextInput
            style={styles.input}
            placeholder={'Answer'}
            onChangeText={(value) => {
              setAns4(value);
            }}
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
                            [ans1, ans2, ans3, ans4],
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
                <Text>{item.id}</Text>
                <Text>{item.questionText}</Text>
                <Text>{item.answers[0]['answer1']}</Text>
                <Text>{item.answers[1]['answer2']}</Text>
                <Text>{item.answers[2]['answer3']}</Text>
                <Text>{item.answers[3]['answer4']}</Text>
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
});
