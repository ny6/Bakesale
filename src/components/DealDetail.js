import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image, StyleSheet, Text, View } from 'react-native';

import { priceDisplay } from '../utils';
import ajax from './ajax';

const styles = StyleSheet.create({
  deal: {
    marginHorizontal: 12,
    marginTop: 50,
    borderColor: '#bbb',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  detail: {
  },
  title: {
    fontSize: 16,
    padding: 10,
    fontWeight: 'bold',
    backgroundColor: 'rgba(237, 149, 45, 0.4)',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
  },
  info: {
    alignItems: 'center',
  },
  user: {
    alignItems: 'center',
  },
  cause: {
    marginVertical: 10,
  },
  price: {
    fontWeight: 'bold'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  description: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderStyle: 'dotted',
    margin: 10,
    padding: 10,
  },
});

class DealDetail extends Component {
  state = {
    deal: this.props.initDealData,
  }
  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({ deal: fullDeal }); // eslint-disable-line
  }
  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <Image
          source={{ uri: deal.media[0] }}
          style={styles.image}
        />
        <View style={styles.detail}>
          <Text style={styles.title}>{deal.title}</Text>
          <View style={styles.footer}>
            <View style={styles.info}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
          </View>
        </View>
        {deal.user && (
          <View style={styles.user}>
            <Image
              source={{ uri: deal.user.avatar }}
              style={styles.avatar}
            />
            <Text>{deal.user.name}</Text>
          </View>
        )}
        <View style={styles.description}>
          <Text>{deal.description}</Text>
        </View>
      </View>
    );
  }
}

DealDetail.propTypes = {
  initDealData: PropTypes.object.isRequired,
};

export default DealDetail;
