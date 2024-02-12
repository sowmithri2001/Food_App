import "../otpVerificationLogin/otpVerificationLogin.css";
import "../../components/signUp/signUp.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducers/modalSlice";
import "./verifyMobile.css";
import {
  Navigate,
  NavLink,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import SignUp from "../signUp/signUp";
import forgotPasswordEmailSlice, {
  storeOtp,
} from "../../redux/reducers/forgotPasswordEmailSlice";
import { registerOtpAsyncThunk } from "../../redux/reducers/registerOtpSlice";
import axios from "axios";
import * as yup from "yup";
import { useFormik } from "formik";
const validationSchema = yup.object({
  otp: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(4, "Must be exactly 4 digits")
    .max(6, "Must be exactly 4 digits"),
});

const VerifyMobile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //   const mobile = useSelector((state: any) => state.getProfile.num);
  let showModal: any = useSelector((state: any) => state.modalStatus.value);
  const resRegOtp = useSelector((state: any) => state.verifyOtpReg);
  const enteredEmail = useSelector((state: any) => state.verifyEmail.email);
  const enteredEmailLogin = useSelector(
    (state: any) => state.FPverifyEmail.emailId
  );
  //   console.log("mobile", mobile);

  const initialvalues = {
    otp: "",
  };
  const profileData = useSelector((state: any) => state.getProfile);
  const profile =
    profileData && profileData.data && profileData.getProfile.data;
  const mobileNo = profile && profile.mobileNumber;
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: (values) => {
        const mobile = "+91" + mobileNo;
        console.log("mobile", mobile);
        const formData = new FormData();
        formData.append("mobileNo", mobile);
        formData.append("otpNumber", values.otp);
        axios(
          `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/verifyMobile2fa`,
          {
            method: "put",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            data: formData,
          }
        )
          .then((res) => {
            if (res) {
              alert(res.data);

              if (res.status === 200) {
                navigate("/login/forgotpassword/verification");
              }
            }
          })
          .catch((err) => {
            alert(err.response.data);
          });
      },
      validationSchema: validationSchema,
    });
  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(storeOtp(e.target.otp.value));
  };
  return (
    <>
      <div className="otpVericationContainer">
        <div className="signUpClosess">
          <div>
            <img
              src={require("../../assets/Shape@2x.png")}
              alt=""
              className="backImg"
              onClick={() => navigate("/forgotPassword")}
            />
          </div>
        </div>
        <div
          className="otpVerificationBodys"
          style={{ backgroundColor: "white" }}
        >
          {" "}
          <div className="otpVericationHead">
            <div className="otpVericationImg">
              <img src={require("../../assets/icn_verify_icon.png")} alt="" />
            </div>
            <div className="otpVerificationHEading">Verification</div>
            <div className="otpVericationContents">
              We just sent you the OTP via SMS to your mobile no.
              <br /> You should get it soon!
            </div>
          </div>
          <div className="otpVericationForm">
            <form
              className="otpFormContainer"
              onSubmit={(e: any) => {
                handleSubmit();
                submitHandler(e);
              }}
            >
              <div className="otpVerificationFormContents">
                <div className="otpTxtField">
                  <TextField
                    id="standard-basic"
                    label="Enter OTP"
                    variant="standard"
                    name="otp"
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ width: 1 }}
                  />
                </div>
                <div className="createAccBtn">
                  <button className="createAccountBtn">
                    <div className="NavTxt">Verify</div>
                  </button>
                  {errors.otp && touched.otp ? (
                    <p className="form-errorss">{errors.otp}</p>
                  ) : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyMobile;
