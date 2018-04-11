import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import { StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12,
  },
});

class SearchBar extends Component {
  state = {
    searchTerm: this.props.initialSearchTerm,
  }

  searchDeals = (searchTerm) => {
    this.props.searchDeals(searchTerm);
    this.inputElement.blur();
  }

  debouncedSearchDeals = debounce(this.searchDeals, 300);

  handleChange = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.debouncedSearchDeals(this.state.searchTerm);
    });
  }

  render() {
    return (
      <TextInput
        ref={(inputElement) => { this.inputElement = inputElement; }}
        value={this.state.searchTerm}
        style={styles.input}
        placeholder="Search All Deals"
        onChangeText={this.handleChange}
      />
    );
  }
}

SearchBar.propTypes = {
  searchDeals: PropTypes.func.isRequired,
  initialSearchTerm: PropTypes.string.isRequired,
};

export default SearchBar;
