import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css"; // Import CSS for styling
import { Link } from "react-router-dom";
import ImageCarousel from "./ImageCarousel";
import logoimg from "../../assets/images/logo-img.png";
import "animate.css";
// import * as WOW from "wowjs";

const logo = new URL("../../assets/images/logo.png", import.meta.url).href;



const Home = () => {
  const logoScrollRef = useRef(null);
  useEffect(() => {
    // new WOW.WOW().init();
  }, []);

  useEffect(() => {
    const scroll = () => {
      if (logoScrollRef.current) {
        logoScrollRef.current.scrollLeft += 1;
        if (
          logoScrollRef.current.scrollLeft >=
          logoScrollRef.current.scrollWidth / 2
        ) {
          logoScrollRef.current.scrollLeft = 0;
        }
      }
    };
    const interval = setInterval(scroll, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="secon-header-01 animate__animated animate__backInDown" data-wow-delay="0.1s">
        <div className="wrapper">
          <div className="second-header-01-navbar-menu">

            <Link to="/login"><img src={logoimg} alt="" /></Link>

            <h1 className="company-name">Doc-GenieAI</h1>


            <Link to="/login" className="login">Login</Link>
          </div>
        </div>
      </div>

      <section className="hero-banner ">


        <div className="wrapper">
          <div className="hero-top-section animate__animated animate__swing" data-wow-delay="0.3s">
            <h1 className="hero-title">Welcome to DocGenieAI</h1>
            <p className="hero-subtitle">
              Fast, Secure & Automated Document Access for Financial Professionals
            </p>
          </div>

          <div className="feature-box container">
            <div className="feature-box-row">
              <div className="feature-box-col-01 animate__animated animate__fadeInLeft" data-wow-delay="0.5s">
                <div className="feature-box-content">
                  <h3>📁 Easy Document Management</h3>
                  <p>
                    Admins can securely upload user-specific documents like PAN,
                    Aadhar, ITR Returns, GST, and more.
                  </p>
                </div>
              </div>
              <div className="feature-box-col-01 animate__animated animate__fadeInUp" data-wow-delay="0.7s">
                <div className="feature-box-content">
                  <h3>🤖 WhatsApp Bot Integration</h3>
                  <p>
                    Users can instantly fetch their documents via WhatsApp, reducing
                    admin workload and improving efficiency.
                  </p>
                </div>
              </div>

              <div className="feature-box-col-01 animate__animated animate__fadeInRight" data-wow-delay="0.8s">
                <div className="feature-box-content">
                  <h3>🔒 Bank-Grade Security</h3>
                  <p>
                    Data is encrypted and stored on AWS & Azure, ensuring the highest
                    level of security and reliability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="technologies-content animate__animated animate__fadeInRight" data-wow-delay="1s"> 
            <h2 className="section-title">Technologies We Use</h2>
            <ImageCarousel />
          </div>


        </div>


      </section>

      {/* <section className="tech-section text-center">
       
        
      </section> */}

      <footer className="footer text-center">
        <p>&copy; 2025 DocuSwift. All rights reserved.</p>
      </footer>



    </>
  );
};

export default Home;
