import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  TouchableOpacity,
  FlatList,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Header, Left, Icon} from 'native-base';
import {fetchBooks, searchBooks} from './api/fetchBooks';
import {Dropdown} from 'react-native-material-dropdown';

export default function Library(props) {
  const [books, setBooks] = useState([{}]);
  const [searchedBook, setSearchedBook] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const searchedBookHandler = (value) => {
    setSearchedBook(value);
  };
  const searchCriteriaHandler = (criteria) => {
    setSearchCriteria(criteria);
  };
  const filterCriteriaHandler = (criteria) => {
    setFilterCriteria(criteria);
  };
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
          Library
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />

        <TextInput
          style={styles.searchInput}
          placeholder="Search for"
          onChangeText={searchedBookHandler}
        />
        <View style={styles.drop}>
          <Dropdown
            label="Search by"
            data={[
              {label: 'Book Title', value: 1},
              {label: 'Author Name', value: 2},
            ]}
            onChangeText={(value) => {
              searchCriteriaHandler(value);
            }}
          />
        </View>
        <Text />
        <TouchableOpacity
          style={styles.searchOpacity}
          onPress={() => {
            //searchBooks('searchbytitle', 'Book 1');
            alert('sb: ' + searchedBook + '\nsc: ' + searchCriteria);
          }}>
          <Text style={{marginTop: 10, alignSelf: 'center'}}>Search</Text>
        </TouchableOpacity>
        <View style={styles.filterView}>
          <Text style={{width: '30%', fontSize: 17.5, paddingTop: 17.5}}>
            Show
          </Text>
          <View style={{width: '70%'}}>
            <Dropdown
              label="Books by"
              data={[
                {label: 'All Books', value: 1},
                {label: 'Traditional Books', value: 2},
                {label: 'Electronic Books', value: 3},
              ]}
              onChangeText={(value) => {
                filterCriteriaHandler(value);
              }}
            />
          </View>
        </View>
        <Text />

        <FlatList data={books} renderItem={({item}) => {}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  filterView: {alignItems: 'center', flexDirection: 'row'},
  searchInput: {
    padding: 5,
    borderColor: 'lightblue',
    borderWidth: 1,
  },
  drop: {flex: 1, justifyContent: 'center', height: 70},
  searchOpacity: {
    height: 40,
    width: '80%',
    backgroundColor: 'lightblue',
    alignSelf: 'center',
    borderRadius: 30,
    marginBottom: 5,
  },
});
