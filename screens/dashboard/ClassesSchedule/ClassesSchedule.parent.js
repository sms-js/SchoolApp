import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, StyleSheet} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassesSchedule} from '../api/fetchClassesSchedule';
import {fetchStudentClass} from '../api/fetchStudentInfo';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function ClassSchedule(props) {
  const {user} = useAuth();
  const [children, setChildren] = useState([]);
  const [classe, setClasse] = useState([]);
  const [schedule, setSchedule] = useState([{}]);
  const showChildClassSchedule = async (studentId) => {
    const res = await fetchStudentClass(studentId);
    setClasse(res);
    const res2 = await fetchClassesSchedule(classe[0]['studentClass']);
    if (res2) {
      setSchedule(res2);
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
      ch.push({label: names[i] + "'s class", value: ids[i]});
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
          Class Schedule
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 10}}>
        <Dropdown
          label="Children classes schedules"
          data={children}
          onChangeText={(value) => {
            if (value == 0) {
            } else {
              showChildClassSchedule(value);
            }
          }}
        />
        <View style={styles.topView}>
          <View style={{flex: 1}}>
            <Text style={styles.text2}>Day</Text>
          </View>
          <View style={{flex: 3}}>
            <Text style={styles.text2}>Schedule</Text>
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1, fontSize: 20}}>Sunday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 0) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1, fontSize: 20}}>Monday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 1) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1, fontSize: 20}}>Tuesday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 2) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1.5, fontSize: 20}}>Wednesday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 3) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1, fontSize: 20}}>Thursday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 4) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1, fontSize: 20}}>Friday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 5) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
        <View style={styles.dayView}>
          <Text style={{flex: 1, fontSize: 20}}>Saturday </Text>
          <View style={{flex: 3}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              data={schedule.map((obj) => {
                if (obj.dayOfWeek == 6) {
                  return obj;
                } else {
                  return {};
                }
              })}
              horizontal={true}
              renderItem={({item}) => {
                if (item.dayOfWeek) {
                  return (
                    <View style={styles.listItem}>
                      <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                        <Text>{item.startTime}</Text>
                        <Text> - </Text>
                        <Text>{item.endTime}</Text>
                      </View>
                      <Text style={{alignSelf: 'center', margin: 5}}>
                        {item.subjectTitle}
                      </Text>
                    </View>
                  );
                } else {
                  return null;
                }
              }}
            />
          </View>
        </View>
        <View style={styles.separator} />
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  text2: {fontSize: 25, alignSelf: 'center'},
  separator: {
    marginBottom: 10,
    borderColor: 'lightblue',
    borderWidth: 2,
  },
  topView: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dayView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  listItem: {
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 20,
    margin: 10,
    padding: 10,
  },
});
