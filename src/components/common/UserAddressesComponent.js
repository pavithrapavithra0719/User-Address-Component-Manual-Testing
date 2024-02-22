import React, { Component } from 'react'
import '../../App.css';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { MDBCol, MDBInput, MDBTable } from "mdbreact";
import ls from 'local-storage';
import { endpoints_properties } from '../../properties/EndPointsProperties.js';
import { api_properties } from '../../properties/APIProperties.js';
import {Button, Dropdown, Card, CardBody,CardText ,FormControl,InputGroup, FormGroup, FormLabel, FormRow, FormCheck} from 'react-bootstrap';

var jsonPayLoad=ls.get('jsonPayLoad');
var token=ls.get('token');
var gts_user_id = '';
if(jsonPayLoad!= null){
if (ls.get('gts_user_id')!= jsonPayLoad.user_id){
  gts_user_id = ls.get('gts_user_id');
}else{
  gts_user_id = jsonPayLoad.user_id;
}
}

class UserAddressesComponent extends Component {


  constructor(props) {
    super(props)

    this.state = {
      currentValidated: false,
      permanantValidated: false,
      billingValidated: false,
      successAlert:'',
      failureAlert:'',
      isCurrentAddressExisting:false,
      isPermanentAddressExisting:false,
      isBillingAddressExisting :false,
      disabledCurrentAddr: true,
      disabledPermanentAddr: true,
      disabledBillingAddr: true,
      gts_current_country_name:'',
      gts_current_state_name:'',
      gts_current_city_name:'',
      gts_permanent_country_name:'',
      gts_permanent_state_name:'',
      gts_permanent_city_name:'',
      gts_billing_state_name:'',
      gts_billing_country_name:'',
      gts_permanent_address_line_1:'',
      gts_billing_address_line_1:'',
      gts_billing_city_name:'',
      gts_current_country:'',
      gts_current_state:'',
      gts_current_city:'',
      gts_permanent_country:'',
      gts_permanent_state:'',
      gts_permanent_city:'',
      gts_billing_state:'',
      gts_billing_country:'',
      gts_billing_city:'',
      gts_user_address_line_1:'',
      gts_user_address_line_2:'',
      gts_user_address_line_3:'',
      gts_current_state_id: '',
      gts_current_country_id:'',
      gts_current_city_id:'',
      gts_permanent_state_id: '',
      gts_permanent_country_id: '',
      gts_current_address_line_1:'',
      gts_permanent_city_id:'',
      gts_billing_state_id: '',
      gts_billing_country_id: '',
      gts_billing_city_id:'',
      gts_user_pin_code:'',
      gts_is_permanent_address:'',
      gts_is_current_address:'',
      gts_is_billing_address:'',
      gts_user_id:'',
      gts_user_address_id:'',
      countries : [],
      country: [],
      states:[],
      state: [],
      cities: [],
      city: [],
      errors:[],
      message:[],
      currentAddrUpdated:false,
      permanentAddrUpdated:false,
      hasError: false
    };
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setSuccessAlertFalse= e =>{
    this.setState({ isCurrentAddressExisting:false});
  }

  setSuccessAlertFalse= e =>{
    this.setState({ isPermanentAddressExisting:false});
  }

  setSuccessAlertFalse= e =>{
    this.setState({ isBillingAddressExisting:false});
  }

  validateCurrentAddrLine1 = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if (!this.state.gts_current_address_line_1 || this.state.gts_current_address_line_1==="") {

      errors["gts_current_address_line_1"]="Please enter address line 1";
        this.setState({
          errors: errors,
          currentValidated: false
        });
      ;
    }
    if (this.state.gts_current_address_line_1.length > 100) {

       errors["gts_current_address_line_1"]="Maximum 100 words ";
         this.setState({
          currentValidated: false,
           errors: errors
         });
       ;
     }
    if(e.target.name=="gts_current_address_line_1"){
      errors["gts_current_address_line_1"] = "";
      this.setState({
        currentValidated: true,
        errors: errors
      });
      ;
    }
  }

  validateCurrentPincode = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(!this.state.gts_current_pincode){

      errors["gts_current_pincode"]="Please enter current pincode";
        this.setState({
          currentValidated: false,
          errors: errors
        });

    }

    if(this.state.gts_current_pincode.length > 10){

      errors["gts_current_pincode"]="Maximum 10 digits";
        this.setState({
          currentValidated: false,
          errors: errors
        });

    }

    if(!this.state.gts_current_pincode.match(/^[0-9\b]+$/)){

      errors["gts_current_pincode"]="Only numeric values are allowed";
        this.setState({
          currentValidated: false,
          errors: errors
        });

    }

