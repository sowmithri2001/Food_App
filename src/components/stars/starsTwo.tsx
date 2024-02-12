import React from 'react'
import "./starsOne.css"
const StarsTwo = () => {
    return (
        <>
            <div className='starBorder' style={{ "height": "26px", "width": "46px", "background": "transparent", "border": "1px solid #e34545", "borderRadius": "5px", "display": "flex", "columnGap": "4px", "justifyContent": "center", "alignItems": "center" }}>
                <span className='star' style={{ "color": "#e34545" }}>&#9733;</span>
                <span className='starValue' style={{ "color": "#e34545" }}>2</span>
            </div>
        </>
    )
}

export default StarsTwo;