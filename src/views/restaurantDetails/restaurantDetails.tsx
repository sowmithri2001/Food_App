import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../../components/header/header";
import HeaderLogin from "../../components/headerLogin/headerLogin";
import HeaderLoginHome from "../../components/headerLogin/headerLoginHome";
import Loader from "../../components/Loader/loader";
import RestaurantsDetailsHeader from "../../components/restaurantDetailsHeader/restaurantsDetailsHeader";
import RestaurantSubHeader from "../../components/restaurantSubHeader/restaurantSubHeader";
import { restaurantListAsyncThunk } from "../../redux/reducers/restaurantListSlice";
import RestaurantMenu from "../restaurantMenu/restaurantMenu";

const RestaurantDetails = () => {
  const navigate = useNavigate();
  let data = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantHeader &&
      state.restaurantDetailsList.restaurantHeader.restaurantName
  );

  const jwttokenLogin = sessionStorage.getItem("jwtToken");
  let i = localStorage.getItem("id");
  let loaderValue = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.loading
  );

  return (
    <>
      {jwttokenLogin === null ? (
        <div
          style={{
            position: "relative",
            top: "0",
            right: "0",
            backgroundColor: "white",
            left: "0",
            width: "100%",
            height: "80px",
          }}
        >
          {" "}
          <Header />
        </div>
      ) : (
        <>
          <HeaderLogin />
        </>
      )}
      <RestaurantSubHeader />
      {loaderValue && <Loader />}
      <div className="routeDiv">
        <span className="RouteSing" onClick={() => navigate("/")}>
          Home
        </span>{" "}
        &#62;{" "}
        <span
          className="RouteSing"
          onClick={() => navigate("/restaurantLists")}
        >
          Restaurants
        </span>{" "}
        &#62; <span className="RouteSing">{data}</span>
      </div>
      <RestaurantsDetailsHeader />
      <Outlet />
    </>
  );
};

export default RestaurantDetails;
