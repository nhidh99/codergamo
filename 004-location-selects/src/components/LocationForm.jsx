import useLocationSelects from "./useLocationSelects";
import LocationSelect from "./LocationSelect/LocationSelect";

function LocationForm() {
    const { state, onCitySelect, onDistrictSelect, onSubmit } =
        useLocationSelects();
    const { cities, districts, wards } = state;

    return (
        <form
            id="form"
            className="w-1/2 p-5 mx-auto mt-10 bg-gray-100 border-2 rounded"
            onSubmit={(e) => onSubmit(e)}
        >
            <div className="flex gap-5">
                <LocationSelect
                    name="city"
                    placeholder="Tỉnh/Thành"
                    options={cities}
                    onChange={onCitySelect}
                />
                <LocationSelect
                    name="district"
                    placeholder="Quận/Huyện"
                    options={districts}
                    onChange={onDistrictSelect}
                />
                <LocationSelect
                    name="ward"
                    placeholder="Phường/Xã"
                    options={wards}
                />
            </div>

            <button
                type="submit"
                className="w-full p-2 mt-4 text-white bg-blue-900 rounded"
            >
                Xác nhận
            </button>
        </form>
    );
}

export default LocationForm;
