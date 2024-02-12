import React from "react";
import './loremAbout.css'
const LoremAbout = () => {
    return (
        <div className="loremContainer">
            <div className="loremAboutContent">
                <div className="loremImageContainer">
                    <img
                        src={require("../../assets/about_banner.png")}
                        alt=""
                        className="loremAboutImg" />
                    <span className="loremImageHeader">
                        “A healthy outside <br /> starts from the inside.”
                    </span>
                    <span className="loremImageAuthor">Robert Urich</span>
                </div>
                <div className="loremContent">
                    <div className="loremContentHeader">Who we are</div>
                    <div className="loremContentDescription">
                        We are an online ordering service and our aim is to become the best
                        delivery service platform for our users by diversifying our services
                        portfolio and providing best-in-class customer experience. Our
                        online food ordering portal helps you find restaurants in your area,
                        filter by cuisine/ time/ price, browse menus and place orders via
                        multiple payment options. Our delivery platform ensures that you
                        receive your order in shortest possible time, can track your order
                        and can interact with our awesome support folks in case of any
                        query.
                    </div>
                </div>
                <div className="loremContentWork">
                    <div className="loremContentHeader">How we works</div>
                    <div className="loremAboutBottom">
                        <div className="loremAboutBottomImg">
                            <img src={require('../../assets/shop.png')} alt="" className="loremAboutBottomImage" />
                            <div className="loremAboutBottomTxt">Explore restaurants that
                                deliver to your doorstep.</div>
                        </div>
                        <div className="loremAboutLine">
                            <img src={require('../../assets/Path 2.png')} alt="" className="loremAboutLineImg" />
                        </div>
                        <div className="loremAboutBottomImg">
                            <img src={require('../../assets/burger.png')} alt="" className="loremAboutBottomImage" />
                            <div className="loremAboutBottomTxt">Browse menus and build
                                your order in seconds.</div>
                        </div>
                        <div className="loremAboutLine">
                            <img src={require('../../assets/Path 2.png')} alt="" className="loremAboutLineImg1" />
                        </div>
                        <div className="loremAboutBottomImg">
                            <img src={require('../../assets/shopping-cart (3).png')} alt="" className="loremAboutBottomImage" />
                            <div className="loremAboutBottomTxt">Follow the status of your
                                order with real-time alerts.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoremAbout;
