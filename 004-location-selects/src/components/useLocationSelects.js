/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { PATHS } from "../constants/paths";

async function fetchCities() {
    const response = await axios.get(PATHS.CITIES);
    return response.data["data"];
}

async function fetchDistricts(cityId) {
    const response = await axios.get(`${PATHS.DISTRICTS}/${cityId}.json`);
    return response.data["data"];
}

async function fetchWards(districtId) {
    const response = await axios.get(`${PATHS.WARDS}/${districtId}.json`);
    return response.data["data"];
}

const STEPS = {
    LOAD_CITIES: "LOAD_CITIES",
    LOAD_DISTRICTS: "LOAD_DISTRICTS",
    LOAD_WARDS: "LOAD_WARDS",
};

function useLocationSelects() {
    const [state, setState] = useState({
        cities: [],
        districts: [],
        wards: [],
        param: null,
        step: STEPS.LOAD_CITIES,
    });

    useEffect(() => {
        async function loadLocation() {
            switch (state.step) {
                case STEPS.LOAD_CITIES: {
                    const cities = await fetchCities();
                    setState({ ...state, cities: cities, step: null });
                    break;
                }
                case STEPS.LOAD_DISTRICTS: {
                    const districts = await fetchDistricts(state.param);
                    setState({ ...state, districts: districts, step: null });
                    break;
                }
                case STEPS.LOAD_WARDS: {
                    const wards = await fetchWards(state.param);
                    setState({ ...state, wards: wards, step: null });
                    break;
                }
                default: {
                    return;
                }
            }
        }

        loadLocation();
    }, [state.step]);

    function onCitySelect(cityId) {
        setState({
            ...state,
            districts: [],
            wards: [],
            step: STEPS.LOAD_DISTRICTS,
            param: cityId,
        });
    }

    function onDistrictSelect(districtId) {
        setState({
            ...state,
            wards: [],
            step: STEPS.LOAD_WARDS,
            param: districtId,
        });
    }

    function onSubmit(e) {
        e.preventDefault();
        const elements = document.getElementById("form").elements;
        const data = {};
        for (let i = 0; i < elements.length - 1; i++) {
            var item = elements.item(i);
            data[item.name] = item.value;
        }
        alert(JSON.stringify(data));
    }

    return { state, onCitySelect, onDistrictSelect, onSubmit };
}

export default useLocationSelects;
