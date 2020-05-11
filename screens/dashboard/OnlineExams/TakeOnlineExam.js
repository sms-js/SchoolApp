import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {takeOnlineExam} from '../api/fetchOnlineExams';
import {useAuth} from '../../../context/Authentication';

export default function TakeOnlineExam(props) {
  const {user} = useAuth();
  const [answers, setAnswers] = useState(
    props.navigation.state.params.exam.examQuestion.map((obj) => {
      return {
        info: obj,
        question:
          props.navigation.state.params.exam.examQuestion.indexOf(obj) + 1,
        answer: 0,
      };
    }),
  );
  const answerHandler = (info, question, answer) => {
    if (answers.length > 0) {
      let b = 0;
      let n = 0;
      for (let i = 0; i < answers.length; i++) {
        if (answers[i]['question'] == question) {
          b = 1;
          n = i;
        }
      }
      if (b == 1) {
        if (answers[n]['answer'] != answer) {
          answers[n]['answer'] = answer;
        }
      } else {
        answers.push({info: info, question: question, answer: answer});
      }
    } else {
      answers.push({info: info, question: question, answer: answer});
    }
  };

  const submitAnswers = async (
    examId,
    studentId,
    examQuestionsAnswers,
    examGrade,
    examDate,
  ) => {
    try {
      const res = await takeOnlineExam(
        examId,
        studentId,
        examQuestionsAnswers,
        examGrade,
        examDate,
      );
      if (res == 'New record created successfully') {
        Alert.alert('Exam Answers', 'Answers submitted successfully !', [
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
          Take Online Exam
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Text>{props.navigation.state.params.exam.subjectTitle}</Text>
        <Text>{props.navigation.state.params.exam.examTitle}</Text>
        <Text>{props.navigation.state.params.exam.examDescription}</Text>
        <Text>{props.navigation.state.params.exam.examDate}</Text>
        <Text>{props.navigation.state.params.exam.ExamEndDate}</Text>
        <Text />
        <FlatList
          data={props.navigation.state.params.exam.examQuestion}
          renderItem={({item}) => (
            <View style={styles.question}>
              <Text style={{alignSelf: 'center'}}>
                question{' '}
                {props.navigation.state.params.exam.examQuestion.indexOf(item) +
                  1}
              </Text>
              <Text>{item.questionText}</Text>
              <Text />
              <RadioForm
                radio_props={[
                  {label: 'no answer', value: 0},
                  {label: item.answer1, value: 1},
                  {label: item.answer2, value: 2},
                  {label: item.answer3, value: 3},
                  {label: item.answer4, value: 4},
                ]}
                initial={0}
                onPress={(value) => {
                  answerHandler(
                    item,
                    props.navigation.state.params.exam.examQuestion.indexOf(
                      item,
                    ) + 1,
                    value,
                  );
                }}
              />
            </View>
          )}
        />
        <Text />
        <Button
          title="submit"
          onPress={() => {
            Alert.alert('Exam Answers', 'Confirm to submit your answers', [
              {text: 'Cancel', onPress: () => {}, style: 'cancel'},
              {
                text: 'OK',
                onPress: () => {
                  let grade = 0;
                  for (let i = 0; i < answers.length; i++) {
                    if (answers[i]['info']['Tanswer'] == answers[i]['answer']) {
                      grade++;
                    }
                  }
                  let answer = '[';
                  for (let i = 0; i < answers.length; i++) {
                    if (i == answers.length - 1) {
                      answer =
                        answer +
                        '{"title":"' +
                        answers[i]['info']['questionText'] +
                        '","ans1":"' +
                        answers[i]['info']['answer1'] +
                        '","ans2":"' +
                        answers[i]['info']['answer2'] +
                        '","ans3":"' +
                        answers[i]['info']['answer3'] +
                        '","ans4":"' +
                        answers[i]['info']['answer4'] +
                        '","Tans":"' +
                        answers[i]['info']['Tanswer'] +
                        '","answer":"' +
                        answers[i]['answer'] +
                        '"}]';
                    } else {
                      answer =
                        answer +
                        '{"title":"' +
                        answers[i]['info']['questionText'] +
                        '","ans1":"' +
                        answers[i]['info']['answer1'] +
                        '","ans2":"' +
                        answers[i]['info']['answer2'] +
                        '","ans3":"' +
                        answers[i]['info']['answer3'] +
                        '","ans4":"' +
                        answers[i]['info']['answer4'] +
                        '","Tans":"' +
                        answers[i]['info']['Tanswer'] +
                        '","answer":"' +
                        answers[i]['answer'] +
                        '"},';
                    }
                  }
                  submitAnswers(
                    props.navigation.state.params.exam.id,
                    user['id'],
                    answer,
                    grade,
                    props.navigation.state.params.exam.examDate,
                  );
                },
              },
            ]);
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
  question: {
    borderColor: 'lightblue',
    borderWidth: 3,
    borderRadius: 30,
    margin: 5,
    padding: 10,
  },
});
