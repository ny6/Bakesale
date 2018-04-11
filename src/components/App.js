import React, { Component } from 'react';
import { Animated, Dimensions, Easing, StyleSheet, Text, View } from 'react-native';

import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
  main: {
    marginTop: 0,
  },
});

class App extends Component {
  state = {
    currentDealId: null,
    deals: [],
    dealsFromSearch: [],
    activeSearchTerm: '',
  }

  async componentDidMount() {
    this.animateTitle();
    const deals = await ajax.fetchInitialDeals();
    this.setState(() => ({ deals })); // eslint-disable-line
  }

  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId,
    });
  }

  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  }

  searchDeals = async (searchTerm) => {
    let dealsFromSearch = [];
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({ dealsFromSearch, activeSearchTerm: searchTerm });
  }

  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 150;
    Animated.timing(this.titleXPos, {
      toValue: direction * (width / 2),
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => {
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  }
  currentDeal = () => this.state.deals.find(deal => deal.key === this.state.currentDealId);
  titleXPos = new Animated.Value(0);

  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail initDealData={this.currentDeal()} onBack={this.unsetCurrentDeal} />
        </View>
      );
    }
    const dealsToDisplay = this.state.dealsFromSearch.length > 0 ?
      this.state.dealsFromSearch :
      this.state.deals;
    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar
            searchDeals={this.searchDeals}
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      );
    }
    return (
      <Animated.View style={[styles.container, { left: this.titleXPos }]}>
        <Text style={styles.header} />
      </Animated.View>
    );
  }
}

export default App;
