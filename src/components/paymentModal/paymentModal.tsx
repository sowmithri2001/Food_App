import { inputLabelClasses, TextField } from "@mui/material";
import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
const validationSchema = yup.object({
  cardNumber: yup
    .string()
    .required("Please enter a city name")
    .min(12, "Must be exactly 12 digits")
    .max(12, "Must be exactly 12 digits"),
  nameOncard: yup.string().required("Please enter a correct name"),
  securityCard: yup
    .string()
    .required(
      "Please enter the correct expiry details and security card number"
    )
    .min(3, "Must be exactly 3 digits")
    .max(3, "Must be exactly 3 digits"),
});
const PaymentModal = () => {
  const initialvalues = {
    cardNumber: "",
    nameOncard: "",
    expiryMonth: "",
    expiryYear: "",
    securityCard: "",
  };
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalues,
    onSubmit: (values) => { },
    validationSchema: validationSchema,
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      {" "}
      <div className="addAddressBody">
        <form
          className="addAddressFormContainer"
          onSubmit={(e: any) => {
            handleSubmit();
            submitHandler(e);
          }}
        >
          <div className="addAddressFields">
            {" "}
            <TextField
              id="standard-basic"
              label="Card number"
              name="cardNumber"
              variant="standard"
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
            <div className="addNewCardModalError">{errors.cardNumber}</div>
          </div>

          <div className="addAddressFields">
            {" "}
            <TextField
              id="standard-basic"
              label="Name on card"
              name="nameOncard"
              variant="standard"
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
            <div className="addNewCardModalError">{errors.nameOncard}</div>
          </div>
          <div className="TotalParent">
            <div className="ExpiryAndSecurityParent">
              <div className="cardDetailsContainer">
                <span className="expiryOfCard"> Expiry</span>
                <div className="cardExpiryDetails">
                  {/* <div className="addAddressFields"> */}{" "}
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="MM"
                    name="expiryMonth"
                    sx={{
                      width: 0.15,
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
                  /{" "}
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="YYYY"
                    name="expiryYear"
                    sx={{
                      width: 0.25,
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
                  <div className="cardSecurityCard">
                  </div>
                </div>
              </div>

              <div className="cardSecurityContainer">
                <span className="expiryOfCard">Security card</span>
                <div className="cardExpiryDetails">
                  <div className="cardSecurityCard">{" "}
                    <TextField
                      id="standard-basic"
                      variant="standard"
                      name="securityCard"
                      sx={{
                        width: 0.8,
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
                </div>
              </div>
            </div>
            <div className="addNewCardModalError">{errors.securityCard}</div>
          </div>

          <div className="addAddressSubmit">
            <button className="addAddressSubBtn">SAVE CARD</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentModal;
