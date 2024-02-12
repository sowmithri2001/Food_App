import { useEffect, useState } from "react";
import "./homeOne.css";
import { Modal } from "@mui/material";
import {
  noBrands,
  notAvailable,
  placesMangalore,
  placesUdupi,
} from "../../data/placesAuto";
import {
  restaurantHeaderSearchAsyncThunk,
  setSearchValueFood,
} from "../../redux/reducers/restaurantListSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchBarForPlace from "../searchBar/searchBarForPlace";
import NoPastOrders from "../noPastOrders/noPastOrders";
const HomeOne = () => {
  const [value, onChange] = useState("");
  const date = new Date();

  setInterval(function () {
    today();
  }, 1000);

  const today = () => {
    onChange(
      `Today, ${date.getDate()} ${date.toLocaleString("en-us", {
        month: "long",
      })}, ${date.getFullYear()} `
    );
  };

  const [searchBarValue, setsearchBarValue] = useState<any>("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  const [placeValue, setplaceValue] = useState("");

  const [place, setplace] = useState<any>([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
      {
        (() => {
          switch (lat && long) {
            case 12.91 && 74.58:
              return setplace(placesMangalore);
            default:
              return setplace(placesUdupi);
          }
        })();
      }
    });
  }, [lat, long]);

  let placeValueFromRedux = useSelector(
    (state: any) => state && state.placeAuto && state.placeAuto.placeValue
  );
  let placeNotAvailable = notAvailable.includes(placeValueFromRedux);
  let noBrandAvailable = noBrands.includes(placeValueFromRedux);

  const [modalStatus, setmodalStatus] = useState(false);
  useEffect(() => {
    setmodalStatus(placeNotAvailable);
  }, [placeNotAvailable]);

  const handleClose = () => {
    setmodalStatus(false);
  };

  const [modalStatus2, setmodalStatus2] = useState(false);
  useEffect(() => {
    setmodalStatus2(noBrandAvailable);
  }, [noBrandAvailable]);

  const handleClose2 = () => {
    setmodalStatus2(false);
  };

  const submitHandlerFn = () => {
    dispatch(restaurantHeaderSearchAsyncThunk({ searchBarValue }));
    dispatch(setSearchValueFood(searchBarValue));
    {
      !modalStatus && navigate("/restaurantLists");
    }
  };

  return (
    <>
      <div className="homeOneContainer">
        <Modal
          open={modalStatus}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="style">
            <NoPastOrders
              message={
                "No restaurants deliver to your Address. Please change your location"
              }
            />
          </div>
        </Modal>
        <Modal
          open={modalStatus2}
          onClose={handleClose2}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="style">
            <NoPastOrders
              message={
                "No brands and brand offers available to your Address. Please change your location"
              }
            />
          </div>
        </Modal>
        <img
          src={require("../../assets/Plate BG.png")}
          alt="plate"
          className="homeOnePattern1"
        />
        <img
          src={require("../../assets/Mushroom BG.png")}
          alt=""
          className="homeOnePattern2"
        />
        <div className="oneConatiner">
          <div className="ordeDiv">
            <div className="order">
              Order your food <br />
              from the best restaurants
            </div>
          </div>
          <form className="foodFormOne" onSubmit={submitHandlerFn}>
            <div className="foodSearch">
              <img
                src={require("../../assets/icn_search_home copy.png")}
                className="searchIcon"
                alt="glass"
              />
            </div>
            <div className="foodInput">
              <input
                type="text"
                placeholder="Search your restaurant or cuisines"
                className="searchFeildOne"
                value={searchBarValue}
                onChange={(e: any) => {
                  setsearchBarValue(e.target.value);
                }}
              />
            </div>
          </form>
          <form className="placeDateOne">
            <div className="placeDiv">
              <img
                src={require("../../assets/icn_pin.png")}
                className="pinImage"
                alt="pin"
              />
              <SearchBarForPlace />

              <img
                src={require("../../assets/icn_gps_indicator.png")}
                alt=""
                className="gpss"
              />
            </div>
            <div className="background">
              <div className="datePicker">
                <div className="dateTime">{value}</div>
                <img
                  src={require("../../assets/now_button.png")}
                  alt=""
                  className="dateNowHome"
                  width="56px"
                />
              </div>
            </div>
          </form>
          <div className="scroll" onClick={() => window.scrollTo(1000, 1000)}>
            <div className="srollIcon">
              <img src={require("../../assets/mouse.png")} alt="" />
            </div>
            <div className="scrollText">Scroll</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeOne;
