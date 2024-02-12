import { inputLabelClasses, Modal, TextField } from "@mui/material";
import { IncomingMessage } from "http";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import "./profileHeader.css";
import "../profileOrders/profileOrders.css";
import "../../views/home/home.css";
import { useFormik } from "formik";
import {
  editProfileAsyncThunk,
  getMyGalleryAsyncThunk,
  getMyReviewAsyncThunk,
  getProfileAsyncThunk,
  referFriendAsyncThunk,
  storeNum,
  verifyMobileNumberThunk,
} from "../../redux/reducers/profileSlice";
import axios from "axios";
import {
  setAddress,
  setOrders,
  setPayment,
  setProfileGallery,
  setReviews,
} from "../../redux/reducers/orangeSlice";
import MobileVerified from "../mobileVerified/mobileVerified";
import VerifyMobile from "../verifyMobile/verifyMobile";
const ProfileHeader = () => {
  const [profileEditmodal, setprofileEditModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const profileData = useSelector((state: any) => state.getProfile);
  const profile =
    profileData && profileData.data && profileData.getProfile.data;
  const handleClose = () => {
    setprofileEditModal(false);
  };

  useEffect(() => {
    dispatch(storeNum(profile && profile.mobileNumber));
  }, [profile]);

  const handleCloses = () => {
    setfirst(false);
  };
  let myCartsMap = useSelector(
    (state: any) =>
      state &&
      state.getMyOrderSlice &&
      state.getMyOrderSlice.getMyOrderDetails &&
      state.getMyOrderSlice.getMyOrderDetails.data &&
      state.getMyOrderSlice.getMyOrderDetails.data.orders
  );

  const handleProfilePic = (e: any) => {
    var image: any = document.getElementById("profileImage");
    image.src = URL.createObjectURL(e.target.files[0]);
    setSelectedFile(e.target.files[0]);
  };
  let orange = useSelector((state: any) => state && state.orangeSlice);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderFn = () => {
    dispatch(setOrders());
    navigate("");
  };

  const addressFn = () => {
    dispatch(setAddress());
    navigate("profileaddress");
  };

  const paymentFn = () => {
    dispatch(setPayment());
    navigate("profilepayment");
  };
  const reviewfn = () => {
    dispatch(setReviews());
    navigate("profileReview");
    dispatch(getMyReviewAsyncThunk());
  };

  const galleryFn = () => {
    dispatch(setProfileGallery());
    navigate("profileGallery");
    dispatch(getMyGalleryAsyncThunk());
  };

  let show: any = useSelector((state: any) => state.modalStatus.value);

  useEffect(() => {
    dispatch(getProfileAsyncThunk());
  }, [dispatch]);

  let avatarData: any = [
    {
      avatarIndex: 1,
      img: "icecream",
    },
    {
      avatarIndex: 2,
      img: "cupcake",
    },
    {
      avatarIndex: 3,
      img: "frenchfries",
    },
    {
      avatarIndex: 4,
      img: "burger",
    },
    {
      avatarIndex: 5,
      img: "chicken",
    },
    {
      avatarIndex: 6,
      img: "bread",
    },
    {
      avatarIndex: 7,
      img: "donut",
    },
    {
      avatarIndex: 8,
      img: "beer",
    },
    {
      avatarIndex: 9,
      img: "pizza",
    },
  ];
  const [first, setfirst] = useState(false);
  const [avatarSet, setavatarSet] = useState({
    avatarIndex: 0,
    img: "",
  });
  const changeAvatarFn = (i: any) => {
    let avatarId = avatarData[i];
    setavatarSet({
      avatarIndex: avatarId.avatarIndex,
      img: avatarId.img,
    });
  };

  const initialvalues = {
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePic: "",
    avatarIndex: avatarSet.avatarIndex,
  };

  const [selectedProfile, setselectedProfile] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    profilePic: "",
    avatarIndex: avatarSet.avatarIndex,
  });

  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: initialvalues,
    onSubmit: (values) => {
      let formData = new FormData();
      formData.append("firstName", values.firstName);
      formData.append("lastName", values.lastName);
      formData.append("mobileNo", values.mobileNo);
      formData.append("profilePic", selectedFile);
      formData.append("avatarIndex", JSON.stringify(avatarSet.avatarIndex));
      if (selectedFile) {
        formData.delete("avatarIndex");
      }
      if (avatarSet.avatarIndex) {
        formData.delete("profilePic");
      }
      formData.forEach((value, key) => {});
      dispatch(editProfileAsyncThunk(formData));
      setprofileEditModal(false);
      dispatch(getProfileAsyncThunk());
      // window.location.reload();
    },
  });

  const submitHandler = (e: any) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="backgroundheaderimage">
        <img
          src={require("../../assets/backgroundheader.png")}
          alt=""
          className="backgroundheaderimg"
        />
      </div>
      <div className="profileHeaderMain">
        <div className="profileHeaderContainer">
          <div className="profileHeader1">
            <div className="profileHeaderPic">
              {profile && profile.profilePicURL === null ? (
                <img
                  src={require("../../assets/default-profile.jpg")}
                  alt=""
                  className="profileHeaderImg"
                />
              ) : (
                <img
                  src={profile && profile.profilePicURL}
                  alt=""
                  className="profileHeaderImg"
                />
              )}
            </div>
            <div className="profileHeaderRight">
              <div className="profileHeaderHead">
                <div className="profileHeaderHead1">
                  <div className="profileHeaderHeadName">
                    {profile && profile.firstName}
                  </div>
                  <div
                    className="profileHeaderEdit"
                    onClick={() => {
                      setprofileEditModal(true);
                    }}
                  >
                    Edit
                  </div>
                </div>
                <div className="profileHeaderHead2">
                  <div
                    className="profileHeaderReferRect"
                    onClick={() => navigate("/referfriend")}
                  >
                    <div
                      className="profileHeaderReferTxt"
                      onClick={() => dispatch(referFriendAsyncThunk())}
                    >
                      REFER A FRIEND
                    </div>
                  </div>
                </div>
              </div>
              <div className="profileHeaderName">
                {profile && profile.firstName} {profile && profile.lastName}
              </div>
              <div className="profileHeaderMobEmail">
                <div className="profileHeaderMobile">
                  <div className="profileHederMobImg">
                    <img
                      src={require("../../assets/phone_icn.png")}
                      alt=""
                      className="profileHederMobImage"
                    />
                  </div>
                  <div className="profileHerderMobileNum">
                    {profile && profile.mobileNumber}
                  </div>
                </div>
                <div className="profileHeaderEmail">
                  <div className="profileHeaderEmailImg">
                    <img
                      src={require("../../assets/mail_icn.png")}
                      alt=""
                      className="profileHeaderEmailImage"
                    />
                  </div>
                  <div className="profileHeaderEmailTxt">
                    {profile && profile.email}
                  </div>
                </div>
                <div className="profileHeaderCredit">
                  <div className="profileHedaerCreditEarned">
                    Credits&nbsp;Earned&nbsp;-
                  </div>
                  <div className="profileHeaderCreditPoint">
                    {profile && profile.creditScore}
                  </div>
                </div>
              </div>
              <div
                className="verifyMobileNumberr"
                onClick={() => {
                  dispatch(
                    verifyMobileNumberThunk(profile && profile.mobileNumber)
                  );
                  setfirst(true);
                }}
              >
                verify mobile number
              </div>
            </div>
          </div>
          <div className="profileHeaderBottom">
            <div className="profileHeaderOrderComp">
              <div className="profileHeaderOrder" onClick={orderFn}>
                ORDERS {orange.orangeop && <div className="orangeLine"></div>}
              </div>
              <div className="profileHeaderOrderNum">
                ({myCartsMap && myCartsMap.length})
              </div>
            </div>
            <div className="profileHeaderAddress" onClick={addressFn}>
              ADDRESS {orange.orangeap && <div className="orangeLine"></div>}
            </div>
            <div className="profileHeaderPayment" onClick={paymentFn}>
              PAYMENT METHODS{" "}
              {orange.orangepp && <div className="orangeLine"></div>}
            </div>
            <div className="profileHedaerReview" onClick={reviewfn}>
              REVIEW {orange.orangerp && <div className="orangeLine"></div>}
            </div>
            <div className="profileHeaderGallery" onClick={galleryFn}>
              GALLERY {orange.orangegp && <div className="orangeLine"></div>}
            </div>
          </div>
        </div>
      </div>
      <div className="modalHolder">
        {" "}
        <Modal
          open={profileEditmodal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalDiv style">
            <form
              className="orderDetailsModalContainerEdit"
              onSubmit={(e: any) => {
                handleSubmit();
                submitHandler(e);
              }}
            >
              <div className="profileEditContainer">
                <div className="profileEditLeft">
                  <div className="profileEditImageDiv">
                    {avatarSet.img === "" ? (
                      <img
                        id="profileImage"
                        src={profile && profile.profilePicURL}
                        alt="a"
                        className="profileEditImg"
                      />
                    ) : (
                      <img
                        src={require(`../../assets/icn_${avatarSet.img}.png`)}
                        alt=""
                        className="profileEditAvatarImg"
                      />
                    )}
                    <div>
                      <label htmlFor="custom-file-input">
                        <img
                          src={require("../../assets/icn_add_photo.png")}
                          alt=""
                          className="profileEditAddImg"
                        />
                      </label>
                      <input
                        id="custom-file-input"
                        type="file"
                        onChange={handleProfilePic}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>
                  <div className="profileEditTxtFeild">
                    <TextField
                      name="firstName"
                      id="standard-basic"
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
                    <TextField
                      name="lastName"
                      id="standard-basic"
                      label="Last Name"
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
                    <TextField
                      name="mobileNo"
                      id="standard-basic"
                      label="Mobile Number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      variant="standard"
                      value={values.mobileNo}
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
                </div>
                <div className="profileEditRight">
                  <div className="profileEditRight1Txt">
                    Choose a user avatar
                  </div>
                  <div className="profileEditAvatar">
                    {avatarData.map((e: any, i: any) => {
                      return (
                        <img
                          src={require(`../../assets/icn_${e.img}.png`)}
                          alt=""
                          className="profileEditAvatarImg"
                          key={i}
                          onClick={() => changeAvatarFn(i)}
                          style={{ margin: "5px" }}
                        />
                      );
                    })}
                  </div>
                  <div className="profileEditBottomBtn">
                    <button
                      className="profileEditRectangle"
                      type="submit"
                      style={{ border: "none" }}
                    >
                      <div className="profileEditRectangleTxt">SAVE</div>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </Modal>
        <Modal
          open={first}
          onClose={handleCloses}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalStyleDiv style">
            <VerifyMobile />
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ProfileHeader;
