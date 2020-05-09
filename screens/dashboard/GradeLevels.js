import React, {useState} from 'react';
import {Text, ScrollView, FlatList, View, StyleSheet} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchGradeLevels} from './api/fetchGradeLevels';

export default function GradeLevels(props) {
  const [gradeLevels, setGradeLevels] = useState();
  const getGradeLevels = async () => {
    const res = await fetchGradeLevels();
    setGradeLevels(res);
  };
  React.useEffect(() => {
    getGradeLevels();
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
          Grade Levels
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />

        <FlatList
          data={gradeLevels}
          renderItem={({item}) => (
            <View style={styles.view}>
              <Text style={styles.boldtitle}>{item.gradeName}</Text>
              <Text style={styles.title}>Description : </Text>
              <Text>{item.gradeDescription}</Text>
              <Text />
              <Text style={styles.title}>Grade point :</Text>
              <Text>{item.gradePoints}</Text>
              <Text />
              <Text style={styles.title}>Age :</Text>
              <Text>
                {item.gradeFrom}-{item.gradeTo} yo
              </Text>
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
