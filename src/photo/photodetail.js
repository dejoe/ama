import React from 'react';
import { Text, View, Button } from 'react-native';

class PhotoDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Photo Details',
      };
      render() {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>This where we will have all the photo Details!</Text>
          </View>
        );
      }
  }

  export default PhotoDetailScreen