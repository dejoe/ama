import React from 'react';
import { Text, View, Button } from 'react-native';
import { createStackNavigator } from 'react-navigation';

class SocialScreen extends React.Component {
  static navigationOptions = {
    title: 'Social',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Social!</Text>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

//TODO: Move this into its own js file, and then import this.
class DetailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Details',
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

const SocialStack = createStackNavigator({
  Social: SocialScreen,
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

export default SocialStack;
