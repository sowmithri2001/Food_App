import React from 'react'
import "./starsOne.css"
const StarsThree = () => {
    return (
        <>
            <div className='starBorder' style={{ "height": "26px", "width": "46px", "background": "transparent", "border": "1px solid #F5A623", "borderRadius": "5px", "display": "flex", "columnGap": "4px", "justifyContent": "center", "alignItems": "center" }}>
                <span className='star' style={{ "color": "#F5A623" }}>&#9733;</span>
                <span className='starValue' style={{ "color": "#F5A623" }}>3</span>
            </div>
        </>
    )
}

export default StarsThree;