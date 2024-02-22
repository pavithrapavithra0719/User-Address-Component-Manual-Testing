import React from 'react';
import { endpoints_properties } from '../../properties/EndPointsProperties.js';
import { api_properties } from '../../properties/APIProperties.js';
// reactstrap components
import {
  Button,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  Alert,
  ButtonGroup
} from 'reactstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Card, CardBody, CardText, FormControl, FormLabel, FormCheck } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignRight, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import "./../../css/tooltip.scss";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

class RegistrationComponent extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  constructor(props) {
    super(props);
    this.state = {
      user: 0,
      isServiceProvider: false,
      isServiceConsumer: false,
      isTrainer: false,
      isTrainee: false,
      defaultRole: 'none',
      gts_user_id: '',
      email: '',
      password: '',
      role: '',
      confirmPassword: '',
      registrationError: '',
      registrationSuccess: '',
      buttonDisabled: false,
      message: '',
      isError: '',
      errors: {},
      responses: {},
      visible: false,
      roleError: '',
      defaultRoleError: '',
      roleSuccess: '',
    };
    this.onRadioChange = this.onRadioChange.bind(this);
  }

  

  onRadioChange = (e) => {
    if (e.target.value == "ServiceProvider") {
      this.setState({
        defaultRole: e.target.value,
        isServiceProvider: true
      });
    }
    if (e.target.value == "ServiceConsumer") {
      this.setState({
        defaultRole: e.target.value,
        isServiceConsumer: true
      });
    }
    if (e.target.value == "Trainee") {
      this.setState({
        defaultRole: e.target.value,
        isTrainee: true
      });
    }
    if (e.target.value == "Trainer") {
      this.setState({
        defaultRole: e.target.value,
        isTrainer: true
      });
    }
  }
  //analyse why we need this?
  toggleChangeServiceProvider = () => {
    this.setState(prevState => ({
      isServiceProvider: !prevState.isServiceProvider
    }));
  }

  toggleChangeServiceConsumer = () => {
    this.setState(prevState => ({
      isServiceConsumer: !prevState.isServiceConsumer
    }));
  }

  toggleChangeTrainee = () => {
    this.setState(prevState => ({
      isTrainee: !prevState.isTrainee
    }));
  }

  toggleChangeTrainer = () => {
    this.setState(prevState => ({
      isTrainer: !prevState.isTrainer
    }));
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  }

  inputOnChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearEmailError = e => {
    let responses = this.state.responses;
    let errors = this.state.errors;
    let formIsValid = true;

    if (e.target.name == "email") {
      errors["email"] = "";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (e.target.name == "registrationError") {
      responses["registrationError"] = "";
      this.setState({
        responses: responses
      });
      return formIsValid;
    }
  }

  clearPasswordError = e => {
    let responses = this.state.responses;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Field name: "+e.target.name)

    if (e.target.name == "password") {
      errors["password"] = "";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (e.target.name == "registrationError") {
      responses["registrationError"] = "";
      this.setState({
        responses: responses
      });
      return formIsValid;
    }
  }

  clearConfirmPasswordError = e => {
    let responses = this.state.responses;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Field name: "+e.target.name)

    if (e.target.name == "confirmPassword") {
      errors["confirmPassword"] = "";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (e.target.name == "registrationError") {
      responses["registrationError"] = "";
      this.setState({
        responses: responses
      });
      return formIsValid;
    }
  }

  validateEmail = e => {
    let responses = this.state.responses;
    let errors = this.state.errors;
    let formIsValid = true;

    //alert("Validate Email: "+this.state.email)

      responses["registrationError"] = "";
      this.setState({
        responses: responses
      });
      return formIsValid;
    

    if (!this.state.email) {
      //alert("Enter email")
      formIsValid = false;
      errors["email"] = "Please enter your email-ID.";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (typeof this.state.email !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

      if (!pattern.test(this.state.email)) {
        formIsValid = false;
        errors["email"] = "Please enter valid email-ID.";
      }
      this.setState({
        errors: errors
      });
      return formIsValid;
    }
  }

  validatePassword = e => {
    let errors = this.state.errors;
    let formIsValid = true;

    if (!this.state.password) {
      //alert("Enter valid password")
      formIsValid = false;
      errors["password"] = "Please enter your password.";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (typeof this.state.password !== "undefined") {
      if (!this.state.password.match(/^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=*><?_~]).*$/)) {
        formIsValid = false;
        errors["password"] = "Please enter secure and strong password .";
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    }
  }

  validateConfirmPassword = e => {
    let errors = this.state.errors;
    let formIsValid = true;

    if (!this.state.confirmPassword) {
      //alert("Enter valid password")
      formIsValid = false;
      errors["confirmPassword"] = "Please confirm your  password.";
      this.setState({
        errors: errors
      });
      return formIsValid;
    }

    if (typeof this.state.confirmPassword !== "undefined") {
      if (!this.state.confirmPassword.match(/^.*(?=.{8,20})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&+=*><?_~]).*$/)) {
        formIsValid = false;
        errors["confirmPassword"] = "Please enter secure and strong password .";
        this.setState({
          errors: errors
        });
        return formIsValid;
      }

      if (this.state.password != this.state.confirmPassword) {
        errors["confirmPassword"] = "Password & Confirm-Password must be same.";
        this.setState({
          errors: errors
        });
        return formIsValid;
      }
    }
  }

  onSubmitHandler = e => {

    e.preventDefault();
    var validationResultOfForm = this.formIsValid;

    let responses = this.state.responses;
    var url = endpoints_properties.ENDPOINT_DEV+api_properties.API_REGISTER;

    var payload = {

      "gts_user_email": this.state.email,
      "gts_user_password": this.state.password,
      "gts_user_status": true,
      "gts_user_login_tries": 0
    };

    axios
      .post(url, payload)
      .then(response => {
        this.setState({
          gts_user_id: response.data.gts_user_id
        })

        if (validationResultOfForm == false) {
          responses["registrationError"] = response.data.message;
          this.setState({
            responses: responses
          });
        }
        else {
          let user_id = this.state.gts_user_id;
          console.log(response.data)
          if(response.data.status_code == 400 || response.data.status_code == 404 ){
            responses["registrationError"] = response.data.message
          }
          else{
            var ro = this.onSubmitHandlerRole(user_id, e);
            alert(ro)
            if (ro === true) {
              alert("Registerd")
              responses["registrationSuccess"] = "Registration is successful";
              this.setState({
                responses: responses
              });
            }   
          }
        }
      })
      .catch(error => {
        if(error.response){
          if(error.response.data.status_code == 400 || error.response.data.status_code == 404 ){
            responses["registrationError"] = error.response.data.message;
            this.setState({
              responses: responses
            });
          }
          else{
            responses["registrationError"] = "Error while Registering! Please Try again...";
              this.setState({
                responses: responses
              });
            }
          }
          else{
            responses["registrationError"] = "Error while Registering! Please Try again...";
          }
      });
  };


  onSubmitHandlerRole(user_id, e) {
    let responses = this.state.responses;
    var arr = [];
    console.log("userId inside handler method: " + user_id);
    if (this.state.isServiceProvider === true) {
      arr.push(2);
    }
    if (this.state.isServiceConsumer === true) {
      arr.push(3);
    }
    if (this.state.isTrainee === true) {
      arr.push(6);
    }
    if (this.state.isTrainer === true) {
      arr.push(4);
    }

    if (arr.length === 0) {
      this.state.errors.roleError = "Please select atleast one role";
    }

    let listOfRoles = arr.toString();
    console.log("list of roles: " + listOfRoles);

    var defaultRole = 0
    if (this.state.defaultRole === "ServiceProvider") {
      defaultRole = 2;
    }
    else if (this.state.defaultRole === "ServiceConsumer") {
      defaultRole = 3;
    }
    else if (this.state.defaultRole === "Trainee") {
      defaultRole = 6;
    }
    else if (this.state.defaultRole === "Trainer") {
      defaultRole = 4;
    }

    if (defaultRole == 0) {
      this.state.errors.defaultRoleError = "Please select one default role";
    }

    e.preventDefault();
    var RoleValidationResult = arr.length>0 && defaultRole>0;

    var url2 = endpoints_properties.ENDPOINT_DEV+ api_properties.API_ADD_ROLES;
    var rolesPayload = [];

    for (var i = 0; i < arr.length; i++) {
      let role_id = arr[i];
      let isPrimary = 0;

      if (role_id === defaultRole) {
        isPrimary = 1;
      }

      var userRole = {
        "gts_role_id": role_id,
        "gts_user_role_is_primary": isPrimary
      };

      rolesPayload[i] = userRole;
      var userRoles = {
        "gts_user_id": user_id,
        "userRole":rolesPayload
      };  
    }
    console.log("rolesPayload: " + JSON.stringify(rolesPayload));

    if(RoleValidationResult == true){
    axios 
      .post(url2, userRoles)
      .then(response => {
        console.log(response.data);
        let message = response.message;
          return true;
      })
      .catch(error => {
        console.log(error.response.data);
        responses["registrationError"] = "Not able to add roles.";
        this.setState({
          responses: responses
        });
        return false;
      });
      return true;
    }
    else{
      return false;
      responses["registrationError"] = "Not able to add roles.";
        this.setState({
          responses: responses
        });
    }
  };

 
  
  render() {

    const errorMessageStyles = {
      //backgroundColor: "#f0f",
      fontWeight: 'bold',
      fontSize: 18,
      color: "#ff4d4d",
      //padding: paddings
    }

    const successMessageStyles = {
      //backgroundColor: "#f0f",
      fontWeight: 'bold',
      fontSize: 18,
      color: "#008000",
      //padding: paddings
    }
    
    return (
      <>
        {/* <DemoNavbar /> */}
        <main ref="main">
          <section className="section section-shaped section-lg">

            <div class="d-flex justify-content-around">
              <div Align="left">
                <Container className="pt-lg-md p-4">
                  <Row className="mt-7">
                    <Col >
                      <Card border="primary" style={{ width: '20rem' }}>
                        <Card.Body>
                          <Card.Text>
                            <dl>
                              <font className="text-primary"><i>
                                <dd>  By Registering with our platform, you will get the following opportunities:</dd>
                                <dd>  * Connect with the People throughout the world in order to provide and consume services with each other in best price.</dd>
                                <dd>  * Showcase your skills to the genuine service consumers.</dd>
                                <dd>  * Find out the best skilled service providers for your any day to day needs.</dd>
                                <dd>  * Best service recommendations for your daily needs.</dd>
                                <dd>  * Appropriate Training recommendations for service providers.</dd>
                                <dd>  * Recommendations for top qualified service providers.</dd>
                                <dd>  * Trainers have the opportunity to empower service providers through world class trainings.</dd>
                              </i>
                              </font>
                            </dl>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Container>
              </div>

              <Container className="pt-lg-md">
                <div className="pt-4">
                  <h1 className="font-bold underline">Register Below</h1>
                </div>
                <Row className="justify-content-center mt-4">
                  <Col className="col-6">
                    <Card border="primary" style={{ width: '25rem' }}>
                      <Card.Body>
                        <Form method="post" name="handler" onSubmit={this.onSubmitHandler}>
                          <FormGroup className="mb-3" controlId="formBasicEmail">
                            <FormLabel>Enter Email-</FormLabel>
                            <InputGroup>
                              <Input
                                type="text"
                                name="email"
                                id="email"
                                className="form-control"
                                placeholder="monoranjang@gmail.com"
                                value={this.state.email}
                                onChange={this.inputOnChangeHandler}
                                onBlur={this.validateEmail}
                                onFocus={this.clearEmailError}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <div divID="emailError" style={errorMessageStyles}>{this.state.errors.email}</div>
                          </FormGroup>

                          <FormGroup className="mb-3" controlId="formBasicPassword" style={{clear:"both"}} >
                            <FormLabel>Enter Password</FormLabel>
                            <InputGroup>

                              <Input
                                type="password"
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="**********"
                                value={this.state.password}
                                onChange={this.inputOnChangeHandler}
                                onBlur={this.validatePassword}
                                onFocus={this.clearPasswordError}
                              />
                            </InputGroup>
                            <OverlayTrigger placement="bottom" overlay={
                              <Tooltip
                              className="mytooltip"
                              style={{backgroundColor:"white",border:"none"}}
                              >
                                <h6>Password must have:</h6>
                                <div style={{textAlign:"left",width:"95%",margin:"auto"}}>
                                    &#9913; At least <span style={{color:"red"}}>8</span> characters.<br/>
                                    &#9913; At least <span style={{color:"red"}}>one lower case</span> letter.<br/> 
                                    &#9913; At least <span style={{color:"red"}}>one upper case</span> letter.<br/> 
                                    &#9913; At least <span style={{color:"red"}}>one number</span>.<br/> 
                                    &#9913; At least <span style={{color:"red"}}>one special character</span> &#160;&#160;&#160;&#160;like !@#$%^&#38;+=*&#62;&#60;?_~<br/> 
                                </div>
                              </Tooltip>
                                  }
                            >
                                <FontAwesomeIcon icon={faInfoCircle} style={info} />
                            </OverlayTrigger>
                          </FormGroup>
                          
                          <FormGroup className="mb-3">
                            <div divID="passwordError" style={errorMessageStyles}>{this.state.errors.password}</div>
                          </FormGroup>

                          <FormGroup className="mb-3" controlId="formBasicPassword">
                            <FormLabel>Re-enter Password</FormLabel>
                            <InputGroup>
                              <Input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className="form-control"
                                placeholder="Confirm Password"
                                value={this.state.confirm_password}
                                onChange={this.inputOnChangeHandler}
                                onBlur={this.validateConfirmPassword}
                                onFocus={this.clearConfirmPasswordError}
                              />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup className="mb-3">
                            <div divID="confirmPasswordError" style={errorMessageStyles}>{this.state.errors.confirmPassword}</div>
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <div divID="registrationError" style={errorMessageStyles}>{this.state.responses.registrationError}</div>
                          </FormGroup>

                          <FormGroup className="mb-3">
                            <div divID="registrationSuccess" style={successMessageStyles}>{this.state.responses.registrationSuccess}</div>
                          </FormGroup>

                          <div className="text-center">
                            <Button className="mt-4" color="primary" type="submit" style={{ borderRadius: "8px" }}>
                              Register
                          </Button>
                          </div>
                        </Form>
                        <p style={{textAlign:"center"}}>OR</p>
                        <div className="text-center">
                          <ButtonGroup vertical>
                            <Button outline color="primary" style={{ borderRadius: "12px" }}><i class="fab fa-google fa-fw"></i>Join with Google</Button>
                            <Button outline color="primary" style={{ borderRadius: "12px" }}><i class="fab fa-facebook fa-fw"></i>Join with Facebook</Button>
                            <Button outline color="primary" style={{ borderRadius: "12px" }}><i class="fab fa-linkedin fa-fw"></i>Join with Linkedin</Button>
                          </ButtonGroup>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                    <Col className="col-6">

                      <dl>
                        <dd>
                          Select Role(You can have multiple, but please state one role as your default as well) :
                        </dd>
                      </dl>

                      <form>

                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isServiceProvider}
                                onChange={this.toggleChangeServiceProvider}
                                className="form-check-input"
                              />
                                  Service Provider
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="ServiceProvider"
                                checked={this.state.defaultRole === "ServiceProvider"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div></div><br />


                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isServiceConsumer}
                                onChange={this.toggleChangeServiceConsumer}
                                className="form-check-input"
                              />
                                  Service Consumer
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="ServiceConsumer" checked={this.state.defaultRole === "ServiceConsumer"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div>
                        </div><br />

                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isTrainee}
                                onChange={this.toggleChangeTrainee}
                                className="form-check-input"
                              />
                                  Trainee
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="Trainee" checked={this.state.defaultRole === "Trainee"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div>
                        </div><br />


                        <div class="row">
                          <div class="col">
                            <label className="form-check-label">
                              <input type="checkbox"
                                checked={this.state.isTrainer}
                                onChange={this.toggleChangeTrainer}
                                className="form-check-input"

                              />
                                  Trainer
                              </label>
                          </div>
                          <div class="col">
                            <label>
                              <input type="radio" value="Trainer" checked={this.state.defaultRole === "Trainer"}
                                onChange={this.onRadioChange}
                              />
                                  Default
                              </label>
                          </div></div><br />
                      </form>
                      <FormGroup className="mb-3">
                        <div divID="roleError" style={errorMessageStyles}>{this.state.errors.roleError}</div>
                        <div divID="defaultRoleError" style={errorMessageStyles}>{this.state.errors.defaultRoleError}</div>
                      </FormGroup>
                      <FormGroup className="mb-3">
                        <div divID="roleSuccess" style={errorMessageStyles}>{this.state.errors.roleSuccess}</div>
                      </FormGroup>


                    </Col>
                   </Row>
                </Container>


            </div>
          </section>
        </main>

        {/* <SimpleFooter /> */}
      </>
    );
  }
}

const bgImage = {
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  //backgroundImage: `url(${backgroundImage})`
};

const info = {
  color: "lightblue",
  width: "10px",
  cursor: "pointer",
  float: "right"
};
export default RegistrationComponent;


