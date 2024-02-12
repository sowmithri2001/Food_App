import React, { useEffect } from "react";
import "./overviewBody.css";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { textAlign } from "@mui/system";
import ExpandMoreIcon, { Accordion } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { eachRestaurantOverViewOpenAsyncThunk } from "../../redux/reducers/restaurantDetailsSlice";
// import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';

const OverviewBody = () => {
  let overViewDetails = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantOverview &&
      state.restaurantDetailsList.restaurantOverview
  );
  const arr = [1, 2, 3, 4, 5];
  const dispatch = useDispatch();
  let restautrantId = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantOverview &&
      state.restaurantDetailsList.restaurantOverview &&
      state.restaurantDetailsList.restaurantOverview.restaurantId
  );
  let restaurantOpen = useSelector(
    (state: any) =>
      state &&
      state.restaurantDetailsList &&
      state.restaurantDetailsList.restaurantOpen &&
      state.restaurantDetailsList.restaurantOpen
  );
  useEffect(() => {
    dispatch(eachRestaurantOverViewOpenAsyncThunk(restautrantId));
  }, [dispatch]);

  return (
    <>
      <div className="overviewContainer">
        <div className="overviewContent">
          <div className="overviewDescriptipon">
            <div className="descriptionTxt">Description</div>
            <div className="descriptionContent">
              {overViewDetails && overViewDetails.description}
            </div>
          </div>

          <div className="overviewSecondContainer">
            <div className="overviewSecondContents">
              <div className="overviewSecondTxt">Cuisines</div>
              <div className="overviewSecondDescription">
                {overViewDetails && overViewDetails.restaurantType}
              </div>
            </div>
            <div className="overviewSecondContent">
              <div className="overviewSecondTxt">Average meal cost</div>
              <div className="overviewSecondDescription">
                AED {overViewDetails && overViewDetails.averageCost} for two
                (approx)
              </div>
            </div>
            <div className="overviewSecondContent">
              <div className="overviewSecondTxt">Accepted Payment</div>
              <div className="overviewSecondDescription">
                {!overViewDetails && overViewDetails.cardAccepted ? (
                  <span>Cash accepted only</span>
                ) : (
                  <span>Cash and Cards accepeted</span>
                )}
              </div>
            </div>
            <div className="overviewSecondContent">
              <div className="overviewSecondTxt">Phone</div>
              <div className="overviewSecondDescription">
                {overViewDetails && overViewDetails.mobileNo}
              </div>
            </div>
            <div className="overviewSecondContentLast">
              <div className="overviewSecondTxt">Address</div>
              <div className="overviewSecondDescription">
                {overViewDetails && overViewDetails.addressDesc}
              </div>
            </div>
          </div>
          <div className="overviewBottom">
            <div className="overviewOpening">
              <div className="openingHender">Opening hours</div>
              <div className="overviewCardOpen">
                <div className="openingContainer">
                  <div className="dateOpenOverview">
                    <div className="overviewDate">
                      {" "}
                      Today{" "}
                      {overViewDetails &&
                        overViewDetails.openingDetails &&
                        overViewDetails.openingDetails[0].dateOf}
                    </div>
                    <div className="overviewOpen">
                      {overViewDetails &&
                        overViewDetails.openingDetails &&
                        overViewDetails.openingDetails[0].opened ? (
                        <span>Open</span>
                      ) : (
                        <span className="overviewBodayCloseRest">Close</span>
                      )}
                    </div>
                  </div>
                  <div className="overviewTime">
                    {overViewDetails &&
                      overViewDetails.openingDetails &&
                      overViewDetails.openingDetails[0].openingTime}{" "}
                    -{" "}
                    {overViewDetails &&
                      overViewDetails.openingDetails &&
                      overViewDetails.openingDetails[0].closingTime}
                  </div>
                </div>

                <div className="overviewAcordianStart">
                  <Accordion elevation={0} sx={{ marginLeft: 3 }}>
                    <AccordionSummary>
                      <div
                        className="accordian"
                        onClick={() =>
                          dispatch(
                            eachRestaurantOverViewOpenAsyncThunk(restautrantId)
                          )
                        }
                      >
                        Work hours for next{" "}
                        {restaurantOpen && restaurantOpen.length} days{" "}
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {restaurantOpen &&
                        restaurantOpen.map((e: any, i: any) => {
                          return (
                            <div className="openingContainer">
                              <div className="dateOpenOverview">
                                <div className="overviewDate"></div>
                                <div className="overviewOpen">
                                  {e.opened ? (
                                    <span>open</span>
                                  ) : (
                                    <span className="overviewBodayCloseRest">
                                      close
                                    </span>
                                  )}
                                </div>
                              </div>
                              <div className="overviewTime">
                                {e.openingTime} - {e.closingTime}
                              </div>
                              <div className="overviewPlanning">{e.reason}</div>
                            </div>
                          );
                        })}
                    </AccordionDetails>
                  </Accordion>
                </div>
              </div>
            </div>

            <div className="overviewDirectiopnMap">
              <div className="DirectionMapText">Get Direction</div>
              <div className="iframeParent">
                <iframe
                  src={`https://maps.google.com/maps?q=${overViewDetails && overViewDetails.lattitude
                    },${overViewDetails && overViewDetails.longitude
                    }&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                  className="iframeBox"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewBody;
