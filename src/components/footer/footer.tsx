import { useNavigate } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="footerContainer">
        <div className="footerTop">
          <div className="footerLeft">
            <div className="footerLogo">LOREM</div>
          </div>
          <div className="footerRight">
            <div className="footerRightOne">
              <div className="footerCities">
                <span className="footerCount">24</span> CITIES
              </div>
              <div className="footerCountries">
                <span className="footerCount">4</span> COUNTRIES
              </div>
            </div>
            <div className="footerRightTwo">
              <img
                src={require("../../assets/flag-logo.jpg")}
                alt=""
                className="footerFlag"
              />
              <img
                src={require("../../assets/flag-logo.jpg")}
                alt=""
                className="footerFlag"
              />
              <img
                src={require("../../assets/flag-logo.jpg")}
                alt=""
                className="footerFlag"
              />
              <img
                src={require("../../assets/flag-logo.jpg")}
                alt=""
                className="footerFlag"
              />
            </div>
            <div className="footerRightThree">
              <i className="fa-brands fa-google-plus-g"></i>
              <i className="fa-brands fa-facebook-f"></i>
              <i className="fa-brands fa-linkedin-in"></i>
              <i className="fa-brands fa-twitter"></i>
            </div>
          </div>
        </div>
        <div className="footerBottom">
          <div className="footerBottomContents">About</div>
          <div className="footerBottomContents">Careers</div>
          <div className="footerBottomContents" onClick={() => {
            navigate('/PrivacyPolicy')
            window.scrollTo(0, 0)
          }}>Privacy policy</div>
          <div className="footerBottomContents" onClick={() => {
            navigate("/termsAndCondition")
            window.scrollTo(0, 0)
          }}>Terms & Condition</div>
          <div className="footerBottomContents">Mobile app</div>
          <div className="footerBottomContents">Blog</div>
          <div className="footerBottomContents" onClick={() => {
            navigate("/contactForm")
            window.scrollTo(0, 0)
          }}>Contact</div>
          <div className="footerBottomContents">Sitemap</div>
        </div>
      </div>
    </>
  );
};

export default Footer;
