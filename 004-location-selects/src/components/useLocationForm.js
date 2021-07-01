/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { PATHS } from "../constants/paths";

const FETCH_TYPES = {
    CITIES: "FETCH_CITIES",
    DISTRICTS: "FETCH_DISTRICTS",
    WARDS: "FETCH_WARDS",
    INIT: "FETCH_INIT",
};

async function fetchLocationOptions(fetchType, locationId) {
    let url;
    switch (fetchType) {
        case FETCH_TYPES.CITIES: {
            url = PATHS.CITIES;
            break;
        }
        case FETCH_TYPES.DISTRICTS: {
            url = `${PATHS.DISTRICTS}/${locationId}.json`;
            break;
        }
        case FETCH_TYPES.WARDS: {
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

async function fetchInitialData() {
    const { cityId, districtId, wardId } = (await axios.get(PATHS.LOCATION)).data;
    const [cities, districts, wards] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.CITIES),
        fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityId),
        fetchLocationOptions(FETCH_TYPES.WARDS, districtId),
    ]);

    return {
        cityOptions: cities,
        districtOptions: districts,
        wardOptions: wards,
        selectedCity: cities.find((c) => c.value === cityId),
        selectedDistrict: districts.find((d) => d.value === districtId),
        selectedWard: wards.find((w) => w.value === wardId),
    };
}

function useLocationForm(shouldFetchInitialLocation) {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: null,
        selectedDistrict: null,
        selectedWard: null,
        paramId: null,
        fetchType: shouldFetchInitialLocation ? FETCH_TYPES.INIT : FETCH_TYPES.CITIES,
    });

    const { paramId, fetchType } = state;

    useEffect(() => {
        (async function () {
            if (fetchType === FETCH_TYPES.INIT) {
                const initialData = await fetchInitialData();
                setState({ ...state, ...initialData });
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const options = await fetchLocationOptions(fetchType, paramId);
            switch (fetchType) {
                case FETCH_TYPES.CITIES: {
                    setState({ ...state, cityOptions: options });
                    break;
                }
                case FETCH_TYPES.DISTRICTS: {
                    setState({ ...state, districtOptions: options });
                    break;
                }
                case FETCH_TYPES.WARDS: {
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
            fetchType: FETCH_TYPES.DISTRICTS,
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
            fetchType: FETCH_TYPES.WARDS,
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
        window.location.reload();
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocationForm;
