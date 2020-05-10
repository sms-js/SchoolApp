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

export default function OnlineExamMark(props) {
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
          Exam Mark
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <Text>{props.navigation.state.params.exam.subjectTitle}</Text>
        <Text>{props.navigation.state.params.exam.examTitle}</Text>
        <Text>{props.navigation.state.params.exam.examDescription}</Text>
        <Text>{props.navigation.state.params.exam.examDate}</Text>
        <Text>{props.navigation.state.params.exam.ExamEndDate}</Text>
        <Text
          style={
            props.navigation.state.params.mark.grade >=
            props.navigation.state.params.mark.questions.length / 2
              ? styles.goodMark
              : styles.badMark
          }>
          {props.navigation.state.params.mark.grade}/
          {props.navigation.state.params.mark.questions.length}
        </Text>
        <FlatList
          data={props.navigation.state.params.mark.questions}
          renderItem={({item}) => {
            if (item.answer == item.Tanswer) {
              return (
                <View style={styles.question}>
                  <View style={styles.questionNote}>
                    <View style={{flex: 1}}>
                      <Text style={{alignSelf: 'center'}}>
                        Question
                        {props.navigation.state.params.mark.questions.indexOf(
                          item,
                        ) + 1}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{alignSelf: 'center', color: 'green'}}>
                        Correct !
                      </Text>
                    </View>
                  </View>
                  <Text>{item.questionText}</Text>
                  <Text
                    style={
                      item.answer == 1 ? {color: 'green'} : {color: 'black'}
                    }>
                    {item.answers[0]}
                  </Text>
                  <Text
                    style={
                      item.answer == 2 ? {color: 'green'} : {color: 'black'}
                    }>
                    {item.answers[1]}
                  </Text>
                  <Text
                    style={
                      item.answer == 3 ? {color: 'green'} : {color: 'black'}
                    }>
                    {item.answers[2]}
                  </Text>
                  <Text
                    style={
                      item.answer == 4 ? {color: 'green'} : {color: 'black'}
                    }>
                    {item.answers[3]}
                  </Text>
                </View>
              );
            } else {
              return (
                <View style={styles.question}>
                  <View style={styles.questionNote}>
                    <View style={{flex: 1}}>
                      <Text style={{alignSelf: 'center'}}>
                        Question
                        {props.navigation.state.params.mark.questions.indexOf(
                          item,
                        ) + 1}
                      </Text>
                    </View>
                    <View style={{flex: 1}}>
                      <Text style={{alignSelf: 'center', color: 'red'}}>
                        Incorrect !
                      </Text>
                    </View>
                  </View>
                  <Text style={{margin: 5}}>{item.questionText}</Text>
                  <Text
                    style={
                      item.Tanswer == 1
                        ? {color: 'green'}
                        : item.answer == 1
                        ? {color: 'red'}
                        : {color: 'black'}
                    }>
                    {item.answers[0]}
                  </Text>
                  <Text
                    style={
                      item.Tanswer == 2
                        ? {color: 'green'}
                        : item.answer == 2
                        ? {color: 'red'}
                        : {color: 'black'}
                    }>
                    {item.answers[1]}
                  </Text>
                  <Text
                    style={
                      item.Tanswer == 3
                        ? {color: 'green'}
                        : item.answer == 3
                        ? {color: 'red'}
                        : {color: 'black'}
                    }>
                    {item.answers[2]}
                  </Text>
                  <Text
                    style={
                      item.Tanswer == 4
                        ? {color: 'green'}
                        : item.answer == 4
                        ? {color: 'red'}
                        : {color: 'black'}
                    }>
                    {item.answers[3]}
                  </Text>
                </View>
              );
            }
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
  goodMark: {alignSelf: 'center', fontSize: 50, color: 'green'},
  badMark: {fontSize: 50, alignSelf: 'center', color: 'red'},
  question: {
    borderColor: 'lightblue',
    borderWidth: 3,
    borderRadius: 30,
    margin: 5,
    padding: 10,
  },
  questionNote: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
