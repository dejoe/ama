import React from 'react';
import { SocialIcon, Card} from 'react-native-elements';
import {
  Text,
  View,
  Button,
  FlatList,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import HTML from 'react-native-render-html';

class SocialScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      socialUrl:
        'https://wmg.bootstrap.fyre.co/bs3/v3.1/wmg.fyre.co/365257/ZGVzaWduZXItYXBwLTE1MjM5NjY1OTE5MTQ=/init',
    };
  }

  static navigationOptions = {
    title: 'Social',
  };

  componentDidMount() {
    this.livefyreService().then(items => {
      this.setState(
        {
          isLoading: false,
          social: items.headDocument.content,
        },
        function() {}
      );
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={this.state.social}
          renderItem={({ item }) => (
            <Card>
              <View>
                  <Image
                    style={{ width: 300, height: 250 }}
                    source={{
                      uri: item.content.attachments ? item.content.attachments[0].thumbnail_url:'',
                    }}
                  />
                <View>
                    <HTML html={item.content.bodyHtml} />
                    
                </View>
              </View>
            </Card>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }

  async livefyreService() {
    try {
      let response = await fetch(this.state.socialUrl);
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
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

const SocialStack = createStackNavigator(
  {
    Social: SocialScreen,
    Details: DetailsScreen,
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  }
);

export default SocialStack;