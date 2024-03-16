import { Autocomplete, FormControl, TextField, Typography } from "@mui/material";

import { usePetContext } from '../../../contexts/PetContext';

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
            {error && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Моля изберете местоположение</Typography>}
        </>
    );
};