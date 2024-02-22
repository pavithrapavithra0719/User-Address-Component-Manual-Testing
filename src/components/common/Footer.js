import React from 'react';
import styled from 'styled-components';

function Footer() {

  return (
    <FooterContainer className="main-footer">
      <div className="footer-middle">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a class="text-white font-bold" >Services By Location:</a></h5>
                <p><a class=" text-white" >Services in Bangalore</a></p>
                <p><a class=" text-white" >Services in Chennai</a></p>
                <p><a class=" text-white" >Services in Kerala</a></p>
                <p><a class=" text-white" >Services in Delhi</a></p>
                <p><a class=" text-white" >Services in Mumbai</a></p>
              </ul>
            </div>

            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a class="text-white font-bold" >Popular Searches:</a></h5>
                <li><p><a class=" text-white" >Data Analytics in Bangalore</a></p></li>
                <li><p><a class=" text-white" >Front End Developer in Mumbai</a></p></li>
                <li><p><a class=" text-white" >Truck Drivers in Rajasthan</a></p></li>
                <li><p><a class=" text-white" >Business Consultants in Delhi</a></p></li>
                <li><p><a class=" text-white" >Supply chain Manager in Kerala</a></p></li>
              </ul>
            </div>

            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a class="text-white font-bold">More on GTS Platform:</a></h5>
                <li><p><a href="https://ggtech.co.in/about-us" class=" text-white" >About Us</a></p></li>
                <li><p><a href="https://ggtech.co.in/privacy-policy" class=" text-white" >Privacy and Policy</a></p></li>
                <li><p><a href="https://www.naukri.com/faq/job-seeker?utm_source=footer" class=" text-white" >FAQ</a></p></li>
                <li><p><a href="https://www.naukri.com/termsconditions" class=" text-white" >Terms and Conditions</a></p></li>
                <li><p><a href="mailto: hr.gts@ggtech.co.in" class=" text-white" >Feedback</a></p></li>
              </ul>
            </div>

            <div className="col-md-3 pt-2">

              <ul className="list-unstyled">
                <h5><a href="/ContactUs" class="text-white font-bold" >Contact Us :</a></h5>
                <li><p><a href="mailto: hr.gts@ggtech.co.in" class=" text-white" target="_blank">hr.gts@ggtech.co.in</a></p></li>
                <li><p onClick="window.open('tel:+91 9739403914');"><a href="#" class=" text-white" >+91 9739403914</a></p></li>
                <li><p><a href="https://www.facebook.com/GoraiGlobalTechnology/" class="fb-ic  text-white" target="_blank"><i class="fab fa-facebook-f fa-lg white-text mr-3"> </i>Facebook</a></p></li>
                <li><p><a href="https://www.twitter.com" class="tw-ic text-white"><i class="fab fa-twitter fa-lg white-text mr-3"> </i>Twitter</a></p></li>
                <li><p><a href="https://www.instagram.com" class="ins-ic text-white"><i class="fab fa-instagram fa-lg white-text mr-3"> </i>Instagram</a></p></li>
                <li><p><a href="https://in.linkedin.com/company/goraitechnologysolutions" class="li-ic text-white" target="_blank"><i class="fab fa-linkedin-in fa-lg white-text mr-3"> </i>linkedin</a></p></li>
                {/* <li><p><a href="" class="yo-ic text-white" ><i class="fab fa-youtube fa-lg white-text mr-3"> </i>Youtube</a></p></li> */}
              </ul>
            </div>

          </div>{/* row */}

          <div class="container-fluid">
            <div className="row">
              <div className="col">
                <h5 class="text-white">Get it on your Mobile phone on</h5>
              </div>
              <div className="col-2">
               <a href="https://play.google.com/store/apps/details?id=com.gts.chakuri.JobSeeker">
                  <img src="https://ridesharetax.com.au/wp-content/uploads/Get_it_on_Google_play.png"
                  class="img-fluid" alt="Responsive Image"
                  width="150" height="300"
                  />
                </a>
              </div>
              <div className="col-1">
                <h6 class="text-white text-center">OR</h6>
              </div>
              <div className="col-2">
                <a href="https://www.apple.com/in/app-store/">
                  <img src="https://www.medsurety.com/wp-content/uploads/2019/09/apple-store-button.png"
                  class="img" alt="Responsive Image" width="150" height="200"
                  />
                </a>
              </div>

              <div className="col text-right pt-4">
                <p className="text ">
                  &copy;GTS 2021
                </p>
              </div>

            </div>
          </div>

        </div> {/*container */}

      </div>{/*Footer Midder */}

    </FooterContainer>
  );

}
export default Footer;

const FooterContainer = styled.footer`
.footer-middle
{
    background: #007bff;
    padding -top:6rem;
    color: #fff;

}
.footer-bottom{
    padding-top: 3rem;
    padding-bottom: 2rem;
}

`;
