import React, {useState} from 'react';
import {Text, ScrollView, View, Button} from 'react-native';
import {Header, Left, Right, Icon} from 'native-base';
import {
  fetchAlbums,
  fetchAlbumChildren,
  fetchAlbumItems,
  fetchItems,
} from './api/fetchMedia';

export default function Media(props) {
  const [Media, setMedia] = useState('');

  const getMedia = async () => {
    try {
      const albums = await fetchAlbums();
      const images = await fetchItems();
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    getMedia();
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
          Media
        </Text>
        <Text style={{width: '15%'}} />
      </Header>
      <ScrollView style={{margin: 20}}>
        <Text />
        <View>
          <Text />
          <Button
            title="Show album children"
            onPress={() => {
              fetchAlbumChildren(2);
            }}
          />
          <Text />
          <Button
            title="Show album items"
            onPress={() => {
              fetchAlbumItems(2);
            }}
          />
          <Text />
          <Button
            title="Login Screen"
            onPress={() => {
              props.navigation.navigate('Login');
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}
