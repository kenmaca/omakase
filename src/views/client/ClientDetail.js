import React, {
  Component
} from 'react';
import {
  StyleSheet, View, Text, TouchableOpacity, Alert, Image
} from 'react-native';
import {
  Colors, Sizes, Styles, Strings
} from '../../../res/Constants';
import Database, {
  Firebase
} from '../../utils/Firebase';
import {
  Actions
} from 'react-native-router-flux';
import {
  expandOnParty
} from '../../components/planner/BookingCard';
import DateFormat from 'dateformat';

// components
import LinearGradient from 'react-native-linear-gradient';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import GroupAvatar from '../../components/profile/GroupAvatar';
import InformationField from '../../components/common/InformationField';
import PlaceInfoField from '../../components/common/PlaceInfoField';
import InputField from '../../components/common/InputField';
import InputSectionHeader from '../../components/common/InputSectionHeader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CircleCheck from '../../components/common/CircleCheck';
import Button from '../../components/common/Button';
import BookingItinerary from '../../components/planner/BookingItinerary';
import BookingSummary from '../../components/planner/BookingSummary';
import BookingPlaces from '../../components/planner/BookingPlaces';
import TabButton from '../../components/common/TabButton';
import Excitement from '../../components/common/Excitement';
import CloseFullscreenButton from '../../components/common/CloseFullscreenButton';

// Status mapping
// 0 - Submitted
// 1 - Planned
// 2 - Matched
// 3 - Pending

