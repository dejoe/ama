import React from 'react';
import { Text, View, Button } from 'react-native';

class TourDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Tour Details',
      };
      render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This where we will have all the Tour Details!</Text>
          </View>
        );
      }
  }

  export default TourDetailScreen