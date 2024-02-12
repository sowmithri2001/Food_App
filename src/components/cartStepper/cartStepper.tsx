import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import "./cartStepper.css"
const CartStepper = () => {
    let prValue = useSelector((state: any) => state.cartStepper.value);
    return (
        <>
            <div className="cartStepperContent">
                <div className='trackLineProgress'>
                    <div className='trackLineProgressOrange' style={{ "width": `${prValue}%`, "transition": "3s" }}></div>
                </div>
                <>
                    {
                        <div className='progressDiv progressButton1'>
                            <div className='white'> .</div>
                            <img src={require("../../assets/Active state@3x.png")} alt="" className='progressButton ' />
                            <div className='stepText'>Cart</div>
                        </div>
                    }
                </>
                <>
                    {
                        <div className='progressDiv progressButton2'>
                            <div className='white'> . </div>
                            {
                                prValue <= 49 ?
                                    <img src={require("../../assets/deactive state@3x.png")} alt="" className='progressButton' /> :
                                    <img src={require("../../assets/Active state@3x.png")} alt="" className='progressButton' />
                            }
                            <div className='stepText'>AddressDetails</div>
                        </div>
                    }
                </>
                <>
                    {<div className='progressDiv progressButton3'>
                        <div className='white'> . </div>
                        {
                            prValue <= 99 ?
                                <img src={require("../../assets/deactive state@3x.png")} alt="" className='progressButton ' /> :
                                <img src={require("../../assets/Active state@3x.png")} alt="" className='progressButton ' />
                        }
                        <div className='stepText'>Payment</div>
                    </div>
                    }
                </>
            </div>
        </>
    )
}

export default CartStepper
