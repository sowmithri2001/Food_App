import { inputLabelClasses, MenuItem, TextField } from "@mui/material";
import "./otpVerified.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  regDetailsAsyncThunk,
  storePass,
} from "../../redux/reducers/regDetailsSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import codeOptions from "../../data/codes";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
export const signUpSchema = Yup.object({
  firstName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),
  lastName: Yup.string().min(2).max(25).required("Please enter your last name"),
  mobileNumber: Yup.string()
    .required()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits"),
  password: Yup.string()
    .matches(PASSWORD_REGEX, "Please enter strong password")
    .required("Please enter password"),
});

const OtpVerified = () => {
  const options = codeOptions;

  const [code, setCode] = useState("india");

  const handleChangeMui = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };
  const dispatch = useDispatch();
  const enteredEmail = useSelector((state: any) => state.verifyEmail.email);
  const initialValues = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    password: "",
  };
  const resRegDetails = useSelector((state: any) => state.verifyOtpReg);
  const navigate = useNavigate();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        const mobile = "+91" + values.mobileNumber;
        action.resetForm();
        axios(
          `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/register`,
          {
            method: "post",
            headers: {
              Accept: "application/json, text/plain, */*",
              "Content-Type": "application/json",
            },
            data: {
              firstName: values.firstName,
              lastName: values.lastName,
              emailId: enteredEmail,
              mobileNo: mobile,
              password: values.password,
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
                navigate("/signup/verifyotp/verified/done");
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
    });

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(storePass(e.target.password.value));
  };
  const [password, setPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setPassword(!password);
  };

  return (
    <>
      <div className="OtpVerifiedContainer">
        <div className="verifiedBack">
          <img
            src={require("../../assets/back.png")}
            alt=""
            className="backButtonon"
          />
        </div>
        <div className="verifiedBodyContent">
          <div className="verifiedHeader">
            <div className="verifiedTitle">Verified!</div>
            <div className="verifiedText">
              <div className="verifiedTextOne">Your Email is verified.</div>
              <div className="verifiedTextTwo">
                Finally enter details below to create account.
              </div>
            </div>
          </div>
          <form
            className="otpVerifiedForm"
            onSubmit={(e: any) => {
              handleSubmit();
              submitHandler(e);
            }}
          >
            <div className="verifiedFirstName">
              <TextField
                id="standard-basic"
                name="firstName"
                label="First Name"
                variant="standard"
                value={values.firstName}
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
              {errors.firstName && touched.firstName ? (
                <p className="form-error-verified">{errors.firstName}</p>
              ) : null}
            </div>

            <div className="verifiedLastName">
              <TextField
                id="standard-basic"
                label="Last Name"
                name="lastName"
                variant="standard"
                value={values.lastName}
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
              {errors.lastName && touched.lastName ? (
                <p className="form-error-verified">{errors.lastName}</p>
              ) : null}
            </div>

            <div className="verifiedMobileNumber">
              <TextField
                id="standard-select-code"
                select
                value={code}
                onChange={handleChangeMui}
                helperText=""
                variant="standard"
                sx={{
                  width: 100,
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "black",
                  },
                  "& .MuiInput-underline:after": {
                    borderBottomColor: "#0000007f",
                  },
                  "& .MuiFormLabel-root.Mui-disabled": {
                    color: "red",
                  },
                  textAlign: "left",
                  marginTop: "16px",
                }}
                InputLabelProps={{
                  sx: {
                    textAlign: "left",
                    // set the color of the label when not shrinked
                    color: "black",
                    [`&.${inputLabelClasses.shrink}`]: {
                      // set the color of the label when shrinked (usually when the TextField is focused)
                      color: "#0000008a",
                    },
                  },
                }}
              >
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-basic"
                label="."
                variant="standard"
                name="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{
                  width: 0.75,
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
                    color: "transparent",
                    [`&.${inputLabelClasses.shrink}`]: {
                      // set the color of the label when shrinked (usually when the TextField is focused)
                      color: "transparent",
                    },
                  },
                }}
              />
              {errors.mobileNumber && touched.mobileNumber ? (
                <p className="form-error-verified">{errors.mobileNumber}</p>
              ) : null}
            </div>

            <div className="verifiedPassword">
              <TextField
                id="standard-basic"
                label="Create Password"
                name="password"
                variant="standard"
                type={password ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
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

              <img
                src={require("../../assets/eye_on.png")}
                alt="eye"
                className="toggleEye"
                onClick={togglePassword}
              />
              {errors.password && touched.password ? (
                <p className="form-error-verified">{errors.password}</p>
              ) : null}
            </div>

            <div className="VerifiedButton">
              <input type="submit" value="DONE" className="verifiedDoneText" />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default OtpVerified;
