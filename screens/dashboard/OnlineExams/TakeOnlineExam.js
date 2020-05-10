import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default function TakeOnlineExam(props) {
  const [a, setA] = useState();

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
      <ScrollView style={{margin: 20, marginBottom: 60}}>
        <Text>{props.navigation.state.params.exam.subjectTitle}</Text>
        <Text>{props.navigation.state.params.exam.examTitle}</Text>
        <Text>{props.navigation.state.params.exam.examDescription}</Text>
        <Text>{props.navigation.state.params.exam.examDate}</Text>
        <Text>{props.navigation.state.params.exam.ExamEndDate}</Text>
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
                  {label: item.answer1, value: 1},
                  {label: item.answer2, value: 2},
                  {label: item.answer3, value: 3},
                  {label: item.answer4, value: 4},
                  {label: 'no answer', value: 5},
                ]}
                initial={5}
                onPress={(value) => {
                  setA(value);
                }}
              />
            </View>
          )}
        />
        <Text />
        <Button
          title="show exam"
          onPress={() => {
            alert(a);
            // console.log(props.navigation.state.params.exam);
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
