import {
  Autocomplete,
  inputLabelClasses,
  MenuItem,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import countries from "../../data/countryList";
import "./mobileBox.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { NavLink, useNavigate } from "react-router-dom";
import codeOptions from "../../data/codes";
import axios from "axios";

const MobileBox = () => {
  let countriesList: any = countries;

  //yup
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = yup.object({
    number: yup
      .string()
      .matches(phoneRegExp, "Please Enter a valid Mobile Number")
      .required("Please enter your Mobile Number"),
  });

  const initialValues = { number: "" };

  const onSubmit = (values: any) => {
    alert(JSON.stringify(values.number));
    const mobile = "+91" + values.number;

    axios(
      `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/mobiles2fa`,
      {
        method: "put",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        data: {
          mobileNo: mobile,
        },
      }
    )
      .then((res) => {
        if (res) {
          alert(res.data);
          if (res.status === 200) {
            navigate("/login/forgotpassword");
          }
        }
      })
      .catch((err) => {
        alert(err.response.data);
      });
  };
  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  const navigate = useNavigate();

  //codes
  const options = codeOptions;

  const [code, setCode] = useState("india");

  const handleChangeMui = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };
  const handleSubmites = (e: any) => {
    e.preventDefault();
  };
  return (
    <>
      <form
        className="emailBoxContainer"
        onSubmit={(e: any) => {
          formik.handleSubmit();
          handleSubmites(e);
        }}
      >
        <div className="mobileInputDiv">
          <TextField
            id="standard-select-code"
            select
            value={code}
            onChange={handleChangeMui}
            helperText=""
            variant="standard"
            sx={{
              width: 100,
              "& .MuiInput-underline:before": { borderBottomColor: "black" },
              "& .MuiInput-underline:after": { borderBottomColor: "#0000007f" },
              "& .MuiFormLabel-root.Mui-disabled": {
                color: "red",
              },
              textAlign: "left",
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
            name="number"
            value={formik.values.number}
            onChange={formik.handleChange}
            id="standard-basic"
            label="."
            variant="standard"
            sx={{
              width: 0.75,
              "& .MuiInput-underline:before": { borderBottomColor: "black" },
              "& .MuiInput-underline:after": { borderBottomColor: "#0000007f" },
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
          <div className="phoneErrorMessage">
            {formik.touched.number && formik.errors.number
              ? formik.errors.number
              : ""}
          </div>
        </div>
        <button className="sendOtpButton" type="submit">
          SEND OTP
        </button>
      </form>
    </>
  );
};

export default MobileBox;
