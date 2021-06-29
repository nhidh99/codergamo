function LocationSelect({ name, placeholder, options, onChange }) {
    return (
        <select
            name={name}
            className="w-full p-2 border-2 rounded"
            disabled={options.length === 0}
            onChange={(e) => onChange ? onChange(e.currentTarget.value) : null}
        >
            <option hidden>{placeholder}</option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

export default LocationSelect;
