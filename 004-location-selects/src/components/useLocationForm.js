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

async function fetchLocationOption(fetchType, locationId) {
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
    const [cityOptions, districtOptions, wardOptions] = await Promise.all([
        fetchLocationOption(FETCH_TYPES.CITIES),
        fetchLocationOption(FETCH_TYPES.DISTRICTS, cityId),
        fetchLocationOption(FETCH_TYPES.WARDS, districtId),
    ]);

    return {
        cityOptions: cityOptions,
        districtOptions: districtOptions,
        wardOptions: wardOptions,
        selectedCity: cityOptions.find((c) => c.value === cityId),
        selectedDistrict: districtOptions.find((d) => d.value === districtId),
        selectedWard: wardOptions.find((w) => w.value === wardId),
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
        fetchOptions: {
            type: shouldFetchInitialLocation ? FETCH_TYPES.INIT : FETCH_TYPES.CITIES,
            param: null,
        },
    });

    const { type, param } = state.fetchOptions;

    useEffect(() => {
        (async function () {
            if (type === FETCH_TYPES.INIT) {
                const initialData = await fetchInitialData();
                setState({ ...state, ...initialData });
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            const options = await fetchLocationOption(type, param);
            switch (type) {
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
    }, [state.fetchOptions]);

    function onCitySelect(option) {
        setState({
            ...state,
            districtOptions: [],
            wardOptions: [],
            selectedCity: option,
            selectedDistrict: null,
            selectedWard: null,
            fetchOptions: {
                type: FETCH_TYPES.DISTRICTS,
                param: option.value,
            },
        });
    }

    function onDistrictSelect(option) {
        setState({
            ...state,
            wardOptions: [],
            selectedDistrict: option,
            selectedWard: null,
            fetchOptions: {
                type: FETCH_TYPES.WARDS,
                param: option.value,
            },
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