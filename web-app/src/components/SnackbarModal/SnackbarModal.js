import { Snackbar, Alert, Slide } from '@mui/material';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { useSnackbarContext } from '../../contexts/SnackbarContext';

export const SnackbarModal = () => {
    const {
        openSnackbar, message, handleCloseSnackbar } = useSnackbarContext();

    return (
        <Snackbar
            open={openSnackbar}
            autoHideDuration={3000}
            onClose={handleCloseSnackbar}
            TransitionComponent={Slide}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }
            }
        >
            <Alert
                elevation={6}
                variant="filled"
                severity="success"
                onClose={handleCloseSnackbar}
                iconMapping={{
                    success: <CheckCircleIcon />
                }}
                sx={{ bgcolor: '#43a047' }}
            >
                {message}
            </Alert>
        </Snackbar >
    );
}