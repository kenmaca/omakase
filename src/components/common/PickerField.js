import React, {
  Component
} from 'react';
import {
  View, Text, StyleSheet, Modal, TouchableHighlight, Dimensions, Picker
} from 'react-native';
import {
  Sizes, Colors
} from '../../../res/Constants';

// components
import InputField from './InputField';

/** Generic Picker
  * @param {defaultVal} - The default value for the picker.
  * @param {pickerLabel} - The button name for the picker
  */
export default class PickerField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pickerLabel: this.props.pickerLabel || 'Picker',
      defaultVal: this.props.defaultVal,
      showModal: false
    };
  }
  _onValueChange = (key: string, value: string) => {
  const newState = {};
  newState[key] = value;
  this.setState(newState);
  };

  render() {
    return(
      <InputField
        {...this.props}
        field={(
          <View style={styles.wrapper}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showModal}>
              <View style={styles.modalContainer}>
                <View style={styles.buttonContainer}>
                    <TouchableHighlight
                      underlayColor={Colors.Transparent}
                      onPress={() => this.setState({
                        showModal: false
                      })}>
                      <Text style={styles.button}>
                        {this.props.cancelLabel || 'Cancel'}
                      </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                      underlayColor={Colors.Transparent}
                      onPress={() => this.setState({
                        showModal: false
                      })}>
                      <Text style={styles.button}>
                        {this.props.doneLabel || 'Done'}
                      </Text>
                    </TouchableHighlight>
                </View>
                <View style={styles.pickerContainer}>
                  <Picker style={styles.picker}
                    selectedValue={this.state.defaultVal}
                    onValueChange={this._onValueChange.bind(this, 'defaultVal')}>
                    {this.props.children}
                  </Picker>
                </View>
              </View>
            </Modal>
            <View style={styles.contentContainer}>
              <TouchableHighlight
                underlayColor={Colors.Transparent}
                onPress={() => this.setState({
                  showModal: true
                })}>
                <Text
                  style={styles.text}>
                  {this.state.pickerLabel}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        )} />

    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },

  text: {
    textAlign: 'center',
    fontSize: Sizes.text,
    color: Colors.EmphasizedText
  },

  picker: {
    width: Dimensions.get('window').width
  },

  pickerContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.Background,
    justifyContent: 'center',
    alignItems: 'center'
  },

  contentContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: Sizes.InnerFrame
  },

  modalContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
    top: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },

  buttonContainer: {
    width: Dimensions.get('window').width,
    backgroundColor: Colors.Background,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingLeft: Sizes.InnerFrame,
    paddingRight: Sizes.InnerFrame,
    paddingTop: Sizes.InnerFrame,
    borderTopWidth: 1,
    borderColor: Colors.Text

  }
});