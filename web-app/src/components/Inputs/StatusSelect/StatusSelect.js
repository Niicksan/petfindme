import { MenuItem, IconButton, FormControl, Select, InputLabel } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";

import { usePetValidation } from "../../../hooks/usePetValidation";

import { ErrorMessage } from "../../Errors/ErrorMessage/ErrorMessage";

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
            <FormControl className="status" required={required} fullWidth sx={{ ...styles }}>
                <InputLabel className="status-label" id="status-label">Статус</InputLabel>
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
            {error && <ErrorMessage message={"Изберете статус"} />}
        </>
    );
};