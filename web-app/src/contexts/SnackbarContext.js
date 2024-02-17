import { useState, createContext, useContext } from 'react';

export const SnackbarContext = createContext();

export const SnackarProvider = ({
    children
}) => {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [message, setMessage] = useState(null);

    const handleOpenSnackbar = () => {
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const contextValues = {
        openSnackbar,
        message,
        setMessage,
        handleOpenSnackbar,
        handleCloseSnackbar
    };

    return (
        <SnackbarContext.Provider value={contextValues}>
            {children}
        </SnackbarContext.Provider>
    );
};

export const useSnackbarContext = () => {
    const context = useContext(SnackbarContext);

    return context;
};