import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

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

//TODO: Move this into its own js file, and then import this.
class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Photo Details',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>This will contain photo Details!</Text>
      </View>
    );
  }
}

const PhotoStack = createStackNavigator({
  Photo: PhotoScreen,
  Details: DetailsScreen,
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