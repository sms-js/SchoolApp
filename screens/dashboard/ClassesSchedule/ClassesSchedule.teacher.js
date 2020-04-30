import React, {useState} from 'react';
import {Text, ScrollView, View, FlatList, StyleSheet} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchClassesSchedule} from '../api/fetchClassesSchedule';
import {fetchTeacherClasses} from '../api/fetchClasses';
import {useAuth} from '../../../context/Authentication';
import {Dropdown} from 'react-native-material-dropdown';

export default function ClassSchedule(props) {
  const {user} = useAuth();
  const [classes, setClasses] = useState([{}]);
  const [schedule, setSchedule] = useState([{}]);
  const getClasses = async () => {
    const res = await fetchTeacherClasses(user['id']);
    setClasses(res);
  };
  const getClassSchedule = async (classId) => {
    const res = await fetchClassesSchedule(classId);
    if (res) {
      setSchedule(res);
    }
  };
  React.useEffect(() => {
    getClasses();
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
          label="My classes"
          data={classes.map((obj) => {
            return {label: obj.className, value: obj.id};
          })}
          onChangeText={(value) => {
            getClassSchedule(value);
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
