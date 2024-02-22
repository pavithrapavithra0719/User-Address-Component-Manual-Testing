import React, { Component } from 'react';
// import Axios from 'axios';
import { Route, Link, Switch, Redirect,useHistory } from 'react-router-dom';
import ls from 'local-storage';
//import backgroundImage from '../assets/img/icons/common/4.svg';
import { connect } from 'react-redux';
//import { login } from '../redux/action/user';
import axios from 'axios';
import {NavLink} from 'reactstrap';
import { endpoints_properties } from '../../properties/EndPointsProperties.js';
import { api_properties } from '../../properties/APIProperties.js';

// reactstrap components
import {
  Button,
  Alert,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
  Container
} from 'reactstrap';
import { FormControl, FormLabel, Card, CardBody,CardText } from 'react-bootstrap';

class LoginComponent extends Component {

    constructor(props) {
    super(props);
    this.state = {
      buttonDisabled: false,
      fields: {},
      errors: {},
      gts_user_id:'',
      permissions:'',
      primary_role:'',
      other_roles:[],
      redirect: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitUserLoginForm = this.submitUserLoginForm.bind(this);
    this.onDismiss = this.onDismiss.bind(this);

    this.validateEmail = this.validateEmail.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.clearEmailError = this.clearEmailError.bind(this);
    this.clearPasswordError = this.clearPasswordError.bind(this);

  };

  onDismiss() {
    this.setState({ visible: false, isLogin: '' });
  }

  handleChange = e => {
    let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

  }

    clearEmailError = e =>  {
        let fields = this.state.fields;
        let errors = this.state.errors;
        let formIsValid = true;

        if(e.target.name=="email"){
            errors["email"] = "";

            this.setState({
              errors: errors
            });

            return formIsValid;
        }
    }

      clearPasswordError = e =>  {
          let fields = this.state.fields;
          let errors = this.state.errors;
          let formIsValid = true;

          if(e.target.name=="password"){
              errors["password"] = "";

              this.setState({
                errors: errors
              });

              return formIsValid;
          }
    }

    validateLogin = e =>   {
      let fields = this.state.fields;
      let errors = this.state.errors;
      let formIsValid = true;
      if (!fields["email"] && !fields["password"]) {
          formIsValid = false;
          errors["email"] = "Please enter your email-ID.";
          errors["password"] = "Please enter your email-ID.";

          this.setState({
            errors: errors
          });

          return formIsValid;
      }
    }

  validateEmail = e =>   {
    let fields = this.state.fields;
    let errors = this.state.errors;
    let formIsValid = true;
    if (!fields["email"]) {
        formIsValid = false;
        errors["email"] = "Please enter your email-ID.";

        this.setState({
          errors: errors
        });

        return formIsValid;
    }

    if (typeof fields["email"] !== "undefined") {
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

        if (!pattern.test(fields["email"])) {
            formIsValid = false;
            errors["email"] = "Please enter valid email-ID.";
        }

        this.setState({
          errors: errors
        });
        return formIsValid;
    }
  }

    validatePassword = e =>   {
        let fields = this.state.fields;
        let errors = this.state.errors;
        let formIsValid = true;

        if (!fields["password"]) {
          formIsValid = false;
          errors["password"] = "Please enter your password.";

            this.setState({
              errors: errors
            });
          return formIsValid;
        }


        if (typeof fields["password"] !== "undefined") {
          if (!fields["password"].match(/^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=*><?_~]).*$/)) {
            formIsValid = false;
            errors["password"] = "Please enter secure and strong password .";
          }
            this.setState({
              errors: errors
            });
                 return formIsValid;
              }
      }


      componentDidMount() {
      }

       componentDidMountRole(){
        //var url=endpoints_properties.ENDPOINT_DEV_IDENTITY+api_properties.API_GET_USER_ROLES;
        var url=endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_USER_ROLES;

        //var url="https://o3xznf3iy6.execute-api.ap-south-1.amazonaws.com/dev/api/v1/users/role";
        axios.get(url, {
          params: {
            gts_user_id:this.state.gts_user_id
          }
        })
        .then(function (response) {
          this.setState({jobsString:this.getJobArrayTypo(response.data)});
          const roles=response.data;
          this.setState({
            roles,
                  });
        })
        .catch(function (error) {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
       }

  loginInvalid = () => {
    if (this.props.user.isLogin === false) {
      return (
        <Alert
          style={{ textAlign: 'center' }}
          color="danger"
          isOpen={this.props.user.visible}
        >
          {this.props.user.message}
        </Alert>
      );
    } else if (this.props.user.isLogin === true) {
      return (
        <>
          <Alert color="success" isOpen={this.props.user.visible}>
            {this.props.user.message}
          </Alert>
          {this.props.history.push('/Profile')}
        </>
      );
    }
  };

  submitUserLoginForm(e) {
    e.preventDefault();

    var validationResult;
    validationResult=true;
    var jsonPayLoad='';

    if (validationResult) {
      let fields = this.state.fields;
      var dataResponse='';
      var url=endpoints_properties.ENDPOINT_PROD+api_properties.API_LOGIN;

       var payload = {
         gts_user_email: fields["email"],
         gts_user_password: fields["password"]
       };

           axios.put(url,payload)
             .then(res => {
              dataResponse= res.data;
               let status_code = res.status;
               if(status_code===403){
                console.log(dataResponse);
                this.setState({
                  errors: dataResponse,
                  isLogin: false,
                  buttonDisable: false
                 });
               }
               if (status_code ===200) {
                var token = res.data.token;
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '').replace(/\\/g,'');
                var payload = JSON.parse(atob(base64));

                var sub = payload.sub;
                jsonPayLoad = JSON.parse(sub);


                let { history } = this.props

                if(jsonPayLoad.primary_role==='SERVICE_PROVIDER'){
                  window.location.href = '/gts/service-provider-profile';
                }

                if(jsonPayLoad.primary_role==='ADMIN'){
                  window.location.href = '/gts/admin-profile';
                }

               if(jsonPayLoad.primary_role==='SERVICE_CONSUMER'){
                 window.location.href = '/gts/service-consumer-profile';
               }

               if(jsonPayLoad.primary_role==='TRAINER'){
                 window.location.href = '/gts/trainer-profile';
               }

               if(jsonPayLoad.primary_role==='RECRUITER'){
                window.location.href = '/gts/recruiter-profile';
              }

              if(jsonPayLoad.primary_role==='TRAINEE'){
                window.location.href = '/gts/trainee-profile';
              }

                 this.setState({
                   isLogin: true,
                   buttonDisable: false,
                   gts_user_id: jsonPayLoad.user_id,
                   primary_role: jsonPayLoad.primary_role,
                   other_roles: jsonPayLoad.other_roles,
                   permissions: jsonPayLoad.permissions,
                   redirect : true
                 });
                   ls.set('jsonPayLoad',jsonPayLoad);
                   ls.set('gts_user_id',jsonPayLoad.user_id)
                   ls.set('token',res.data.token);

                   var personalURL=endpoints_properties.ENDPOINT_PROD+api_properties.API_GET_USER_PERSONAL_DETAILS+'/'+jsonPayLoad.user_id;
                   axios.get(personalURL,{ headers: {'Auth_Token' : `Bearer ${res.data.token}`} })
                  .then(res => {
                   ls.set('userPersonalDetails', res.data)
                   console.log(ls.get('userPersonalDetails'))
                  })
                  .catch(error =>{
                    ls.set('userPersonalDetails', '')
                  })
              }

                 else {
                 this.setState({
                   isLogin: false,
                   buttonDisable: false,
                   visible: true
                 });
                 let errors = this.state.errors;
                 errors["password"] = "Not able to login. Please contact the administrator.";
               }
              })
             .catch(err => {
             ls.set('token', "");
              let errors = this.state.errors;
              console.log(err.response)
              if(!err.response){
                errors["password"] = "Not able to login. Please contact the administrator";
              }
               else{
                 if(err.response.status > 500){
                  errors["password"] = "Not able to login. Please contact the administrator";
                 }
                 else{
                  errors["password"] = err.response.data.message;
                 }
               }
              this.setState({
               errors: errors,
               isLogin: false,
               buttonDisable: false
              });
            });
          }
  }

     render() {

        const errorMessageStyles = {
            //backgroundColor: "#f0f",
            //fontSize: someSize,
            color: "#ff4d4d",
            //padding: paddings
        }

        return (

          <>

            <div>
              <div class="d-flex justify-content-around">
              <div className="left">
              <Container className="left">
              <Row className="left mt-7 p-4">
                <Col lg="5">
              <Card border='primary'  style={{ width: '16rem' }} Align='left'>

    <Card.Body>

      <Card.Text>
        DON'T DELAY! JOIN US AND LET US HELP YOU GET YOU YOUR DREAM JOB!
      </Card.Text>
    </Card.Body>
  </Card>
  </Col></Row></Container></div>


              <Container
                className="pt-lg-md"
                // style={{ backgroundImage: `url(${backgroundImage})` }}

              >
                <Row className="justify-content-center mt-7">
                  <Col lg="5">
                  <div className="text-center text-muted mb-4">
                          <h1>Login Below</h1>
                        </div>
                        <Form method="put"  name="userloginForm"  onSubmit= {this.submitUserLoginForm} >

                          <FormGroup className="mb-3" controlId="formBasicEmail">
                          <FormLabel>Enter Email</FormLabel>

                              <FormControl
                                type="text"
                                name="email"
                                placeholder="abc@gmail.com"
                                value={this.state.fields.email}
                                onChange={this.handleChange}
                                onBlur={this.validateEmail}
                                onFocus={this.clearEmailError}
                              ></FormControl>

                          </FormGroup>

                          <FormGroup className="mb-3">
                            <div divID="emailError" style={errorMessageStyles}>{this.state.errors.email}</div>
                          </FormGroup>


                          <FormGroup className="mb-3" controlId="formBasicPassword">
                          <FormLabel>Enter Password</FormLabel>

                              <FormControl
                                type="password"
                                name="password"
                                placeholder="****************"
                                value={this.state.fields.password}
                                onChange={this.handleChange}
                                onBlur={this.validatePassword}
                                onFocus={this.clearPasswordError}
                              ></FormControl>

                          </FormGroup>

                          <FormGroup className="mb-3">
                            <div divID="passwordError" style={errorMessageStyles}>{this.state.errors.password}</div>
                          </FormGroup>

                          <div className="custom-control custom-control-alternative custom-checkbox">
                            <input
                              className="custom-control-input"
                              id=" customCheckLogin"
                              type="checkbox"
                            />
                          </div>

                          <div className="text-center">
                            <FormGroup>
                              <Button color="primary"  onChange={this.handleChange} onFocus={this.validateLogin} onBlur={this.clearPasswordError}> Log In </Button>
                            </FormGroup>
                          </div>

                          <Col>
                            <div>{this.loginInvalid()}</div>
                          </Col>
                        </Form>


                    {/* <Col className="text-justify-center" xs="6">
                      <div>Don't have an account?</div>
                      <div>
                        <Link to="/register"> Register here</Link>{' '}
                      </div>
                    </Col> */}

                  </Col>
                </Row>
              </Container>
            </div>
           </div>
          </>

        );
      }
    }

    const bgImage = {
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
     // backgroundImage: `url(${backgroundImage})`
    };



    const mapStateToProps = state => ({
      user: state.user
    });

    export default connect(mapStateToProps)(LoginComponent);
