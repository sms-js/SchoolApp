import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, TouchableOpacity} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchAllPayments,
  fetchPaidPayments,
  fetchUnpaidPayments,
} from '../api/fetchPayments';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function Payments(props) {
  const {user} = useAuth();
  const [children, setChildren] = useState([]);
  const [child, setChild] = useState();
  const [payments, setPayments] = useState([]);
  const [drop, setDrop] = useState([]);

  const getMyChildPayments = async (value) => {
    switch (value) {
      case 1:
        const res = await fetchAllPayments(child);
        setPayments(res);
        break;

      case 2:
        const res2 = await fetchUnpaidPayments(child);
        setPayments(res2);
        break;

      case 3:
        const res3 = await fetchPaidPayments(child);
        setPayments(res3);
        break;
    }
  };

  React.useEffect(() => {
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
    let ch = [];
    for (let i = 0; i < ids.length; i++) {
      ch.push({label: names[i] + "'s payments", value: ids[i]});
    }
    setChildren(ch);
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
          Payments
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5}}>
        <Dropdown
          label="Children"
          data={children}
          onChangeText={(value) => {
            setPayments([]);
            setDrop([
              {label: 'All payments', value: 1},
              {label: 'Unpaid payments', value: 2},
              {label: 'Paid payments', value: 3},
            ]);
            setChild(value);
          }}
        />
        <Dropdown
          label="Children payments"
          data={drop}
          onChangeText={(value) => {
            getMyChildPayments(value);
          }}
        />
        <Text />
        <FlatList
          data={payments}
          renderItem={({item}) => {
            if (item.paymentStatus == 0) {
              return (
                <View
                  style={{
                    margin: 5,
                    padding: 10,
                    borderColor: 'lightblue',
                    borderWidth: 1,
                    borderRadius: 25,
                  }}>
                  <Text>{item.paymentTitle}</Text>
                  <Text>{item.paymentDescription}</Text>
                  <Text>{item.paymentAmount}</Text>
                  <Text>{item.paymentDate}</Text>
                  <Text style={{color: 'red'}}>Unpaid</Text>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'lightblue',
                      height: 35,
                      width: '50%',
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      props.properties.navigation.navigate('PaymentInnovice', {
                        payment: item,
                      });
                    }}>
                    <Text>View Innovice</Text>
                  </TouchableOpacity>
                </View>
              );
            } else {
              return (
                <View
                  style={{
                    margin: 5,
                    padding: 10,
                    borderColor: 'lightblue',
                    borderWidth: 1,
                    borderRadius: 25,
                  }}>
                  <Text>{item.paymentTitle}</Text>
                  <Text>{item.paymentDescription}</Text>
                  <Text>{item.paymentAmount}</Text>
                  <Text>{item.paymentDate}</Text>
                  <Text style={{color: 'green'}}>Unpaid</Text>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                      backgroundColor: 'lightblue',
                      height: 35,
                      width: '50%',
                      borderRadius: 25,
                    }}
                    onPress={() => {
                      props.properties.navigation.navigate('PaymentInnovice', {
                        payment: item,
                      });
                    }}>
                    <Text>View Innovice</Text>
                  </TouchableOpacity>
                </View>
              );
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
