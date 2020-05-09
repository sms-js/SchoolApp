import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, StyleSheet} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchExams} from '../api/fetchExams';

export default function Exams(props) {
  const [exams, setExams] = useState([{}]);
  const getExams = async () => {
    const res = await fetchExams();
    setExams(res);
  };
  React.useEffect(() => {
    getExams();
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
          Exams
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20, marginBottom: 60}}>
        <Text />

        <FlatList
          data={exams}
          renderItem={({item}) => (
            <View style={styles.view}>
              <Text style={styles.boldtitle}>{item.examTitle}</Text>
              <Text style={styles.title}>Description : </Text>
              <Text>{item.examDescription}</Text>
              <Text />
              <Text style={styles.title}>Date :</Text>
              <Text>{item.examDate}</Text>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  view: {
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 30,
    padding: 20,
    marginBottom: 15,
    marginTop: 20,
  },
  text: {
    marginBottom: 10,
  },
  title: {fontSize: 20, marginBottom: 5},
  boldtitle: {alignSelf: 'center', fontSize: 25, marginBottom: 5},
});