    if(e.target.name=="gts_current_pincode"){
      errors["gts_current_pincode"] = "";

      this.setState({
        currentValidated: true,
        errors: errors
      });

      ;
    }
  }

  validateCurrentCity = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(this.state.gts_current_city_id == 0) {

      errors["gts_current_city"]="Please select current city";
        this.setState({
          currentValidated: false,
          errors: errors
        });

    }
    else{
      errors["gts_current_city"] = "";
      this.setState({
        currentValidated: true,
        errors: errors
      });
   }
  }

  validateCurrentCountry = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(this.state.gts_current_country_id ==0) {

      errors["gts_current_country"]="Please select current country";
        this.setState({
          currentValidated: false,
          errors: errors
        });

    }
    else{
      errors["gts_current_country"] = "";
      this.setState({
        currentValidated: true,
        errors: errors
      });
    }
  }

  validatePermanentAddrLine1 = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if (!this.state.gts_permanent_address_line_1  || this.state.gts_permanent_address_line_1.trim()==="") {

      errors["gts_permanent_address_line_1"]="Please enter address line 1";
        this.setState({
          permanantValidated: false,
          errors: errors
        });
      ;
    }

    if (this.state.gts_permanent_address_line_1.length > 100) {

       errors["gts_permanent_address_line_1"]="Maximum 100 words";
         this.setState({
          permanantValidated: false,
           errors: errors
         });
       ;
     }

    if(e.target.name=="gts_permanent_address_line_1"){
      errors["gts_permanent_address_line_1"] = "";

      this.setState({
        permanantValidated: true,
        errors: errors
      });

      ;
    }
  }

  validatePermanentPincode = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(!this.state.gts_permanent_pincode){

      errors["gts_permanent_pincode"]="Please enter permanent pincode";
        this.setState({
          permanantValidated: false,
          errors: errors
        });

    }

    if(this.state.gts_permanent_pincode.length > 10){

      errors["gts_permanent_pincode"]="Maximum 10 digits";
        this.setState({
          permanantValidated: false,
          errors: errors
        });

    }

    if(!this.state.gts_permanent_pincode.match(/^[0-9\b]+$/)){

      errors["gts_permanent_pincode"]="Only numeric values are allowed";
        this.setState({
          permanantValidated: false,
          errors: errors
        });

    }

    if(e.target.name=="gts_permanent_pincode"){
      errors["gts_permanent_pincode"] = "";

      this.setState({
        permanantValidated: true,
        errors: errors
      });

      ;
    }
  }

  validatePermanentCountry = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(this.state.gts_permanent_country_id == 0){

      errors["gts_permanent_country"]="Please select permanent country";
        this.setState({
          permanantValidated: false,
          errors: errors
        });

    }
   else{
     errors["gts_permanent_country"] = "";
     this.setState({
      permanantValidated: true,
      errors: errors
     });
   }
  }

  validatePermanentCity = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(this.state.gts_permanent_city_id == 0) {

      errors["gts_permanent_city"]="Please select permanent city";
        this.setState({
          permanantValidated: false,
          errors: errors
        });

    }
    else{
      errors["gts_permanent_city"] = "";
      this.setState({
        permanantValidated: true,
        errors: errors
      });
    }
  }

  validateBillingAddrLine1 = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if (!this.state.gts_billing_address_line_1 || this.state.gts_billing_address_line_1.trim()==="") {

      errors["gts_billing_address_line_1"]="Please enter address line 1";
        this.setState({
          billingValidated:false,
          errors: errors
        });
      ;
    }
    if (this.state.gts_billing_address_line_1.length > 100) {

       errors["gts_billing_address_line_1"]="Maximum 100 words";
         this.setState({
          billingValidated:false,
           errors: errors
         });
       ;
     }
    if(e.target.name=="gts_billing_address_line_1"){
      errors["gts_billing_address_line_1"] = "";

      this.setState({
        billingValidated:true,
        errors: errors
      });

      ;
    }
  }

  validateBillingCountry = e => {
      let fields = this.state.fields;
      let errors = this.state.errors;

    if(this.state.gts_billing_country_id ==0){

      errors["gts_billing_country"]="Please select billing country";
        this.setState({
          billingValidated:false,
          errors: errors
        });

    }

    else{
      errors["gts_billing_country"] = "";

      this.setState({
        billingValidated:true,
        errors: errors
      });

      ;
    }
  }

  validateBillingCity = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(this.state.gts_billing_city_id == 0) {

      errors["gts_billing_city"]="Please select billing city";
        this.setState({
          billingValidated:false,
          errors: errors
        });


    }
    else{
      errors["gts_billing_city"] = "";
      this.setState({
        billingValidated:true,
        errors: errors
      });

      ;
    }
  }

  validateBillingPincode = e => {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if(!this.state.gts_billing_pincode){

      errors["gts_billing_pincode"]="Please enter billing pincode";
        this.setState({
          billingValidated:false,
          errors: errors
        });

    }

    if(this.state.gts_billing_pincode.length > 10){

      errors["gts_billing_pincode"]="maximum 10 digits";
        this.setState({
          billingValidated:true,
          errors: errors
        });

    }

    if(!this.state.gts_billing_pincode.match(/^[0-9\b]+$/)){

      errors["gts_billing_pincode"]="Only numeric values are allowed";
        this.setState({
          errors: errors
        });

    }

    if(e.target.name=="gts_billing_pincode"){
      errors["gts_billing_pincode"] = "";

      this.setState({
        errors: errors
      });

      ;
    }
  }

  validateBeforeCurrentAddressSave = e =>   {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if (!this.state.gts_current_address_line_1 || this.state.gts_current_address_line_1 =='' ){

        errors["gts_current_address_line_1"] = "Please enter address line 1.";
        this.setState({
          currentValidated:false,
          errors: errors
        });

        ;
        }

   else if( !this.state.gts_current_country || this.state.gts_current_country=='' || this.state.gts_current_country_name==''){

      console.log(this.state.gts_current_country)
      errors["gts_current_country"] = "Please select current country.";
      this.setState({
        currentValidated:false,
        errors: errors
      });

      ;
    }

    else if( !this.state.gts_current_pincode ){

      errors["gts_current_pincode"] = "Please enter current pincode.";
      this.setState({
        currentValidated:false,
        errors: errors
      });

      ;
    }
    else if (!this.state.gts_current_city || this.state.gts_current_city_name == '') {

        errors["gts_current_city"] = "Please select current city.";

        this.setState({
          currentValidated:false,
          errors: errors
        });

        ;
    }
    else{
      errors = '';
      this.setState({
        currentValidated:true,
        errors: errors,
        message1:'',
        error1:''
      });
    }
  }

  validateBeforePermanentAddressSave = e =>   {
    let fields = this.state.fields;
    let errors = this.state.errors;


    if (!this.state.gts_permanent_address_line_1 || this.state.gts_permanent_address_line_1=='' ){

      errors["gts_permanent_address_line_1"] = "Please enter address line 1.";
      this.setState({
        permanantValidated:false,
        errors: errors
      });

      ;
    }

    else if(!this.state.gts_permanent_country_name || this.state.gts_permanent_country_name== '' ){

      errors["gts_permanent_country"] = "Please select permanent country.";
      this.setState({
        permanantValidated:false,
        errors: errors
      });

      ;
    }

    else if(!this.state.gts_permanent_pincode || this.state.gts_permanent_pincode==''){

      errors["gts_permanent_pincode"] = "Please enter permanent pincode.";
      this.setState({
        permanantValidated:false,
        errors: errors
      });

      ;
    }

    else if(!this.state.gts_permanent_city_name  || this.state.gts_permanent_city_name == '') {
        errors["gts_permanent_city"] = "Please select permanent city.";

        this.setState({
          permanantValidated:false,
          errors: errors
        });

        ;
    }
    else{
      errors = '';
      this.setState({
        permanantValidated:true,
        errors: errors,
        message1:'',
        error1:''
      });
    }
  }

  validateBeforeBillingAddressSave = e =>   {
    let fields = this.state.fields;
    let errors = this.state.errors;

    if (!this.state.gts_billing_address_line_1 ) {

      errors["gts_billing_address_line_1"] = "Please enter address line 1.";
      this.setState({
        billingValidated: false,
        errors: errors
      });

      ;
    }

    else if(!this.state.gts_billing_country_name || this.state.gts_billing_country_name=='' ){

      errors["gts_billing_country"] = "Please select billing country.";
      this.setState({
        billingValidated: false,
        errors: errors
      });

      ;
    }

    else if(!this.state.gts_billing_pincode ){

      errors["gts_billing_pincode"] = "Please enter billing pincode.";
      this.setState({
        billingValidated: false,
        errors: errors
      });

      ;
    }

    else if(!this.state.gts_billing_city_name || this.state.gts_billing_city_name=='') {
        errors["gts_billing_city"] = "Please select billing city.";

        this.setState({
          billingValidated: false,
          errors: errors
        });

        ;
    }
    else{
      errors = '';
      this.setState({
        billingValidated:true,
        errors: errors,
        message1:'',
        error1:''
      });
    }
  }

  enableCurrentAddr = () => {
    this.setState( {isCurrentAddressExisting: false,disabledCurrentAddr: true} )
  }

  enablePermanentAddr = () => {
    this.setState( {isPermanentAddressExisting: false,disabledPermanentAddr: true} )
  }

  enableBillingAddr = () => {
    this.setState( {isBillingAddressExisting: false,disabledBillingAddr: true} )
  }

  clearCurrentSuccessMessage = () => {
    let message1= this.state.message1;
    message1=" ";
    this.setState({message1 : message1});
  }

  clearPermanentSuccessMessage = () => {
    let message2= this.state.message2;
    message2 =" ";
    this.setState({message2 : message2});
  }

  clearBillingSuccessMessage = () => {
    let message3= this.state.message3;
    message3=" ";
    this.setState({message3 : message3});
  }

 currentAddrToPermanentAddr = (checked)=> {
    this.setState({
      [checked.target.name]: checked.target.checked
    });

    this.setState({disabledPermanentAddr: false})
    this.setState({currentAddrToPermanentAddr : true})
   if(checked.target.checked==true){
     if(this.state.currentAddrUpdated === true){
       this.setState({permanantValidated: false})
       this.setState({permanentAddrUpdated : true})
       this.setState({gts_permanent_address_line_1 : this.state.gts_current_address_line_1});
       this.setState({gts_permanent_address_line_2 : this.state.gts_current_address_line_2});
       this.setState({gts_permanent_address_line_3 : this.state.gts_current_address_line_3});
       this.setState({gts_permanent_country_name : this.state.gts_current_country_name});
       this.setState({gts_permanent_state_name : this.state.gts_current_state_name});
       this.setState({gts_permanent_city_name : this.state.gts_current_city_name});
       this.setState({gts_permanent_pincode : this.state.gts_current_pincode});
     }

    else{
      this.setState({permanantValidated: false})
      this.setState({permanentAddrUpdated : true})
      this.setState({gts_permanent_address_line_1 : this.state.gts_current_address_line_1});
      this.setState({gts_permanent_address_line_2 : this.state.gts_current_address_line_2});
      this.setState({gts_permanent_address_line_3 : this.state.gts_current_address_line_3});
      this.setState({gts_permanent_country_name : this.state.gts_current_country});
      this.setState({gts_permanent_state_name : this.state.gts_current_state});
      this.setState({gts_permanent_city_name : this.state.gts_current_city});
      this.setState({gts_permanent_pincode : this.state.gts_current_pincode});
    }
   }
   else if(checked.target.checked==false){
    this.setState({disabledPermanentAddr: true})
    this.setState({permanantValidated: false})
    this.setState({gts_permanent_address_line_1 : ''});
    this.setState({gts_permanent_address_line_2 : ''});
    this.setState({gts_permanent_address_line_3 : ''});
    this.setState({gts_permanent_country_name : ''});
    this.setState({gts_permanent_state_name : ''});
    this.setState({gts_permanent_city_name : ''});
    this.setState({gts_permanent_pincode : ''});
   }
 }

 permanentAddrToBillingAddr = (checked)=> {
   this.setState({
     [checked.target.name]: checked.target.checked
   });
   this.setState({disabledBillingAddr: false});
   if(checked.target.checked==true){
     if(this.state.permanentAddrUpdated === true){
       this.setState({billingValidated:false})
        this.setState({gts_billing_address_line_1 : this.state.gts_permanent_address_line_1});
        this.setState({gts_billing_address_line_2 : this.state.gts_permanent_address_line_2});
        this.setState({gts_billing_address_line_3 : this.state.gts_permanent_address_line_3});
        this.setState({gts_billing_country_name : this.state.gts_permanent_country_name});
        this.setState({gts_billing_state_name : this.state.gts_permanent_state_name});
        this.setState({gts_billing_city_name : this.state.gts_permanent_city_name});
        this.setState({gts_billing_pincode : this.state.gts_permanent_pincode});
      }
     else{
      this.setState({billingValidated:false})
        this.setState({gts_billing_address_line_1 : this.state.gts_permanent_address_line_1});
        this.setState({gts_billing_address_line_2 : this.state.gts_permanent_address_line_2});
        this.setState({gts_billing_address_line_3 : this.state.gts_permanent_address_line_3});
        this.setState({gts_billing_country_name : this.state.gts_permanent_country});
        this.setState({gts_billing_state_name : this.state.gts_permanent_state});
        this.setState({gts_billing_city_name : this.state.gts_permanent_city});
        this.setState({gts_billing_pincode : this.state.gts_permanent_pincode});
      }
    }
   else if(checked.target.checked==false){
     this.setState({billingValidated:false})
     this.setState({disabledBillingAddr: true});
     this.setState({gts_billing_address_line_1 : ''});
     this.setState({gts_billing_address_line_2 : ''});
     this.setState({gts_billing_address_line_3 : ''});
     this.setState({gts_billing_country_name : ''});
     this.setState({gts_billing_state_name : ''});
     this.setState({gts_billing_city_name : ''});
     this.setState({gts_billing_pincode : ''});
   }
 }

 currentAddrToBillingAddr = (checked)=> {
  this.setState({
    [checked.target.name]: checked.target.checked
  });
  this.setState({disabledBillingAddr: false})
  if(checked.target.checked==true){
    if(this.state.currentAddrUpdated === true){
      this.setState({billingValidated:false})
    this.setState({gts_billing_address_line_1 : this.state.gts_current_address_line_1});
    this.setState({gts_billing_address_line_2 : this.state.gts_current_address_line_2});
    this.setState({gts_billing_address_line_3 : this.state.gts_current_address_line_3});
    this.setState({gts_billing_country_name : this.state.gts_current_country_name});
    this.setState({gts_billing_state_name : this.state.gts_current_state_name});
    this.setState({gts_billing_city_name : this.state.gts_current_city_name});
    this.setState({gts_billing_pincode : this.state.gts_current_pincode});
    }
    else{
      this.setState({billingValidated:false})
    this.setState({gts_billing_address_line_1 : this.state.gts_current_address_line_1});
    this.setState({gts_billing_address_line_2 : this.state.gts_current_address_line_2});
    this.setState({gts_billing_address_line_3 : this.state.gts_current_address_line_3});
    this.setState({gts_billing_country_name : this.state.gts_current_country});
    this.setState({gts_billing_state_name : this.state.gts_current_state});
    this.setState({gts_billing_city_name : this.state.gts_current_city});
    this.setState({gts_billing_pincode : this.state.gts_current_pincode});
    }
  }
   else if(checked.target.checked==false){
    this.setState({billingValidated:false})
     this.setState({disabledBillingAddr: true})
     this.setState({gts_billing_address_line_1 : ''});
     this.setState({gts_billing_address_line_2 : ''});
     this.setState({gts_billing_address_line_3 : ''});
     this.setState({gts_billing_country_name : ''});
     this.setState({gts_billing_state_name : ''});
     this.setState({gts_billing_city_name : ''});
     this.setState({gts_billing_pincode : ''});
   }
 }

 componentDidCatch(errorMsg, errorInfo) {
  let error= this.state.error;
  error="Try after sometime or Please contact the administrator.";
  this.setState({error: error})
 }

 clearMessage = e =>{
  let error= this.state.error;
  error=" ";
  this.setState({error: ''})
  this.setState({error1: ''})
  this.setState({error2: ''})
  this.setState({error3: ''})
  this.setState({message1: ''})
  this.setState({message2: ''})
  this.setState({message3: ''})
 }

 componentDidMount() {

  axios.get(endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_ACTIVE_COUNTRIES,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then((res) =>{
          console.log(res.data)
          this.setState({ countries : res.data});
          this.state.countries.forEach((countries) => {
            this.state.country.push(countries.gts_country_name);
          });
        })

  var url = endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_USER_ADDRESSES+'/'+gts_user_id;

  axios.get(url,{ headers: {"Auth_Token" : `Bearer ${token}`} })
  .then(response => {
    console.log(response.data)
   for(var i=0;i<response.data.length;i++){

     if(response.data[i].gts_address_type === 1) {
       this.setState({gts_current_user_address_id : response.data[i].gts_user_address_id}) ;
       this.setState({isCurrentAddressExisting : true ,disabledCurrentAddr : true})
       this.setState({
         gts_current_address_line_1:response.data[i].gts_user_address_line_1,
         gts_current_address_line_2:response.data[i].gts_user_address_line_2,
         gts_current_address_line_3:response.data[i].gts_user_address_line_3,
         gts_current_state:response.data[i].gts_user_state_name,
         gts_current_country:response.data[i].gts_country_name,
         gts_current_city:response.data[i].gts_city_name,
         gts_current_state_name:response.data[i].gts_user_state_name,
         gts_current_country_name:response.data[i].gts_country_name,
         gts_current_city_name:response.data[i].gts_city_name,
         gts_current_pincode:response.data[i].gts_user_pin_code,
         gts_get_current_state_id:response.data[i].gts_state_id,
         gts_get_current_country_id:response.data[i].gts_country_id,
         gts_get_current_city_id:response.data[i].gts_city_id,
         gts_current_state_id:response.data[i].gts_state_id,
         gts_current_country_id:response.data[i].gts_country_id,
         gts_current_city_id:response.data[i].gts_city_id,
       });
     }
   }

   for(var i=0;i<response.data.length;i++){
     if(response.data[i].gts_address_type === 2 ) {
       this.setState({gts_permanent_user_address_id : response.data[i].gts_user_address_id}) ;
       this.setState({isPermanentAddressExisting : true ,disabledPermanentAddr : true})
       this.setState({
         gts_permanent_address_line_1:response.data[i].gts_user_address_line_1,
         gts_permanent_address_line_2:response.data[i].gts_user_address_line_2,
         gts_permanent_address_line_3:response.data[i].gts_user_address_line_3,
         gts_permanent_state:response.data[i].gts_user_state_name,
         gts_permanent_country:response.data[i].gts_country_name,
         gts_permanent_city:response.data[i].gts_city_name,
         gts_permanent_state_name:response.data[i].gts_user_state_name,
         gts_permanent_country_name:response.data[i].gts_country_name,
         gts_permanent_city_name:response.data[i].gts_city_name,
         gts_permanent_pincode:response.data[i].gts_user_pin_code,
         gts_get_permanent_state_id:response.data[i].gts_state_id,
         gts_get_permanent_country_id:response.data[i].gts_country_id,
         gts_get_permanent_city_id:response.data[i].gts_city_id,
         gts_permanent_state_id:response.data[i].gts_state_id,
         gts_permanent_country_id:response.data[i].gts_country_id,
         gts_permanent_city_id:response.data[i].gts_city_id,
       });
     }
   }

   for(var i=0;i<response.data.length;i++){
     if(response.data[i].gts_address_type === 3 ) {
       this.setState({gts_billing_user_address_id : response.data[i].gts_user_address_id}) ;
       this.setState({isBillingAddressExisting : true ,disabledBillingAddr : true})
       this.setState({
        gts_billing_address_line_1:response.data[i].gts_user_address_line_1,
        gts_billing_address_line_2:response.data[i].gts_user_address_line_2,
        gts_billing_address_line_3:response.data[i].gts_user_address_line_3,
        gts_billing_state:response.data[i].gts_user_state_name,
        gts_billing_country:response.data[i].gts_country_name,
        gts_billing_city:response.data[i].gts_city_name,
        gts_billing_state_name:response.data[i].gts_user_state_name,
        gts_billing_country_name:response.data[i].gts_country_name,
        gts_billing_city_name:response.data[i].gts_city_name,
        gts_billing_pincode:response.data[i].gts_user_pin_code,
        gts_get_billing_state_id:response.data[i].gts_state_id,
        gts_get_billing_country_id:response.data[i].gts_country_id,
        gts_get_billing_city_id:response.data[i].gts_city_id,
        gts_billing_state_id:response.data[i].gts_state_id,
        gts_billing_country_id:response.data[i].gts_country_id,
        gts_billing_city_id:response.data[i].gts_city_id,
       });
     }

    }
  })
 }

//  ----------------------------------------current-----------------------------------------
saveCurrentCountry = (event, value) =>{
	console.log("saveCurrentCountry-1");
    this.state.gts_current_country_name = value
    this.state.gts_current_country = value
    console.log("value: "+value);
    if(value == null || value==''){
        this.setState({state:[]})
        this.setState({city:[]})
        this.state.gts_present_current_country_id = 0
        this.setState({gts_current_country_name:''})
    }
    else if(value !== null){
    this.state.countries.forEach((country) => {
      if (value === country.gts_country_name) {
        this.state.gts_current_country_id = country.gts_country_id;
        this.state.gts_present_current_country_id = country.gts_country_id;
      }
    });
    }
    else{
      let errors= this.state.errors;
        errors["gts_current_country"] = "Please select country"
        this.setState({errors: errors})
    }
}

onSelectCurrentCountryHandler = (e) => {
	console.log("onSelectCurrentCountryHandler-1");
	console.log("state.gts_present_current_country_id: "+this.state.gts_present_current_country_id);
   if(this.state.gts_present_current_country_id==0 || this.state.gts_present_current_country_id== null){
     this.state.state = [];
     this.state.city = [];
   }
    else{
    let message1= this.state.message1;
    let errors= this.state.errors;

    console.log("message1: "+message1);
    console.log("this.state.gts_present_current_country_id: "+this.state.gts_present_current_country_id);
	console.log("errors: "+errors);
	console.log("errors: "+errors);
	console.log("errors: "+errors);

    if(this.state.gts_present_current_country_id!==0 || this.state.gts_present_current_country_id!== null || this.state.gts_present_current_country_id!== undefined){

    var getStates = endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_STATES_BY_COUNTRY+'/'+this.state.gts_present_current_country_id;

    console.log("getStates: "+getStates);

    axios.get(getStates,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then((res) =>{
        this.state.state = [];
        this.setState({states : res.data  });

        console.log("res.data: "+res.data);



        this.state.states.forEach((states) => {
			console.log("states.gts_state_name: "+states.gts_state_name);

          if(states.gts_state_status == true){
          this.state.state.push(states.gts_state_name);
          }
        });
      })

      console.log("States call complete.");


     }
  }
}

saveCurrentState = (event, value) => {
  this.state.gts_current_state_name = value
  this.state.gts_current_state= value
  if(value==='' || value == null){
    this.setState({city:[]})
    this.setState({gts_present_current_state_id:0})
    this.setState({gts_current_state_name:''})
  }
  if(value !== null){
    this.setState({city:[]})
  this.state.states.forEach((states) => {
    if (value === states.gts_state_name) {
      this.state.gts_current_state_id = states.gts_state_id;
      this.state.gts_present_current_state_id = states.gts_state_id;
    }
  });
  }


        var getCities =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_CITIES_BY_STATE+'/'+this.state.gts_current_state_id;

        console.log("getCities: "+getCities);
        console.log("token: "+token);

        axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then((res) =>{
          this.state.city = [];
          this.setState({ cities : res.data});

          console.log("res.data: "+res.data);

            this.state.cities.forEach((cities) => {
				console.log("cities.gts_city_name: "+cities.gts_city_name);

              if(cities.gts_city_status == true){
                this.state.city.push(cities.gts_city_name);
              }
            });
          })


}

SelectCityOnCurrentStateHandler = (e) => {
  if(this.state.gts_current_state_id=='' || this.state.gts_current_state_id== null){
    this.state.city = [];
  }
   else{
   let message1= this.state.message1;
   let errors= this.state.errors;
  }

   if(this.state.gts_present_current_state_id > 0){
    this.state.city = [];
   }

   if(this.state.gts_current_state_id!=='' || this.state.gts_current_state_id!== null  || this.state.gts_current_state_id !== undefined){
    var getCities =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_CITIES_BY_STATE+'/'+this.state.gts_present_current_state_id;
    axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((res) =>{
      console.log(res.data)
      this.state.city = [];
      this.setState({ cities : res.data});
        this.state.cities.forEach((cities) => {
          if(cities.gts_city_status == true){
            this.state.city.push(cities.gts_city_name);
          }
        });
      })
    }
}

saveCurrentCity = (event, value) => {
    this.state.gts_current_city_name = value
    this.state.gts_current_city = value

    if(value== null || value==''){
      this.setState({gts_current_city_name:''})
    }
    if(value !== null){
    this.state.cities.forEach((cities) => {
      if (value === cities.gts_city_name) {
        this.state.gts_current_city_id = cities.gts_city_id;
        this.state.gts_present_current_city_id= cities.gts_city_id;
      }
    });
    }
  }

//  -------------------------------------------------permanent----------------------------------------------

savePermanentCountry = (event, value) =>{
  this.state.gts_permanent_country_name = value
  this.state.gts_permanent_country = value
  if(value == null || value==''){
      this.setState({state:[]})
      this.setState({city:[]})
      this.state.gts_present_permanent_country_id = 0
      this.setState({gts_permanent_country_name: ''})
  }
  else if(value !== null){
  this.state.countries.forEach((country) => {
    if (value === country.gts_country_name) {
      this.state.gts_permanent_country_id = country.gts_country_id;
      this.state.gts_permanent_country_name = value
      this.state.gts_permanent_country = value
      this.state.gts_present_permanent_country_id = country.gts_country_id;
    }
  });
  }
  else{
    let errors= this.state.errors;
      errors["gts_permanent_country"] = "Please select country"
      this.setState({errors: errors})
  }
}

onSelectPermanentCountryHandler = (e) => {
 if(this.state.gts_present_permanent_country_id=='' || this.state.gts_present_permanent_country_id== null){
   this.state.state = [];
   this.state.city = [];
 }
  else{
  let message1= this.state.message1;
  let errors= this.state.errors;
  var getCities =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_CITIES_BY_COUNTRY+'/'+this.state.gts_present_permanent_country_id;
  axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
  .then((res) =>{
    console.log(res.data)
    this.state.city = [];
    this.setState({ cities : res.data});
      this.state.cities.forEach((cities) => {
        if(cities.gts_city_status == true){
          this.state.city.push(cities.gts_city_name);
          }
      });
    })


    var getStates =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_STATES_BY_COUNTRY+'/'+this.state.gts_present_permanent_country_id;
    axios.get(getStates,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((res) =>{
      this.state.state = [];
      this.setState({ states : res.data});
      this.state.states.forEach((states) => {
        if(states.gts_state_status == true){
          this.state.state.push(states.gts_state_name);
          }
      });
    })
  }
}

savePermanentState = (event, value) => {
  this.state.gts_permanent_state_name = value
  this.state.gts_permanent_state = value
  if(value == '' || value == null){
    this.setState({city : []})
    this.setState({gts_present_permanent_state_id: 0})
    this.setState({gts_permanent_state_name:''})
  }
  if(value !== null){
  this.state.states.forEach((states) => {
    if (value === states.gts_state_name) {
      this.state.gts_permanent_state_id = states.gts_state_id;
      this.state.gts_present_permanent_state_id= states.gts_state_id;
      this.state.gts_permanent_state_name = value
      this.state.gts_permanent_state = value
    }
  });
  }
}

SelectCityOnPermanentStateHandler = (e) => {
  if(this.state.gts_present_permanent_state_id=='' || this.state.gts_present_permanent_state_id== null){
    this.setState({city:[]})
  }

   if(this.state.gts_present_permanent_state_id > 0){
    this.setState({city:[]})
   }
    var getCities =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_CITIES_BY_STATE+'/'+this.state.gts_present_permanent_state_id;
    axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((res) =>{
      console.log(res.data)
      this.state.city = [];
      this.setState({ cities : res.data});
        this.state.cities.forEach((cities) => {
          if(cities.gts_city_status == true){
            this.state.city.push(cities.gts_city_name);
            }
        });
      })
}

savePermanentCity = (event, value) => {
  this.state.gts_permanent_city_name = value
  this.state.gts_permanent_city = value
  if(value==null || value==''){
    this.setState({gts_permanent_city_name:''})
  }
  if(value !== null){
  this.state.cities.forEach((cities) => {
    if (value === cities.gts_city_name) {
      this.state.gts_permanent_city_id = cities.gts_city_id;
      this.state.gts_present_permanent_city_id = cities.gts_city_id;
      this.state.gts_permanent_city_name = value
      this.state.gts_permanent_city = value
    }
  });
  }
}

//  ----------------------------------------------billing------------------------------------------------------
saveBillingCountry = (event, value) =>{
  this.state.gts_billing_country_name = value
  if(value == null || value==''){
      this.setState({state:[]})
      this.state.gts_present_billing_country_id = 0
      this.setState({gts_billing_country_name:''})
  }
  else if(value !== null){
  this.state.countries.forEach((country) => {
    if (value === country.gts_country_name) {
      this.state.gts_billing_country_id = country.gts_country_id;
      this.setState({gts_present_billing_country_name: value})
      this.state.gts_present_billing_country_id = country.gts_country_id;
    }
  });
  }
  else{
    let errors= this.state.errors;
      errors["gts_billing_country"] = "Please select country"
      this.setState({errors: errors})
  }
}

onSelectBillingCountryHandler = (e) => {
 if(this.state.gts_present_billing_country_id=='' || this.state.gts_present_billing_country_id== null){
   this.state.state = [];
   this.state.city = [];
 }
  else{
  let message1= this.state.message1;
  let errors= this.state.errors;
  var getCities =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_CITIES_BY_COUNTRY+'/'+this.state.gts_present_billing_country_id;
  axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
  .then((res) =>{
    console.log(res.data)
    this.setState({ cities : res.data});
      this.state.cities.forEach((cities) => {
        if(cities.gts_city_status == true){
        this.state.city.push(cities.gts_city_name);
        }
      });
    })


    var getStates =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_STATES_BY_COUNTRY+'/'+this.state.gts_present_billing_country_id;
    axios.get(getStates,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((res) =>{
      this.state.state = [];
      this.setState({ states : res.data});
      this.state.states.forEach((states) => {
        if(states.gts_state_status == true){
          this.state.state.push(states.gts_state_name);
          }
      });
    })
  }
}

saveBillingState = (event, value) => {
  this.state.gts_billing_state_name = value
  if(value == '' || value == null){
    this.setState({city : []})
    this.setState({gts_present_billing_state_id: 0})
    this.setState({gts_billing_state_name:''})
  }

  if(value !== null){
  this.state.states.forEach((states) => {
    if (value === states.gts_state_name) {
      this.state.gts_billing_state_id = states.gts_state_id;
      this.state.gts_present_billing_state_id = states.gts_state_id;
    }
  });
  }
}

SelectCityOnBillingStateHandler = (e) => {
  if(this.state.gts_present_billing_state_id=='' || this.state.gts_present_billing_state_id== null){
    this.setState({city:[]})
  }

   if(this.state.gts_present_billing_state_id > 0){
    this.setState({city:[]})
   }
    var getCities =endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_CITIES_BY_STATE+'/'+this.state.gts_present_billing_state_id;
    axios.get(getCities,{ headers: {"Auth_Token" : `Bearer ${token}`} })
    .then((res) =>{
      console.log(res.data)
      this.setState({ cities : res.data});
        this.state.cities.forEach((cities) => {
          if(cities.gts_city_status == true){
            this.state.city.push(cities.gts_city_name);
            }
        });
      })
}

saveBillingCity = (event, value) => {
  this.state.gts_billing_city_name = value
  if(value== null || value == ''){
    this.setState({gts_billing_city_name : ''})
  }
  if(value !== null){
  this.state.cities.forEach((cities) => {
    if (value === cities.gts_city_name) {
      this.state.gts_billing_city_id = cities.gts_city_id;
    }
  });
  }
}
// -----------------------------------------------------------------------------------------------------------
 saveCurrentAddress= (event) => {
   event.preventDefault();
   let responses = this.state.responses;
   let message1 = this.state.message;
   let error1 = this.state.error1;

   var url = endpoints_properties.ENDPOINT_PROD+api_properties.API_USER_ADDRESSES;
   // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
   var postPayload = {
     "gts_user_address_line_1":this.state.gts_current_address_line_1,
     "gts_user_address_line_2":this.state.gts_current_address_line_2,
     "gts_user_address_line_3":this.state.gts_current_address_line_3,
     "gts_state_id":this.state.gts_current_state_id,
     "gts_country_id":this.state.gts_current_country_id,
     "gts_city_id":this.state.gts_current_city_id,
     "gts_user_pin_code":this.state.gts_current_pincode,
     "gts_user_id": jsonPayLoad.user_id,
     "gts_address_type" : 1
    };

    var gts_current_country_id = this.state.gts_current_country_id;
    var gts_current_state_id = this.state.gts_current_state_id;
    var gts_current_city_id = this.state.gts_current_city_id;

    this.setState({gts_present_current_country_id :gts_current_country_id})
    this.setState({gts_present_current_state_id : gts_current_state_id})
    this.setState({gts_present_current_city_id : gts_current_city_id})

    this.validateBeforeCurrentAddressSave();
    if(this.state.currentValidated == true){
    if (this.state.gts_current_user_address_id === 0 || this.state.gts_current_user_address_id === undefined ) {
      axios.post(url,postPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then(response => {
        this.setState({currentAddrUpdated : true});
        this.setState({gts_current_user_address_id: response.data.address_id})
        if(response.data.status_code == 403){
          error1 = "Not able to save current address"
        }
        else{
        message1 = response.data.message;
        this.setState({message1 : response.data.message});
        }
      })
      .catch(err => {
        if(!err.response){
          error1 = "Not able to save current address"
        }
        else if(err.response.status > 500){
          error1 = "Not able to save current address"
        }
        else{
          error1 = err.response.data.message;
        }
        this.setState({error1 : error1});
        })
    }
    // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
    var putPayload = {
      "gts_user_address_line_1":this.state.gts_current_address_line_1,
      "gts_user_address_line_2":this.state.gts_current_address_line_2,
      "gts_user_address_line_3":this.state.gts_current_address_line_3,
      "gts_state_id":this.state.gts_current_state_id,
      "gts_country_id":this.state.gts_current_country_id,
      "gts_city_id":this.state.gts_current_city_id,
      "gts_user_pin_code":this.state.gts_current_pincode,
      "gts_user_address_id":this.state.gts_current_user_address_id,
      "gts_address_type" : 1
    };

    if (this.state.gts_current_user_address_id > 0) {
        axios.put(url,putPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
        this.setState({currentAddrUpdated : true});
        if(response.data.status_code == 403){
          error1 = "Not able to update current address"
        }
        else{
        message1 = response.data.message;
        this.setState({message1 : response.data.message});
        }
      })
      .catch(err => {
        if(!err.response){
          error1 = "Not able to update current address"
        }
        else if(err.response.status > 500){
          error1 = "Not able to save current address"
        }
        else{
          error1 = err.response.data.message;
        }
        this.setState({error1 :  error1});
      })
   }
  }
 }

  savePermanentAddress= (event) => {
    event.preventDefault();
    let responses = this.state.responses;
    let message2 = this.state.message;
    let error2 = this.state.error2;
    var url = endpoints_properties.ENDPOINT_PROD+api_properties.API_USER_ADDRESSES;
     this.setState({permanantValidated: false})
    this.validateBeforePermanentAddressSave();
    if(this.state.permanantValidated == true){
    if (this.state.gts_permanent_user_address_id === 0 || this.state.gts_permanent_user_address_id === undefined) {

      if(this.state.currentAddrToPermanentAddr === true){
        if(this.state.currentAddrUpdated === true){
          // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var postCurrentToPermanentPayloadInPresent = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_present_current_state_id,
            "gts_country_id":this.state.gts_present_current_country_id,
            "gts_city_id":this.state.gts_present_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_id": jsonPayLoad.user_id,
            "gts_address_type" : 2
          };

          var gts_permanent_country_id = this.state.gts_present_current_country_id;
          var gts_permanent_state_id = this.state.gts_present_current_state_id;
          var gts_permanent_city_id = this.state.gts_present_current_city_id;

          this.state.gts_present_permanent_country_id =gts_permanent_country_id
          this.setState({gts_present_permanent_state_id : gts_permanent_state_id})
          this.setState({gts_present_permanent_city_id : gts_permanent_city_id})

        axios.post(url,postCurrentToPermanentPayloadInPresent,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            this.setState({permanentAddrUpdated : true});
            this.setState({gts_permanent_user_address_id: response.data.address_id})
            if(response.data.status_code == 403){
              error2 = "Not able to save permanent address"
            }
            else{
            message2 = response.data.message;
            this.setState({message2 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error2 = "Not able to save permanent address"
            }
            else if(err.response.status > 500){
              error2 = "Not able to save permanent address"
            }
            else{
              error2 = err.response.data.message;
            }
            this.setState({error2 :  error2});
          })
        }
        else{
          // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var postCurrentToPermanentPayload = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_get_current_state_id,
            "gts_country_id":this.state.gts_get_current_country_id,
            "gts_city_id":this.state.gts_get_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_id": jsonPayLoad.user_id,
            "gts_address_type" : 2
          };

          var gts_permanent_country_id = this.state.gts_get_current_country_id;
          var gts_permanent_state_id = this.state.gts_get_current_state_id;
          var gts_permanent_city_id = this.state.gts_get_current_city_id;
          this.state.gts_present_permanent_country_id = this.state.gts_get_current_country_id
          this.setState({gts_present_permanent_state_id : gts_permanent_state_id})
          this.setState({gts_present_permanent_city_id : gts_permanent_city_id})

          axios.post(url,postCurrentToPermanentPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            this.setState({permanentAddrUpdated : true});
            this.setState({gts_permanent_user_address_id: response.data.address_id})
            if(response.data.status_code == 403){
              error2 = "Not able to save permanent address"
            }
            else{
            message2 = response.data.message;
            this.setState({message2 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error2 = "Not able to save permanent address"
            }
            else if(err.response.status > 500){
              error2 = "Not able to save permanent address"
            }
            else{
              error2 = err.response.data.message;
            }
            this.setState({error2 :  error2});
          })
        }
      }

    else{
      // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
      var postPermanentAddrPayload = {
        "gts_user_address_line_1":this.state.gts_permanent_address_line_1,
        "gts_user_address_line_2":this.state.gts_permanent_address_line_2,
        "gts_user_address_line_3":this.state.gts_permanent_address_line_3,
        "gts_state_id":this.state.gts_permanent_state_id,
        "gts_country_id":this.state.gts_permanent_country_id,
        "gts_city_id":this.state.gts_permanent_city_id,
        "gts_user_pin_code":this.state.gts_permanent_pincode,
        "gts_user_id": jsonPayLoad.user_id,
        "gts_address_type" : 2
      };

      var gts_permanent_country_id = this.state.gts_permanent_country_id;
          var gts_permanent_state_id = this.state.gts_permanent_state_id;
          var gts_permanent_city_id = this.state.gts_permanent_city_id;

          this.state.gts_present_permanent_country_id =gts_permanent_country_id
          this.setState({gts_present_permanent_state_id : gts_permanent_state_id})
          this.setState({gts_present_permanent_city_id : gts_permanent_city_id})

    axios.post(url,postPermanentAddrPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then(response => {
        this.setState({permanentAddrUpdated : true});
        this.setState({gts_permanent_user_address_id: response.data.address_id})
        message2 = response.data.message;
        if(response.data.status_code == 403){
          error2 = "Not able to save permanent address"
        }
        else{
        this.setState({message2 : response.data.message});
        }
      })
      .catch(err => {
        if(!err.response){
          error2 = "Not able to save permanent address"
        }
        else if(err.response.status > 500){
          error2 = "Not able to save permanent address"
        }
        else{
          error2 = err.response.data.message;
        }
        this.setState({error2 :  error2});
      })
    }
    }

    else {

      if(this.state.currentAddrToPermanentAddr == true){
        if(this.state.currentAddrUpdated === true){
          // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var putCurrentToPermanentPayloadInPresent = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_present_current_state_id,
            "gts_country_id":this.state.gts_present_current_country_id,
            "gts_city_id":this.state.gts_present_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_address_id":this.state.gts_permanent_user_address_id,
            "gts_address_type" : 2
          };

          var gts_permanent_country_id = this.state.gts_present_current_country_id;
          var gts_permanent_state_id = this.state.gts_present_current_state_id;
          var gts_permanent_city_id = this.state.gts_present_current_city_id;

          this.state.gts_present_permanent_country_id = gts_permanent_country_id
          this.setState({gts_present_permanent_state_id : gts_permanent_state_id})
          this.setState({gts_present_permanent_city_id : gts_permanent_city_id})

        axios.put(url,putCurrentToPermanentPayloadInPresent,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            this.setState({permanentAddrUpdated : true});
            if(response.data.status_code == 403){
              error2 = "Not able to update permanent address"
            }
            else{
            message2 = response.data.message;
            this.setState({message2 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error2 = "Not able to update permanent address"
            }
            else if(err.response.status > 500){
              error2 = "Not able to update permanent address"
            }
            else{
              error2 = err.response.data.message;
            }
            this.setState({error2 :  error2});
          })
        }

        else{
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var putCurrentToPermanentPayload = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_get_current_state_id,
            "gts_country_id":this.state.gts_get_current_country_id,
            "gts_city_id":this.state.gts_get_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_address_id":this.state.gts_permanent_user_address_id,
            "gts_address_type" : 2
          };
          var gts_permanent_country_id = this.state.gts_get_current_country_id;
          var gts_permanent_state_id = this.state.gts_get_current_state_id;
          var gts_permanent_city_id = this.state.gts_get_current_city_id;

          this.state.gts_present_permanent_country_id =gts_permanent_country_id
          this.setState({gts_present_permanent_state_id : gts_permanent_state_id})
          this.setState({gts_present_permanent_city_id : gts_permanent_city_id})

          axios.put(url,putCurrentToPermanentPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            this.setState({permanentAddrUpdated : true});
            if(response.data.status_code == 403){
              error2 = "Not able to update permanent address"
            }
            else{
            message2 = response.data.message;
            this.setState({message2 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error2 = "Not able to update permanent address"
            }
            else if(err.response.status > 500){
              error2 = "Not able to update permanent address"
            }
            else{
              error2 = err.response.data.message;

            }
            this.setState({error2 :  error2});
          })
        }
      }
    else{
      // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
      var putPayload = {
      "gts_user_address_line_1":this.state.gts_permanent_address_line_1,
      "gts_user_address_line_2":this.state.gts_permanent_address_line_2,
      "gts_user_address_line_3":this.state.gts_permanent_address_line_3,
      "gts_state_id":this.state.gts_permanent_state_id,
      "gts_country_id":this.state.gts_permanent_country_id,
      "gts_city_id":this.state.gts_permanent_city_id,
      "gts_user_pin_code":this.state.gts_permanent_pincode,
      "gts_user_address_id":this.state.gts_permanent_user_address_id,
      "gts_address_type" : 2
    };

    var gts_permanent_country_id = this.state.gts_permanent_country_id;
    var gts_permanent_state_id = this.state.gts_permanent_state_id;
    var gts_permanent_city_id = this.state.gts_permanent_city_id;

    this.state.gts_present_permanent_country_id = gts_permanent_country_id
    this.setState({gts_present_permanent_state_id : gts_permanent_state_id})
    this.setState({gts_present_permanent_city_id : gts_permanent_city_id})

      axios.put(url,putPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
      .then(response => {
        this.setState({permanentAddrUpdated : true});
        if(response.data.status_code == 403){
          error2 = "Not able to update permanent address"
        }
        else{
        message2 = response.data.message;
        this.setState({message2 : response.data.message});
        }
      })
      .catch(err => {
        if(!err.response){
          error2 = "Not able to update permanent address"
        }
        else if(err.response.status > 500){
          error2 = "Not able to  update permanent address"
        }
        else{
          error2 = err.response.data.message;
        }
        this.setState({error2 :  error2});
      })
      }
    }

   }
  }

  saveBillingAddress= (event) => {
    event.preventDefault();

    let responses = this.state.responses;
    let message3 = this.state.message;
    let errors =  this.state.errors;
    let error3 =  this.state.error3;
    var url = endpoints_properties.ENDPOINT_PROD+api_properties.API_USER_ADDRESSES;

    this.validateBeforeBillingAddressSave();
    if(this.state.billingValidated == true){
    if (this.state.gts_billing_user_address_id === 0 || this.state.gts_billing_user_address_id === undefined ) {

      if(this.state.currentAddrToBillingAddr === true){
        if(this.state.currentAddrUpdated === true){
          // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var postCurrentToBillingPayloadInPresent = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_present_current_state_id,
            "gts_country_id":this.state.gts_present_current_country_id,
            "gts_city_id":this.state.gts_present_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_id": jsonPayLoad.user_id,
            "gts_address_type" : 3
          };

        axios.post(url,postCurrentToBillingPayloadInPresent,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            this.setState({gts_billing_user_address_id: response.data.address_id})
            if(response.data.status_code == 403){
              error3 = "Not able to save billing address"
            }
            else{
            message3 = response.data.message;
            this.setState({message3 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error3 = "Not able to save billing address"
            }
            else if(err.response.status > 500){
              error3 = "Not able to  save billing address"
            }
            else{
              error3 = err.response.data.message;
            }
            this.setState({error3 :  error3});
          })
        }
        else{
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
        var postCurrentToBillingPayload = {
          "gts_user_address_line_1":this.state.gts_current_address_line_1,
          "gts_user_address_line_2":this.state.gts_current_address_line_2,
          "gts_user_address_line_3":this.state.gts_current_address_line_3,
          "gts_state_id":this.state.gts_get_current_state_id,
          "gts_country_id":this.state.gts_get_current_country_id,
          "gts_city_id":this.state.gts_get_current_city_id,
          "gts_user_pin_code":this.state.gts_current_pincode,
          "gts_user_id": jsonPayLoad.user_id,
          "gts_address_type" : 3
        };
        axios.post(url,postCurrentToBillingPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
          this.setState({gts_billing_user_address_id: response.data.address_id})
          if(response.data.status_code == 403){
            error3 = "Not able to save billing address"
          }
          else{
          message3 = response.data.message;
          this.setState({message3 : response.data.message});
          }
      })
      .catch(err => {
        if(!err.response){
          error3 = "Not able to save billing address"
        }
        else if(err.response.status > 500){
          error3 = "Not able to  save billing address"
        }
        else{
          error3 = err.response.data.message;
        }
        this.setState({error3 :  error3});
      })
      }
    }

      else if(this.state.permanentAddrToBillingAddr === true){
        if(this.state.permanentAddrUpdated === true){
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var postPermanentToBillingPayloadInPresent = {
            "gts_user_address_line_1":this.state.gts_permanent_address_line_1,
            "gts_user_address_line_2":this.state.gts_permanent_address_line_2,
            "gts_user_address_line_3":this.state.gts_permanent_address_line_3,
            "gts_state_id":this.state.gts_present_permanent_state_id,
            "gts_country_id":this.state.gts_present_permanent_country_id,
            "gts_city_id":this.state.gts_present_permanent_city_id,
            "gts_user_pin_code":this.state.gts_permanent_pincode,
            "gts_user_id": jsonPayLoad.user_id,
            "gts_address_type" : 3
          };

        axios.post(url,postPermanentToBillingPayloadInPresent,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            if(response.data.status_code == 403){
              error3 = "Not able to save billing address"
            }
            else{
            message3 = response.data.message;
            this.setState({gts_billing_user_address_id: response.data.address_id})
            this.setState({message3 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error3 = "Not able to save billing address"
            }
            else if(err.response.status > 500){
              error3 = "Not able to  save billing address"
            }
            else{
              error3 = err.response.data.message;
            }
            this.setState({error3 :  error3});
          })
        }
        else{
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
        var postPermanentToBillingPayload = {
          "gts_user_address_line_1":this.state.gts_permanent_address_line_1,
          "gts_user_address_line_2":this.state.gts_permanent_address_line_2,
          "gts_user_address_line_3":this.state.gts_permanent_address_line_3,
          "gts_state_id":this.state.gts_get_permanent_state_id,
          "gts_country_id":this.state.gts_get_permanent_country_id,
          "gts_city_id":this.state.gts_get_permanent_city_id,
          "gts_user_pin_code":this.state.gts_permanent_pincode,
          "gts_user_id": jsonPayLoad.user_id,
          "gts_address_type" : 3
        };
      axios.post(url,postPermanentToBillingPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
          this.setState({gts_billing_user_address_id: response.data.address_id})
          if(response.data.status_code == 403){
            error3 = "Not able to save billing address"
          }
          else{
          message3 = response.data.message;
          this.setState({message3 : response.data.message});
          }
      })
      .catch(err => {
        if(!err.response){
          error3 = "Not able to save billing address"
        }
        else if(err.response.status > 500){
          error3 = "Not able to  save billing address"
        }
        else{
          error3 = err.response.data.message;
        }
        this.setState({error3 :  error3});
      })
    }
    }
    else{
      // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
      var postPayload = {
        "gts_user_address_line_1":this.state.gts_billing_address_line_1,
        "gts_user_address_line_2":this.state.gts_billing_address_line_2,
        "gts_user_address_line_3":this.state.gts_billing_address_line_3,
        "gts_state_id":this.state.gts_billing_state_id,
        "gts_country_id":this.state.gts_billing_country_id,
        "gts_city_id":this.state.gts_billing_city_id,
        "gts_user_pin_code":this.state.gts_billing_pincode,
        "gts_user_id": jsonPayLoad.user_id,
        "gts_address_type" : 3
      };
        axios.post(url,postPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
          this.setState({gts_billing_user_address_id: response.data.address_id})
          if(response.data.status_code == 403){
            error3 = "Not able to save billing address"
          }
          else{
          message3 = response.data.message;
          this.setState({message3 : response.data.message});
          }
        })
        .catch(err => {
          if(!err.response){
            error3 = "Not able to save billing address"
          }
          else if(err.response.status > 500){
            error3 = "Not able to  save billing address"
          }
          else{
            error3 = err.response.data.message;
          }
          this.setState({error3 :  error3});
        })
      }
    }
      // ------------------------------------------------------------
    else {
      // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
      if(this.state.currentAddrToBillingAddr === true){
        if(this.state.currentAddrUpdated === true){
          console.log(this.state.gts_present_current_country_id);
          console.log(this.state.gts_present_current_state_id);
          console.log(this.state.gts_present_current_city_id);
          var putCurrentToBillingPayloadInPresent = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_present_current_state_id,
            "gts_country_id":this.state.gts_present_current_country_id,
            "gts_city_id":this.state.gts_present_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_address_id":this.state.gts_billing_user_address_id,
            "gts_address_type" : 3
          };

        axios.put(url,putCurrentToBillingPayloadInPresent,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            if(response.data.status_code == 403){
              error3 = "Not able to update billing address"
            }
            else{
            message3 = response.data.message;
            this.setState({message3 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error3 = "Not able to update billing address"
            }
            else if(err.response.status > 500){
              error3 = "Not able to  update billing address"
            }
            else{
              error3 = err.response.data.message;
            }
            this.setState({error3 :  error3});
          })
        }
        else{
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var putCurrentToBillingPayload = {
            "gts_user_address_line_1":this.state.gts_current_address_line_1,
            "gts_user_address_line_2":this.state.gts_current_address_line_2,
            "gts_user_address_line_3":this.state.gts_current_address_line_3,
            "gts_state_id":this.state.gts_get_current_state_id,
            "gts_country_id":this.state.gts_get_current_country_id,
            "gts_city_id":this.state.gts_get_current_city_id,
            "gts_user_pin_code":this.state.gts_current_pincode,
            "gts_user_address_id":this.state.gts_billing_user_address_id,
            "gts_address_type" : 3
          };
        axios.put(url,putCurrentToBillingPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
          if(response.data.status_code == 403){
            error3 = "Not able to update billing address"
          }
          else{
          message3 = response.data.message;
          this.setState({message3 : response.data.message});
          }
      })
      .catch(err => {
        if(!err.response){
          error3 = "Not able to update billing address"
        }
        else if(err.response.status > 500){
          error3 = "Not able to  update billing address"
        }
        else{
          error3 = err.response.data.message;
        }
        this.setState({error3 :  error3});
      })
      }
    }

      else if(this.state.permanentAddrToBillingAddr === true){
        if(this.state.permanentAddrUpdated === true){
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var putPermanentToBillingPayloadInPresent = {
            "gts_user_address_line_1":this.state.gts_permanent_address_line_1,
            "gts_user_address_line_2":this.state.gts_permanent_address_line_2,
            "gts_user_address_line_3":this.state.gts_permanent_address_line_3,
            "gts_state_id":this.state.gts_present_permanent_state_id,
            "gts_country_id":this.state.gts_present_permanent_country_id,
            "gts_city_id":this.state.gts_present_permanent_city_id,
            "gts_user_pin_code":this.state.gts_permanent_pincode,
            "gts_user_address_id":this.state.gts_billing_user_address_id,
            "gts_address_type" : 3
          };

        axios.put(url,putPermanentToBillingPayloadInPresent,{ headers: {"Auth_Token" : `Bearer ${token}`} })
          .then(response => {
            if(response.data.status_code == 403){
              error3 = "Not able to update billing address"
            }
            else{
            message3 = response.data.message;
            this.setState({message3 : response.data.message});
            }
          })
          .catch(err => {
            if(!err.response){
              error3 = "Not able to update billing address"
            }
            else if(err.response.status > 500){
              error3 = "Not able to  update billing address"
            }
            else{
              error3 = err.response.data.message;
            }
            this.setState({error3 :  error3});
          })
        }
        else{
        // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
          var putPermanentToBillingPayload = {
            "gts_user_address_line_1":this.state.gts_permanent_address_line_1,
            "gts_user_address_line_2":this.state.gts_permanent_address_line_2,
            "gts_user_address_line_3":this.state.gts_permanent_address_line_3,
            "gts_state_id":this.state.gts_get_permanent_state_id,
            "gts_country_id":this.state.gts_get_permanent_country_id,
            "gts_city_id":this.state.gts_get_permanent_city_id,
            "gts_user_pin_code":this.state.gts_permanent_pincode,
            "gts_user_address_id":this.state.gts_billing_user_address_id,
            "gts_address_type" : 3
          };
      axios.put(url,putPermanentToBillingPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
          if(response.data.status_code == 403){
            error3 = "Not able to update billing address"
          }
          else{
          message3 = response.data.message;
          this.setState({message3 : response.data.message});
          }
      })
      .catch(err => {
        if(!err.response){
          error3 = "Not able to update billing address"
        }
        else if(err.response.status > 500){
          error3 = "Not able to  update billing address"
        }
        else{
          error3 = err.response.data.message;
        }
        this.setState({error3 :  error3});
      })
    }
    }
    else{
      // 1 for Current Address , 2 for Permanent Address , 3 for Billing Address
      var putPayload = {
        "gts_user_address_line_1":this.state.gts_billing_address_line_1,
        "gts_user_address_line_2":this.state.gts_billing_address_line_2,
        "gts_user_address_line_3":this.state.gts_billing_address_line_3,
        "gts_state_id":this.state.gts_billing_state_id,
        "gts_country_id":this.state.gts_billing_country_id,
        "gts_city_id":this.state.gts_billing_city_id,
        "gts_user_pin_code":this.state.gts_billing_pincode,
        "gts_user_address_id":this.state.gts_billing_user_address_id,
        "gts_address_type" : 3
      };
        axios.put(url,putPayload,{ headers: {"Auth_Token" : `Bearer ${token}`} })
        .then(response => {
          if(response.data.status_code == 403){
            error3 = "Not able to update billing address"
          }
          else{
          message3 = response.data.message;
          this.setState({message3 : response.data.message});
          }
        })
        .catch(err => {
          if(!err.response){
            error3 = "Not able to update billing address"
          }
          else if(err.response.status > 500){
            error3 = "Not able to  update billing address"
          }
          else{
            error3 = err.response.data.message;
          }
          this.setState({error3 :  error3});
        })
      }
     }
    }
  }

  render() {

    const successMessageStyles = {
      //backgroundColor: "#f0f",
      fontWeight: 'bold',
      fontSize: 18,
      color: "#008000",
      //padding: paddings
    }

    const {
      saveCurrentAddress,
      savePermanentAddress,
      saveBillingAddress,
      gts_permanent_state,
      gts_permanent_country,
      gts_permanent_city,
      gts_permanent_pincode,
      gts_permanent_address_line_1,
      gts_permanent_address_line_2,
      gts_permanent_address_line_3,
      gts_current_state,
      gts_current_city,
      gts_current_pincode,
      gts_current_address_line_1,
      gts_current_address_line_2,
      gts_current_address_line_3,
      gts_billing_address_line_1,
      gts_billing_address_line_2,
      gts_billing_address_line_3,
      gts_billing_state,
      gts_billing_country,
      gts_billing_city,
      gts_billing_pincode,
      address,
      gts_current_state_id,
      gts_current_country_id,
      gts_current_city_id,
      gts_permanent_state_id,
      gts_permanent_country_id,
      gts_permanent_city_id,
      gts_billing_state_id,
      gts_billing_country_id,
      gts_billing_city_id,
      successAlert,
      countryId,
      stateId,
      cityId

    } = this.state


    const FormBox =this.props;
     return (
      <div className="container align-items-center">
        <div className="container align-items-center">
          <div className='mt-3'>
            <div className="border border-dark rounded-lg" >
              <div className="row">
                <div className = "col" align="left">
                  <h5  className="mb6-3 p-2"><b>&nbsp;User Addresses</b></h5>
                </div>
             </div>
             <div style={{borderBottomColor: 'black',borderBottomWidth: 1.5}} />
             <br/>
             <div className="row"align="center">
               <span style={{color: "red"}}>{this.state.error}</span>
             </div>
             <div className="container">
                {/* ------------------------------------------------CURRENT ADDRESS----------------------------------------------*/}
               {/* <div> */}
                  <InputGroup className="mb-3" size="sm">
                    <h6 style={{color:"black", fontSize:"18px"}}>Current Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <FormControl
                     type="text"
                     name="gts_current_address_line_1"
                     id="gts_current_address_line_1"
                     style={{color : (!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "black" : "gray",border:"1px solid #D3D3D3",height:"30px", width:200}}
                     placeholder="Address Line 1"
                     name="gts_current_address_line_1"
                     value={gts_current_address_line_1}
                     onChange={this.changeHandler}
                     disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                     onBlur={this.validateCurrentAddrLine1.bind(this)}
                     //onFocus={this.clearMessage}
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country<span style={{fontSize:"15px", color: "red"}}><b>*</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.country}
                     style={{ width: 158, color:"black"}}
                     disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                     renderInput={(params) => <TextField {...params}  variant="outlined" style={{color: "black"  }} name="gts_current_country" size="small"/>}
                     onChange={this.saveCurrentCountry}
                     onSelect={this.onSelectCurrentCountryHandler}
                     onBlur={this.validateCurrentCountry}
                     //onFocus={this.clearMessage}
                     value={this.state.gts_current_country_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>
                 {(this.state.errors.gts_current_address_line_1 || this.state.errors.gts_current_country)?
                 <div class='row-0' align="left">
                   <span style={{color: "red"  , align: "left"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.errors.gts_current_address_line_1}</span>

                    <span  style={{color: "red", float:"right"}}>
                    {this.state.errors.gts_current_country}</span>
                    </div>:''}
                    <span >{( this.state.errors.gts_current_country)?<br/> : ''}</span>


                  <InputGroup className="mb-3" size="sm">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl
                     type="text"
                     name="gts_current_address_line_2"
                     id="gts_current_address_line_2"
                     //onFocus={this.clearMessage}
                     style={{color :(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "black" : "gray", border:"1px solid #D3D3D3", height:"30px", width:200}}
                     placeholder="Address Line 2"
                     name="gts_current_address_line_2"
                     defaultValue={gts_current_address_line_2}
                     onChange={this.changeHandler}
                     disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;State<span style={{fontSize:"15px", color: "red"}}></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.state}
                     style={{ width: 158}}
                     disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                     renderInput={(params) => <TextField {...params} variant="outlined" style={{ color: "black" }} name="gts_current_state" size="small" />}
                     onChange={this.saveCurrentState}
                     value={this.state.gts_current_state_name}
                     onSelect={this.SelectCityOnCurrentStateHandler}
                     noOptionsText='No options'
                   />
                 </InputGroup>

                 <InputGroup className="mb-3" size="sm">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl
                     type="text"
                     name="gts_current_address_line_3"
                     id="gts_current_address_line_3"
                     onClick={this.clearMessage}
                     style={{color :(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "black" : "gray", border:"1px solid #D3D3D3", height:"30px", width:200}}
                     placeholder="Address Line 3"
                     name="gts_current_address_line_3"
                     defaultValue={gts_current_address_line_3}
                     onChange={this.changeHandler}
                     disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City<span style={{fontSize:"15px", color: "red"}}><b>*</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.city}
                     style={{ width: 158}}
                     disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                     renderInput={(params) => <TextField {...params}   variant="outlined" style={{ color: "black" }} name="gts_current_city" size="small"/>}
                     onChange={this.saveCurrentCity}
                     value={this.state.gts_current_city_name}
                     onBlur={this.validateCurrentCity.bind(this)}
                     //onFocus={this.clearMessage}
                     noOptionsText='No options'
                   />
                 </InputGroup>
                 {(this.state.errors.gts_current_city)?
                 <div class="row-0" align="right"><span  style={{color: "red", align:"left"}}>{this.state.errors.gts_current_city}</span>
                    <span >{(this.state.errors.gts_current_city)?<br/> : ''}</span>
                  </div> :''}

                  <div class="col-14 pr-0 pl-0" align="right">
                    <h6 style={{ color : "black",fontSize:"18px"}}>Pincode<span style={{fontSize:"15px", color: "red"}}><b>*</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <input
                        type="type"
                        onBlur={this.validateCurrentPincode.bind(this)}
                        //onFocus={this.clearMessage}
                        style={{focus: "blue",border:"1px solid #D3D3D3",height:"29px",width:158, color : (!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "black" : "gray"}}
                        name="gts_current_pincode"
                        value={gts_current_pincode}
                        onChange={this.changeHandler}
                        disabled = {(!this.state.isCurrentAddressExisting && this.state.disabledCurrentAddr)? "" : "disabledCurrentAddr"}
                      /></h6>
                 </div>

                 <div class="row" align="right">
                   <div class="col-md-12 text-right">
                      <Button type="button" variant="light"  class="btn " style={{display: ls.get('gts_user_id')!= jsonPayLoad.user_id ? "none" : "inline"}}  href="#" onClick={this.enableCurrentAddr.bind(this)} ><FontAwesomeIcon icon={faEdit} /></Button>
                      <Button type="button" variant="primary"  class="btn btn-primary" href="#" style={{display: ls.get('gts_user_id')!= jsonPayLoad.user_id ? "none" : "inline"}} onFocus={this.validateBeforeCurrentAddressSave} onBlur={this.clearCurrentSuccessMessage} onClick ={this.saveCurrentAddress} >Save</Button>
                   </div>
                  </div>
                  <br/>
                 <div>
                   <span style={{color:  "#228B22"}}><center><b>{this.state.message1}</b></center></span>
                   <span style={{color:  "red"}}><center><b>{this.state.error1}</b></center></span>

                   <span >{this.state.message1 || this.state.error1?<br/> : ''}</span>
                   <br/>
                 </div>
               {/* </div>  */}

                {/*--------------------------------------------PERMANENT ADDRESS--------------------------------------------------*/}

                <div>
                  <InputGroup className="mb-3" size="sm">
                    <h6 style={{color:"black", fontSize:"18px"}}>Permanent Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <FormControl
                     type="text"
                     onBlur={this.validatePermanentAddrLine1.bind(this)}
                     name="gts_permanent_address_line_1"
                     id="gts_permanent_address_line_1"
                     style={{color :(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "black" : "gray",height:"30px",width:200}}
                     placeholder="Address Line 1"
                     name="gts_permanent_address_line_1"
                     value={gts_permanent_address_line_1}
                     onChange={this.changeHandler}
                     //onFocus={this.clearMessage}
                     disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr" }
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country<span style={{fontSize:"15px", color: "red"}}><b>*</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.country}
                     style={{ width: 158, outlineColor: "black", display: "inline-block", color: !this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr ? 'black' : 'gray'}}
                     disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr"}
                     renderInput={(params) => <TextField {...params} variant="outlined" style={{ color: "black" }} name="gts_permanent_country"  size="small"/>}
                     onChange={this.savePermanentCountry}
                     onSelect={this.onSelectPermanentCountryHandler}
                     onBlur={this.validatePermanentCountry.bind(this)}
                     //onFocus={this.clearMessage}
                     value={this.state.gts_permanent_country_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>
                  {(this.state.errors.gts_permanent_address_line_1 || this.state.errors.gts_permanent_country)?
                 <div class='row-0' align="left">
                    <span style={{color: "red"  , align: "left"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.errors.gts_permanent_address_line_1}</span>

                    <span  style={{color: "red", float :"right"}}>
                    {this.state.errors.gts_permanent_country}</span>
                    </div>:''}
                    <span >{( this.state.errors.gts_permanent_country)?<br/> : ''}</span>

                  <InputGroup className="mb-3" size="sm">
                    <h6><label for="permanant" style={{ color : "black",fontSize:"13px"}}>Same as current Address&nbsp;</label>
                    <input
                      type="checkbox"
                      class="onoffswitch-checkbox"
                      id="inline"
                      name="currentAddrToPermanentAddr"
                      onChange={ this.currentAddrToPermanentAddr}
                      disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr"}/>
                    </h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl
                     type="text"
                     name="gts_permanent_address_line_2"
                     id="gts_permanent_address_line_2"
                     style={{color :(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "black" : "gray",height:"30px", width:200}}
                     placeholder="Address Line 2"
                     name="gts_permanent_address_line_2"
                     value={gts_permanent_address_line_2}
                     onChange={this.changeHandler}
                     onFocus={this.state.errors}
                     disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr" }
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;State<span style={{fontSize:"15px", color: "red"}}></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.state}
                     style={{ width: 158, outlineColor: "black", display: "inline-block", color: !this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr ? 'black' : 'gray'}}
                     disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr"}
                     renderInput={(params) => <TextField {...params} variant="outlined" style={{ color: "black" }} name="gts_permanent_state" size="small" />}
                     onChange={this.savePermanentState}
                     onSelect={this.SelectCityOnPermanentStateHandler}
                     value={this.state.gts_permanent_state_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>

                 <InputGroup className="mb-3" size="sm">
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl
                     type="text"
                     name="gts_permanent_address_line_3"
                     id="gts_permanent_address_line_3"
                     style={{color :(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "black" : "gray",height:"30px", width:200}}
                     placeholder="Address Line 3"
                     name="gts_permanent_address_line_3"
                     value={gts_permanent_address_line_3}
                     onChange={this.changeHandler}
                     onFocus={this.state.errors}
                     disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr" }
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City<span style={{fontSize:"15px", color: "red"}}><b>*</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.city}
                     style={{ width: 158, outlineColor: "black", display: "inline-block", color: !this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr ? 'black' : 'gray'}}
                     disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr"}
                     renderInput={(params) => <TextField {...params}  variant="outlined" style={{ color: "black" }} name="gts_permanent_city" size="small"/>}
                     onChange={this.savePermanentCity}
                     onBlur={this.validatePermanentCity.bind(this)}
                     //onFocus={this.clearMessage}
                     value={this.state.gts_permanent_city_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>
                 {(this.state.errors.gts_permanent_city)?
                 <div class="row-0" align="right"><span  style={{color: "red", align:"left"}}>{this.state.errors.gts_permanent_city}</span>
                    <span >{(this.state.errors.gts_permanent_city)?<br/> : ''}</span>
                  </div> :''}

                  <div class="col-14 pr-0 pl-0" align="right">
                    <h6 style={{ color : "black",fontSize:"18px"}}>Pincode<span style={{fontSize:"15px", color: "red"}}><b>*</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <input
                        type="type"
                        onBlur={this.validatePermanentPincode.bind(this)}
                        //onFocus={this.clearMessage}
                        style={{focus: "blue",border:"1px solid #D3D3D3",height:"29px",width:158, color : (!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "black" : "gray"}}
                        name="gts_permanent_pincode"
                        value={gts_permanent_pincode}
                        onChange={this.changeHandler}
                        disabled = {(!this.state.isPermanentAddressExisting && this.state.disabledPermanentAddr)? "" : "disabledPermanentAddr"}
                      /></h6>
                 </div>

                 <div class="row" align="right">
                   <div class="col-md-12 text-right">
                      <Button variant="light" class="btn float" href="#" style={{display: ls.get('gts_user_id')!= jsonPayLoad.user_id ? "none" : "inline"}} onClick={this.enablePermanentAddr.bind(this)}><FontAwesomeIcon icon={faEdit} /></Button>
                      <Button variant="primary" class="btn btn-primary" style={{display: ls.get('gts_user_id')!= jsonPayLoad.user_id ? "none" : "inline"}} href="#"  onFocus={this.validateBeforePermanentAddressSave.bind(this)} onBlur={this.clearPermanentSuccessMessage} onClick ={this.savePermanentAddress} >Save</Button>
                   </div>
                 </div>
                 <br/>
                   <div>
                   <span style={{color:  "#228B22"}}><center><b>{this.state.message2}</b></center></span>
                   <span style={{color:  "red"}}><center><b>{this.state.error2}</b></center></span>

                   <span >{this.state.message2|| this.state.error2?<br/> : ''}</span>
                   </div>
               </div>

                {/*---------------------------------------------BILLING ADDRESS-------------------------------------------------------*/}

                <div>
                  <InputGroup className="mb-3" size="sm">
                    <h6 style={{color:"black", fontSize:"18px"}}>Billing Address:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <FormControl
                     type="text"
                     onBlur={this.validateBillingAddrLine1.bind(this)}
                     name="gts_billing_address_line_1"
                     id="gts_billing_address_line_1"
                     style={{color :(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "black" : "gray",height:"30px",width:200}}
                     placeholder="Address Line 1"
                     name="gts_billing_address_line_1"
                     value={gts_billing_address_line_1}
                     onChange={this.changeHandler}
                     //onFocus={this.clearMessage}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr" }
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Country<span style={{fontSize:"15px", color: "red"}}><b>*</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.country}
                     style={{ width: 158, outlineColor: "black", display: "inline-block", color: !this.state.isBillingAddressExisting && this.state.disabledBillingAddr ? 'black' : 'gray'}}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr"}
                      onBlur={this.validateBillingCountry.bind(this)}
                      //onFocus={this.clearMessage}
                     renderInput={(params) => <TextField {...params} variant="outlined" style={{ color: "black" }} name="gts_billing_country" size="small"/>}
                     onSelect={this.onSelectBillingCountryHandler}
                     onChange={this.saveBillingCountry}
                     value={this.state.gts_billing_country_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>

                  {(this.state.errors.gts_billing_address_line_1 || this.state.errors.gts_billing_country)?
                 <div class='row-0' align="left">
                    <span style={{color: "red"  , align: "left"}} >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      {this.state.errors.gts_billing_address_line_1}</span>

                    <span  style={{color: "red", float :"right"}}>
                    {this.state.errors.gts_billing_country}</span>
                    </div>:''}
                    <span >{( this.state.errors.gts_billing_country)?<br/> : ''}</span>

                  <InputGroup className="mb-3" size="sm">
                    <h6><label style={{ color : "black",fontSize:"13px"}} for="permanant">Same as current Address&nbsp;</label>
                      <input
                      type="checkbox"
                      class="onoffswitch-checkbox"
                      name="currentAddrToBillingAddr"
                      id="inline"
                      onChange={ this.currentAddrToBillingAddr}
                      disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr"}/>
                    </h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <FormControl
                     type="text"
                     name="gts_billing_address_line_2"
                     id="gts_billing_address_line_2"
                     style={{color :(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "black" : "gray",height:"30px", width:200}}
                     placeholder="Address Line 2"
                     name="gts_billing_address_line_2"
                     value={gts_billing_address_line_2}
                     onChange={this.changeHandler}
                     onFocus={this.state.errors}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr" }
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;State<span style={{fontSize:"15px", color: "red"}}></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.state}
                     style={{ width: 158, outlineColor: "black", display: "inline-block", color: !this.state.isBillingAddressExisting && this.state.disabledBillingAddr ? 'black' : 'gray'}}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr"}
                     renderInput={(params) => <TextField {...params}  variant="outlined"  style={{ color: "black" }} name="gts_billing_state" size="small" />}
                     onChange={this.saveBillingState}
                     onSelect={this.SelectCityOnBillingStateHandler}
                     value={this.state.gts_billing_state_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>

                 <InputGroup className="mb-3" size="sm">
                   <h6><label style={{ color : "black",fontSize:"13px"}} for="current">Same as permanent Address&nbsp;</label>
                   <input
                     type="checkbox"
                     class="onoffswitch-checkbox"
                     name="permanentAddrToBillingAddr"
                     id="inline"
                     onChange={ this.permanentAddrToBillingAddr}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr"}/>
                   </h6>&nbsp;&nbsp;&nbsp;
                    <FormControl
                     type="text"
                     name="gts_billing_address_line_3"
                     id="gts_billing_address_line_3"
                     style={{color :(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "black" : "gray",height:"30px", width:200}}
                     placeholder="Address Line 3"
                     name="gts_billing_address_line_3"
                     value={gts_billing_address_line_3}
                     onChange={this.changeHandler}
                     onFocus={this.state.errors}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr" }
                     aria-describedby="inputGroup-sizing-default"
                    />
                    <h6 style={{ color : "black",fontSize:"18px"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;City<span style={{fontSize:"15px", color: "red"}}><b>*</b></span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h6>
                    <Autocomplete
                     options={this.state.city}
                     style={{ width: 158, outlineColor: "1px solid gray",display: "1px solid gray", color: !this.state.isBillingAddressExisting && this.state.disabledBillingAddr ? 'black' : 'gray'}}
                     disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr"}
                     renderInput={(params) => <TextField {...params}  variant="outlined" style={{ color: "black" }} name="gts_billing_city" size="small"/>}
                     onChange={this.saveBillingCity}
                     onBlur={this.validateBillingCity.bind(this)}
                     //onFocus={this.clearMessage}
                     value={this.state.gts_billing_city_name}
                     noOptionsText='No options'
                   />
                 </InputGroup>
                 {(this.state.errors.gts_billing_city)?
                 <div class="row-0" align="right"><span  style={{color: "red", align:"left"}}>{this.state.errors.gts_billing_city}</span>
                    <span >{(this.state.errors.gts_billing_city)?<br/> : ''}</span>
                  </div> :''}

                  <div class="col-14 pr-0 pl-0" align="right">
                    <h6 style={{ color : "black",fontSize:"18px"}}>Pincode<span style={{fontSize:"15px", color: "red"}}><b>*</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                      <input
                        type="type"
                        onBlur={this.validateBillingPincode.bind(this)}
                        //onFocus={this.clearMessage}
                        style={{focus: "blue",border:"1px solid #D3D3D3",height:"29px",width:158, color : (!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "black" : "gray"}}
                        name="gts_billing_pincode"
                        value={gts_billing_pincode}
                        onChange={this.changeHandler}
                        disabled = {(!this.state.isBillingAddressExisting && this.state.disabledBillingAddr)? "" : "disabledBillingAddr"}
                      /></h6>
                 </div>

                 <div class="row" align="right">
                   <div class="col-md-12 text-right">
                      <Button variant="light" class="btn float" style={{display: ls.get('gts_user_id')!= jsonPayLoad.user_id ? "none" : "inline"}} href="#" onClick={this.enableBillingAddr.bind(this)} ><FontAwesomeIcon icon={faEdit} /></Button>
                      <Button variant="primary" class="btn btn-primary" style={{display: ls.get('gts_user_id')!= jsonPayLoad.user_id ? "none" : "inline"}} href="#"  onFocus={this.validateBeforeBillingAddressSave} onBlur={this.clearBillingSuccessMessage} onClick ={this.saveBillingAddress} >Save</Button>
                   </div>
                 </div>
                 <br/>
                    <div>
                    <span style={{color:  "#228B22"}}><center><b>{this.state.message3}</b></center></span>
                   <span style={{color:  "red"}}><center><b>{this.state.error3}</b></center></span>

                   <span >{this.state.message3 || this.state.error3?<br/> : ''}</span>
                   </div>
               </div>
                {/* ----------------------------------------------------------------------------------------------------------------- */}
              </div>
           </div>
         </div>
       </div>
     </div>
    );
  }
}

    export default UserAddressesComponent;
