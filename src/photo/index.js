import React from 'react';
import { Text, View, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PhotoDetailScreen from './photodetail';

/* Algorithm:
1) Fetch from an URL using await or async. 
2) Create a state on the component. 
3) During the component creation fetch the content and set. 
4) Create a new method for fetch (Can be a stub that could be integrated)
5) Map the data source to the view of the component
*/

class PhotoScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  static navigationOptions = {
    title: 'Photo',
  };
  
  componentDidMount () {
    this._getPhotosFromApi().then((items) => {
      this.setState({
        isLoading: false,
        dataSource: items,
      }, function(){
      })
    })
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return (  
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text>{item.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
  
  //TODO: Move URL Path to config.js
  async _getPhotosFromApi()  {
    try {
      let response = await fetch(
        'http://ngd8startersite.wmg-gardens.com/rest/content/photo'
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
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