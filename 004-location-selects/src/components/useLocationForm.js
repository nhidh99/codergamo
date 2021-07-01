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

async function fetchLocationOption(fetchType, locationId) {
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

function useLocationForm(shouldFetchInitialLocation) {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: null,
        selectedDistrict: null,
        selectedWard: null,
        paramId: null,
        fetchType: FETCH_TYPE.INIT,
    });

    const { paramId, fetchType } = state;

    useEffect(() => {
        if (!shouldFetchInitialLocation) {
            setState({ ...state, fetchType: FETCH_TYPE.CITIES });
            return;
        }

        (async function loadInitialLocation() {
            const { cityId, districtId, wardId } = (await axios.get(PATHS.LOCATION)).data;
            const [cityOptions, districtOptions, wardOptions] = await Promise.all([
                fetchLocationOption(FETCH_TYPE.CITIES),
                fetchLocationOption(FETCH_TYPE.DISTRICTS, cityId),
                fetchLocationOption(FETCH_TYPE.WARDS, districtId),
            ]);

            setState({
                ...state,
                cityOptions: cityOptions,
                districtOptions: districtOptions,
                wardOptions: wardOptions,
                selectedCity: cityOptions.find((c) => c.value === cityId),
                selectedDistrict: districtOptions.find((d) => d.value === districtId),
                selectedWard: wardOptions.find((w) => w.value === wardId),
            });
        })();
    }, []);

    useEffect(() => {
        (async function loadLocation() {
            const options = await fetchLocationOption(fetchType, paramId);
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
        window.location.reload();
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocationForm;
