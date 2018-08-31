import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';


import Listing from './Listing';
import token from './token';
import tracks from './tracks';

const PAGE = 10;

class MusicScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      songs: [],
      isFetching: false,
      isEmpty: false,
      token: null,
      isTokenFetching: false,
    };
  }

 static navigationOptions = {
    title: 'Top tracks',
  };
  async loadTracks() {
    const { songs, token, isFetching, isEmpty } = this.state;

    if (isFetching || isEmpty) {
      return;
    }

    this.setState({ isFetching: true });

    const newSongs = await tracks({

      token,
    });

    if (newSongs.length === 0) {
      console.log('no songs found. there may be an error');
      this.setState({ isEmpty: true });
    }
  
    this.setState({
      isFetching: false,
      songs: [ ...newSongs],
      
    });
  }

  async refreshToken() {
    this.setState({
      isTokenFetching: true,
    });

    const newToken = await token();

    this.setState({
      token: newToken,
      isTokenFetching: false,
    });
  }

  async componentDidMount() {
    await this.refreshToken();
    await this.loadTracks();
  }

  


  render() {
    const { songs, isFetching } = this.state;

    return (
      <View style={styles.container}>
        {
          (isFetching && songs.length === 0)
            ? <ActivityIndicator />
            : <Listing
              items={songs}
            
            />
        }
      </View>
    );
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
},{
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
