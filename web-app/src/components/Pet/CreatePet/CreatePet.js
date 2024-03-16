import { useState, useEffect } from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Avatar, Container, Box, TextField, Typography, Button, FormControl } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import { usePetValidation } from '../../../hooks/usePetValidation';
import { useForm } from '../../../hooks/useForm';
import { PetForm } from '../PetForm/PetForm';
import { Map } from '../../Map/Map';
import { StatusSelect } from '../../Inputs/StatusSelect/StatusSelect';
import { PetImageUpload } from '../../ImageUpload/PetImageUpload/PetImageUpload';
import { LocationAutocomplete } from '../../Inputs/LocationAutocompleteInput/LocationAutocomplete';
import { ErrorMessage } from '../../Errors/ErrorMessage/ErrorMessage';

const theme = createTheme();

export const CreatePet = () => {
    const [coords, setCoords] = useState({});
    const position = [42.798165, 25.6275174];
    const height = '300px';
    const zoom = 7;

    const {
        form,
        setPetForm,
        error,
        setError,
        isPetFormValid,
        onCreatePetSubmit,
        handleClickTitle,
        handleClickStatus,
        handleClickLocation,
        handleClickContactName,
        handleClickPhone,
        handleClickImageUrl,
        handleClickDescription,
        checkIsPetFormValid,
    } = usePetValidation();

    const { values, setValues, changeHandler, autocompleteChangeHandler, onSubmit } = useForm({
        title: '',
        status: '',
        location: '',
        geolocation: {},
        contactName: '',
        phone: '',
        imageUrl: '',
        description: ''
    }, onCreatePetSubmit);

    const handleClickClear = () => {
        setValues(state => ({ ...state, status: '' }));
        setPetForm(state => ({ ...state, status: '' }));
        setError(state => ({ ...state, status: true }));
    };

    useEffect(() => {
        setValues({ ...values, geolocation: coords });
        setPetForm({ ...values, geolocation: coords });
    }, [coords]);

    useEffect(() => {
        checkIsPetFormValid();
    }, [form.title, form.status, form.location, form.geolocation, form.contactName, form.phone, form.imageUrl, form.description]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'green' }} >
                        <AddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5" >
                        Подаване на сигнал
                    </Typography>

                    {/* <PetForm isPetFormValid={isPetFormValid} values={values} changeHandler={changeHandler} onSubmit={onSubmit} /> */}

                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: '100%' }}>
                        {/* {console.log(error.serverErrors)}
                        {error.serverErrors?.length !== 0 && (error.serverErrors?.map(err =>
                            <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{err}</Typography>
                        ))} */}

                        <TextField
                            error={error.title}
                            margin="dense"
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
                        {error.title && <ErrorMessage message={"Заглавието трябва да е поне 3 символа"} />}

                        <StatusSelect
                            changeHandler={changeHandler}
                            handleClickStatus={handleClickStatus}
                            handleClickClear={handleClickClear}
                            required={true}
                            inputValue={values.status}
                            styles={{ mt: 1, mb: 0.5 }}
                            error={error.status}
                        />

                        <FormControl fullWidth required >
                            <PetImageUpload />
                        </FormControl>

                        <LocationAutocomplete
                            autocompleteChangeHandler={autocompleteChangeHandler}
                            handleClickLocation={handleClickLocation}
                            required={true}
                            label={'Местоположение'}
                            inputValue={values.location}
                            error={error.location}
                        />

                        <FormControl fullWidth required >
                            <Typography id="geo-location-label" sx={{ mb: 1 }}>Изберете локация на картата *</Typography>
                            <Map id="geo-location" coords={coords} setCoords={setCoords} mapPosition={position} mapHeight={height} mapZoom={zoom} editable={true} />
                        </FormControl>

                        <TextField
                            error={error.contactName}
                            margin="dense"
                            required
                            fullWidth
                            id="contactName"
                            label="Име за връзка"
                            name="contactName"
                            autoComplete="contactName"
                            value={values.contactName}
                            sx={{ mt: '12px' }}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickContactName(e);
                            }}
                        />
                        {error.contactName && <ErrorMessage message={"Името трябва да е поне 3 символа"} />}

                        <TextField
                            error={error.phone}
                            margin="dense"
                            required
                            fullWidth
                            id="phone"
                            label="Телефон"
                            name="phone"
                            autoComplete="phone"
                            value={values.phone}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickPhone(e);
                            }}
                        />
                        {error.phone && <ErrorMessage message={"Въведете валиден телефон"} />}

                        <TextField
                            error={error.imageUrl}
                            margin="dense"
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
                        {error.imageUrl && <ErrorMessage message={"Въведете валиден URL"} />}

                        <TextField
                            error={error.description}
                            margin="dense"
                            required
                            fullWidth
                            id="description"
                            label="Описание"
                            name="description"
                            autoComplete="description"
                            multiline
                            rows={4}
                            value={values.description}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickDescription(e);
                            }}
                        />
                        {error.description && <ErrorMessage message={"Описанието трябва да е поне 20 символа"} />}

                        <Button
                            disabled={!isPetFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                        >
                            Подай Сигнал
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};