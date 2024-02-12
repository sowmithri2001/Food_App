import { inputLabelClasses, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import { closeScheduleModal } from "../../redux/reducers/scheduleModalSlice";
import "./profileAddress.css";
import "../../views/home/home.css";

import * as yup from "yup";
import { Formik, useFormik } from "formik";
import {
  addAddressAsyncThunk,
  deleteAddressAsyncThunk,
  editAddressAsyncThunk,
  getAddressAsyncThunk,
  setPrimaryAddressAsyncThunk,
} from "../../redux/reducers/profileSlice";
import NoPastOrders from "../noPastOrders/noPastOrders";

const validationSchema = yup.object({
  city: yup.string().required("Please enter a city name"),
  area: yup.string().required("Please enter an area"),
  addressDesc: yup.string().required("Please enter the correct address"),
  addressType: yup.string().required("Please enter an address label"),
});
const ProfileAddress = () => {
  const [show, setShow] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [edit, setEdit] = useState(false);
  const getAddressData = useSelector(
    (state: any) => state.getProfile.getAddress
  );
  const getAddressMapData =
    getAddressData &&
    getAddressData.data &&
    getAddressData.data.addressDetailsList;

  const addAddressData = useSelector(
    (state: any) => state.getProfile.addAddress
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddressAsyncThunk());
  }, [dispatch]);

  const handleClose = () => {
    setShow(false);
  };

  const initialvalues = {
    city: "",
    area: "",
    addressDesc: "",
    addressType: "",
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialvalues,
      onSubmit: (values) => {
        //alert(JSON.stringify(values));
        dispatch(
          addAddressAsyncThunk({
            addressType: values.addressType,
            city: values.city,
            area: values.area,
            addressDescription: values.addressDesc,
            lattitude: "13.361300",
            longitude: "74.708370",
          })
        );
        setShow(false);
        window.location.reload();
      },
      validationSchema: validationSchema,
    });
  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  const e = [1, 2, 3];
  const rec = [1, 2];

  //editaddress

  const [selectedAddressState, setselectedAddressState] = useState<any>({
    city: "",
    area: "",
    addressDesc: "",
    addressType: "",
  });

  const editAdressFn = (i: any) => {
    let selectedAddress = getAddressMapData[i];
    setselectedAddressState(selectedAddress);
    setShowEditModal(true);
    setEdit(true);
  };

  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  const [modalStatuss, setmodalStatuss] = useState(false);
  const [setAddressId, setSetAddressId] = useState(false);

  const handleCloses = () => {
    setmodalStatuss(false);
  };
  console.log("hghghj", getAddressMapData && getAddressMapData);

  return (
    <>
      <div className="profileAddressContainer">
        <div className="profileAddressContents">
          <div className="profileAddressTitle">
            <div className="profileAddressLocation">
              My Addresses &nbsp;{"("}
              {getAddressMapData && getAddressMapData
                ? getAddressMapData.length
                : 0}
              {")"}
            </div>
            <img
              src={require("../../assets/Add-new.png")}
              className="addNewAddressImage"
              onClick={() => setShow(true)}
            />
          </div>

          <div className="profileAddressCardsContainer">
            {!getAddressMapData ? (
              <NoPastOrders message={"No address"} />
            ) : (
              <>
                {getAddressMapData &&
                  getAddressMapData.map((address: any, i: any) => {
                    return (
                      <div className="profileAddressCard" key={i}>
                        <div className="addressCardContents">
                          <div className="profileAddressDetails">
                            <div className="profileAddressLocation">
                              {address.addressType}
                            </div>
                            {address.primaryAddress ? (
                              <div className="profileAddressStatus">
                                <img
                                  src={require("../../assets/icn_check-black.png")}
                                  alt=""
                                  className="icnCheckBlack"
                                />
                                <div className="addressStatusText">
                                  primary {address.primaryAddress}
                                </div>
                              </div>
                            ) : (
                              <div
                                className="profileAddressStatus"
                                onClick={() => {
                                  dispatch(
                                    setPrimaryAddressAsyncThunk(
                                      address.addressId
                                    )
                                  );
                                  window.location.reload();
                                }}
                              >
                                <img
                                  src={require("../../assets/icn_check copy.png")}
                                  alt=""
                                  className="icnCheckBlack"
                                />
                                <div className="addressStatusTextNot">
                                  Primary {address.primaryAddress}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="profileAddressInfo">
                            {address.addressDesc} {address.area} {address.city}
                          </div>
                          <div className="profileAddressButtons">
                            <button
                              className="profileAddressEditButton"
                              onClick={() => editAdressFn(i)}
                            >
                              Edit
                            </button>
                            <button
                              className="profileAddressEditButton"
                              onClick={() => {
                                setSetAddressId(address.addressId);
                                setmodalStatuss(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </>
            )}
          </div>
        </div>
        <Modal
          open={show}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDiv style">
            <div className="addNewAddressContainer ">
              <div className="addBackBtnConatiner">
                <img
                  src={require("../../assets/dismiss button.png")}
                  className="backButtonnAddress"
                  onClick={() => setShow(false)}
                />
              </div>
              <div className="addAdressBodyHeader">
                <div className="addAddressHead">Add new address</div>
                <div className="addAddressCurrent">
                  <div className="addAddressLocConatiner">
                    <div className="addAddressLocation">
                      <img
                        src={require("../../assets/icn_pin.png")}
                        alt=""
                        className="addAddressLocationPin"
                      />
                    </div>
                    <div className="addAddressLocationName">
                      {placeValueFromRedux}
                    </div>
                  </div>
                  <div className="addAddressGpsIcn">
                    <img
                      src={require("../../assets/icn_gps_indicator.png")}
                      alt=""
                    />
                  </div>
                </div>
              </div>
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
                      label="City"
                      name="city"
                      variant="standard"
                      value={values.city}
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
                    {errors.city && touched.city ? (
                      <p className="addNewAddressModalError">{errors.city}</p>
                    ) : null}
                    {/* <div className="addNewAddressModalError">{errors.city}</div> */}
                  </div>
                  <div className="addAddressFields">
                    {" "}
                    <TextField
                      id="standard-basic"
                      label="Area"
                      name="area"
                      variant="standard"
                      value={values.area}
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
                    {errors.area && touched.area ? (
                      <p className="addNewAddressModalError">{errors.area}</p>
                    ) : null}
                    {/* <div className="addNewAddressModalError">{errors.area}</div> */}
                  </div>
                  <div className="addAddressFields">
                    {" "}
                    <TextField
                      id="standard-basic"
                      label="Address"
                      name="addressDesc"
                      variant="standard"
                      value={values.addressDesc}
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
                    {errors.addressDesc && touched.addressDesc ? (
                      <p className="addNewAddressModalError">
                        {errors.addressDesc}
                      </p>
                    ) : null}
                    {/* <div className="addNewAddressModalError">
                      {errors.addressDesc}
                    </div> */}
                  </div>
                  <div className="addAddressFields">
                    {" "}
                    <TextField
                      id="standard-basic"
                      label="Address Type"
                      name="addressType"
                      variant="standard"
                      value={values.addressType}
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
                    {errors.addressType && touched.addressType ? (
                      <p className="addNewAddressModalError">
                        {errors.addressType}
                      </p>
                    ) : null}
                    {/* <div className="addNewAddressModalError">
                      {errors.addressType}
                    </div> */}
                  </div>
                  <div className="addAddressSubmit">
                    <button className="addAddressSubBtn" type="submit">
                      SAVE ADDRESS
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Modal>

        {/* editModal */}
        <Modal
          open={showEditModal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDiv style">
            <div className="addNewAddressContainer ">
              <div className="addBackBtnConatiner">
                <img
                  src={require("../../assets/dismiss button.png")}
                  className="backButtonAddress"
                  onClick={() => setShowEditModal(false)}
                />
              </div>
              <div className="addAdressBodyHeader">
                <div className="addAddressHead">Edit address</div>
                <div className="addAddressCurrent">
                  <div className="addAddressLocConatiner">
                    <div className="addAddressLocation">
                      <img
                        src={require("../../assets/icn_pin.png")}
                        alt=""
                        className="addAddressLocationPin"
                      />
                    </div>
                    <div className="addAddressLocationName">
                      {placeValueFromRedux}
                    </div>
                  </div>
                  <div className="addAddressGpsIcn">
                    <img
                      src={require("../../assets/icn_gps_indicator.png")}
                      alt=""
                    />
                  </div>
                </div>
              </div>
              <div className="addAddressBody">
                <Formik
                  initialValues={selectedAddressState}
                  onSubmit={(values) => {
                    dispatch(
                      editAddressAsyncThunk({
                        addressId: selectedAddressState.addressId,
                        addressType: values.addressType,
                        city: values.city,
                        area: values.area,
                        addressDescription: values.addressDesc,
                        lattitude: "13.361300",
                        longitude: "74.708370",
                      })
                    );
                    dispatch(getAddressAsyncThunk());
                    setShowEditModal(false);
                    window.location.reload();
                  }}
                >
                  {({
                    values,
                    errors,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                  }) => (
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
                          label="City"
                          name="city"
                          variant="standard"
                          value={values.city}
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
                        <div className="addNewAddressModalError"></div>
                      </div>
                      <div className="addAddressFields">
                        {" "}
                        <TextField
                          id="standard-basic"
                          label="Area"
                          name="area"
                          variant="standard"
                          value={values.area}
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
                        <div className="addNewAddressModalError"></div>
                      </div>
                      <div className="addAddressFields">
                        {" "}
                        <TextField
                          id="standard-basic"
                          label="Address"
                          name="addressDesc"
                          variant="standard"
                          value={values.addressDesc}
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
                        <div className="addNewAddressModalError"></div>
                      </div>
                      <div className="addAddressFields">
                        {" "}
                        <TextField
                          id="standard-basic"
                          label="Address Type"
                          name="addressType"
                          variant="standard"
                          value={values.addressType}
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
                        <div className="addNewAddressModalError"></div>
                      </div>
                      <div className="addAddressSubmit">
                        <button className="addAddressSubBtn" type="submit">
                          SAVE ADDRESS
                        </button>
                      </div>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </Modal>
        <Modal
          open={modalStatuss}
          onClose={handleCloses}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDivs styles">
            <div className="modalNoCard">
              {" "}
              <div className="confirmText">
                Are you sure you want to remove address?
              </div>
              <div className="confirmBtns">
                <button
                  className="deleteBtnn"
                  onClick={() => {
                    dispatch(deleteAddressAsyncThunk(setAddressId));
                    window.location.reload();
                  }}
                >
                  Delete
                </button>
                <button
                  className="CancelBtnn"
                  onClick={() => setmodalStatuss(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfileAddress;
