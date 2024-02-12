import React from 'react'
import "./stepperOne.css"
import "./stepperTwo.css"
import "./stepperThree.css"
import "./stepperFour.css"
import "./stepperFive.css"
import { useDispatch, useSelector } from 'react-redux'
import { eachRestaurantGalleryAsyncThunk, eachRestaurantHeaderAsyncThunk, eachRestaurantMenuAsyncThunk, eachRestaurantOverviewAsyncThunk, eachRestaurantRatingAsyncThunk } from '../../redux/reducers/restaurantDetailsSlice'
import { useNavigate } from 'react-router-dom'
import { slectREstId } from '../../redux/reducers/cartSlice'
import { setRatings } from "../../redux/reducers/orangeSlice";

const StepperFive = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let cartModalData = useSelector(
        (state: any) =>
            state &&
            state.getMyOrderSlice &&
            state.getMyOrderSlice.getMyCart &&
            state.getMyOrderSlice.getMyCart.data
    );
    let cartStatusData = useSelector((state: any) => state && state.getMyOrderSlice && state.getMyOrderSlice.orderStatus && state.getMyOrderSlice.orderStatus.data);
    return (
        <>
            <div className="stepperOneContainer">
                <span className="stageFiveRatingDIV" onClick={() => {
                    dispatch(eachRestaurantRatingAsyncThunk(cartModalData.restaurantId))
                    dispatch(eachRestaurantHeaderAsyncThunk(cartModalData.restaurantId));
                    dispatch(eachRestaurantMenuAsyncThunk(cartModalData.restaurantId));
                    dispatch(eachRestaurantOverviewAsyncThunk(cartModalData.restaurantId));
                    dispatch(eachRestaurantGalleryAsyncThunk(cartModalData.restaurantId));
                    dispatch(slectREstId(cartModalData.restaurantId));
                    dispatch(setRatings())
                    navigate("/restaurantDetails/restReview")
                }} style={{ cursor: "pointer", zIndex: "10" }}>Give a rating and review</span>
                <img src={require("../../assets/order_status_order_delivered_stage5@3x.png")} alt="img" className='stepperTopImg' />
                <div className="stepperstages">
                    <div className="stageOne stage1 stageOneAbsolute">
                        <span className="topStage1">View More</span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order Accepted</span>
                        <span className='bottomText2' style={{ width: "80%", fontSize: "12px" }}>{cartStatusData && cartStatusData[2].timingDetails && cartStatusData[2].timingDetails}</span>
                    </div>
                    <img src={require("../../assets/track_line@3x.png")} alt="trackline" className='trackLine1' />
                    <div className="stage2 stage1">
                        <span className="topStage1"></span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order In kitchen</span>
                        <span className='bottomText2' style={{ width: "80%", fontSize: "12px" }}>{cartStatusData && cartStatusData[2].timingDetails && cartStatusData[3].timingDetails}</span>
                    </div>
                    <div className="stage3 stage1">
                        <span className="topStage1">View info</span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order out for Delivery</span>
                        <span className='bottomText2' style={{ width: "80%", fontSize: "12px" }}>{cartStatusData && cartStatusData[2].timingDetails && cartStatusData[5].timingDetails}</span>
                    </div>
                    <div className="stage4 stage1">
                        <span className="topStage1">View Info</span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order has Delivered</span>
                        <span className='bottomText2' style={{ width: "80%", fontSize: "12px" }}>{cartStatusData && cartStatusData[2].timingDetails && cartStatusData[6].timingDetails}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepperFive; 