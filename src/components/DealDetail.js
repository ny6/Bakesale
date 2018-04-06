import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Animated, Dimensions, Image, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { priceDisplay } from '../utils';
import ajax from '../ajax';

const styles = StyleSheet.create({
  deal: {
    // marginHorizontal: 12,
    // marginTop: 24,
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  detail: {
    // borderColor: '#bbb',
    // borderWidth: 1,
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
    fontWeight: 'bold',
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
    imageIndex: 0,
  }

  async componentDidMount() {
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({ deal: fullDeal }); // eslint-disable-line
  }

  imageXPos = new Animated.Value(0);

  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      this.imageXPos.setValue(gs.dx);
    },
    onPanResponderRelease: (evt, gs) => {
      const { width } = Dimensions.get('window');
      if (Math.abs(gs.dx) > width * 0.4) {
        const direction = Math.sign(gs.dx); // -1 for left, 1 for right
        Animated.timing(this.imageXPos, {
          toValue: direction * width,
          duration: 250,
        }).start();
      }
    },
  });

  render() {
    const { deal } = this.state;
    return (
      <View style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}>Back</Text>
        </TouchableOpacity>
        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{ uri: deal.media[this.state.imageIndex] }}
          style={[styles.image, { left: this.imageXPos }]}
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
  onBack: PropTypes.func.isRequired,
};

export default DealDetail;
