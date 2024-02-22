
//import { getCoordinates, getCity} from "../../utilities/GTSGeoLocations.js";


import React, { Component } from 'react';

import ls from 'local-storage';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faEdit, faUpload, faCalendar, faAngleRight} from '@fortawesome/free-solid-svg-icons'
import { MDBIcon } from 'mdbreact';
import { FormGroup, Row, NavLink, NavItem, Col, ButtonGroup } from 'reactstrap';
import { Form, FormControl, FormLabel, FormRow, Button, FormCheck } from 'react-bootstrap';

class GlobalHomePage extends Component {
  constructor(props) {
    super(props);
    ls.set('token', "");
  };

  componentDidMount() {

  }
  render() {

    //   var coordinates = getCoordinates();
    //   console.log("Coordinates: " + coordinates);

    //  var cityName = getCity(coordinates);
    //  console.log("cityName: "+cityName);


    const iconStyles = {
      // marginLeft:"100%",
      float: "left",
      clear: "left",
      height: "60px",
      width: "90px"
    }


    return (
      <>
        <Header />

        <div className="container align-items-center">      {/*MAIN class BORDER */}
          <div divID="icon" styles={iconStyles} align="right">
            {/* <i class="fas fa-map-marker-alt"></i> Location: <a href=" http://maps.google.com/?q=Bengaluru,IN" class="text-primary">Bengaluru</a> */}

            <img src={process.env.PUBLIC_URL + "/images/goraitech.jpg"}
              alt="pic" width="150px" class="iconStyles" align="left" />
          </div>

          <h1 className="text-left font-weight-bold underline" style={{ fontSize: "4.5rem" }}>GTS SERVICE PLATFORM</h1>
          <h5 class="text-left"><i>A PLATFORM FOR SERVICE PROVIDERS, SERVICE CONSUMERS, TRAINERS & TRAINEES</i></h5>


          {/*MAIN START BORDER */}

          {/*frist column start */}
          <div className="mt-5 m-5 ">
            {/*Second-Border-Main */}

            <div className="container">
              <div className='mt-5'>
                <div className="border m-4 p-4 border-dark" style={{ borderRadius: "20px" }}>
                  <h5 class="mb-3 text-center font-bold">WHO ARE WE?</h5>
                  <div class="column" divID="icon" styles={iconStyles} align="right">
                    <img src={process.env.PUBLIC_URL + "/images/who.jpg"}
                      alt="pic" width="100px" class="iconStyles" align="right" />
                  </div>
                  <dl class="row ">
                    <dd class="text-left">
                      Welcome! Our team at GTS Service is proud to present a new platform to connect Service Providers, Service Consumers, Trainers & Trainees from all over the world.
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="mt-5 mb-4">
                <div className="border m-4 p-4 border-dark" style={{ borderRadius: "20px" }}>
                  <h5 class="mb-3 text-center font-bold">WHAT WE DO?</h5>
                  <div class="column" divID="icon" styles={iconStyles} align="right">
                    <img src={process.env.PUBLIC_URL + "/images/what.jpg"}
                      alt="pic" width="100px" class="iconStyles" align="right" />
                  </div>
                  <dl class="row ">
                    <dd class="text-left">
                      Our service will help the individuals to search for jobs which is the most suitable for their skills. We will manage and connect various employers looking for fresh job seeking individuals like Engineers, Architects, Teachers, Drivers, Plumbers etc.
                    </dd>
                  </dl>
                </div>
              </div>
            </div>


            <div className="container">
              <div className='mt-5'>
                <div className="border m-4 p-4 border-dark" style={{ borderRadius: "20px" }}>
                  <h5 class="mb-3 text-center font-bold">HOW DO WE DO IT?</h5>
                  <div class="column" divID="icon" styles={iconStyles} align="right">
                    <img src={process.env.PUBLIC_URL + "/images/how.jpg"}
                      alt="pic" width="90px" class="iconStyles" align="right" />
                  </div>
                  <dl class="row ">
                    <dd class="text-left">
                      We utilise smart solutions using Artificial Intelligence(AI) and Machine Learning(ML) capabilities to find most suitable skilled resources for their desired job description</dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="mt-5">
                <div className="border m-4 pt-4 border-dark" style={{ borderRadius: "20px" }}>
                  <h5 class="mb-3 text-center font-bold">LOOK AT OUR STATISTICS!</h5>
                  <dl class="row text-left" className="pl-4">
                    <dd class="col-sm-7">No. of Service Providers on our platform: <span style={{ color: "blue", float: "right" }}>33,000</span></dd><br />
                    <dd class="col-sm-7">No. of Service Consumers on our platform: <span style={{ color: "blue", float: "right" }}>12,899</span></dd><br />
                    <dd class="col-sm-7">No. of Trainers on our platform: <span style={{ color: "blue", float: "right" }}>500</span></dd><br />
                    <dd class="col-sm-7">No. of Trainees on our platform: <span style={{ color: "blue", float: "right" }}>11,899</span></dd><br />
                    <dd class="col-sm-7">Services consumed by Service providers: <span style={{ color: "blue", float: "right" }}>24,750</span></dd><br />
                  </dl>
                </div>
              </div>
            </div>

            <div className="container">
              <div className="mt-5">
                <div className="border m-4 pt-4 border-dark" style={{ borderRadius: "20px" }}>
                  <h5 class="mb-3 text-center font-bold">Roles/Actions</h5>
                  <div class="row" className="pl-4">
                    <h6 class="font-bold">Service Consumer</h6>
                    <ul style={{ listStyleType: "circle" }}>
                      <li>
                        Service Consumer is any person who needs any kind of services from others,
                        for ex. Highly skilled professionals like: Software Engineer, Architect, Scientists etc.
                        and even other professionals like: Plumber, Electrician, Store boy, Daily Labor etc.
                        </li>
                      <li>
                        Consume services from people at best price.
                        </li>
                      <li>
                        Find out best skilled service providers for any day-to-day needs.
                        </li>
                      <li>
                        Consult Service Mediator/Expert for any help.
                        </li>
                    </ul>
                  </div>

                  <div class="row" className="pl-4">
                    <h6 class="font-bold">Service Provider</h6>
                    <ul style={{ listStyleType: "circle" }}>
                      <li>Service Provider is any person who provides any kind of services as a
                      Highly skilled professionals like: Software Engineer, Architect, Scientists etc.
                      and even other professionals like: Plumber, Electrician, Store boy, Daily Labor etc.
                      </li>
                      <li>
                        Provide services at best price.
                      </li>
                      <li>
                        Showcase your skills to genuine service consumers.
                      </li>
                      <li>
                        Consult with Service Mediator/Expert for any help.
                      </li>
                      <li>
                        Wish to provide any service or participate in any training programme.
                      </li>
                      <li>
                        Receive Service & Traning Recommendations.
                      </li>
                    </ul>
                  </div>

                  <div class="row" className="pl-4">
                    <h6 class="font-bold">Trainer</h6>
                    <ul style={{ listStyleType: "circle" }}>
                      <li>
                        Trainers have the opportunity to empower service providers through world class training.
                      </li>
                      <li>
                        Consult with Service Mediator/Expert for any help.
                      </li>
                      <li>
                        Search Trainees and receive the Trainee recommendations.
                      </li>
                      <li>
                        Wish to conduct Trainings(online/offline).
                      </li>
                    </ul>
                  </div>

                  <div class="row" className="pl-4">
                    <h6 class="font-bold">Trainee</h6>
                    <ul style={{ listStyleType: "circle" }}>
                      <li>
                        Trainee can search and apply for Training in order to learn new skills or to improve his current skills.
                      </li>
                      <li>
                        Consult with Service Mediator/Expert for any help.
                      </li>
                      <li>
                        Wish to participate in Trainings.
                      </li>
                      <li>
                        Wish to provide services.
                      </li>
                      <li>
                        Receive Training recommendations.
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>

            <div className="container">
              <div className='mt-5'>
                <div className="border m-4 pt-4 border-dark" style={{ borderRadius: "20px" }}>
                  <h5 class="mb-3 text-center font-bold">HEAR WHAT PEOPLE SAID ABOUT OUR PLATFORM</h5>

                  <div class="column" divID="icon" styles={iconStyles} align="left">
                    <img src={process.env.PUBLIC_URL + "/images/rev1.jpg"}
                      alt="pic" width="80px" class="iconStyles" align="left" />
                  </div>
                  <dl class="row" style={{ margin: "0" }}>
                    <dd class="text-left">
                      <i>
                        "I recently completed my Bachelors and had no idea how to approach and apply for jobs.
                        was the best decision,not only did they assist me in getting placed but also how to connect well with the employers."
                      </i>
                    </dd>
                  </dl>
                  <div align="center">
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star"></span>
                  </div>

                  <br />

                  <div class="column" divID="icon" styles={iconStyles} align="right">
                    <img src={process.env.PUBLIC_URL + "/images/rev2.jpg"}
                      alt="pic" width="80px" class="iconStyles" align="right" />
                  </div>
                  <dl class="row" style={{ margin: "0" }}>
                    <dd class="text-left">
                      <i>
                        "I was looking to hire fresh minds for our company and this platform greatly assisted in selecting the brightest minds for our company. The freshers now have branched out and running our companies in 3 continents!"
                      </i>
                    </dd>
                  </dl>
                  <div align="center">
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </div>

                  <br />

                  <div class="column" divID="icon" styles={iconStyles} align="left">
                    <img src={process.env.PUBLIC_URL + "/images/rev3.jpg"}
                      alt="pic" width="80px" height="50px" class="iconStyles" align="left" />
                  </div>
                  <dl class="row" style={{ margin: "0" }}>
                    <dd class="text-left">
                      <i>
                        "I loved cooking, and I always wanted to be a chef. But I found it difficult to find work as this was my only primary skill. Thanks to Chakuri, I am now working at my restaurant!"
                      </i>
                    </dd>
                  </dl>
                  <div align="center">
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                  </div>

                  <br />

                  <div class="column" divID="icon" styles={iconStyles} align="right">
                    <img src={process.env.PUBLIC_URL + "/images/rev4.jpg"}
                      alt="pic" width="80px" height="50px" class="iconStyles" align="right" />
                  </div>
                  <dl class="row" style={{ margin: "0" }}>
                    <dd class="text-left">
                      <i>
                        "I only know how to drive cars and trucks.
                        Now I drive for large company and making very good salary. Chakuri help me find good company. This is very good website"
                      </i>
                    </dd>
                  </dl>
                  <div align="center">
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star"></span>
                    <span class="fa fa-star"></span>
                  </div>

                  <br />

                  <div class="column" divID="icon" styles={iconStyles} align="left">
                    <img src={process.env.PUBLIC_URL + "/images/rev5.jpg"}
                      alt="pic" width="80px" height="45px" class="iconStyles" align="left" />
                  </div>
                  <dl class="row" style={{ margin: "0" }}>
                    <dd class="text-left">
                      <i>
                        "The very best. Chakuri is worth much more than I paid for an other platform. Very easy to use."
                      </i>
                    </dd>
                  </dl>
                  <div align="center">
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                    <span class="fa fa-star" style={{ color: "orange" }}></span>
                  </div>

                  <br />
                  <br />
                </div>

                <div className="text-center">
                  <h5>
                    Let us help you to Provide and Consume services with the people all over the World!
                    Register now to give us the opportunity to help you to give and take services at best price!
                    </h5>
                </div>
              </div>
              <div class="wrapper">
                <div className="text-center">
                  <ButtonGroup>
                    <NavLink className="nav-link-icon" to="/gts/register" tag={Link}>
                      <button class="btn btn-light">Register</button>
                    </NavLink>
                    <NavLink className="nav-link-icon" to="/gts/login" tag={Link}>
                      <button class="btn btn-light">Login</button>
                    </NavLink>
                  </ButtonGroup>
                </div>
              </div>
              <div className="text-center">
                <dd>-------------------------------------------------------OR-------------------------------------------------------</dd>
              </div>
              <div className="text-center font-bold">
                <h3>Check out our search engines</h3>
              </div>

              <div className="text-center">
                <ButtonGroup vertical>
                  <Button variant="outline-dark" style={{ borderRadius: "20px" }}>Search Service Consumers<FontAwesomeIcon icon={faAngleRight} style={{float:"right"}}/></Button>
                  <Button variant="outline-dark" style={{ borderRadius: "20px" }}>Search Service Providers<FontAwesomeIcon icon={faAngleRight} style={{float:"right"}}/></Button>
                  <Button variant="outline-dark" style={{ borderRadius: "20px" }}>Search Service Mediators/Experts<FontAwesomeIcon icon={faAngleRight} style={{float:"right"}}/></Button>
                  <Button variant="outline-dark" style={{ borderRadius: "20px" }}>Search Trainings<FontAwesomeIcon icon={faAngleRight} style={{float:"right"}}/></Button>
                  <Button variant="outline-dark" style={{ borderRadius: "20px" }}>Search Services<FontAwesomeIcon icon={faAngleRight} style={{float:"right"}}/></Button>
                </ButtonGroup>
              </div>
            </div>


            <div class="container">
              <div className='mt-5 mb-3'>
                <h3 className="text-left font-bold">TRENDING TRAINING PROGRAMS IN BANGALORE</h3>
                <div className="border m-2  border-dark" >
                  <div class="w-100 h-50">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner center">
                        <div class="carousel-item active ">
                          <img class="d-block w-100 h-50" src={"/images/training.jpg"} alt="First slide" />
                        </div>
                        <div class="carousel-item ">
                          <img class="d-block w-100 h-50" src={"/images/training2.jpg"} alt="Second slide" />
                        </div>

                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <br />

            <div class="container">
              <div className='mt-5 mb-3'>
               <h3 className="text-left font-bold">TRENDING SKILL SET</h3>
                <div className="border m-2  border-dark" >
                  <div class="w-100 h-50">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner center">
                        <div class="carousel-item active ">
                          <img class="d-block w-100 h-50" src={"/images/skill.jpg"} alt="First slide" />
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="container">
              <div className='mt-5 mb-3'>
                <h3 className="text-left font-bold">TRENDING SERVICE PROVIDERS IN BANGALORE</h3>
                <div className="border m-2  border-dark" >
                  <div class="w-100 h-50">
                    <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                      <div class="carousel-inner center">
                        <div class="carousel-item active ">
                          <img class="d-block w-100 h-50" src={"/images/serviceProviders.jpg"} alt="First slide" />
                        </div>

                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>


        <Footer />

      </>
    );
  }
}

export default GlobalHomePage;