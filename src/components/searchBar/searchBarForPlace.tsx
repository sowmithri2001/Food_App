import { Autocomplete, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { placesMangalore, placesUdupi } from '../../data/placesAuto';
import { setPlace } from '../../redux/reducers/placeAutoCompleteSlice';
import './searchBarForPlace.css'

const SearchBarForPlace = () => {
    const dispatch = useDispatch();
    const [lat, setlat] = useState(0);
    const [long, setlong] = useState(0);
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


    let placeValueFromRedux = useSelector((state: any) => state && state.placeAuto && state.placeAuto.placeValue)

    const [placeName, setplaceName] = useState<any>(placeValueFromRedux);
    useEffect(() => {

        dispatch(setPlace(placeName));
    }, [placeName])

    return (
        <>
            <Autocomplete
                disableClearable
                disablePortal
                id="combo-box-demo"
                options={place}
                sx={{ width: "100%", bgcolor: "#FFF", borderRadius: "10px", boxShadow: "0 2px 10px 0 rgba(0,0,0,0.1)", outline: "none", border: "none" }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label=""

                    />
                )}
                value={placeName}
                onChange={(event: any, newValue: any) => setplaceName(newValue)}
            />
        </>
    )
}

export default SearchBarForPlace;
