import "./otpVerification.css";
import "../../components/signUp/signUp.css";
import { inputLabelClasses, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducers/modalSlice";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import SignUp from "../signUp/signUp";
import { useFormik } from "formik";
import * as yup from "yup";
import { storeEmail } from "../../redux/reducers/registerSlice";
import { registerOtpAsyncThunk } from "../../redux/reducers/registerOtpSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const validationSchema = yup.object({
  otp: yup
    .string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(3, "Must be between 3 to 5 digits")
    .max(5, "Must be between 3 to 5 digits"),
});

const OtpVerification = () => {
  const [respData, setRespData] = useState(false);
  const enteredEmail = useSelector((state: any) => state.verifyEmail.email);
  const resRegOtp = useSelector((state: any) => state.verifyOtpReg);
  const navigate = useNavigate();

  const dispatch = useDispatch();
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
              emailId: enteredEmail,
              emailOtp: values.otp,
            },
          }
        )
          .then((res) => {
            if (res) {
              //alert(res.data);
              toast.success(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
              });
              if (res.status === 200) {
                navigate("/signup/verifyotp/verified");
              }
            }
          })
          .catch((err) => {
            //alert(err.response.data);
            toast.error(err.response.data, {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          });
      },
      validationSchema: validationSchema,
    });

  let showModal: any = useSelector((state: any) => state.modalStatus.value);

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="otpVericationContainer">
        <div className="signUpClose">
          <div>
            <img
              src={require("../../assets/close_button.png")}
              alt=""
              onClick={() => dispatch(closeModal())}
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
                    label="OTP"
                    variant="standard"
                    name="otp"
                    value={values.otp}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{
                      width: 1,
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "black",
                      },
                      "& .MuiInput-underline:after": {
                        borderBottomColor: "#0000007f",
                      },
                      "& .MuiFormLabel-root.Mui-disabled": {
                        color: "red",
                      },
                    }}
                    InputLabelProps={{
                      sx: {
                        // set the color of the label when not shrinked
                        color: "#0000008a",
                        [`&.${inputLabelClasses.shrink}`]: {
                          // set the color of the label when shrinked (usually when the TextField is focused)
                          color: "#0000008a",
                        },
                      },
                    }}
                  />
                </div>
                <div className="createAccBtn">
                  <button className="createAccountBtn">Verify</button>
                </div>
                {errors.otp && touched.otp ? (
                  <p className="form-error">{errors.otp}</p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default OtpVerification;
