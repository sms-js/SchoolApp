import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, TouchableOpacity} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchAllPayments,
  fetchPaidPayments,
  fetchUnpaidPayments,
} from '../api/fetchPayments';
import {fetchSchoolInfos} from '../api/fetchSchoolInfos';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function Payments(props) {
  const {user} = useAuth();
  const [payments, setPayments] = useState([]);
  const getMyPayments = async (value) => {
    switch (value) {
      case 1:
        const res = await fetchAllPayments(user['id']);
        setPayments(res);
        break;

      case 2:
        const res2 = await fetchUnpaidPayments(user['id']);
        setPayments(res2);
        break;

      case 3:
        const res3 = await fetchPaidPayments(user['id']);
        setPayments(res3);
        break;
    }
  };
  React.useEffect(() => {
    getMyPayments(1);
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
          label="My Payments"
          data={[
            {label: 'All payments', value: 1},
            {label: 'Unpaid payments', value: 2},
            {label: 'Paid payments', value: 3},
          ]}
          onChangeText={(value) => {
            getMyPayments(value);
          }}
        />
        <Text />
        <FlatList
          data={payments.map((obj) => {
            if (obj.paymentStatus == 0) {
              obj.paymentStatus = 'Unpaid';
              return obj;
            } else {
              obj.paymentStatus = 'Paid';
              return obj;
            }
          })}
          renderItem={({item}) => (
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
              <Text
                style={
                  item.paymentStatus == 'Paid'
                    ? {color: 'green'}
                    : {color: 'red'}
                }>
                {item.paymentStatus}
              </Text>
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
                onPress={async () => {
                  const res = await fetchSchoolInfos();
                  props.properties.navigation.navigate('PaymentInnovice', {
                    payment: item,
                    school: res,
                  });
                }}>
                <Text>View Innovice</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </ScrollView>
    </View>
  );
}
