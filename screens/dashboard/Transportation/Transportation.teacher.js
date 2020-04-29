import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchTransportations,
  fetchTransportation,
} from '../api/fetchTransportations';
import {Dropdown} from 'react-native-material-dropdown';
import {useAuth} from '../../../context/Authentication';

export default function Transportation(props) {
  const [transportations, setTransportations] = useState([{}]);
  const {user} = useAuth();

  const fetchMyTransportation = (value) => {
    if (value == 1) {
      fetchTransportations()
        .then(async (res) => {
          setTransportations(res);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      fetchTransportation(user['transport'])
        .then(async (res) => {
          setTransportations(res);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  React.useEffect(() => {
    fetchTransportation(user['transport'])
      .then(async (res) => {
        setTransportations(res);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <View style={{marginBottom: 50}}>
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
          Transportations
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10}}>
        <Dropdown
          label="Transportation"
          data={[
            {label: 'All transportations', value: 1},
            {label: 'My transportation', value: 0},
          ]}
          onChangeText={(value) => {
            fetchMyTransportation(value);
          }}
        />
        <Text />
        <FlatList
          data={transportations}
          renderItem={({item}) => (
            <View style={styles.view}>
              <Text style={styles.boldtitle}>{item.transportTitle}</Text>
              <Text style={styles.title}>Description :</Text>
              <Text style={styles.text}>{item.transportDescription}</Text>
              <Text style={styles.title}>Driver contact informations :</Text>
              <Text style={styles.text}>{item.transportDriverContact}</Text>
              <Text style={styles.title}>Fare :</Text>
              <Text style={styles.text}>{item.transportFare}</Text>
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
  },
  text: {
    marginBottom: 10,
  },
  title: {fontSize: 20, marginBottom: 5},
  boldtitle: {alignSelf: 'center', fontSize: 25, marginBottom: 5},
  dropdown: {marginBottom: 10},
});
