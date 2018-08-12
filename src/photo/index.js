import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PhotoDetailScreen from './photodetail';

class PhotoScreen extends React.Component {
  static navigationOptions = {
    title: 'Photo',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Photo!</Text>
        <Button
          title="Go to Photo Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const PhotoStack = createStackNavigator({
  Photo: PhotoScreen,
  Details: PhotoDetailScreen,
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

export default PhotoStack;