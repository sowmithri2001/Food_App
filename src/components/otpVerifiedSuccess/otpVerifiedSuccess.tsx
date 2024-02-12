import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/reducers/modalSlice";
import "./otpVerifiedSuccess.css";

const OtpVerifiedSuccess = () => {
  const resRegDetails = useSelector((state: any) => state.regDetails);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  return (
    <>
      <div className="otpVerifiedSuccessContainer">
        <div className="signUpClose">
          <div>
            <img
              src={require("../../assets/close_button.png")}
              alt=""
              onClick={() => dispatch(closeModal())}
            />
          </div>
        </div>
        <div className="otpSuccessContent">
          <div className="otpSuccessImage">
            <img
              src={require("../../assets/icn_register_success.png")}
              alt=""
              className="registerSuccess"
            />
          </div>
          <div className="registerSuccessText">
            <div className="successWelcomeText">Great</div>
            <div className="successEmailText">
              You have created an account
            </div>
          </div>
          <div className="successBrowserButton">
            <input
              type="submit"
              value="Login Now"
              className="successBrowserText"
              onClick={() => navigate('/login')}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerifiedSuccess;
