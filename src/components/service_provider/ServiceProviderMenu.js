import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import ls from 'local-storage';
import axios from 'axios';
import {Link } from 'react-router-dom';
import { Popover,  OverlayTrigger, FormControl, InputGroup,Dropdown, NavDropdown} from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SwitchRole from '../common/SwitchRole';

var jsonPayLoad=ls.get('jsonPayLoad');
var token = ls.get('token');
var userDetail = '';
var userPersonalDetails=ls.get('userPersonalDetails');
console.log(userPersonalDetails)

class ServiceProviderMenu extends Component {

  constructor(props) {
    super(props)

    this.state = {
      role_name:'',
      errors: {},
      isUserDetailExisting:false,
      first_name:'',
      last_name:'',
      userDetail:{}
    }
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
    if(userPersonalDetails!== null){
    if( userPersonalDetails.gts_user_id == jsonPayLoad.user_id){
      this.setState({first_name : userPersonalDetails.gts_user_first_name})
      this.setState({last_name : userPersonalDetails.gts_user_last_name})
      }
    }
  }

  setUserId = (userID)=>{
    ls.set('gts_user_id', userID);
  }

render()
{
  const {
   user_name,
   user_Detail
  }=this.state;
    var roles=[];
    roles=jsonPayLoad.other_roles.split(',');

    return(
      <div>
       <div className="container-fluid">
         <InputGroup>
           {/* <h6><i class="fas fa-user-circle fa-2x"></i></h6> */}
           <h6 style={{paddingBottom:"20px"}}>&nbsp;<label style={{color:'black',fontSize:"13px"}}><b>Name:</b></label><label style={{color:'red',fontSize:13 }}>{userPersonalDetails!== null ? this.state.first_name : ''}&nbsp;{userPersonalDetails!== null ? this.state.last_name : ''}</label>
           <br/>&nbsp;<label style={{color:'black',fontSize:"13px"}}> <b>Current Role:</b></label><label style={{color:'red',fontSize:13}}>&nbsp;Service Provider</label>
           <br/><SwitchRole/>
           </h6>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE</center>PROFILE</b></span>} >
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/service-provider-profile"><span style={{fontSize:"11px"}}><b>SERVICE PROVIDER PROFILE</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/user-projects"><span style={{fontSize:"11px"}}><b>USER PROJECTS</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/your-profile-viewer"><span style={{fontSize:"11px"}}><b>YOUR PROFILE VIEWER</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/manage-roles"><span style={{fontSize:"11px"}}><b>MANAGE ROLES</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/work-experience"><span style={{fontSize:"11px"}}><b>WORK EXPERIENCE</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/change-password"><span style={{fontSize:"11px"}}><b>CHANGE PASSWORD</b></span></NavDropdown.Item>
           </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE</center>SKILLS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/self-assessment"><span style={{fontSize:"11px"}}><b>SELF ASSESSMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/chakuri-assessment"><span style={{fontSize:"11px"}}><b>CHAKURI ASSESSMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/employer-assessment"><span style={{fontSize:"11px"}}><b>EMPLOYER ASSESSMENT</b></span></NavDropdown.Item>
           </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE</center>SERVICES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recommended-services"><span style={{fontSize:"11px"}}><b>RECOMMENDED SERVICES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/saved-services"><span style={{fontSize:"11px"}}><b>SAVED JOBS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/consult-with-recruiter"><span style={{fontSize:"11px"}}><b>CONSULT WITH RECRUITER</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-services"><span style={{fontSize:"11px"}}><b>SEARCH SERVICES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/wish-for-service"><span style={{fontSize:"11px"}}><b>WIsH FOR SERVICE</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>TRAININGS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-training"><span style={{fontSize:"11px"}}><b>SEARCH TRAINING</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recommended-training"><span style={{fontSize:"11px"}}><b>RECOMMENDED TRAINING</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/training-in-progess"><span style={{fontSize:"11px"}}><b>TRAINING IN PROGRESS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/saved-training"><span style={{fontSize:"11px"}}><b>SAVED TRAINING</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/training-completed"><span style={{fontSize:"11px"}}><b>TRAINING COMPLETED</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/trainingwish-for-training"><span style={{fontSize:"11px"}}><b>WISH FOR TRAINING</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE&nbsp;JOB<br/></center> APPLICATIONS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/active-job-applications"><span style={{fontSize:"11px"}}><b>ACTIVE JOB APPLICATIONS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/closed-job-applications"><span style={{fontSize:"11px"}}><b>CLOSED JOB APPLOCATIONS</b></span></NavDropdown.Item>
          </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>PAYMENT</center>STATUS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/make-payment"><span style={{fontSize:"11px"}}><b>MAKE PAYMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/payment-history"><span style={{fontSize:"11px"}}><b>PAYMENT HISTORY</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/employement-agreement"><span style={{fontSize:"11px"}}><b>EMPLOYMENT AGREEMENT</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b>WISHLIST</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/training-wishes"><span style={{fontSize:"11px"}}><b>TRAINING WISHES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/job-wishes"><span style={{fontSize:"11px"}}><b>JOB WISHES</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b>NOTIFICATIONS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/notifications"><span style={{fontSize:"11px"}}><b>NOTIFICATIONS</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b>MESSAGES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/messages"><span style={{fontSize:"11px"}}><b>MESSAGES</b></span></NavDropdown.Item>
          </NavDropdown>
       </InputGroup>
       <div style={{borderBottomColor: 'black',borderBottomWidth: 1.5}} />
     </div>
   </div>
  )
}}
export default ServiceProviderMenu;