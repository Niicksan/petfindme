import { MenuItem, Typography, IconButton, FormControl, Select, InputLabel } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

import { usePetValidation } from "../../../hooks/usePetValidation";

export const StatusSelect = ({
    changeValueHandler,
    changeHandler,
    handleClickStatus,
    handleClickClear,
    required,
    inputValue,
    styles,
    error
}) => {
    const { statuses } = usePetValidation();

    return (
        <>
            <FormControl required={required} fullWidth sx={{ ...styles }}>
                <InputLabel id="status-label">Статус</InputLabel>
                <Select
                    error={error}
                    labelId="status-label"
                    id="status"
                    label="Статус"
                    name="status"
                    value={inputValue}
                    sx={{
                        '.MuiSelect-outlined': {
                            paddingLeft: '14px',
                            paddingRight: '8px !important'
                        },
                        '&:hover': {
                            '.clear-buuton': {
                                visibility: 'visible'
                            }
                        }
                    }}
                    endAdornment={
                        <IconButton
                            className="clear-buuton"
                            onClick={handleClickClear}
                            sx={{ visibility: "hidden", p: 0.5, mr: 2.4 }}
                        >
                            <ClearIcon fontSize="small" />
                        </IconButton>}
                    onChange={(e) => {
                        if (changeValueHandler) {
                            changeValueHandler(e);
                        } else {
                            changeHandler(e);
                            handleClickStatus(e);
                        }
                    }}
                >
                    {statuses.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {error && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Изберете статус</Typography>}</>
    );
};