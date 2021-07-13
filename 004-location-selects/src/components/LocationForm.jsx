import useLocationForm from "./useLocationForm";
import Select from "react-select";

function LocationForm() {
    const { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit } =
        useLocationForm(true);
        
    const {
        cityOptions,
        districtOptions,
        wardOptions,
        selectedCity,
        selectedDistrict,
        selectedWard,
    } = state;

    return (
        <form
            onSubmit={onSubmit}
            className="w-11/12 p-5 mx-auto mt-10 bg-gray-100 border-2 rounded md:w-2/3 sm:w-3/4 lg:w-1/2 xl:w-1/3"
        >
            <div className="flex flex-col gap-5">
                <Select
                    name="cityId"
                    key={`cityId_${selectedCity?.value}`}
                    isDisabled={cityOptions.length === 0}
                    options={cityOptions}
                    onChange={(option) => onCitySelect(option)}
                    placeholder="Tỉnh/Thành"
                    defaultValue={selectedCity}
                />

                <Select
                    name="districtId"
                    key={`districtId_${selectedDistrict?.value}`}
                    isDisabled={districtOptions.length === 0}
                    options={districtOptions}
                    onChange={(option) => onDistrictSelect(option)}
                    placeholder="Quận/Huyện"
                    defaultValue={selectedDistrict}
                />

                <Select
                    name="wardId"
                    key={`wardId_${selectedWard?.value}`}
                    isDisabled={wardOptions.length === 0}
                    options={wardOptions}
                    placeholder="Phường/Xã"
                    onChange={(option) => onWardSelect(option)}
                    defaultValue={selectedWard}
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
