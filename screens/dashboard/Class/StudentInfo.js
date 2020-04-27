import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Image,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchStudentParents} from '../api/fetchClasses';
import {server, defaultUserImageURL} from '../../../utils/config';
export default function StudentInfo(props) {
  const [parents, setParents] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const showStudentParents = async (studentId) => {
    const res = await fetchStudentParents(studentId);
    setParents(
      res.map((element) => {
        if (element.parent.photo == '') {
          element.parent.photo = defaultUserImageURL;
          return element;
        } else {
          element.parent.photo =
            server + 'uploads/profile/' + element.parent.photo;
          return element;
        }
      }),
    );
    console.log(parents);
  };
  React.useEffect(() => {
    if (props.navigation.state.params.student.photo == '') {
      setProfileImage(defaultUserImageURL);
    } else {
      setProfileImage(
        server +
          'uploads/profile/' +
          props.navigation.state.params.student.photo,
      );
    }
    showStudentParents(props.navigation.state.params.student.id);
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
          Class
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{marginBottom: 80}}>
        <Text />
        <Text>Student Informations : </Text>
        <Image style={styles.profile} source={{uri: profileImage}} />
        <Text />
        <Text>
          User Name : {props.navigation.state.params.student.username}
        </Text>
        <Text>
          Full Name : {props.navigation.state.params.student.fullName}
        </Text>
        <Text>Email : {props.navigation.state.params.student.email}</Text>
        <Text>Birthday : {props.navigation.state.params.student.birthday}</Text>
        <Text>Address : {props.navigation.state.params.student.address}</Text>

        <FlatList
          data={parents}
          renderItem={({item}) => (
            <View style={styles.view}>
              <Image style={styles.profile} source={{uri: item.parent.photo}} />
              <Text style={{alignSelf: 'center'}}>{item.parent.username}</Text>
              <Text>Full Name : {item.parent.fullName}</Text>
              <Text>Relation : {item[0]}</Text>
              <Text>Email : {item.parent.email}</Text>
              <Text>Phone Number : {item.parent.phoneNo}</Text>
              <Text>Mobile Number : {item.parent.mobileNo}</Text>
            </View>
          )}
        />
        <Text />
        <Button
          title="back"
          onPress={() => {
            props.navigation.navigate('Class');
          }}
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
    margin: 10,
  },
  profile: {
    width: 90,
    height: 90,
    borderRadius: 100,
    margin: 5,
    marginTop: 20,
    resizeMode: 'center',
    alignSelf: 'center',
  },
});
