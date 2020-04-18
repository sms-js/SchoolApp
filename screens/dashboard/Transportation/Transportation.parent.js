import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, StyleSheet} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchTransportations,
  fetchTransportation,
  fetchUserTransportation,
} from '../api/fetchTransportations';
import {Dropdown} from 'react-native-material-dropdown';
import {useAuth} from '../../../context/Authentication';

export default function Transportation(props) {
  const [transportations, setTransportations] = useState([{}]);
  const {user} = useAuth();

  String.prototype.extract = function (prefix, suffix) {
    let s = this;
    var i = s.indexOf(prefix);
    if (i >= 0) {
      s = s.substring(i + prefix.length);
    } else {
      return '';
    }
    if (suffix) {
      i = s.indexOf(suffix);
      if (i >= 0) {
        s = s.substring(0, i);
      } else {
        return '';
      }
    }
    return s;
  };

  let s = user['parentOf'];
  let ids = [];
  let names = [];
  s = s.extract('[', ']');
  let a = '';
  let b = '';
  let c = '';
  let d = '';
  while (s != '') {
    a = s.extract('{', '}');
    s = s.substring(1);
    b = a.extract('"student":', ',');
    names.push(b.extract('"', '"'));
    s = s.substring('"student":'.length + b.length + 1);
    c = a.substring('"student":'.length + b.length + 1);
    d = c.extract('', ',');
    s = s.substring(d.length + 1);
    d = c.substring(d.length + 1 + '"id":'.length);
    ids.push(parseInt(d));
    s = s.substring('"id":'.length + d.length + 2);
  }
  let ch = [{label: 'All transportations', value: -1}];
  for (let i = 0; i < ids.length; i++) {
    ch.push({label: names[i] + "'s transportation", value: ids[i]});
  }
  const fetchMyTransportation = (id) => {
    if (id == -1) {
      fetchTransportations()
        .then(async (res) => {
          setTransportations(res);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      fetchTransportation(id)
        .then(async (res) => {
          setTransportations(res);
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
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
          Transportations
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10}}>
        <Dropdown
          label="Transportation"
          data={ch}
          onChangeText={(value) => {
            if (value == -1) {
              fetchMyTransportation(value);
            } else {
              fetchUserTransportation(value)
                .then(async (res) => {
                  fetchMyTransportation(res);
                })
                .catch((error) => {
                  throw error;
                });
            }
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
