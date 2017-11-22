import _ from 'lodash'
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { StyleSheet, Text, View, ScrollView } from 'react-native';

import { fetchDeckList } from '../actions'
import DeckItem from './component_deck_item'

class DeckList extends Component {
    componentDidMount() {
        this.getDeckList()
    }

    getDeckList = () => {
        this.props.fetchDeckList()
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {_.map(this.props.decks, item => <DeckItem key={item.title} item={item} navigation={this.props.navigation} />)}
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps, { fetchDeckList })(DeckList)