import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cancelOrderAsyncThunk } from '../../redux/reducers/getmyCartSlice';
import "./stepperOne.css"
const StepperOne = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let cartStatusData = useSelector((state: any) => state && state.getMyOrderSlice && state.getMyOrderSlice.orderStatus && state.getMyOrderSlice.orderStatus.data);

  let cartModalData = useSelector((state: any) => state && state.getMyOrderSlice && state.getMyOrderSlice.getMyCart && state.getMyOrderSlice.getMyCart.data)
  return (
    <>
      <div className="stepperOneContainer">
        <img src={require("../../assets/order_status_order_accepted_illustration.png")} alt="img" className='stepperTopImg' />
        <div className="stepperstages">
          <div className="stageOneAbsolute stage1">
            <span className="topStage1">View More</span>
            <img src={require("../../assets/check_green copy 2.png")} alt="time icon" className='timeIcon' />
            <span className='bottomText1 setFontSize'>Order waiting to accept</span>
            <span className='bottomText2'
              onClick={
                () => {
                  dispatch(cancelOrderAsyncThunk(cartModalData && cartModalData.orderId))
                  navigate("/profileDetails")
                }
              }
            >Cancel Order</span>
          </div>
          <img src={require("../../assets/track_line@3x.png")} alt="trackline" className='trackLine1' />
          <div className="stage2 stage1">
            <span className="topStage1"></span>
            <img src={require("../../assets/grey_time_icon_status@3x.png")} alt="time icon" className='timeIcon' />
            <span className='bottomText1 setFontSize'>Order In kitchen</span>
            <span className='bottomText2'></span>
          </div>
          <div className="stage3 stage1">
            <span className="topStage1"></span>
            <img src={require("../../assets/grey_time_icon_status@3x.png")} alt="time icon" className='timeIcon' />
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

export default StepperOne;