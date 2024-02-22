import React, { Component } from 'react'

import 'bootstrap/dist/css/bootstrap.css'
import ls from 'local-storage';
import {InputGroup, NavDropdown} from 'react-bootstrap';
import SwitchRole from '../common/SwitchRole';

var jsonPayLoad=ls.get('jsonPayLoad');
var userPersonalDetails=ls.get('userPersonalDetails');

class AdminMenu extends Component {

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
    if( userPersonalDetails.gts_user_id === jsonPayLoad.user_id ){
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

    return(
      <div>
       <div className="container-fluid">
         <InputGroup>
           {/* <i class="fas fa-user-circle fa-bg circle-icon"/> */}
           <h6 style={{paddingBottom:"20px"}}>&nbsp;<label style={{color:'black',fontSize:"13px"}}><b>Name:&nbsp;</b></label><label style={{color:'red',fontSize:13 }} onchange={(this.state.isUserDetailExisting)? "isUserDetailExisting":""}>{this.state.first_name}&nbsp;{this.state.last_name}</label>
           <br/>&nbsp;<label style={{color:'black',fontSize:"13px"}}> <b>Current Role:</b></label>&nbsp;<label style={{color:'red',fontSize:13}}>&nbsp;Admin</label>
           <br/><SwitchRole/>
           </h6>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>PROFILE</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/admin-profile"><span style={{fontSize:"11px"}}><b>ADMIN PROFILE</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/change-password"><span style={{fontSize:"11px"}}><b>CHANGE PASSWORD</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/you-profile-viewer"><span style={{fontSize:"11px"}}><b>YOUR PROFILE VIEWER</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/manage-roles"><span style={{fontSize:"11px"}}><b>MANAGE ROLES</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/user-projects"><span style={{fontSize:"11px"}}><b>USER PROJECTS</b></span></NavDropdown.Item>
          </NavDropdown>
            
          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>SERVICE CONSUMER</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-service-consumer"><span style={{fontSize:"11px"}}><b>SEARCH SERVICE CONSUMER</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>SERVICE PROVIDER</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-service-provider"><span style={{fontSize:"11px"}}><b>SEARCH SERVICE PROVIDER</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px", paddingRight:"5px"}}><b><center>MANAGE</center>SERVICES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/list-of-services"><span style={{fontSize:"11px"}}><b>SERVICE INBOX</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>RECRUITERS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-service-expert"><span style={{fontSize:"11px"}}><b>SEARCH SERVICE EXPERT</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>TRAINEES</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/search-trainee"><span style={{fontSize:"11px"}}><b>SEARCH TRAINEE</b></span></NavDropdown.Item>
          </NavDropdown>

          <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>CHAKURI</center>STATISTICS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/total-revenue-generated"><span style={{fontSize:"11px"}}><b>TOTAL REVENUE GENERATED</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/number-of-clients"><span style={{fontSize:"11px"}}><b>NUMBER OF CLIENTS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/number-of-sp-attending-trainings"><span style={{fontSize:"11px"}}><b>NUMBER OF SERVICE PROVIDER ATTENDING TRAININGS</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/job-statistics"><span style={{fontSize:"11px"}}><b>JOB STATISTICS(Last 30 Days)</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/chakuri-share-and-revenue"><span style={{fontSize:"11px"}}><b>CHAKURI SHARE AND REVENUE</b></span></NavDropdown.Item>
          </NavDropdown>

           <NavDropdown title={<span style={{color:'black',fontSize:"11px"}}><b><center>MANAGE</center>AGREEMENTS</b></span>} >
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/employment-agreement"><span style={{fontSize:"11px"}}><b>EMPLOYMENT AGREEMENT</b></span></NavDropdown.Item>
            <NavDropdown.Item onClick={()=>this.setUserId(jsonPayLoad.user_id)} href="/gts/current-employments"><span style={{fontSize:"11px"}}><b>CURRENT EMPLOYMENTS</b></span></NavDropdown.Item>
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
export default AdminMenu;