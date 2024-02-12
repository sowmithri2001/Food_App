import React, { useState } from "react";
import { inputLabelClasses, MenuItem, Radio, TextField } from "@mui/material";
import "./choseAddress.css";
import codeOptions from "../../data/codes";
import { useNavigate } from "react-router-dom";
import { stepperValue } from "../../redux/reducers/cartStepperSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  getAddressAsyncThunk,
  setPrimaryAddressAsyncThunk,
} from "../../redux/reducers/profileSlice";
import {
  setContactName,
  setContactNo,
  setdelivery,
  setdeliveryInstruction,
} from "../../redux/reducers/choseAddresViewSlice";
import "../../components/profileAddress/profileAddress.css";
const ChoseAddress = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let e = [1, 2];
  let myAddressArray = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getAddress &&
      state.getProfile.getAddress.data &&
      state.getProfile.getAddress.data.addressDetailsList
  );
  let myAddressArrays = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getAddress &&
      state.getProfile.getAddress.data
  );
  let myAddressCount = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getAddress &&
      state.getProfile.getAddress.data &&
      state.getProfile.getAddress.data.count
  );
  const [selectedValue, setSelectedValue] = useState<any>("homeDelivery");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const [tickValue, settickValue] = useState(false);
  const tickFn = (i: any) => {
    settickValue(!tickValue);
  };
  const options = codeOptions;

  const [code, setCode] = useState("india");

  const handleChangeMui = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  //set contact
  const [contactName, setcontactName] = useState<any>("");
  const [contactNo, setcontactNo] = useState<any>("");
  const [deliveryInst, setdeliveryInst] = useState<any>("");
  return (
    <>
      <div className="choseAddressContainer">
        <div className="topDliveryFormatDiv">
          <span className="deliveryDubHead">
            How would you like us to get your meal to you?
          </span>
          <div className="deliveryMethodsDiv">
            <div className="deliveryBox">
              <img
                src={require("../../assets/deliver_icon@3x.png")}
                alt="icn"
                className="deliveryBoxImg"
              />
              <div className="optionOne">
                <Radio
                  checked={selectedValue === "homeDelivery"}
                  onChange={handleChange}
                  value="homeDelivery"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Best Offers" }}
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
                <span className="optionTextStyling">Deliver to me</span>
              </div>
            </div>
            <div className="PickUpBox">
              <img
                src={require("../../assets/pick_up_icon@3x.png")}
                alt="icn"
                className="pickUpBoxImg"
              />
              <div className="optionTwo">
                <Radio
                  checked={selectedValue === "pickUp"}
                  onChange={handleChange}
                  value="pickUp"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Best Offers" }}
                  sx={{
                    color: "#000",
                    "&.Mui-checked": {
                      color: "#000",
                    },
                  }}
                />
                <span className="optionTextStyling">Pick Up</span>
              </div>
            </div>
          </div>
        </div>
        <div className="myAdressDiv">
          <div className="myAdreesTop">
            <span className="myAdressText">
              My Addresses ({myAddressCount})
            </span>
            <div
              className="AddNewAddressButton"
              onClick={() => navigate("/profileDetails/profileaddress")}
            >
              ADD NEW
            </div>
          </div>
          <div className="adressBoxesDiv">
            {myAddressArray &&
              myAddressArray.map((e: any, i: any) => {
                return (
                  <div className="addressBoxes" key={i}>
                    <div className="tickBox">
                      {e.primaryAddress ? (
                        <div className="profileAddressStatus">
                          <img
                            src={require("../../assets/icn_check-black.png")}
                            alt=""
                            className="icnCheckBlack"
                          />
                          <div className="addressStatusText">
                            primary {e.primaryAddress}
                          </div>
                        </div>
                      ) : (
                        <div
                          className="profileAddressStatus"
                          onClick={() => {
                            dispatch(setPrimaryAddressAsyncThunk(e.addressId));
                            dispatch(getAddressAsyncThunk());
                          }}
                        >
                          <img
                            src={require("../../assets/icn_check copy.png")}
                            alt=""
                            className="icnCheckBlack"
                          />
                          <div className="addressStatusTextNot">
                            Primary {e.primaryAddress}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="details">
                      <span className="addressType">{e.addressType}</span>
                      <span className="addressPlaceText">
                        {e.addressDesc}, {e.area}, {e.city}
                      </span>
                    </div>
                    <div className="buttonsEditDelete">
                      <span className="editButtonAddress">Edit</span>
                      <span className="deleteButtonAddress">Delete</span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
        <div className="contactDetailsFormDiv">
          <span className="ContactDetailsHead">Contact Details</span>
          <div className="formLine1">
            <TextField
              name="Pname"
              id="standard-basic"
              label="Name"
              variant="standard"
              value={contactName}
              onChange={(e: any) => {
                setcontactName(e.target.value);
              }}
              sx={{
                width: 0.6,
                minWidth: 250,
                "& .MuiInput-underline:before": { borderBottomColor: "black" },
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
          <div className="formLine2">
            <span className="mobileNumberLabel">Mobile No.</span>
            <div className="formLine2inputDivs">
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
                name="Pname"
                id="standard-basic"
                variant="standard"
                value={contactNo}
                onChange={(e: any) => {
                  setcontactNo(e.target.value);
                }}
                sx={{
                  width: 0.4,
                  minWidth: 250,
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
          </div>
          <div className="formLine3">
            <TextField
              name="deliveryInstruction"
              id="standard-basic"
              label="Delivery Instructions"
              variant="standard"
              placeholder="Mnetion Here..."
              value={deliveryInst}
              onChange={(e: any) => {
                setdeliveryInst(e.target.value);
              }}
              sx={{
                width: 1,
                minWidth: 250,
                "& .MuiInput-underline:before": { borderBottomColor: "black" },
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
          <div className="buttonLine">
            <button
              className="backButton"
              onClick={() => {
                let value: any = 25;
                dispatch(stepperValue(value));
                navigate("/proceedToPayment");
              }}
            >
              BACK
            </button>
            <button
              className="choseAdressButton"
              onClick={() => {
                let value: any = 100;
                dispatch(stepperValue(value));
                dispatch(setdelivery(selectedValue));
                dispatch(setContactName(contactName));
                dispatch(setContactNo(contactNo));
                dispatch(setdeliveryInstruction(deliveryInst));
                navigate("/proceedToPayment/selectPaymentMethod");
              }}
            >
              CHOSE PAYMENT
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChoseAddress;
