import { inputLabelClasses, MenuItem, TextField } from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";

import DownloadAppSubHeader from "../../components/downloadAppSubHeader/downloadAppSubHeader";
import "./contactForm.css";
import axios from "axios";
const ContactForm = () => {
  const initialvalues = {
    Name: "",
    email: "",
    ContactNumber: "",
    EntityName: "",
    EnitityArea: "",
    EntityCity: "",
    Message: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalues,

    onSubmit: (values) => {
      axios(
        `http://lorem-env.eba-vjfwziew.ap-northeast-1.elasticbeanstalk.com/Lorem/resetPassword`,
        {
          method: "put",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
          },
          data: {
            role: "Customer",
            message: values.Message,
            name: values.Name,
            contactEmailId: values.email,
            contactMobileNumber: values.ContactNumber,
            entityCity: values.EntityCity,
            entityArea: values.EnitityArea,
            categoryType: currency

          },
        }
      )
        .then((res) => {
          if (res) {
            alert(res.data);
          }
        })
        .catch((err) => {
          alert(err.response.data);
        });
    },

  });
  const [merchantValue, setmerchantValue] = useState(true);
  const options = [
    {
      value: "Inquiry",
      label: "Inquiry",
    },
    {
      value: "Restaurant Details",
      label: "Restaurant Details",
    },
    {
      value: "More Info",
      label: "More Info",
    },
    {
      value: "Complaint",
      label: "Complaint",
    },
  ];

  const [currency, setCurrency] = useState("Inquiry");

  const handleChangeMui = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(event.target.value);
  };

  return (
    <>
      <div className="contactFormContainer">
        <DownloadAppSubHeader />

        <div className="contactFormContent">
          <div className="contactFormBanner">
            <img
              src={require("../../assets/about_banner 2.png")}
              alt="aboutBanner"
              className="bannerImage"
            />
            <span className="bannerHead">We’d love to hear from you</span>
            <span className="bannerText">
              Get in touch to discover what we can do for you.
            </span>
          </div>
          <div className="formDiv">
            <div className="formHeader">
              <div
                className="merchantNavDiv"
                onClick={() => setmerchantValue(true)}
              >
                <span className="text">Merchant</span>
                {merchantValue && <div className="underline"></div>}
              </div>
              <div
                className="customerNavDiv"
                onClick={() => setmerchantValue(false)}
              >
                <span className="text">Customer</span>
                {!merchantValue && <div className="underline"></div>}
              </div>
            </div>
            <form className="formBox" onSubmit={(e: any) => {
              handleSubmit();
            }}>
              <div className="line1">
                <TextField
                  name="Name"
                  id="standard-basic"
                  label="Name"
                  variant="standard"
                  value={values.Name}
                  onChange={handleChange}
                  onBlur={handleBlur}

                  required
                  sx={{
                    width: 0.45,
                    minWidth: "300px",
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
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#0000008a",
                      },
                    },
                  }}
                />
                <TextField
                  name="EntityName"
                  id="standard-basic"
                  label="Entity Name"
                  value={values.EntityName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  variant="standard"
                  sx={{
                    width: 0.45,
                    minWidth: "300px",
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
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#0000008a",
                      },
                    },
                  }}
                />
              </div>
              <div className="line2">
                <TextField
                  name="email"
                  id="standard-basic"
                  label="Contact Email-id"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  variant="standard"
                  sx={{
                    width: 0.45,
                    minWidth: "300px",
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
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#0000008a",
                      },
                    },
                  }}
                />
                <TextField
                  name="ContactNumber"
                  id="standard-basic"
                  required
                  label="Contact Number"
                  value={values.ContactNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  sx={{
                    width: 0.45,
                    minWidth: "300px",
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
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#0000008a",
                      },
                    },
                  }}
                />
              </div>
              <div className="line3">
                <TextField
                  name="EnitityArea"
                  id="standard-basic"
                  required
                  label="Enitity Area"
                  value={values.EnitityArea}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  sx={{
                    width: 0.45,
                    minWidth: "300px",
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
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#0000008a",
                      },
                    },
                  }}
                />
                <TextField
                  name="EntityCity"
                  id="standard-basic"
                  required
                  label="Entity City"
                  value={values.EntityCity}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  variant="standard"
                  sx={{
                    width: 0.45,
                    minWidth: "300px",
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
                      color: "black",
                      [`&.${inputLabelClasses.shrink}`]: {
                        // set the color of the label when shrinked (usually when the TextField is focused)
                        color: "#0000008a",
                      },
                    },
                  }}
                />
              </div>
              <div className="line4">
                <TextField
                  id="standard-select-currency"
                  select
                  label="Query Category"
                  value={currency}
                  onChange={handleChangeMui}
                  helperText=""
                  variant="standard"
                  sx={{
                    width: 0.45,
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
              </div>
              <TextField
                name="Message"
                id="standard-basic"
                required
                label="Message"
                value={values.Message}
                onChange={handleChange}
                onBlur={handleBlur}
                variant="standard"
                sx={{
                  width: 1,
                  minWidth: "300px",
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
                    color: "black",
                    [`&.${inputLabelClasses.shrink}`]: {
                      // set the color of the label when shrinked (usually when the TextField is focused)
                      color: "#0000008a",
                    },
                  },
                }}
              />
              <div className="buttonDiv">
                <button className="sendButton">SEND</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
