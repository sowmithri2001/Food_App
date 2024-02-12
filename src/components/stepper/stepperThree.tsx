import React from 'react'
import "./stepperOne.css"
import "./stepperTwo.css"
import "./stepperThree.css"
import { useSelector } from 'react-redux'
const StepperThree = () => {
    let cartStatusData = useSelector((state: any) => state && state.getMyOrderSlice && state.getMyOrderSlice.orderStatus && state.getMyOrderSlice.orderStatus.data);
    return (
        <>
            <div className="stepperOneContainer">
                <img src={require("../../assets/order_status_order_accepted_illustration_stage3@3x.png")} alt="img" className='stepperTopImg' />
                <div className="stepperstages">
                    <div className="stageOne stage1 stageOneAbsolute" style={{ top: "25%" }}>
                        <span className="topStage1">View More</span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order Accepted</span>
                        <span className='bottomText2' style={{ width: "80%", fontSize: "12px" }}>{cartStatusData && cartStatusData[2].timingDetails}</span>
                    </div>
                    <img src={require("../../assets/track_line@3x.png")} alt="trackline" className='trackLine1' />
                    <div className="stage2 stage1">
                        <span className="topStage1"></span>
                        <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order In kitchen</span>
                        <span className='bottomText2' style={{ width: "80%", fontSize: "12px" }}>{cartStatusData && cartStatusData[3].timingDetails}</span>
                    </div>
                    <div className="stage3 stage1">
                        <span className="topStage1"></span>
                        <img src={require("../../assets/yellow_time_icon_status@3x.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Order ready for pick-up</span>
                        <span className='bottomText2'></span>
                    </div>
                    <div className="stage4 stage1">
                        <span className="topStage1"></span>
                        <img src={require("../../assets/grey_time_icon_status@3x.png")} alt="time icon" className='timeIcon' />
                        <span className='bottomText1 setFontSize'>Waiting for delivery</span>
                        <span className='bottomText2'></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StepperThree;