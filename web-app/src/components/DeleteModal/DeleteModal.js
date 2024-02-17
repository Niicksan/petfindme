import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

export const DeleteModal = ({
    open,
    title,
    message,
    handleClose,
    onDeleteSubmit,
    removeFromFavourite,
    petId,
    isFavourite
}) => {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} sx={{ color: '#232323', textTransform: 'none' }}>
                        Назад
                    </Button>
                    {!isFavourite && (
                        <Button variant="contained" color={'error'} startIcon={<DeleteIcon />} sx={{ textTransform: 'none', }}
                            onClick={() => {
                                onDeleteSubmit(petId);
                                handleClose();
                            }}>
                            Да
                        </Button>
                    )}
                    {isFavourite && (
                        <Button variant="contained" color={'error'} startIcon={<DeleteIcon />} sx={{ textTransform: 'none' }}
                            onClick={() => {
                                removeFromFavourite(petId);
                                handleClose();
                            }}>
                            Да
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </div>
    );
};