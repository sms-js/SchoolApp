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
import {
  fetchBooks,
  searchBooks,
  typeFilterBooks,
  availabilityFilterBooks,
  traditionalStatusBooks,
  electronicStatusBooks,
  //priceFilterBooks,
} from './api/fetchBooks';
import {Dropdown} from 'react-native-material-dropdown';

export default function Library(props) {
  const [books, setBooks] = useState([{}]);
  const [searchedBook, setSearchedBook] = useState('');
  const [searchCriteria, setSearchCriteria] = useState('');
  const [typeFilter, setTypeFilter] = useState();
  const [availabilityFilter, setAvailabilityFilter] = useState();
  //const [priceFilter, setPriceFilter] = useState('');

  const searchedBookHandler = (value) => {
    setSearchedBook(value);
  };
  const searchCriteriaHandler = (criteria) => {
    setSearchCriteria(criteria);
  };
  const typeFilterHandler = (value) => {
    setTypeFilter(value);
  };
  const availabilityFilterHandler = (value) => {
    setAvailabilityFilter(value);
  };
  /*const priceFilterHandler = (value) => {
    setPriceFilter(value);
  };*/
  const searchBook = (search, criteria) => {
    if (!searchedBook & !searchCriteria) {
      alert('Select Search !');
    } else {
      switch (criteria) {
        case 1:
          searchBooks(searchedBook, 'searchbytitle')
            .then(async (res) => {
              setBooks(res);
            })
            .catch((error) => {
              alert(error);
            });
          break;

        case 2:
          searchBooks(searchedBook, 'searchbyauthor')
            .then(async (res) => {
              setBooks(res);
            })
            .catch((error) => {
              alert(error);
            });
          break;
      }
    }
  };

  const filterBooks = (type, availability) => {
    if (!type & !availability) {
      fetchBooks()
        .then(async (res) => {
          setBooks(res);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      if (type & !availability) {
        switch (type) {
          case 1:
            fetchBooks()
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
            break;

          case 5:
            typeFilterBooks('traditional')
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
            break;

          case 3:
            typeFilterBooks('electronic')
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
            break;
        }
      } else {
        if (!type & availability) {
          switch (availability) {
            case 1:
              fetchBooks()
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
              break;

            case 5:
              availabilityFilterBooks(1)
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
              break;

            case 3:
              availabilityFilterBooks(0)
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
              break;
          }
        } else {
          if ((type == 1) & (availability == 1)) {
            fetchBooks()
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
          } else {
            if ((type == 5) & (availability == 1)) {
              typeFilterBooks('traditional')
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
            } else {
              if ((type == 3) & (availability == 1)) {
                typeFilterBooks('electronic')
                  .then(async (res) => {
                    setBooks(res);
                  })
                  .catch((error) => {
                    alert(error);
                  });
              } else {
                if ((type == 1) & (availability == 5)) {
                  availabilityFilterBooks(1)
                    .then(async (res) => {
                      setBooks(res);
                    })
                    .catch((error) => {
                      alert(error);
                    });
                } else {
                  if ((type == 1) & (availability == 3)) {
                    availabilityFilterBooks(0)
                      .then(async (res) => {
                        setBooks(res);
                      })
                      .catch((error) => {
                        alert(error);
                      });
                  } else {
                    if ((type == 5) & (availability == 5)) {
                      traditionalStatusBooks(1)
                        .then(async (res) => {
                          setBooks(res);
                        })
                        .catch((error) => {
                          alert(error);
                        });
                    } else {
                      if ((type == 5) & (availability == 3)) {
                        traditionalStatusBooks(0)
                          .then(async (res) => {
                            setBooks(res);
                          })
                          .catch((error) => {
                            alert(error);
                          });
                      } else {
                        if ((type == 3) & (availability == 5)) {
                          electronicStatusBooks(1)
                            .then(async (res) => {
                              setBooks(res);
                            })
                            .catch((error) => {
                              alert(error);
                            });
                        } else {
                          if ((type == 3) & (availability == 3)) {
                            electronicStatusBooks(0)
                              .then(async (res) => {
                                setBooks(res);
                              })
                              .catch((error) => {
                                alert(error);
                              });
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
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
      <ScrollView style={{margin: 10, marginBottom: 100}}>
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
            searchBook(searchedBook, searchCriteria);
          }}>
          <Text style={{marginTop: 10, alignSelf: 'center'}}>Search</Text>
        </TouchableOpacity>
        <View style={styles.filterView}>
          <View style={{width: '45%'}}>
            <Dropdown
              label="Books Type"
              data={[
                {label: 'All', value: 1},
                {label: 'Traditional', value: 5},
                {label: 'Electronic', value: 3},
              ]}
              onChangeText={(value) => {
                typeFilterHandler(value);
              }}
            />
          </View>
          <Text style={{width: '10%'}} />
          <View style={{width: '45%'}}>
            <Dropdown
              label="Books Availibility"
              data={[
                {label: 'All', value: 1},
                {label: 'Available', value: 5},
                {label: 'Unavailable', value: 3},
              ]}
              onChangeText={(value) => {
                availabilityFilterHandler(value);
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            filterBooks(typeFilter, availabilityFilter);
          }}>
          <Text
            style={{
              width: '20%',
              fontSize: 17.5,
              paddingTop: 17.5,
              alignSelf: 'center',
            }}>
            Show
          </Text>
        </TouchableOpacity>
        <Text />

        <FlatList
          data={books}
          renderItem={({item}) => {
            switch (item.bookType) {
              case 'traditional':
                if (item.bookState == 1) {
                  return (
                    <View style={styles.bookView}>
                      <Text>{item.bookName}</Text>
                      <Text>{item.bookDescription}</Text>
                      <Text>{item.bookAuthor}</Text>
                      <Text style={styles.available}>Available</Text>
                      <Text>{item.bookPrice}</Text>
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.bookView}>
                      <Text>{item.bookName}</Text>
                      <Text>{item.bookDescription}</Text>
                      <Text>{item.bookAuthor}</Text>
                      <Text style={styles.unavailable}>Unavailable</Text>
                      <Text>{item.bookPrice}</Text>
                    </View>
                  );
                }

              case 'electronic':
                if (item.bookState == 1) {
                  return (
                    <View style={styles.bookView}>
                      <Text>{item.bookName}</Text>
                      <Text>{item.bookDescription}</Text>
                      <Text>{item.bookAuthor}</Text>
                      <Text style={styles.available}>Available</Text>
                      <Text>{item.bookPrice}</Text>
                      <Button title="Download" />
                    </View>
                  );
                } else {
                  return (
                    <View style={styles.bookView}>
                      <Text>{item.bookName}</Text>
                      <Text>{item.bookDescription}</Text>
                      <Text>{item.bookAuthor}</Text>
                      <Text style={styles.unavailable}>Unavailable</Text>
                      <Text>{item.bookPrice}</Text>
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

const styles = StyleSheet.create({
  filterView: {
    alignItems: 'center',
    flexDirection: 'row',
  },
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
  bookView: {
    height: 200,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    borderColor: 'lightblue',
    borderWidth: 1,
    borderRadius: 30,
  },
  available: {color: 'green'},
  unavailable: {color: 'red'},
});
/*
 <TextInput
          style={styles.searchInput}
          placeholder="Maximum Price"
          onChangeText={priceFilterHandler}
        />

*/
/*const filterBooks = (type, availability, price) => {
    if (!type & !availability & !price) {
      fetchBooks()
        .then(async (res) => {
          setBooks(res);
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      if (type & !availability & !price) {
        alert(type);
        switch (type) {
          case 1:
            fetchBooks()
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
            break;

          case 5:
            typeFilterBooks('traditional')
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
            break;

          case 3:
            typeFilterBooks('electronic')
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
            break;
        }
      } else {
        if (!type & availability & !price) {
          alert(availability);
          switch (availability) {
            case 1:
              fetchBooks()
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
              break;

            case 5:
              availabilityFilterBooks(1)
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
              break;

            case 3:
              availabilityFilterBooks(0)
                .then(async (res) => {
                  setBooks(res);
                })
                .catch((error) => {
                  alert(error);
                });
              break;
          }
        } else {
          if (!type & !availability & price) {
            priceFilterBooks(priceFilter)
              .then(async (res) => {
                setBooks(res);
              })
              .catch((error) => {
                alert(error);
              });
          } else {
            if (type & availability & !price) {
              if ((type == 1) & (availability == 1)) {
                fetchBooks()
                  .then(async (res) => {
                    setBooks(res);
                  })
                  .catch((error) => {
                    alert(error);
                  });
              }
            } else {
              if (type & !availability & price) {
              } else {
                if (!type & availability & price) {
                } else {
                }
              }
            }
          }
        }
      }
    }
  };*/
