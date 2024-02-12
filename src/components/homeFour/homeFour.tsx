import React from 'react'
import './homeFour.css'
const HomeFour = () => {
    return (
        <>
            <div className="homeFourContainer">
                <div className="homeFourContent">
                    <div className="homeFourHeading">
                        <h1 className='howToOrder'>How to Order</h1>
                    </div>
                    <div className="homeFourSubHeading">
                        <h3 className='givingYouText'>Giving you an easiest way to look for the best food that can be ordered.</h3>
                    </div>
                    <div className="content">
                        <div className="contentOne">
                            <div className="imageOne iconStyle">
                                <img src={require("../../assets/shop.png")} alt="icn" />
                            </div>
                            <div className="textOne textStyle">
                                <h3>Explore restaurants that
                                    deliver to your doorstep.</h3>
                            </div>
                        </div>
                        <div className="contentTwo">
                            <div className="imageTwo line">
                                <img src={require("../../assets/Path 2.png")} alt="line" className='lineImg' />
                            </div>
                        </div>
                        <div className="contentThree">
                            <div className="imageThree iconStyle">
                                <img src={require("../../assets/burger.png")} alt="icn" />
                            </div>
                            <div className="textThree textStyle">
                                <h3>Browse menus and build
                                    your order in seconds.</h3>
                            </div>
                        </div>
                        <div className="contentFour">
                            <div className="imageFour line ">
                                <img src={require("../../assets/Path 2 (1).png")} alt="line" className='lineImg' />
                            </div>
                        </div>
                        <div className="contentFive">
                            <div className="imageFive iconStyle">
                                <img src={require("../../assets/shopping-cart (3).png")} alt="" />
                            </div>
                            <div className="textFive textStyle">
                                <h3>Follow the status of your
                                    order with real-time alerts.</h3>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFour