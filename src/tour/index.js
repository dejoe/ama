import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  Button,
  Linking,
} from 'react-native';

import { createStackNavigator } from 'react-navigation';
import TourDetailScreen from './tourdetail';
import Moment from 'moment';

class TourScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  static navigationOptions = {
    title: 'Tour',
  };

  componentDidMount() {
    return fetch(
      'https://api.songkick.com/api/3.0/artists/2083334/calendar/managed_performances.json?apikey=heMLjOnXj1zuWDXP&per_page=all'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.resultsPage.results.performance,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
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
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          //borderRadius: 10,
          backgroundColor: '#6cf5f8',
        }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => (

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                padding: 10,
              }}>
              <View>
                <Text style={{ width: 100, alignItems: 'center' }}>
                  {Moment(item.event.start.date).format('MMM DD')}
                </Text>
              </View>
              <View style={{ width: 130, padding: 5 }}>
                <Text>{item.event.venue.metroArea.displayName}</Text>
                <Text>{item.event.venue.metroArea.country.displayName}</Text>
              </View>
              <View style={{ width: 100 }}>
                <Button
                  title="Ticket"
                  dark
                  onPress={() => Linking.openURL(item.event.uri)}
                />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const TourStack = createStackNavigator(
  {
    Tour: TourScreen,
    Details: TourDetailScreen,
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

export default TourStack;
