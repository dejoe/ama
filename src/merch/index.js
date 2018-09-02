import React from 'react';
import { Text, View, Image, FlatList, Button,ActivityIndicator,Linking } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Utils from '../utils.js';
import Config from '../config.js';
import HTML from 'react-native-render-html';

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
  
  componentDidMount() {
    return fetch(
      'https://staging.weate.ch.stage18.535e.blackmesh.com/mobility/merch/'
    )
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson.channel.item,
          },
          function() {}
        );
      })
      .catch(error => {
        console.error(error);
      });
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
              <View style={{alignItems: 'center' }}>
                <Text style={{marginBottom:20,marginTop:20,fontWeight:'600' }}>{item.title}</Text> 
            
               <Image
                  style={{width: 345, height: 300,marginBottom:20 }}
                  resizeMode = 'center'
                  source={{ uri: Utils.getImageSrcFromStr(item.description) }}
                />
                <Button style={{ width: 200, alignItems: 'center',marginTop:10 }}
                  title="Buy Now"
                  dark
                  onPress={() => Linking.openURL(Utils.getAnchorFromStr(item.description))}
                />
              </View>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
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