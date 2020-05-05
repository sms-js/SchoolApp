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
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {fetchAttendance, fetchSubjectsAttendance} from '../api/fetchAttendance';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import {server, defaultUserImageURL} from '../../../utils/config';

export default function Attendance(props) {
  const {user} = useAuth();
  const [children, setChildren] = useState();
  const [child, setChild] = useState();
  const [classe, setClasse] = useState();
  const [subjects, setSubjects] = useState();
  const [subject, setSubject] = useState();
  const [date, setDate] = useState();
  const [attendance, setAttendance] = useState();

  const dateHandler = (value) => {
    setDate(value);
  };
  const getMyChildSubjects = async (studentId) => {
    setChild(studentId);
    const res = await fetchStudentClass(studentId);
    setClasse(res[0]['studentClass']);
    const res1 = await fetchClassSubjects(res[0]['studentClass']);
    if (res1) {
      let d = res1.map((item) => {
        return {label: item.subjectTitle, value: item.id};
      });
      d.unshift({label: 'All subjects', value: 0});
      setSubjects(d);
    }
  };
  const getMyChildAttendance = async (classId, subjectId, studentId, date) => {
    var res = [];
    if (subjectId == 0) {
      res = await fetchSubjectsAttendance(classId, studentId, date);
    } else {
      res = await fetchAttendance(classId, subjectId, studentId, date);
    }
    if (res) {
      let a = res.map((obj) => {
        switch (obj.status) {
          case '0':
            obj.status = 'Absent';
            return obj;

          case '1':
            obj.status = 'Present';
            return obj;

          case '2':
            obj.status = 'Late';
            return obj;

          case '3':
            obj.status = 'Late with excuse';
            return obj;

          case '4':
            obj.status = 'Early dismissal';
            return obj;
        }
      });
      setAttendance(a);
    } else {
      setAttendance([]);
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
      ch.push({label: names[i] + "'s attendance", value: ids[i]});
    }
    setChildren(ch);
    let today = new Date();
    let date =
      today.getMonth() + 1 + '/' + today.getDate() + '/' + today.getFullYear();
    setDate(date);
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
          Attendance
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Dropdown
          label="Children attendance"
          data={children}
          onChangeText={(value) => {
            setAttendance([]);
            setSubjects([]);
            setSubject(0);
            getMyChildSubjects(value);
            getMyChildAttendance(classe, 0, value, date);
          }}
        />
        <Dropdown
          label="My child subjects"
          data={subjects}
          onChangeText={(value) => {
            setSubject(value);
            if (child) {
              getMyChildAttendance(classe, value, child, date);
            }
          }}
        />
        <Text />
        <DatePicker
          style={{width: '97%'}}
          date={date}
          mode="date"
          placeholder="select date"
          format="MM/DD/YYYY"
          minDate="01/01/1930"
          maxDate={
            new Date().getMonth() +
            1 +
            '/' +
            new Date().getDate() +
            '/' +
            new Date().getFullYear()
          }
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 8,
            },
            dateInput: {borderColor: 'lightblue', marginLeft: 50},
          }}
          onDateChange={(value) => {
            dateHandler(value);
            if (child) {
              getMyChildAttendance(classe, subject, child, value);
            } else {
              alert('!!!!!!!');
            }
          }}
        />
        <Text />
        <FlatList
          data={attendance}
          renderItem={({item}) =>
            item.status ? (
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
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{item.subjectTitle}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{item.date}</Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text>{item.status}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View />
            )
          }
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
