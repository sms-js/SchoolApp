import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  FlatList,
  StyleSheet,
  Button,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {
  fetchStudentAssignments,
  fetchStudentSubjectAssignments,
} from '../api/fetchAssignments';
import {fetchClassSubjects} from '../api/fetchSubjects';
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function Assignments(props) {
  const {user} = useAuth();
  const [children, setChildren] = useState([]);
  const [classe, setClasse] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const getMyChildClass = async (studentId) => {
    const studentClass = await fetchStudentClass(studentId);
    setClasse(studentClass[0]['studentClass']);
    getMyChildSubjects(studentClass[0]['studentClass']);
  };
  const getMyChildSubjects = async (classId) => {
    const res = await fetchClassSubjects(classId);
    if (res) {
      let d = res.map((item) => {
        return {label: item.subjectTitle, value: item.id};
      });
      d.unshift({label: 'All subjects', value: 0});
      setSubjects(d);
    }
  };
  const getMyChildAssignments = async (subjectId) => {
    if (subjectId == 0) {
      const res = await fetchStudentAssignments(classe);
      setAssignments(res);
    } else {
      const res = await fetchStudentSubjectAssignments(classe, subjectId);
      setAssignments(res);
    }
    /**/
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
      ch.push({label: names[i] + "'s assignments", value: ids[i]});
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
          Assignments
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10, marginBottom: 80}}>
        <Text />
        <Dropdown
          label="Children classes"
          data={children}
          onChangeText={(value) => {
            setAssignments([]);
            getMyChildClass(value);
          }}
        />
        <Dropdown
          label="Children class subjects"
          data={subjects}
          onChangeText={(value) => {
            getMyChildAssignments(value);
          }}
        />
        <Text />
        <FlatList
          data={assignments}
          renderItem={({item}) => {
            if (assignments) {
              if (item.AssignFile != '') {
                return (
                  <View
                    style={{
                      margin: 5,
                      padding: 10,
                      borderColor: 'lightblue',
                      borderWidth: 1,
                      borderRadius: 15,
                    }}>
                    <Text>Title : {item.AssignTitle}</Text>
                    <Text>Description : </Text>
                    <Text>{item.AssignDescription}</Text>
                    <Text>Subject : {item.subjectTitle}</Text>
                    <Text>Deadline : {item.AssignDeadLine}</Text>
                    <Button title="Download" />
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
                      borderRadius: 15,
                    }}>
                    <Text>Title : {item.AssignTitle}</Text>
                    <Text>Description : </Text>
                    <Text>{item.AssignDescription}</Text>
                    <Text>Subject : {item.subjectTitle}</Text>
                    <Text>Deadline : {item.AssignDeadLine}</Text>
                  </View>
                );
              }
            }
          }}
        />
      </ScrollView>
    </View>
  );
}
