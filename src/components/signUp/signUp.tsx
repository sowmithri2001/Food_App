import { inputLabelClasses, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { closeModal } from "../../redux/reducers/modalSlice";
import "./signUp.css";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import * as yup from "yup";
import {
  emailAsyncThunk,
  storeEmail,
} from "../../redux/reducers/registerSlice";
import { useEffect, useState } from "react";
import axios from "axios";
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter a Email"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const initialvalues = {
    email: "",
  };
  const resEmail = useSelector((state: any) => state.verifyEmail);
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: (values: any) => {
        dispatch(storeEmail(values.email));
        axios(
          `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/emails2fa`,
          {
            method: "put",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            data: { emailId: values.email },
          }
        )
          .then((res) => {
            if (res) {
              // alert(res.data);
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
                navigate("/signup/verifyotp");
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
  const dispatch = useDispatch();

  let showModal: any = useSelector((state: any) => state.modalStatus.value);
  const submitHandler = (e: any) => {
    e.preventDefault();
  };
  const [errorColor, seterrorColor] = useState("#000");

  useEffect(() => {
    errors?.email === "Please enter a Email"
      ? seterrorColor("#f00")
      : seterrorColor("#000");
  }, [errors]);

  return (
    <>
      {" "}
      <div className="signUpContainer">
        <div className="signUpClose">
          <div>
            <img
              src={require("../../assets/close_button.png")}
              alt=""
              onClick={() => dispatch(closeModal())}
            />
          </div>
        </div>
        <div className="signUpContents">
          <div className="signUpHeading">
            <div className="signUpHead">Create your account</div>
            <div className="signUpHeadContent">
              Share your email address to send you the OTP to get yourself
              registered!
            </div>
          </div>
          <div className="signUpForm">
            <form
              className="formContainer"
              onSubmit={(e: any) => {
                handleSubmit();
                submitHandler(e);
              }}
            >
              <div className="signUpInput">
                <div className="txtField">
                  <div className="loginOneFiled">
                    <TextField
                      id="standard-basic"
                      label="Email"
                      variant="standard"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      sx={{
                        width: 1,
                        "& .MuiInput-underline:before": {
                          borderBottomColor: `${errorColor}`,
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#0000007f",
                        },
                        "& .MuiFormLabel-root.Mui-disabled": {
                          color: "red",
                          borderBottomColor: "#f00",
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
                  {errors.email && touched.email ? (
                    <p className="loginOneError">{errors.email}</p>
                  ) : null}
                  <div className="errorValidation" id="inName">
                    Incorrect Name
                  </div>
                </div>
                <div className="createAccBtn">
                  <button type="submit" className="createAccountBtn">
                    Create account
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="signUpBottom">
            <div className="termsConditions">
              By registering you agree to the{" "}
              <span className="spanText">Terms & Conditions</span>
            </div>
            <div className="googleFace">
              <button className="googleBtnLogin" disabled={true}>
                Google+
              </button>

              <button className="facebookBtnLogin" disabled={true}>
                FaceBook
              </button>
            </div>
            <div className="loginLink">
              Already have an account?{" "}
              <span className="spanText" onClick={() => navigate("/login")}>
                Login
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
