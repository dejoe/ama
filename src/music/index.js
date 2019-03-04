import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  FlatList
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Utils from '../utils.js';
import Config from '../config.js';
import {List, ListItem} from 'react-native-elements';

class MusicScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true
    };
  }

  static navigationOptions = {
    title: 'Top tracks',
  };

  componentDidMount() {
    this._getAlbumsFromApi().then((items) => {
      console.log(items);
      this.setState({
        isLoading: false,
        dataSource: items,
      }, function () {
      })
    })
  }

  render() {
    const { songs, isFetching } = this.state;
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    //TODO: Create a sub-element with album list 
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5 }}>
        {/* <List containerStyle={{ marginBottom: 20 }}>
          {
            this.state.dataSource.map((l) => (
              <ListItem
                
                avatar={{ uri: Config.URLSuffix + Utils.getImageSrc(l.albumArt) }}
                key={l.nid}
                title={l.title}
              />
            ))
          }
        </List> */}
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
              <View>
                <Image
                  style={{width: 180, height:180}} 
                  resizeMode = 'center'
                  source={{ uri: Config.URLSuffix + Utils.getImageSrc(item.albumArt) }} 
                />
                <Text  numberOfLines={1} style={{width: 150 , alignItems: 'center',textAlign: 'center' }}>{item.title?item.caption_title:'No Caption'}</Text>
                
              </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    )
    // return (
    //   <View style={styles.container}>
    //     {
    //       (isFetching && songs.length === 0)
    //         ? <ActivityIndicator />
    //         : <Listing
    //           items={songs}
    //         />
    //     }
    //   </View>
    // );
  }

  async _getAlbumsFromApi() {
    try {
      let response = await fetch(
        Config.URLSuffix + '/rest/content/albums'
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    margin: 10
  },
});

const MusicStack = createStackNavigator({
  Music: MusicScreen
}, {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  });

export default MusicStack;
