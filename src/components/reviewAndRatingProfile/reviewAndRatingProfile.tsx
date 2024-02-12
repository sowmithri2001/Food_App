import { inputLabelClasses, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setRatingWrite } from "../../redux/reducers/cartSlice";
import { likeReviewAsyncThunk } from "../../redux/reducers/profileSlice";
import {
  addRatingAsyncThunk,
  addRatingPhotoAsyncThunk,
} from "../../redux/reducers/restaurantDetailsSlice";
import NoPastOrders from "../noPastOrders/noPastOrders";
import StarsFive from "../stars/starsFive";
import StarsFour from "../stars/starsFour";
import StarsOne from "../stars/starsOne";
import StarsThree from "../stars/starsThree";
import StarsTwo from "../stars/starsTwo";
import "./reviewAndRatingProfile.css";

const ReviewAndRatingProfile = () => {
  const getReview = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getMyReview &&
      state.getProfile.getMyReview.data &&
      state.getProfile.getMyReview.data.reviews &&
      state.getProfile.getMyReview.data.reviews
  );
  const objgetReview = getReview && Object.values(getReview);
  let averageRating: any;

  return (
    <>
      <div className="reviewsAndRatingsContainer">
        {getReview.length === 0 ? (
          <NoPastOrders message={"No reviews"} />
        ) : (
          <>
            <div className="reviewsAndRatingsContents">
              <div className="reviewsAndRatingsSubHeads">
                <div className="reviewsTitle">Reviews</div>
              </div>
              <div className="reviewsLeftSide">
                <div className="reviewsLeftCard">
                  <div className="reviewsLeftCardmap1">
                    {objgetReview &&
                      objgetReview.map((e: any, i: any) => {
                        switch (e.averageRating) {
                          case 1:
                            averageRating = <StarsOne />;
                            break;
                          case 2:
                            averageRating = <StarsTwo />;
                            break;
                          case 3:
                            averageRating = <StarsThree />;
                            break;
                          case 4:
                            averageRating = <StarsFour />;
                            break;
                          case 5:
                            averageRating = <StarsFive />;
                            break;
                          default:
                            averageRating = <StarsFive />;
                            break;
                        }
                        return (
                          <>
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
                                  <div className="reviewCustomerNameWithDetailses">
                                    <div className="enclose">
                                      <div className="reviewCustomerName">
                                        {e.restaurantName}
                                      </div>
                                      <div className="reviewCustomerNameReviews">
                                        {e.reviewCount}
                                        reviews,
                                        {e.ratingCount}
                                        Ratings
                                      </div>
                                    </div>
                                    <div className="reviewStarsImage">
                                      {averageRating}
                                    </div>
                                  </div>
                                </div>
                                <div className="customerReviewExplanation">
                                  {e.description}
                                </div>
                                <div className="customerReviewDate">
                                  <div className="reviewRatingsDate">
                                    {e.date}
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
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ReviewAndRatingProfile;
