import { Autocomplete, inputLabelClasses, Modal, TextField } from "@mui/material";
import "../../views/home/home.css";
import "./restaurantSubHeader.css";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, showModal } from "../../redux/reducers/modalSlice";
import "../../views/restaurantList/restaurantList.css";
import { useEffect, useState } from "react";
import { restaurantHeaderSearchAsyncThunk, setSearchValueFood } from "../../redux/reducers/restaurantListSlice";
import { placesMangalore, placesUdupi } from "../../data/placesAuto";
import { useNavigate } from "react-router-dom";
import SearchBarForPlace from "../searchBar/searchBarForPlace";
const RestaurantSubHeader = () => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const [lat, setlat] = useState(0);
  const [long, setlong] = useState(0);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setlat(position.coords.latitude);
      setlong(position.coords.longitude);
      {
        (() => {
          switch (lat && long) {
            case 12.91 && 74.58: return (setplace(placesMangalore));
            default: return (setplace(placesUdupi));

          }
        })()
      }
    });
  }, [lat, long])


  const [place, setplace] = useState<any>([]);
  let searchValueRedux = useSelector((state: any) => state.restaurantList.searchValue)
  const [searchBarValue, setsearchBarValue] = useState<any>(searchValueRedux);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restaurantHeaderSearchAsyncThunk({ searchBarValue }));
    dispatch(setSearchValueFood(searchBarValue));
  }, [searchBarValue])
  return (
    <>
      <div className="searchBarDivContainer">
        <div className="searchBarDiv">


          <form className="placeDate">
            <img
              src={require("../../assets/icn_pin.png")}
              className="pinImage"
              alt="pin"
            />
            <SearchBarForPlace />
            <img
              src={require("../../assets/icn_gps_indicator.png")}
              alt=""
              className="gps"
            />
          </form>
          <form className="foodForm">
            <img
              src={require("../../assets/icn_search_home copy.png")}
              className="searchIcon"
              alt="glass"
            />
            <input
              type="text"
              placeholder="Search your restaurant or cuisines"
              className="searchFeild searchInSubHeader" value={searchBarValue} onChange={(e: any) => { setsearchBarValue(e.target.value) }}
            />
          </form>

          <div className="datePickers">
            <img
              src={require("../../assets/now_button.png")}
              alt=""
              className="dateNow"

            />
          </div>
        </div>
      </div>
      {/* routeDIV */}

      <form className="foodFormFormMobile">
        <img
          src={require("../../assets/icn_search_home copy.png")}
          className="searchIcon"
          alt="glass"
        />
        <input
          type="text"
          placeholder="Search your restaurant or cuisines"
          className="searchFeild searchInSubHeader" value={searchBarValue} onChange={(e: any) => { setsearchBarValue(e.target.value) }}
        />
      </form>
      <div className="modalHolder">
        {" "}
      </div>
    </>
  );
};

export default RestaurantSubHeader;
