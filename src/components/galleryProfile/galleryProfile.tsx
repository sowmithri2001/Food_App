import React from "react";
import { useSelector } from "react-redux";
import NoPastOrders from "../noPastOrders/noPastOrders";
import "./galleryProfile.css";

const GalleryProfile = () => {
  const profileGallery = useSelector(
    (state: any) =>
      state &&
      state.getProfile &&
      state.getProfile.getMyGallery &&
      state.getProfile.getMyGallery &&
      state.getProfile.getMyGallery.data
  );
  const photogallery: any = profileGallery && Object.values(profileGallery)[0];
  return (
    <>
      <div className="hotelGalleryContainer">
        <div className="hotelGalleryBody">
          {photogallery.length === 0 ? (
            <NoPastOrders message={"No Photos"} />
          ) : (
            <>
              {" "}
              <div className="hotelAllPhotos">All Photos</div>
              <div className="hotelPhotosContiners">
                {photogallery &&
                  photogallery.map((ele: any, i: any) => {
                    return (
                      <div className="hoteGallery">
                        <img src={ele} alt="" className="hotelGalleryList" />
                      </div>
                    );
                  })}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default GalleryProfile;
