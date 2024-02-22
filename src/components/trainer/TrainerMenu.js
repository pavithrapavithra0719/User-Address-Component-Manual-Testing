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


class TrainerMenu extends Component {

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
           {/* <h6><i class="fas fa-user-circle fa-2x"></i></h6> */}
           <h6 style={{paddingBottom:"20px"}}>&nbsp;<label style={{color:'black',fontSize:"13px"}}><b>Name:</b></label><label style={{color:'red',fontSize:13}}>{userPersonalDetails!== null ? this.state.first_name : ''}&nbsp;{userPersonalDetails!== null ? this.state.last_name : ''}</label>
           <br/>&nbsp;<label style={{color:'black',fontSize:"13px"}}> <b>Current Role:</b></label><label style={{color:'red',fontSize:13}}>&nbsp;Trainer</label>
           <br/><SwitchRole/>
           </h6>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

           <NavDropdown title={<span style={{color:'black',fontSize:"12px", paddingRight:"5px"}}><b>MANAGE PROFILE</b></span>} >
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/trainer-profile"><span style={{fontSize:"12px"}}><b>TRAINER PROFILE</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/your-profile-viewer"><span style={{fontSize:"12px"}}><b>YOUR PROFILE VIEWER</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/manage-roles"><span style={{fontSize:"12px"}}><b>MANAGE ROLES</b></span></NavDropdown.Item>
              <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/change-password"><span style={{fontSize:"12px"}}><b>CHANGE PASSWORD</b></span></NavDropdown.Item>
           </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"12px"}}><b>MANAGE TRAININGS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/add-training"><span style={{fontSize:"12px"}}><b>ADD TRAINING</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/add-training-offer"><span style={{fontSize:"12px"}}><b>ADD TRAINING OFFER</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/list-of-training"><span style={{fontSize:"12px"}}><b>LIST OF TRAINING</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/training-applications"><span style={{fontSize:"12px"}}><b>TRAINING APPLICATIONS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/training-in-progress"><span style={{fontSize:"12px"}}><b>TRAINING IN PROGRESS</b></span></NavDropdown.Item>
          </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"12px"}}><b>MANAGE TRAINEES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/trainee-recommendation"><span style={{fontSize:"12px"}}><b>TRAINEE RECOMMENDATION</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/trainee-search"><span style={{fontSize:"12px"}}><b>TRAINEE SEARCH</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"12px"}}><b>WISHLIST</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/training-wishes"><span style={{fontSize:"12px"}}><b>TRAINING WISHES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/job-wishes"><span style={{fontSize:"12px"}}><b>JOB WISHES</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"12px"}}><b>NOTIFICATIONS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/notifications"><span style={{fontSize:"12px"}}><b>NOTIFICATIONS</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"12px"}}><b>MESSAGES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/messages"><span style={{fontSize:"12px"}}><b>MESSAGES</b></span></NavDropdown.Item>
          </NavDropdown>
       </InputGroup>
       <div style={{borderBottomColor: 'black',borderBottomWidth: 1.5}} />
     </div>
   </div>
  )
}}
export default TrainerMenu;