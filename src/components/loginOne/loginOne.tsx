import { inputLabelClasses, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "./loginOne.css";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducers/modalSlice";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import ForgotPassword from "../forgotPassword/forgotPassword";
import loginEmailSlice, {
  loginEmailAsyncThunk,
} from "../../redux/reducers/loginEmailSlice";
import RestaurantList from "../../views/restaurantList/restaurantList";
import axios from "axios";
import sessionStorage from "redux-persist/es/storage/session";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter a Email"),
  password: yup
    .string()
    //.matches(PASSWORD_REGEX, "Please enter strong password")
    .required("Please enter password"),
});

const LoginOne = () => {
  const [response, setResponse] = useState(false); 
  const loginDetails = useSelector((state: any) => state.verifyLoginEmail.data);

  const navigate = useNavigate();
  const initialvalues = {
    email: "",
    password: "",
  };
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: (values: any) => {
        axios(
          `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/authenticate`,
          {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            data: {
              emailId: values.email,
              password: values.password,
            },
          }
        )
          .then((res) => {
            if (res) {
              // alert(res.data);
              toast.success("Login Success", {
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
                sessionStorage.setItem(
                  "jwtToken",
                  loginDetails &&
                    loginDetails.data &&
                    loginDetails.data.jwttoken
                );
                dispatch(closeModal());
                navigate("/");
              }
            }
          })
          .catch((err) => {
            // alert(err.response.data);
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
  const [password, setPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setPassword(!password);
  };
  const dispatch = useDispatch();

  const submitHandler = (e: any) => {
    e.preventDefault();
    setResponse(true);

    dispatch(
      loginEmailAsyncThunk({
        emailId: e.target.email.value,
        password: e.target.password.value,
      })
    );
  };

  // const responseHandler = () => {
  //   if (loginDetails && loginDetails.status === 200) {
  //     toast.success("Login Success", {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   } else {
  //     JSON.stringify(loginDetails) !== "{}" &&
  //       toast.error(loginDetails, {
  //         position: "top-center",
  //         autoClose: 5000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //         theme: "colored",
  //       });
  //   }
  // };

  // useEffect(() => {
  //   response && responseHandler();
  // }, [loginDetails, response]);

  return (
    <>
      <div className="loginContainer">
        <div className="loginClose">
          <img
            src={require("../../assets/close_button.png")}
            alt=""
            onClick={() => {
              navigate("/");
              dispatch(closeModal());
            }}
          />
        </div>
        <div className="LoginOneContent">
          <div className="loginOneText">Lets get started!</div>
          <form
            className="loginOneFormM"
            onSubmit={(e: any) => {
              handleSubmit();
              submitHandler(e);
            }}
          >
            <div className="loginOneForm">
              <div className="loginOneFeild">
                <TextField
                  id="standard-basic1"
                  label="Email"
                  name="email"
                  variant="standard"
                  value={values.email}
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
                {errors.email && touched.email ? (
                  <p className="loginOneError">{errors.email}</p>
                ) : null}
              </div>
              <div className="loginTxtImg">
                <div className="loginOneFeild">
                  <TextField
                    id="standard-basic2"
                    label="Password"
                    type={password ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    variant="standard"
                    autoComplete="off"
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
                {errors.password && touched.password ? (
                  <p className="loginOneError">{errors.password}</p>
                ) : null}
                <img
                  src={require("../../assets/icn_view_inactive.png")}
                  alt=""
                  className="passwordImg"
                  onClick={togglePassword}
                />
              </div>
            </div>
            <NavLink to="/forgotpassword" className="forgetText">
              Forgot Password?
            </NavLink>
            <button className="loginOneLogin">LOGIN</button>
          </form>
          <div className="loginWhole">
            <div className="googleFace">
              <button className="facebookBtnLogin" disabled={true}>
                Facebook
              </button>
              <button className="googleBtnLogin" disabled={true}>
                Google+
              </button>
            </div>
            <div className="LoginAccount">
              <div className="noAccount">Dont have an account?</div>
              <NavLink to="/signup" className="getOne">
                Get one now!
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginOne;
