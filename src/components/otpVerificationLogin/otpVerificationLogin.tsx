import "./otpVerificationLogin.css";
import "../../components/signUp/signUp.css";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducers/modalSlice";
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
    .min(3, "Must be between 3 to 5 digits")
    .max(5, "Must be between 3 to 5 digits"),
});

const OtpVerificationLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let showModal: any = useSelector((state: any) => state.modalStatus.value);
  const resRegOtp = useSelector((state: any) => state.verifyOtpReg);
  const enteredEmail = useSelector((state: any) => state.verifyEmail.email);
  const enteredEmailLogin = useSelector(
    (state: any) => state.FPverifyEmail.emailId
  );
  const initialvalues = {
    otp: "",
  };
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: (values) => {
        axios(
          `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/verifyEMail2fa`,
          {
            method: "put",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            data: {
              emailId: enteredEmailLogin,
              emailOtp: values.otp,
            },
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
        <div className="otpVerificationBody">
          {" "}
          <div className="otpVericationHead">
            <div className="otpVericationImg">
              <img src={require("../../assets/icn_verify_icon.png")} alt="" />
            </div>
            <div className="otpVerificationHEading">Verification</div>
            <div className="otpVericationContents">
              We just sent you the OTP via SMS to your email address/mobile no.
              You should get it soon!
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
                    <p className="form-errors">{errors.otp}</p>
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

export default OtpVerificationLogin;
