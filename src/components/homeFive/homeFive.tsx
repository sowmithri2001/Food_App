import React from 'react'
import "./homeFive.css"
const HomeFive = () => {
    return (
        <>
            <div className="homeFiveContainer">
                <img src={require("../../assets/Image 4.png")} alt="pizza" className='pizzaBg' />
                <img src={require("../../assets/Logo Gradient.png")} alt="grad" className='gradientBg' />
                <img src={require("../../assets/iphone.png")} alt="iphone" className='iphoneBg' />
                <div className="homeFiveContent">
                    <div className="homeFiveHeading">
                        <span>Lorem App</span>
                    </div>
                    <div className="homeFiveSubHeading">
                        <span>Download the Food App</span>
                    </div>
                    <div className="homeFivePara">
                        Get real-time order updates, live chat support,
                        and exclusive app-only offers.
                    </div>
                    <div className="homeFiveButtons">
                        <a href='https://apps.apple.com/in/app/mcdelivery-india-west-south/id920750178' target="_blank" rel="noreferrer" >
                            <img src={require("../../assets/Button - App Store.png")} alt="apple store" className='appleButton' />
                        </a>
                        <a href='https://play.google.com/store/apps/details?id=com.il.mcdelivery' target="_blank" rel="noreferrer">
                            <img src={require("../../assets/Button - Play Store.png")} alt="play store" className='androidButton' />
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeFive