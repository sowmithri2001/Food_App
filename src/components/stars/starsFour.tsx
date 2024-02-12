import React from 'react'
import "./starsOne.css"
const StarsFour = () => {
    return (
        <>
            <div className='starBorder' style={{ "height": "26px", "width": "46px", "background": "transparent", "border": "1px solid #5FB700", "borderRadius": "5px", "display": "flex", "columnGap": "4px", "justifyContent": "center", "alignItems": "center" }}>
                <span className='star' style={{ "color": "#5FB700" }}>&#9733;</span>
                <span className='starValue' style={{ "color": "#5FB700" }}>4</span>
            </div>
        </>
    )
}

export default StarsFour;