import { Autocomplete, FormControl, TextField } from "@mui/material";

import { usePetContext } from '../../../contexts/PetContext';

import { ErrorMessage } from "../../Errors/ErrorMessage/ErrorMessage";

export const LocationAutocomplete = ({ changeValueHandler, autocompleteChangeHandler, handleClickLocation, required, label, inputValue, styles, error }) => {
    const { cities } = usePetContext();

    return (
        <>
            <FormControl fullWidth sx={{ ...styles }}>
                <Autocomplete
                    disablePortal
                    id="location-аutocomplete"
                    options={cities || []}
                    getOptionLabel={(option) => option.name || option}
                    isOptionEqualToValue={(option, value) => option.name === value}
                    value={inputValue}
                    onChange={(event, value) => {
                        if (changeValueHandler) {
                            changeValueHandler(value)
                        } else {
                            autocompleteChangeHandler(value);
                            handleClickLocation(value);
                        }
                    }}
                    renderInput={(params) =>
                        <TextField
                            error={error}
                            margin="dense"
                            required={required}
                            id="location"
                            name="location"
                            label={label}
                            sx={{ my: 1 }}
                            {...params}
                        />}
                />
            </FormControl>
            {error && <ErrorMessage message={"Изберете местоположение"} />}
        </>
    );
};