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

class ServiceConsumerMenu extends Component {

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

  setUserId = (userID)=>{
    ls.set('gts_user_id', userID);
  }

  componentDidMount() {
    if(userPersonalDetails!== null){
    if( userPersonalDetails.gts_user_id == jsonPayLoad.user_id ){
      this.setState({first_name : userPersonalDetails.gts_user_first_name})
      this.setState({last_name : userPersonalDetails.gts_user_last_name})
      }
    }
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
           {/* <i className="fa fa-user-circle fa-bg"></i> */}
           <h6 style={{paddingBottom:"20px"}}>&nbsp;<label style={{color:'black',fontSize:13}}><b>Name:</b></label><label style={{color:'red',fontSize:13 }}>{userPersonalDetails!== null ? this.state.first_name : ''}&nbsp;{userPersonalDetails!== null ? this.state.last_name : ''}</label>
           <br/>&nbsp;<label style={{color:'black',fontSize:"13px"}}> <b>Current Role:</b></label><label style={{color:'red',fontSize:13}}>&nbsp;Service Consumer</label>
           <br/>
           <div><SwitchRole/></div>
           </h6>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE</center>PROFILE</b></span>} >
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/service-consumer-profile"><span style={{fontSize:"11px"}}><b>SERVICE CONSUMER PROFILE</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/user-projects"><span style={{fontSize:"11px"}}><b>USER PROJECTS</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/your-profile-viewer"><span style={{fontSize:"11px"}}><b>YOUR PROFILE VIEWER</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/manage-roles"><span style={{fontSize:"11px"}}><b>MANAGE ROLES</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/manage-skills"><span style={{fontSize:"11px"}}><b>MANAGE SKILLS</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/change-password"><span style={{fontSize:"11px"}}><b>CHANGE PASSWORD</b></span></NavDropdown.Item>
           </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE</center>SERVICES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/post-a-service"><span style={{fontSize:"11px"}}><b>POST A SERVICE</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/list-of-services"><span style={{fontSize:"11px"}}><b>LIST OF SERVICES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/service-post-activty"><span style={{fontSize:"11px"}}><b>SERVICE POST ACTIVITY</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/closed-jobs"><span style={{fontSize:"11px"}}><b>CLOSED JOBS</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE <br/>JOB<br/></center> APPLICATIONS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/active-applications"><span style={{fontSize:"11px"}}><b>ACTIVE APPLICATIONS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/schedule-interviews"><span style={{fontSize:"11px"}}><b>SCHEDULE INTERVIEWS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/closed-applications"><span style={{fontSize:"11px"}}><b>CLOSED APPLOCATIONS</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE<br/>SERVICE </center>PROVIDERS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/top-qualified-service-provider"><span style={{fontSize:"11px"}}><b>TOP QUALIFIED SERVICE PROVIDERS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-service-provider"><span style={{fontSize:"11px"}}><b>SEARCH SERVICE PROVIDER</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE SKILL</center>ASSESSMENT TESTS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/add-test"><span style={{fontSize:"11px"}}><b>ADD TEST</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-tets"><span style={{fontSize:"11px"}}><b>SEARCH TESTS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/assessment-evalution"><span style={{fontSize:"11px"}}><b>ASSESSMENT EVALUTION</b></span></NavDropdown.Item>
          </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>AGREEMENTS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/employement-agreement"><span style={{fontSize:"11px"}}><b>EMPLOYMENT AGREEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/employment-agreement-history"><span style={{fontSize:"11px"}}><b>EMPLOYMENT AGREEMENT HISTORY</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recruitment-agreement"><span style={{fontSize:"11px"}}><b>RECRUITMENT AGREEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recruitment-agreement-history"><span style={{fontSize:"11px"}}><b>RECRUITMENT AGREEMENT HISTORY</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/candidate-agreement"><span style={{fontSize:"11px"}}><b>CANDIDATE AGREEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/candidate-agreement-history"><span style={{fontSize:"11px"}}><b>CANDIDATE AGREEMENT HISTORY</b></span></NavDropdown.Item>
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
export default ServiceConsumerMenu;