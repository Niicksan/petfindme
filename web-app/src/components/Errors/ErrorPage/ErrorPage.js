import './ErrorPage.scss';

import { Box, Typography } from '@mui/material';
import { MainButton } from '../../Buttons/MainButton/MainButton';

export const ErrorPage = ({ title }) => {
    const text = "Върнете се в началото";

    return (
        <Box id="error-page">
            <Box className="error-container">
                <Box className="error-header">
                    <Typography component="h1">Oops!</Typography>
                    <Typography component="h2">{title}</Typography>
                </Box>
                <MainButton text={text} />
            </Box>
        </Box>
    );
};