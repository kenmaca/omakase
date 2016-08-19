import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import {
  Colors
} from '../../res/Constants';

/**
 * Handles logging in and redirection to an appropriate View
 * either on app launch or after a login/registration was processed.
 */
export default class Loader extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          Hello, Omakase
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: Colors.Primary
  },

  text: {
    textAlign: 'right',
    fontSize: 89,
    color: Colors.AlternateText
  }
});
