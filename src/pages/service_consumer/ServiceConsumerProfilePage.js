
import React, { Component } from 'react'
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import 'bootstrap/dist/css/bootstrap.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faTrash,faEdit,faUpload} from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

import UserAddressesComponent from '../../components/common/UserAddressesComponent';
import ServiceConsumerMenu from '../../components/service_consumer/ServiceConsumerMenu';
import {
  Button,Alert,FormGroup,Form,Input,InputGroupAddon,InputGroupText,InputGroup,Row,Col,Container
} from 'reactstrap';
import { FormControl, FormLabel, Card, CardBody,CardText } from 'react-bootstrap';


class ServiceConsumerProfilePage extends Component {
  render(){
    return (
      <div>
        <Header/>
        <ServiceConsumerMenu/>
        <UserAddressesComponent/>
        <br></br>
        <br></br>
       <Footer /> 
     </div>                  
    )
  }
}
export default ServiceConsumerProfilePage;