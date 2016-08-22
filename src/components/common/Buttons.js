import React, {
  Component
} from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, ActivityIndicator
} from 'react-native';
import {
  Colors
} from '../../../res/Colors';

// constants
const DEFAULT_FONT_COLOR = Colors.AlternateText;
const DEFAULT_FONT_SIZE = 12;

/**
 * Displays a Button.
 */
export class Button extends Component {

  /**
   * Creates a new Button.
   *
   * @param {string} [props.label] - The label to display on this Button.
   * @param {object} [props.style] - The style to override with.
   * @param {string} [props.color] - The color of the Button (background).
   * @param {string} [props.fontColor] - The color of the Button text .
   * @param {number} [props.size] - The font size of the label.
   * @param {function} [props.onPress] - A callback for the onPress event.
   * @param {boolean} [props.shouldBlur] - If this Button is disabled once
   *  pressed.
   * @param {boolean} [props.isDisabled] - Button will become grayed and
   *  unpressable.
   * @param {string} [props.disabledColor] - The color of this Button when its
   *  disabled.
   * @param {string} [props.disabledFontColor] - The color of this Button's text
   *  when disabled.
   */
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    };
  }

  componentDidMount() {
    // bind methods
    this.reset = this.reset.bind(this);
  }

  /**
   * Allows this Button to be pressed again.
   */
  reset() {
    this.setState({pressed: false});
  }

  render() {
    return (
      <TouchableOpacity
        hitSlop={{top: 20, right: 20, bottom: 20, left: 20}}
        style={[
          styles.container,
          this.props.style,
          this.props.color && {backgroundColor: this.props.color},
          this.props.isDisabled && {
            backgroundColor: this.props.disabledColor || Colors.Disabled
          },
          this.state.pressed && {
            backgroundColor: Colors.Transparent
          },
        ]}
        onPress={() => {

          // prevent press event if shouldBlur or isDisabled
          if (
            !(this.props.shouldBlur && this.state.pressed)
            || !(this.props.isDisabled)
          ) {
            this.props.onPress && this.props.onPress();

            // only setState if this Button shouldBlur
            this.props.shouldBlur && this.setState({pressed: true});
          }
        }}>

        {/* show a spinner if blurred */}
        {this.props.shouldBlur && this.state.pressed ?
          (
            <View style={styles.textContainer}>
              <ActivityIndicator
                size={'small'}
                color={
                  this.props.disabledFontColor
                  || this.props.fontColor
                  || styles.text.color
                }
                animating={true} />
            </View>

          ): (
            <View style={styles.textContainer}>
              {
                // the label
                this.props.label
                && (
                  <Text style={[
                    styles.text,
                    this.props.size && {fontSize: this.props.size},
                    this.props.fontColor && {color: this.props.fontColor},
                    this.props.isDisabled && {
                      color: this.props.disabledFontColor
                        || this.props.fontColor
                        || DEFAULT_FONT_COLOR
                    }
                  ]}>
                    {this.props.label}
                  </Text>
                )
              }
            </View>
          )
        }
      </TouchableOpacity>
    );
  }
}

/**
 * Displays an Arrow Button like ">".
 */
export class ArrowButton extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={[{marginLeft: 5, marginRight: 5}]}
        onPress={() => {
            this.props.onPress && !this.props.hide && !this.props.disabled
            && this.props.onPress();
          }
        }>
        <Text style={[
          styles.arrow,
          this.props.color && {color: this.props.color},
          this.props.hide && {color: Colors.Transparent},
        ]}>
          {">"}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.Transparent,
    borderRadius: 5,
    alignItems: 'center',
    height: 35,
    width: 70
  },

  textContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },

  text: {
    fontSize: DEFAULT_FONT_SIZE,
    color: DEFAULT_FONT_COLOR,
    fontWeight: '500'
  },

  arrow: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.Primary
  }

});