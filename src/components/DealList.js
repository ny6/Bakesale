import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#eee',
    flex: 1,
    width: '100%',
  },
});

const DealList = ({ deals }) => (
  <View style={styles.list}>
    <FlatList
      data={deals}
      renderItem={({ item }) => <Text>{item.title}</Text>}
    />
  </View>
);

DealList.propTypes = {
  deals: PropTypes.array.isRequired,
};

export default DealList;
