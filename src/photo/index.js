import React from 'react';
import { Text, View, Image, FlatList, ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import PhotoDetailScreen from './photodetail';
import Utils from '../utils.js';
import Config from '../config.js';

/* Algorithm:
1) Fetch from an URL using await or async. 
2) Create a state on the component. 
3) During the component creation fetch the content and set on state. 
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

    //TODO: Instead of card, it would be better to use View and style it ourselves.
    return (  
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding:5 }}>
        <FlatList
        numColumns={2}
          data={this.state.dataSource}
          renderItem={({item}) => (
            // <Card title={item.title} 
            //       image={{ uri: Config.URLSuffix + Utils.getImageSrc(item.field_photo) }}>
            //   <Text>{item.caption_title}</Text>
            // </Card>
              <View>
                <Image
                  style={{width: 180, height:180}} 
                  resizeMode = 'center'
                  source={{ uri: Config.URLSuffix + Utils.getImageSrc(item.field_photo) }} 
                />
                <Text  numberOfLines={1} style={{width: 150 , alignItems: 'center',textAlign: 'center' }}>{item.caption_title?item.caption_title:'No Caption'}</Text>
                
              </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
  
  //TODO: Move URL Path to config.js
  async _getPhotosFromApi()  {
    try {
      let response = await fetch(
        Config.URLSuffix+'/rest/content/photo'
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
  Details: PhotoDetailScreen
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