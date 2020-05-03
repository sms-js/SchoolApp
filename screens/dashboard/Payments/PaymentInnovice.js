import React, {useState} from 'react';
import {Text, ScrollView, View, Button, TouchableOpacity} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchSchoolInfos} from '../api/fetchSchoolInfos';

export default function PaymentInnovice(props) {
  /*const [school, setSchool] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState('');
  const [color, setColor] = useState('');
  const getSchool = async () => {
    const res = await fetchSchoolInfos();
    setSchool(res);
  };
  React.useEffect(() => {
    getSchool();
    console.log(school);
  }, []);*/
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
            fontSize: 20,
          }}>
          Payment Innovice
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 5, marginBottom: 80}}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{width: '50%'}}>
            {props.navigation.state.params.school[2]['fieldValue']}
          </Text>
          <View style={{width: '10%'}} />
          <Text style={{width: '40%'}}>
            {props.navigation.state.params.payment.paymentDate}
          </Text>
        </View>
        <View style={{borderWidth: 2, marginBottom: 10, marginTop: 10}} />
        <Text>From</Text>
        <Text>{props.navigation.state.params.school[2]['fieldValue']}</Text>
        <Text>
          Phone No : {props.navigation.state.params.school[1]['fieldValue']}
        </Text>
        <Text>
          PayPal email address :{' '}
          {props.navigation.state.params.school[3]['fieldValue']}
        </Text>
        <View style={{borderWidth: 2, marginBottom: 10, marginTop: 10}} />
        <Text>{props.navigation.state.params.payment.fullName}</Text>
        <Text>{props.navigation.state.params.payment.address}</Text>
        <Text>Phone No : {props.navigation.state.params.payment.phoneNo}</Text>
        <Text>
          Email address : {props.navigation.state.params.payment.email}
        </Text>
        <Text
          style={
            props.navigation.state.params.payment.paymentStatus == 'Paid'
              ? {color: 'green'}
              : {color: 'red'}
          }>
          {props.navigation.state.params.payment.paymentStatus}
        </Text>
        {props.navigation.state.params.payment.paymentStatus == 'Unpaid' ? (
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
              alert('Payment Procedure Unavailable !');
            }}>
            <Text>Pay</Text>
          </TouchableOpacity>
        ) : null}
        <View style={{borderWidth: 2, marginBottom: 10, marginTop: 10}} />
        <Text>Product : </Text>
        <Text>{props.navigation.state.params.payment.paymentTitle}</Text>
        <Text>Description : </Text>
        <Text>{props.navigation.state.params.payment.paymentDescription}</Text>
        <Text>Subtotal : </Text>
        <Text>{props.navigation.state.params.payment.paymentAmount} DA</Text>
        <View style={{borderWidth: 2, marginBottom: 10, marginTop: 10}} />
        <Text>
          Amount Due {props.navigation.state.params.payment.paymentDate}
        </Text>
        <Text>
          Subtotal : {props.navigation.state.params.payment.paymentAmount} DA
        </Text>
        <Text>
          Payment Tax ({props.navigation.state.params.school[4]['fieldValue']}%)
          :{' '}
          {(parseFloat(props.navigation.state.params.payment.paymentAmount) *
            parseFloat(props.navigation.state.params.school[4]['fieldValue'])) /
            100}{' '}
          DA
        </Text>
        <Text>
          Total :{' '}
          {parseFloat(props.navigation.state.params.payment.paymentAmount) +
            (parseFloat(props.navigation.state.params.payment.paymentAmount) *
              parseFloat(
                props.navigation.state.params.school[4]['fieldValue'],
              )) /
              100}{' '}
          DA
        </Text>
        <Text />
        <Button
          title="Back"
          onPress={() => {
            props.navigation.navigate('Payments');
          }}
        />
      </ScrollView>
    </View>
  );
}
