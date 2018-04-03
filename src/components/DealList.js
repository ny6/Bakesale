import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, View } from 'react-native';

import DealItem from './DealItem';

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    // flex: 1,
    width: '100%',
  },
});

const DealList = ({ deals, onItemPress }) => (
  <View style={styles.list}>
    <FlatList
      data={deals}
      renderItem={({ item }) => <DealItem deal={item} onPress={onItemPress} />}
    />
  </View>
);

DealList.propTypes = {
  deals: PropTypes.array.isRequired,
  onItemPress: PropTypes.func.isRequired,
};

export default DealList;