export default class ClientDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 0,
      booking: {},
      photo: null,
      random: Math.random(),
      budget: 0,
      status: 0,
    };

    this.ref = Database.ref(
      `bookings/${this.props.bookingId}`
    );
  }

  componentDidMount() {
    this.listener = this.ref.on('value', data => {
      if (data.exists()) {
        let booking = data.val();
        let [party, budget] = expandOnParty(booking);

        let status = 0;
        if (booking.itinerary && booking.itinerary.length > 0) {
          status = 1;
        } else if (booking.planner) {
          status = 2;
        } else if (booking.interested && booking.interested.length > 0){
          status = 3;
        }

        // obtain photo
        if (booking.city.placeId){
          fetch(Strings.googlePlaceURL + 'details/json?placeid='
            + booking.city.placeId + '&key='
            + Strings.googleApiKey)
          .then(response => response.json())
          .then(json => {
            let photo = json.result.photos[
              Math.floor(
                this.state.random
                * json.result.photos.length
              )
            ].photo_reference;
            this.setState({
              photo: photo
            });
          });
        }

        if (booking.address.placeId){
          fetch(Strings.googlePlaceURL + 'details/json?placeid='
            + booking.address.placeId + '&key='
            + Strings.googleApiKey)
          .then(response => response.json())
          .then(json => {
            console.log("addressdetail,", json.result.geometry.location)
            this.setState({
              addressLocation: json.result.geometry.location
            })
          });
        }

        this.setState({
          booking: booking,
          party: party,
          budget: budget,
          size: party.length,
          status: status
        });
        console.log("booking, ", booking)
      }
    });
  }

  componentWillUnmount() {
    this.ref.off('value', this.listener);
  }

  notAllowed() {
    Alert.alert(
      'Not confirmed',
      'This feature is locked until the sponsor confirms you '
      + 'to attend this adventure. Please wait until that happens '
      + 'before making any plans.',
      [
        {
          text: 'OK'
        }
      ]
    );
  }

  render() {
    let a = (
      this.state.booking
      && this.state.booking.languages
      || []
    );

    return (
      <View style={styles.container}>
        <ParallaxScrollView
          parallaxHeaderHeight={Sizes.height * 0.4}
          fadeOutForeground={false}
          contentBackgroundColor={Colors.Background}
          renderBackground={() => (
            this.state.photo ?
            <Image
              source={{uri: (
                  Strings.googlePlaceURL
                  + 'photo?maxwidth=800&photoreference='
                  + this.state.photo
                  + '&key='
                  + Strings.googleApiKey
                )}
              }
              style={styles.cover} />
            : <View/>
          )}
          renderForeground={() => (
            <LinearGradient
              colors={[
                Colors.Transparent,
                Colors.Transparent,
                Colors.NearBlack,
              ]}
              style={styles.headerContainer}>
              <View style={styles.header}>
                <View style={styles.headerText}>
                  <View style={styles.locationContainer}>
                    <Button
                      style={styles.location}
                      color={Colors.Primary}
                      fontColor={Colors.Text}
                      size={Sizes.SmallText}
                      icon="place"
                      label={
                        this.state.booking
                        && this.state.booking.city
                        && this.state.booking.city.name
                      } />
                  </View>
                  <Text style={[
                    Styles.Header,
                    styles.title
                  ]}>
                    {DateFormat(
                      this.state.booking
                      && this.state.booking.requestedTime
                      && new Date(this.state.booking.requestedTime)
                      || new Date(),
                      'dddd, mmmm dS'
                    )}
                  </Text>
                </View>
                {this.state.booking.planner ?
                <Avatar
                  style={styles.group}
                  uids={this.state.booking.planner} />
                : <View/>
                }
              </View>
            </LinearGradient>
          )}>
          <View>

            {this.state.status == 0 ?
            <View style={[
              styles.status, styles.active
            ]}>
              <Text style={styles.statusText}>
                {"We are looking for Frrands to plan your adventure in "
                + (this.state.booking
                && this.state.booking.city
                && this.state.booking.city.name)
                + " !!"}
              </Text>
            </View>
            : this.state.status == 1 ?
            <View style={[
              styles.status, styles.active
            ]}>
              <Text style={styles.statusText}>
                {this.state.booking
                && this.state.booking.planner + " have made plans for your in "
                + (this.state.booking
                && this.state.booking.city
                && this.state.booking.city.name) + ". Enjoy your adventure!!"}
              </Text>
              <CircleCheck
                color={Colors.Green}
                checkColor={Colors.Text}
                size={30} />
            </View>
            : this.state.status == 2 ?
            <View style={[
              styles.status, styles.active
            ]}>
              <Text style={styles.statusText}>
                {this.state.booking
                && this.state.booking.planner + " will be your planner for "
                + "your adventure in "
                + (this.state.booking
                && this.state.booking.city
                && this.state.booking.city.name), " sit back and we will "
                + "let you know when you are all set !!"}
              </Text>
              <CircleCheck
                color={Colors.Green}
                checkColor={Colors.Text}
                size={30} />
            </View>
            :
            <View style={[
              styles.status, styles.active
            ]}>
              <Text style={styles.statusText}>
                {"Kenneth is interested in becoming your planner, "
                + "let us know if you would like to proceed"}
              </Text>
              <CircleCheck
                color={Colors.Green}
                checkColor={Colors.Text}
                size={30} />
            </View>
            }

            <InputSectionHeader
              label="Adventure Criteria" />
            <PlaceInfoField
              isTop
              label="Pick up"
              maxLength={30}
              name={this.state.booking.address
                && this.state.booking.address.name
                ? this.state.booking.address.name
                : this.state.booking.address}
              location={this.state.addressLocation} />
            <InputField
              label="Excitement Level"
              field={
                <Excitement
                  style={styles.excitement}
                  level={this.state.booking.excitement || 0} />
              } />
            <InformationField
              isBottom
              label="# guides required"
              info={this.state.booking.space && this.state.booking.space == 1 ?
                this.state.booking.space + " Frrand"
                : this.state.booking.space + " Frrands"} />

            <InputSectionHeader label="Party Details" />
            <InformationField
              isTop
              label="Total Budget"
              info={`$${(
                this.state.budget
              ).toFixed(0)}` + " USD"} />
            <InformationField
              label="Party Size"
              info={this.state.size} />
            <InformationField
              isBottom
              label="Languages Spoken"
              info={
                a.join(', ').replace(/,([^,]+)$/,`${a[2] ? ',': ''} and$1`)

                // default english
                || 'English'
              } />
          </View>
        </ParallaxScrollView>
        <CloseFullscreenButton />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.NearBlack
  },

  cover: {
    height: Sizes.height * 0.4
  },

  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingBottom: Sizes.InnerFrame,
    paddingRight: Sizes.OuterFrame
  },

  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },

  group: {
    flex: 1
  },

  top: {
    marginTop: Sizes.InnerFrame
  },

  title: {
    color: Colors.Text
  },

  location: {
    paddingTop: 5,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 10
  },

  locationContainer: {
    marginLeft: Sizes.InnerFrame,
    marginBottom: 3,
    alignItems: 'flex-start'
  },

  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.InnerFrame,
    padding: Sizes.InnerFrame
  },

  statusText: {
    color: Colors.Text,
    flex: 1
  },

  pending: {
    backgroundColor: Colors.Foreground
  },

  active: {
    backgroundColor: Colors.Foreground
  },

  excitement: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingRight: Sizes.OuterFrame
  }
});
