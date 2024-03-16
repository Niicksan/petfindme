import { Typography } from "@mui/material";

export const ErrorMessage = ({ message }) => {
    return (
        <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{message}</Typography>
    );
};