import React, {
  Component
} from 'react';
import {
  View, StyleSheet, Text
} from 'react-native';
import {
  Sizes
} from '../../../res/Sizes';
import {
  Colors
} from '../../../res/Colors';
import {
  Actions
} from 'react-native-router-flux';

// components
import Button from '../../components/common/Button';
import SingleLineInput from '../../components/common/SingleLineInput';

/**
  * The screen of client to enter payment infos:
  * Payment Method(Tab Bar):
  * VISA: Creidt Card Number, Expiry, CVC/CVV codes
  # PAYPAL: Email, pw
  */
export default class ClientPay extends Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Credit Card Number:
          </Text>
          <SingleLineInput
            label="Credit Card Number"
            isTop={true}
            isBottom={true} />
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            Expiry Date:
          </Text>
          <SingleLineInput
            label="Expiry Date"
            isTop={true}
            isBottom={true} />
        </View>
        <View style={styles.childContainer}>
          <Text style={styles.text}>
            CVC/CVV:
          </Text>
          <SingleLineInput
            label="CVC/CVV"
            isTop={true}
            isBottom={true} />
        </View>
        <View style={styles.botContainer}>
          <Button
            label={"Pay"}
            color={Colors.Transparent}
            fontColor={Colors.Primary}
            size={Sizes.H2}
            onPress={Actions.clientMain} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 100
  },

  childContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },

  botContainer:{
    top: 0,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.H2,
    color: Colors.Primary
  }
});
