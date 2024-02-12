import React from 'react'
import "./stepperOne.css"
import "./stepperTwo.css"
import "./stepperThree.css"
import "./stepperFour.css"
import "./stepperFive.css"
import './stepperSix.css'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const StepperSix = () => {
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
                <span className="stageSixRatingDIV">Driver can’t find the delivery address</span>
                <img src={require("../../assets/order_cancelled@3x.png")} alt="img" className='stepperTopImg' />
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
                        <span className='bottomText2'></span>
                    </div>
                    <div className="stage3 stage1">
                        <span className="topStage1">View info</span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order out for Delivery</span>
                        <span className='bottomText2'></span>
                    </div>
                    <div className="stage4 stage1">
                        <span className="topStage1">View Info</span>
                        <img src={require("../../assets/order_cancel_icon@3x.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order has Delivered</span>
                        <span className='bottomText2'></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepperSix;