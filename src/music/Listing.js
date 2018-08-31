import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';

import Listitem from './Listitem';
import Separator from './Separator';

export default ({ items, onEndReached }) => (
  <FlatList
    data={items}
    renderItem={({ item }) => <Listitem item={item} />}
    keyExtractor={item => item.id}
    ItemSeparatorComponent={() => <Separator />}
    onEndReached={onEndReached}
    ListEmptyComponent={() => <Text>No songs.</Text>}
  />
);
