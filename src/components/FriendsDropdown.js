import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, ListView } from 'react-native';

import SingleFriend from './SingleFriend';

class FriendsDropdown extends Component {
  componentWillMount() {
    this.createDataSource(this.props.allFriends);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.allFriends);
  }

  createDataSource(friends) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.dataSource = ds.cloneWithRows(friends);
  }

  renderRow(friend) {
    return <SingleFriend friend={friend} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 65,
    textAlign: 'left',
    height: 200,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});

const mapStateToProps = ({ friends }) => ({ allFriends: friends.allFriends });

FriendsDropdown.propTypes = {
  allFriends: PropTypes.arrayOf(PropTypes.object),
};

export default connect(mapStateToProps)(FriendsDropdown);
