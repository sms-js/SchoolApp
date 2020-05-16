import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
  Image,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function OnlineExamMarks(props) {
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
          Online Exam Marks
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <FlatList
          data={props.navigation.state.params.marks}
          renderItem={({item}) => (
            <View
              style={{
                borderColor: 'lightblue',
                borderWidth: 3,
                borderRadius: 30,
                padding: 10,
                margin: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <View>
                  <Image
                    style={styles.profile}
                    source={{
                      uri:
                        item.photo == ''
                          ? defaultUserImageURL
                          : server + '/uploads/profile/' + item.photo,
                    }}
                  />
                  <Text>{item.fullName}</Text>
                </View>
                <Text>{item.examGrade}</Text>
              </View>
              <Button
                title="view mark"
                onPress={() => {
                  props.navigation.navigate('OnlineExamMark', {
                    exam: props.navigation.state.params.exam,
                    mark: {
                      grade: item.examGrade,
                      questions: item.examQuestionsAnswers,
                    },
                    backScreen: 'OnlineExamMarks',
                  });
                }}
              />
            </View>
          )}
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
  profile: {
    width: 60,
    height: 60,
    borderRadius: 100,
    margin: 5,
    marginTop: 20,
    resizeMode: 'center',
  },
});
