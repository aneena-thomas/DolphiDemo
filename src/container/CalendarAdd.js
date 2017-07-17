import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Alert,
  AsyncStorage,
  Linking,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNCalendarEvents from 'react-native-calendar-events';
import {stylePhone,styleTab} from './styles';
import imageURL from '../../constants/images';
import CustomNavigationBar from '../../components/navigationBar';
import appointmentDetailsFetch from '../../data/actions/appointmentDetailsAction';
import Loader from '../../components/loader';
import Map from '../../components/map';
import moment from 'moment';
import cancelAppointment from '../../data/actions/cancelAppointmentAction';

function moveStateToProps(state) {
  return{
    appointmentDetails : state.appointmentDetails,
    currentPosition : state.nearByProviders.currentPosition,
    cancelAppointmentFetching : state.cancelAppointment.fetching
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    appointmentDetailsFetch,
    cancelAppointment
  },dispatch)
}

const tab = Dimensions.get('window').width > 600;
const styles = tab ? styleTab : stylePhone;

class AppointmentDetails extends Component {

  static navigationOptions = {
    header : null,
    gesturesEnabled:false
  };

  constructor(props){
    super(props);
    this.state={
      showAddToCalendar : false
    }
  }

  componentDidMount(){
    let appointmentID = this.props.navigation.state.params.appointmentID;

    let objToSend={
      "platform" : Platform.OS,
    }
    let showAddToCalendar=true;
    AsyncStorage.getItem('apptAddedToCalendar').then(list =>{
      if(list){
        let apptList = JSON.parse(list);
        apptList.forEach(item=>{
          if(item === appointmentID){
            showAddToCalendar=false;
          }
        })
      }
      this.setState({
        showAddToCalendar
      })
    })
    // AsyncStorage.removeItem('appointments_added_to_calendar');
    this.props.appointmentDetailsFetch(appointmentID,objToSend)
  }

  getDirections = () => {
    let URL = `http://maps.apple.com/maps?daddr=${this.props.appointmentDetails.appointment_details.gps_location[1]},${this.props.appointmentDetails.appointment_details.gps_location[0]}`;
    Linking.openURL(URL).catch(err => console.error('An error occurred', err));
  }

  calendarErrorAlert = ()=>{
    Alert.alert('Calendar','Please provide permission to access calendar',
      [
        { text : 'OK' }
      ]
    )
  }

  addToCalendarClicked = ()=>{
    Alert.alert('Calendar','Do you want to add this to your calendar?',
      [
        { text : 'Cancel' },
  			{ text : 'OK', onPress : () => this.addToCalendarCheck()}
      ],
      { cancelable: false }
    )
  }

  addToCalendar =()=>{
    const apptDetail = this.props.appointmentDetails.appointment_details;
    RNCalendarEvents.saveEvent(apptDetail.appointment_reason, {
      location: apptDetail.provider_address,
      notes: `${apptDetail.appointment_reason} appointment with ${apptDetail.provider_first_name} ${apptDetail.provider_last_name}`,
      startDate: moment(apptDetail.time_slot).format('YYYY-MM-DDTHH:mm:ss.sssZ'),
      endDate: moment(apptDetail.time_slot).add(apptDetail.appointment_duration || 30,'minutes').format('YYYY-MM-DDTHH:mm:ss.sssZ')
    })
    .then(id => {
      let apptList=[];
      AsyncStorage.getItem('apptAddedToCalendar').then(list=>{
        if(list){
          apptList=JSON.parse(list);
        }
        apptList.push({apptID : apptDetail._id, calendarID : id});
        AsyncStorage.setItem('apptAddedToCalendar',JSON.stringify(apptList));
      })
      this.setState({
        showAddToCalendar : false
      })
      Alert.alert('Calendar','Successfully added to calendar',
        [
          { text : 'OK' }
        ]
      )
    })
    .catch((error) => {
      Alert.alert('Calendar Error','Error while saving to calendar',
        [
          { text : 'OK' }
        ]
      )
    });
  }

  addToCalendarCheck = ()=>{
    //Checks for authorization
    RNCalendarEvents.authorizationStatus()
    .then(status => {
      if(status === 'authorized'){
        this.addToCalendar();
      }else{
        //If unauthorized asks for authorization
        RNCalendarEvents.authorizeEventStore()
        .then(status => {
          if(status === 'authorized'){
            this.addToCalendar()
          }else{
            this.calendarErrorAlert();
          }
        })
        .catch((error) => {
          this.calendarErrorAlert();
        });
      }
    })
    .catch(error => {
      this.calendarErrorAlert();
    });
  }

  cancelAppointmentClicked = ()=>{
    this.props.cancelAppointment(this.props.appointmentDetails.appointment_details._id,false,0,{},this.props.navigation.navigate);
  }

