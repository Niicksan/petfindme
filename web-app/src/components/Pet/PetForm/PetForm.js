import { Button, TextField, Box, Typography, MenuItem } from '@mui/material';

import { usePetValidation } from '../../../hooks/usePetValidation';

export const PetForm = ({ isPetFormValid, values, changeHandler, onSubmit }) => {
    const {
        error,
        statuses,
        handleClickTitle,
        handleClickStatus,
        handleClickLocation,
        handleClickContactName,
        handleClickPhone,
        handleClickImageUrl,
        handleClickDescription,
    } = usePetValidation();

    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: '100%' }}>
            {error.serverErrors.length > 0 && error.serverErrors.map(err => {
                <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{err}</Typography>
            })}

            <TextField
                error={error.title}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Заглавие"
                name="title"
                autoComplete="title"
                value={values.title}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickTitle(e);
                }}
            />
            {error.title && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Заглавието трябва да е поне 3 символа</Typography>}

            <TextField
                error={error.status}
                margin="normal"
                required
                id="status"
                select={true}
                label="Статус"
                name="status"
                autoComplete="status"
                value={values.status}
                sx={{ width: "100%" }}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickStatus(e);
                }}
            >
                {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))}
            </TextField>
            {error.status && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Изберете статус</Typography>}

            <TextField
                error={error.location}
                margin="normal"
                required
                fullWidth
                id="location"
                label="Местоположение"
                name="location"
                autoComplete="location"
                value={values.location}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickLocation(e);
                }}
            />
            {error.location && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Mестоположението трябва да е поне 3 символа</Typography>}

            <TextField
                error={error.contactName}
                margin="normal"
                required
                fullWidth
                id="contactName"
                label="Име за връзка"
                name="contactName"
                autoComplete="contactName"
                value={values.contactName}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickContactName(e);
                }}
            />
            {error.contactName && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Името трябва да в поне 3 символа</Typography>}

            <TextField
                error={error.phone}
                margin="normal"
                required
                fullWidth
                id="phone"
                label="Телефон"
                name="phone"
                autoComplete="phone"
                value={values.phone}
                sx={{ width: "100%" }}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickPhone(e);
                }}
            />
            {error.phone && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Въведете валиден телефон</Typography>}

            <TextField
                error={error.imageUrl}
                margin="normal"
                required
                fullWidth
                id="imageUrl"
                label="Снимка"
                name="imageUrl"
                autoComplete="imageUrl"
                value={values.imageUrl}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickImageUrl(e);
                }}
            />
            {error.imageUrl && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Въведете валиден URL</Typography>}

            <TextField
                error={error.description}
                margin="normal"
                required
                fullWidth
                id="description"
                label="Описание"
                name="description"
                autoComplete="description"
                multiline
                rows={4}
                value={values.description}
                sx={{ width: "100%" }}
                onChange={(e) => {
                    changeHandler(e);
                    handleClickDescription(e);
                }}
            />
            {error.description && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Описанието трябва да е поне 20 символа</Typography>}

            <Button
                disabled={!isPetFormValid}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
            >
                Добави
            </Button>
        </Box>
    );
}