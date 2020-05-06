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
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';

export default function ControlAttendance(props) {
  const [attendance, setAttendance] = useState(
    props.navigation.state.params.attendance,
  );
  React.useEffect(() => {}, []);
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
          Control Attendance
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Text />
        <Text>Control attendance for : </Text>
        <Text>{props.navigation.state.params.classe.label}</Text>
        <Text>{props.navigation.state.params.subject.label}</Text>
        <Text>{props.navigation.state.params.date}</Text>
        <Text />
        {props.navigation.state.params.attendance ? (
          <FlatList
            data={props.navigation.state.params.attendance}
            renderItem={({item}) => (
              <View
                style={{
                  flexDirection: 'row',
                  borderColor: 'lightblue',
                  borderWidth: 1,
                  borderRadius: 25,
                  margin: 5,
                  padding: 10,
                }}>
                <View style={{flex: 1}}>
                  <Image
                    style={styles.profile}
                    source={
                      item.photo == ''
                        ? {
                            uri: defaultUserImageURL,
                          }
                        : {
                            uri: server + 'uploads/profile/' + item.photo,
                          }
                    }
                  />
                  <Text>{item.fullName}</Text>
                </View>
                <View
                  style={{
                    flex: 3,
                  }}>
                  <RadioForm
                    radio_props={[
                      {label: 'Absent', value: 0},
                      {label: 'Present', value: 1},
                      {label: 'Late', value: 2},
                      {label: 'Late with excuse', value: 3},
                      {label: 'Early dismissal', value: 4},
                      {label: 'Unspecified', value: 5},
                    ]}
                    initial={
                      props.navigation.state.params.attendance[
                        props.navigation.state.params.attendance.indexOf(item)
                      ].status
                        ? props.navigation.state.params.attendance[
                            props.navigation.state.params.attendance.indexOf(
                              item,
                            )
                          ].status
                        : 5
                    }
                    onPress={(value) => {
                      //genderHandler(value);
                    }}
                  />
                </View>
              </View>
            )}
          />
        ) : (
          <Text>!!!!!!</Text>
        )}
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('Attendance');
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  profile: {
    width: 50,
    height: 50,
    borderRadius: 100,
    margin: 5,
    marginTop: 20,
    resizeMode: 'center',
  },
});