  callClicked = () =>{
    let URL=`tel:${this.props.appointmentDetails.appointment_details.phone_number}`
    let timeOutVar = setTimeout(()=> {Alert.alert('Call',`Are you sure you want to call ${this.props.appointmentDetails.appointment_details.provider_first_name} ${this.props.appointmentDetails.appointment_details.provider_last_name}?`,
        [
          { text : 'Cancel' , onPress : () => clearTimeout(timeOutVar) },
          { text : 'Call' , onPress : () => {
            Linking.openURL(URL).catch(err => console.error('An error occurred', err));
            clearTimeout(timeOutVar);
            }
          }
        ],
        { cancelable: false }
        )
    },500);
  }

  renderDirectionSupportButton(){
    return(
      <View>
        <TouchableHighlight underlayColor='transparent' style={styles.buttonContainer} onPress={this.getDirections}>
          <View style={styles.rows}>
            <Icon name="map" size={20} color="#65b4ce" style={styles.midButtonLeftIcon}/>
            <Text style={styles.midButtonText}>Directions</Text>
            <Icon name="chevron-right" size={14} color='#383838' style={styles.rightIcon}/>
          </View>
        </TouchableHighlight>
        <TouchableHighlight underlayColor='transparent' style={[styles.buttonContainer,{marginBottom : 50}]} onPress={()=>{this.props.navigation.navigate('Support')}}>
          <View style={styles.rows}>
            <Icon name="question-circle" size={20} color="#65b4ce" style={styles.midButtonLeftIcon}/>
              <View style={{flex : 1}}>
                <Text style={styles.midButtonText}>Need Help?</Text>
                <Text style={styles.supportText}>24x7 support for any issues.</Text>
              </View>
            <Icon name="chevron-right" size={14} color='#383838' style={styles.rightIcon}/>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  renderMap(appointment_details){
    if(!appointment_details.gps_location){
      return false
    }
    return(
      <View style={styles.mapContainer}>
          <Map
            CurrentPosition={this.props.currentPosition}
            MarkerData={appointment_details.gps_location}
            InfoWindowTitle={`${appointment_details.first_name} ${appointment_details.last_name}`}
            InfoWindowDetails={`${appointment_details.address}, ${appointment_details.city}, ${appointment_details.state}`}
          />
      </View>
    )
  }

  renderNavBar(){
    if(this.props.appointmentDetails.appointment_details.appointment_status !== 'C' && !this.props.navigation.state.params.apptHistory && this.state.showAddToCalendar  && (!this.props.appointmentDetails.fetching && !this.props.appointmentDetails.fail)){
      return(
        <CustomNavigationBar
         Key="appointmentDetails"
         Title = "Appointment Details"
         LeftIcon = "ios-arrow-back"
         RightIcon = "md-calendar"
         LeftIconClicked = {() => {
           this.props.navigation.state.params.apptHistory ?
           this.props.navigation.navigate('AppointmentHistory')
           :
           this.props.navigation.navigate('MyAppointments')
         }}
         RightIconClicked = {this.addToCalendarClicked}
       />
      )
    }
    return(
        <CustomNavigationBar
           Key="appointmentDetails"
           Title = "Appointment Details"
           LeftIcon = "ios-arrow-back"
           LeftIconClicked = {() => {
             this.props.navigation.state.params.apptHistory ?
             this.props.navigation.navigate('AppointmentHistory')
             :
             this.props.navigation.navigate('MyAppointments')
           }}
        />
    )
  }

  renderBotButton = () =>{
  if(this.props.navigation.state.params.apptHistory || this.props.appointmentDetails.appointment_details.appointment_status === 'C'){
    return false
  }

  if(this.props.navigation.state.params.showMap){
    return(
      <TouchableHighlight underlayColor='#ea7870' style={styles.botbutton} onPress={this.cancelAppointmentClicked}>
        <View style={styles.cancelAppointmentButton}>
          <Text style={styles.botFullButtonText}>Cancel Appointment</Text>
        </View>
      </TouchableHighlight>
    )
  }

  return(
    <View style={styles.botbutton}>
     <View style={styles.bottomButtonRow}>
       <View style={styles.botButtonLeftContainer}>
         <Text style={styles.botButtonLeftContainerText}>Accidentally created this appointment.{tab ? ' ':'\n'}Need to cancel it?</Text>
       </View>
       <TouchableHighlight underlayColor='#ea7870' style={{flex:1}} onPress={this.cancelAppointmentClicked}>
       <View style={styles.botButtonRightContainer}  >
         <Text style={styles.botButtonRightContainerText}>Cancel Now</Text>
         <Icon name="chevron-right" size={16} color='white' style={styles.botButtonRightContainerIcon} />
       </View>
     </TouchableHighlight>
     </View>
   </View>
  )
}

  render(){
    if(this.props.appointmentDetails.fetching){
      return (
        <View>
          <Loader Visible={this.props.appointmentDetails.fetching}/>
          {this.renderNavBar()}
        </View>
      )
    }

    if(this.props.appointmentDetails.fail){
      return(
        <View style={styles.container}>
          {this.renderNavBar()}
          <View style={styles.errorContainer}>
            <Text style={{backgroundColor:'transparent'}}>Something went wrong. Try again later </Text>
          </View>
        </View>
      )
    }

    const { appointment_details } = this.props.appointmentDetails;
    const { showMap } = this.props.navigation.state.params || false;

    return(
      <View style={styles.container}>
        {this.renderNavBar()}
        <Loader Visible={this.props.cancelAppointmentFetching}/>
         <ScrollView
           showsVerticalScrollIndicator = {false}
           automaticallyAdjustContentInsets={false}
           style={{flex : 1}}
           >
         <View style={styles.detailContainer}>
           <View style={styles.imageContainer}>
             <Image
             source={ appointment_details.image_url ? {uri : appointment_details.image_url} : imageURL.userProfilePic }
             defaultSource={imageURL.userProfilePic}
             style={styles.thumbnail}
             />
           </View>
           {appointment_details.appointment_status === 'C' && <Text style={styles.cancelledText}>Cancelled</Text>}
           <TouchableHighlight style={styles.phoneButton} onPress={this.callClicked} underlayColor='transparent'>
             <Icon name="phone" color="white" size={tab ? 24 : 18} style={{backgroundColor:'transparent'}}/>
           </TouchableHighlight>
           <View style={styles.contentContainer}>
             <Text style={styles.title}>{appointment_details.provider_first_name} {appointment_details.provider_last_name}</Text>
             <Text style={styles.subTitle}>{appointment_details.provider_specialisation}</Text>
             <Text style={styles.paragraph}>{appointment_details.provider_address}{'\n'}{appointment_details.city}, {appointment_details.state}</Text>
           </View>
         </View>
         <View style={styles.paymentContainer}>
           <View style={styles.rows}>
             <Text style={styles.paymentTitle}>Appointment Details</Text>
             {appointment_details.appointment_type === 'P' ? <Text style={styles.premiumAppt}>Premium</Text>: <Text style={styles.regularAppt}>Regular</Text>}
          </View>
           <View style={styles.separatorLine}/>
           <View style={styles.rows}>
             <Text style={styles.detailsText}>Scheduled For</Text>
             <Text style={styles.appointmentText}>{appointment_details.family_member_name}</Text>
           </View>
           <View style={styles.rows}>
             <Text style={styles.detailsText}>Appointment Type</Text>
             <Text style={styles.appointmentText}>{appointment_details.appointment_reason}</Text>
           </View>
           <View style={styles.rows}>
             <Text style={styles.detailsText}>Booked On</Text>
             <Text style={styles.appointmentText}>{moment(appointment_details.booked_on).format('ddd, MMM DD YYYY')}</Text>
           </View>
           <View style={styles.rows}>
             <Text style={styles.detailsText}>Appointment Day</Text>
             <Text style={styles.appointmentText}>{moment(appointment_details.time_slot).format('ddd, MMM DD YYYY')}</Text>
           </View>
           <View style={styles.rows}>
             <Text style={styles.detailsText}>Appointment Time</Text>
             <Text style={styles.appointmentText}>{moment(appointment_details.time_slot).format('hh:mm A')} - {moment(appointment_details.time_slot).add(appointment_details.appointment_duration || 30,'minutes').format('hh:mm A')}</Text>
           </View>
         </View>
         {(appointment_details.get_amount_during_booking || appointment_details.appointment_type === 'P') ? <View style={styles.paymentContainer}>
             <Text style={styles.paymentTitle}>Transaction Details</Text>
           <View style={styles.separatorLine}/>
           <View style={styles.rows}>
             <Text style={styles.transactionText}>Transaction ID</Text>
             <Text style={styles.charges}>10017745874</Text>
           </View>
           <View style={styles.rows}>
             <Text style={styles.transactionText}>Transaction Ref</Text>
             <Text style={styles.charges}>AB/25/2017</Text>
           </View>
           <View style={styles.rows}>
             <Text style={styles.totalText}>Amount</Text>
             <Text style={styles.totalCharge}>${appointment_details.total_amount}</Text>
           </View>
          </View> : <View/>}
         {
           showMap ?
           this.renderMap(appointment_details)
           :
           this.renderDirectionSupportButton()
         }
         </ScrollView>
         {this.renderBotButton()}
      </View>
    )
  }
}

export default connect(moveStateToProps,matchDispatchToProps)(AppointmentDetails);
