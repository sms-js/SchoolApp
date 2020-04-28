import React, {useState} from 'react';
import {Text, ScrollView, View, StyleSheet, Image, Button} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {server, defaultUserImageURL} from '../../../utils/config';
export default function TeacherInfo(props) {
  const [profileImage, setProfileImage] = useState('');
  React.useEffect(() => {
    if (props.navigation.state.params.teacher.photo == '') {
      setProfileImage(defaultUserImageURL);
    } else {
      setProfileImage(
        server +
          'uploads/profile/' +
          props.navigation.state.params.teacher.photo,
      );
    }
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
            fontSize: 20,
          }}>
          Teacher Informations
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView>
        <View>
          <Image style={styles.profile} source={{uri: profileImage}} />
          <Text>
            User Name : {props.navigation.state.params.teacher.username}
          </Text>
          <Text>
            Full Name : {props.navigation.state.params.teacher.fullName}
          </Text>
          <Text>Email : {props.navigation.state.params.teacher.email}</Text>
          <Text>
            Phone Number : {props.navigation.state.params.teacher.phoneNo}
          </Text>
          <Text>
            Mobile Number : {props.navigation.state.params.teacher.mobileNo}
          </Text>
        </View>
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate(props.navigation.state.params.backScreen);
          }}
        />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  profile: {
    width: 200,
    height: 200,
    borderRadius: 100,
    margin: 5,
    marginTop: 20,
    resizeMode: 'center',
  },
});
