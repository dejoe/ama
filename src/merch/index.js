import React from 'react';
import { Text, View, Image, FlatList, Button,ActivityIndicator } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Utils from '../utils.js';
import Config from '../config.js';

/* Algorithm:
1) Fetch from an URL using await or async. 
2) Create a state on the component. 
3) During the component creation fetch the content and set on state. 
4) Create a new method for fetch (Can be a stub that could be integrated)
5) Map the data source to the view of the component
*/

class MerchScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {isLoading: true}
  }

  static navigationOptions = {
    title: 'Merch',
  };
  
  componentDidMount () {
    this._getMerchFromApi().then((items) => {
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
      <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            // <Card title={item.title} 
            //       image={{ uri: Config.URLSuffix + Utils.getImageSrc(item.field_photo) }}>
            //   <Text>{item.caption_title}</Text>
            // </Card>
              <View>
                <Image
                  style={{width: 340, height: 100}} 
                  resizeMode = 'center'
                  source={{ uri: item.productimageurl }} 
                />
                <Text>{item.productname}</Text>
                <Button
  title="View Details"
/>
              </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
  
  //TODO: Move URL Path to config.js
  async _getMerchFromApi()  {
    try {
      let response = await fetch(
        'https://api.myjson.com/bins/e4dss'
      );
      let responseJson = await response.json();
      return responseJson;
    } catch (error) {
      console.error(error);
    }
  }  
}

const MerchStack = createStackNavigator({
  Merch: MerchScreen
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

export default MerchStack;