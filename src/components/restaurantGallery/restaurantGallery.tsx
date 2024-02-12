import "./restaurantGallery.css";
import "../../views/home/home.css";
import { Modal } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import '../../components/homeTwo/homeTwo.css'

const RestaurantGallery = () => {
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNxt, setDisableNxt] = useState(false);
  // const images = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const handleClose = () => {
    setModal(false);
  };
  let show: any = useSelector((state: any) => state.modalStatus.value);
  let galleryImagesdata = useSelector((state: any) => state && state.restaurantDetailsList && state.restaurantDetailsList &&
    state.restaurantDetailsList.restaurantGallery && state.restaurantDetailsList.restaurantGallery
  );
  let galleryImages1: any = Object.values(galleryImagesdata)
  let galleryImages: any = galleryImages1[0];

  //modalImage
  const [eachImgId, seteachImgId] = useState(0);
  const [modalImg, setmodalImg] = useState({ dishName: "", dishPhoto: "" })
  const openModalForImgFn = (i: any) => {
    localStorage.setItem("imgIds", i);
    seteachImgId(i)
    setmodalImg(galleryImages[i]);
    setModal(true);
  }
  console.log("modalImg", modalImg);

  let imgId = JSON.parse(localStorage.getItem("imgIds") || "[]");
  return (
    <>
      <div className="hotelGalleryContainer">
        <div className="hotelGalleryBody">
          {" "}
          <div className="hotelPhotosContiner">
            {galleryImages && galleryImages.map((ele: any, i: any) => {

              return (
                <div className="hoteGallery" key={i}>
                  <img
                    src={ele.dishPhoto}
                    alt=""
                    className="hotelGalleryList"
                    onClick={
                      () => openModalForImgFn(i)
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
        <Modal
          open={modal}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalContainer">
            <div className="inSide">
              <div className="cancelBtnPhoto">
                <img
                  src={require("../../assets/cancel.png")}
                  alt=""
                  onClick={() => setModal(false)}
                />
              </div>
              <div className="imgContainer">
                {imgId}{" "}
                <img
                  src={modalImg && modalImg.dishPhoto}
                  alt=""
                  className="hotelGalleryList1"
                />
              </div>
              <div className="imgDetails">
                <div className="detailsTextImg">{modalImg && modalImg.dishName}</div>
                <div className="prevNextButtons">
                  <div className="countOfImg">
                    {" "}
                    {eachImgId + 1}/{galleryImages.length}
                  </div>

                  <button className="previousBtn1"
                    onClick={() => {
                      if ((eachImgId) > 0) {
                        seteachImgId(eachImgId - 1);
                        setmodalImg(galleryImages[eachImgId - 1]);
                      }
                    }}
                  >
                    <img
                      src={require("../../assests/next button.png")}
                      alt=""
                      className="prevRight1" />
                  </button>

                  <button className="nextBtnDiv1">
                    <img
                      src={require("../../assests/next button.png")}
                      alt=""
                      className="nextBtn"
                      onClick={() => {
                        if ((eachImgId + 1) < galleryImages.length) {
                          seteachImgId(eachImgId + 1);
                          setmodalImg(galleryImages[eachImgId + 1]);
                        }
                      }}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default RestaurantGallery;

