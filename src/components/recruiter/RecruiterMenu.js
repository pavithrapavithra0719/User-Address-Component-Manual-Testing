import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTrash,faEdit,faUpload} from '@fortawesome/free-solid-svg-icons'
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

class RecruiterMenu extends Component {

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
    if( userPersonalDetails.gts_user_id == jsonPayLoad.user_id ){
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
           {/* <i class="fas fa-user-circle fa-3x circle-icon"/> */}
           <h6 style={{paddingBottom:"20px"}}>&nbsp;<label style={{color:'black',fontSize:"13px"}}><b>Name:&nbsp;</b></label><label style={{color:'red',fontSize:13 }} onchange={(this.state.isUserDetailExisting)? "isUserDetailExisting":""}>{this.state.first_name}&nbsp;{this.state.last_name}</label>
           <br/>&nbsp;<label style={{color:'black',fontSize:"13px"}}> <b>Current Role:</b></label>&nbsp;<label style={{color:'red',fontSize:13}}>&nbsp;Recruiter</label>
           <br/><SwitchRole/>
           </h6>

           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>PROFILE</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recruiter-profile"><span style={{fontSize:"11px"}}><b>RECRUITER PROFILE</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/change-password"><span style={{fontSize:"11px"}}><b>CHANGE PASSWORD</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/manage-roles"><span style={{fontSize:"11px"}}><b>MANAGE ROLES</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>SERVICE CONSUMER</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-service-consumer"><span style={{fontSize:"11px"}}><b>SEARCH SERVICE CONSUMER</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>SERVICE PROVIDER</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/service-consumer-placement"><span style={{fontSize:"11px"}}><b>SERVICE PROVIDER PLACEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-service-provider"><span style={{fontSize:"11px"}}><b>SEARCH SERVICE PROVIDER</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/service-provider-skills-and-trainings"><span style={{fontSize:"11px"}}><b>SKILLS AND TRAINING</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="gts/service-provider-recruited"><span style={{fontSize:"11px"}}><b>SERVICE PROVIDER RECRUITED</b></span></NavDropdown.Item>
          </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>AGREEMENTS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recruitment-agreement"><span style={{fontSize:"11px"}}><b>RECRUITMENT AGREEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/recruitment-agreement-history"><span style={{fontSize:"11px"}}><b>RECRUITMENT AGREEMENT HISTORY</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/candidate-agreement"><span style={{fontSize:"11px"}}><b>CANDIDATE AGREEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/candidate-agreement-history"><span style={{fontSize:"11px"}}><b>CANDIDATE AGREEMENT HISTORY</b></span></NavDropdown.Item>
          </NavDropdown>


          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b>MESSAGES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/messages"><span style={{fontSize:"11px"}}><b>MESSAGES</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b>NOTIFICATIONS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/notifications"><span style={{fontSize:"11px"}}><b>NOTIFICATIONS</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b>WISHLIST</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/notifications"><span style={{fontSize:"11px"}}><b>TRAINING WISHES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/notifications"><span style={{fontSize:"11px"}}><b>JOB WISHES</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>RECRUITMENT</center>STATISTICS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/notifications"><span style={{fontSize:"11px"}}><b>RECRUITMENT STATISTICS</b></span></NavDropdown.Item>
          </NavDropdown>
       </InputGroup>

       <div style={{borderBottomColor: 'black',borderBottomWidth: 1.5}} />

     </div>
   </div>
  )
}}
export default RecruiterMenu;