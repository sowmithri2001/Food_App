import { inputLabelClasses, TextField } from "@mui/material";
// import HeaderCopy from "../header copy/headerCopy";
import "./reviewsAndRatings.css";
import { useDispatch, useSelector } from "react-redux";
import StarsOne from "../stars/starsOne";
import StarsTwo from "../stars/starsTwo";
import StarsThree from "../stars/starsThree";
import StarsFour from "../stars/starsFour";
import StarsFive from "../stars/starsFive";
import { likeReviewAsyncThunk } from "../../redux/reducers/profileSlice";
import { useState } from "react";
import { addRatingAsyncThunk, addRatingPhotoAsyncThunk, eachRestaurantRatingAsyncThunk } from "../../redux/reducers/restaurantDetailsSlice";
import { setRatingWrite } from "../../redux/reducers/cartSlice";
const ReviewsAndRatings = () => {
  const [ratingWrite, setratingWrite] = useState<any>('');
  const ratingFieldFn = (e: any) => {
    setratingWrite(e.target.value);
    dispatch(setRatingWrite(e.target.value));
  };
  const [foodRating, setFoodRating] = useState<any>(0)
  const [seriveRating, setSeriveRating] = useState<any>(0)
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const dispatch = useDispatch();
  const [first, setfirst] = useState(false);
  let ReviewRating = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantReview &&
      state.restaurantDetailsList.restaurantReview.reviews
  );

  const restId = useSelector((state: any) => state &&
    state.restaurantDetailsList &&
    state.restaurantDetailsList.restaurantReview)
  const handleProfilePic = (e: any) => {
    setSelectedFile(e.target.files[0]);
  };
  let ratingImg: any;
  const arrOfObj1 = Object.values(ReviewRating);
  const RatingsProfile = useSelector((state: any) => state && state.cart && state.cart.restaurantId)
  const likeResp = useSelector((state: any) => state.getProfile.likeReview);
  const likeReview = (e: any, i: any) => {
  };
  let ratingPhoto: any = ''
  let newfordata = new FormData();
  newfordata.append("multipartFile", selectedFile);
  if (selectedFile === null) {
    newfordata.delete('multipartFile')
  }
  const [addImge, setAddImage] = useState(false)
  const thunckDispatch = () => { dispatch(addRatingPhotoAsyncThunk(newfordata)); setAddImage(true) }
  const ratingPhotos = useSelector((state: any) => state && state.restaurantDetailsList && state.restaurantDetailsList.ratingPhoto && state.restaurantDetailsList.ratingPhoto.data)
  if (addImge) {
    ratingPhoto = ratingPhotos
  }
  else {
    ratingPhoto = ''
  }
  let formData = new FormData();
  formData.append('restaurantId', RatingsProfile);

  formData.append("description", ratingWrite);
  formData.append("foodRating", foodRating);
  formData.append("serviceRating", seriveRating);
  formData.append("photoLinks", ratingPhoto);
  if (foodRating === 0) {
    formData.delete('foodRating')
  }
  if (seriveRating === 0) {
    formData.delete('serviceRating')
  }
  if (ratingWrite === '') {
    formData.delete('description')
  }
  if (ratingPhoto === '') {
    formData.delete('photoLinks')
  }

  const submitRating = () => {
    dispatch(addRatingAsyncThunk(formData))
    dispatch(eachRestaurantRatingAsyncThunk(RatingsProfile))
  }

  const submitHandler = (e: any) => {
    e.preventDefault();

  }




  return (
    <>
      <div className="reviewsAndRatingsContainer">
        <div className="reviewsAndRatingsContents">
          <div className="reviewsAndRatingsSubHead">
            <div className="reviewsTitle">Reviews</div>
          </div>
          <div className="reviewsLeftSide">
            <div className="reviewsLeftCard">
              <div className="reviewsLeftCardmap1">
                {arrOfObj1 &&
                  arrOfObj1.map((e: any, i: any) => {
                    switch (e.averageRating) {
                      case 1:
                        ratingImg = <StarsOne />;
                        break;
                      case 2:
                        ratingImg = <StarsTwo />;
                        break;
                      case 3:
                        ratingImg = <StarsThree />;
                        break;
                      case 4:
                        ratingImg = <StarsFour />;
                        break;
                      case 5:
                        ratingImg = <StarsFive />;
                        break;
                      default:
                        ratingImg = <StarsFive />;
                        break;
                    }
                    return (
                      <div className="reviewsLeftCardmap">
                        <div className="customerReviewsRatings">
                          <div className="customerReviewsDetails">
                            <div className="customerReviewProfileImage">
                              <img
                                src={e.profilePic}
                                alt=""
                                className="reviewCustomerImage"
                              />
                            </div>
                            <div className="reviewCustomerNameWithDetails">
                              <div className="reviewCustomerName">
                                {e.firstName}
                              </div>
                              <div className="reviewCustomerNameReviews">
                                {e.reviewCount} reviews, {e.ratingCount} Ratings
                              </div>
                              <div className="reviewStarsImage">
                                {e.ratingImg}
                              </div>
                            </div>
                          </div>
                          <div className="customerReviewExplanation">
                            {e.description}
                          </div>
                          <div className="customerReviewDate">
                            <div className="reviewRatingsDate">{e.date}</div>
                            <div
                              className="reviewsLike"
                              onClick={() => {
                                dispatch(likeReviewAsyncThunk(e.reviewId));
                                likeReview(e.reviewId, i);
                              }}
                            >
                              {likeResp &&
                                likeResp.data ===
                                "Liked Review Successfully..." ? (
                                <img
                                  src={require("../../assets/like_inactive.png")}
                                  alt=""
                                  className="likeImageInactive"
                                />
                              ) : (
                                <img
                                  src={require("../../assets/like_active.png")}
                                  alt=""
                                  className="likeImageInactive"
                                />
                              )}
                              <div className="numberOfRatings">
                                {e.likeCount}
                              </div>
                            </div>
                          </div>
                          <div className="reviewRatingDiv">
                            <div className="reviewRatingDishImg">
                              {e &&
                                e.photo &&
                                e.photo.map((f: any, i: any) => {
                                  return (
                                    <img
                                      src={f}
                                      alt=""
                                      className="reviewRatingDishImage"
                                    />
                                  );
                                })}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
            <div className="reviewsBottom"></div>

            <div className="reviewsRightSide">
              <form className="reviewsRightSideCard" onSubmit={(e: any) => {
                thunckDispatch()
                submitRating();
                submitHandler(e);
                // window.location.reload()
              }}>
                <div className="reviewsExperienceTitle">
                  Rate your experience
                </div>
                <div className="reviewsExperienceContainer">
                  <div className="reviewsExperienceCategory">Food</div>
                  <div className="orderDetailsModalFooterRatings">

                    <div className="orderReviewStars" onClick={() => setFoodRating(1)} >
                      <StarsOne />
                    </div>
                    <div className="orderReviewStars" onClick={() => setFoodRating(2)}>
                      <StarsTwo />
                    </div>
                    <div className="orderReviewStars" onClick={() => setFoodRating(3)}>
                      <StarsThree />
                    </div>
                    <div className="orderReviewStars" onClick={() => setFoodRating(4)} >
                      <StarsFour />
                    </div>
                    <div className="orderReviewStars" onClick={() => setFoodRating(5)}>
                      <StarsFive />
                    </div>
                  </div>

                </div>

                <div className="reviewsExperienceContainer">
                  <div className="reviewsExperienceCategory">Services</div>
                  <div className="orderDetailsModalFooterRatings">
                    <div className="orderReviewStars" onClick={() => setSeriveRating(1)}>
                      <StarsOne />
                    </div>
                    <div className="orderReviewStars" onClick={() => setSeriveRating(2)}>
                      <StarsTwo />
                    </div>
                    <div className="orderReviewStars" onClick={() => setSeriveRating(3)}>
                      <StarsThree />
                    </div>
                    <div className="orderReviewStars" onClick={() => setSeriveRating(4)}>
                      <StarsFour />
                    </div>
                    <div className="orderReviewStars" onClick={() => setSeriveRating(5)}>
                      <StarsFive />
                    </div>
                  </div>

                </div>

                <div className="reviewsExperienceContainer">
                  <div className="titleToReview">Write a review</div>
                  <div className="optionToReview">
                    <TextField
                      id="standard-basic"
                      onChange={(e: any) => ratingFieldFn(e)}
                      name="description"
                      label="Start writing your review"
                      variant="standard"
                      // value ={}
                      sx={{
                        width: 1,
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#A4A4A4",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#A4A4A4",
                        },
                        "& .MuiFormLabel-root.Mui-disabled": {
                          color: "red",
                        },
                      }}
                      InputLabelProps={{
                        sx: {
                          // set the color of the label when not shrinked
                          color: "#A4A4A4",
                          [`&.${inputLabelClasses.shrink}`]: {
                            // set the color of the label when shrinked (usually when the TextField is focused)
                            color: "#A4A4A4",
                          },
                        },
                      }}
                    />
                    <label htmlFor="custom-file-input">
                      <div className="optionToAddImage" >+ Add image</div>
                    </label>
                    <input id="custom-file-input" multiple accept="image/*" type="file" onChange={(e: any) => {
                      handleProfilePic(e)

                    }}

                    />
                    {/* <input type="file" multiple accept="image/*" onChange={onImageChange} /> */}
                    <button type="submit" className="reviewsSubmitButton"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


export default ReviewsAndRatings;
