import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Linking,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  title: {},
  link:{
    width:100,
    marginTop:50,
  }
});

export default ({
  item: {
    imageUri,
    title,
    link
  }
}) => (
  <View style={styles.container}>
    <Image source={{ uri: imageUri }} style={styles.image}/>
    <Text onPress={() => Linking.openURL(link)} style={styles.title}>{title}</Text>
  </View>
);
