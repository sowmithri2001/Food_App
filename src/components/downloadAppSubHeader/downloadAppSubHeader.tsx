import React from 'react'
import "./downloadAppSubHeader.css"
const DownloadAppSubHeader = () => {
    return (
        <>
            <div className="downloadAppContainer">
                <div className="downloadAppContent">
                    <span className='foodIsForText'>Food is for Eating & Good food is to be enjoyed.
                        Download the App today!</span>
                    <div className="divStoreButtons">
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

export default DownloadAppSubHeader;