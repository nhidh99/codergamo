/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { PATHS } from "../constants/paths";

const FETCH_TYPE = {
    CITIES: "FETCH_CITIES",
    DISTRICTS: "FETCH_DISTRICTS",
    WARDS: "FETCH_WARDS",
    INIT: "FETCH_INIT",
};

async function getLocationOptions(fetchType, locationId) {
    if (fetchType !== FETCH_TYPE.CITIES && !locationId) {
        return [];
    }

    let url;
    switch (fetchType) {
        case FETCH_TYPE.CITIES: {
            url = PATHS.CITIES;
            break;
        }
        case FETCH_TYPE.DISTRICTS: {
            url = `${PATHS.DISTRICTS}/${locationId}.json`;
            break;
        }
        case FETCH_TYPE.WARDS: {
            url = `${PATHS.WARDS}/${locationId}.json`;
            break;
        }
        default: {
            return [];
        }
    }
    const locations = (await axios.get(url)).data["data"];
    return locations.map(({ id, name }) => ({ value: id, label: name }));
}

function useLocationSelects(initialLocation) {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: initialLocation?.initCity,
        selectedDistrict: initialLocation?.initDistrict,
        selectedWard: initialLocation?.initWard,
        paramId: null,
        fetchType: FETCH_TYPE.INIT,
    });

    const { paramId, fetchType } = state;

    useEffect(() => {
        async function loadInitialLocation(location) {
            const { initCity, initDistrict, initWard } = location;
            const [cityOptions, districtOptions, wardOptions] = await Promise.all([
                getLocationOptions(FETCH_TYPE.CITIES),
                getLocationOptions(FETCH_TYPE.DISTRICTS, initCity?.value),
                getLocationOptions(FETCH_TYPE.WARDS, initDistrict?.value),
            ]);

            setState({
                ...state,
                selectedCity: initCity,
                selectedDistrict: initDistrict,
                selectedWard: initWard,
                cityOptions: cityOptions,
                districtOptions: districtOptions,
                wardOptions: wardOptions,
            });
        }

        if (initialLocation) {
            loadInitialLocation(initialLocation);
        } else {
            setState({ ...state, fetchType: FETCH_TYPE.CITIES });
        }
    }, []);

    useEffect(() => {
        (async function loadLocation() {
            const options = await getLocationOptions(fetchType, paramId);
            switch (fetchType) {
                case FETCH_TYPE.CITIES: {
                    setState({ ...state, cityOptions: options });
                    break;
                }
                case FETCH_TYPE.DISTRICTS: {
                    setState({ ...state, districtOptions: options });
                    break;
                }
                case FETCH_TYPE.WARDS: {
                    setState({ ...state, wardOptions: options });
                    break;
                }
                default: {
                    return;
                }
            }
        })();
    }, [fetchType, paramId]);

    function onCitySelect(option) {
        setState({
            ...state,
            districtOptions: [],
            wardOptions: [],
            fetchType: FETCH_TYPE.DISTRICTS,
            selectedCity: option,
            selectedDistrict: null,
            selectedWard: null,
            paramId: option.value,
        });
    }

    function onDistrictSelect(option) {
        setState({
            ...state,
            wardOptions: [],
            fetchType: FETCH_TYPE.WARDS,
            selectedDistrict: option,
            selectedWard: null,
            paramId: option.value,
        });
    }

    function onWardSelect(option) {
        setState({ ...state, selectedWard: option });
    }

    function onSubmit(e) {
        e.preventDefault();
        const { selectedCity, selectedDistrict, selectedWard } = state;
        const json = JSON.stringify({
            initCity: selectedCity,
            initDistrict: selectedDistrict,
            initWard: selectedWard,
        });
        localStorage.setItem("location", json);
        window.location.reload();
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocationSelects;