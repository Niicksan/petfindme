import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Avatar, Container, Box, Button, TextField, FormControl, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { usePetContext } from '../../../contexts/PetContext';

import { usePetValidation } from '../../../hooks/usePetValidation';
import { useForm } from '../../../hooks/useForm';

import { Loader } from '../../Loader/Loader'
import { PetForm } from '../PetForm/PetForm';
import { Map } from '../../Map/Map';
import { StatusSelect } from '../../Inputs/StatusSelect/StatusSelect';
import { LocationAutocomplete } from '../../Inputs/LocationAutocompleteInput/LocationAutocomplete';

const theme = createTheme();

export const EditPet = () => {
    const { id } = useParams();
    const { isOwner } = usePetContext();
    const [coords, setCoords] = useState({});
    const position = [coords?.latitude || 42.798165, coords?.longitude || 25.6275174];
    const height = '300px';
    const zoom = 17;
    const [isLoading, setIsLoading] = useState(false);

    const {
        form,
        error,
        setError,
        setPetForm,
        getPetById,
        isPetFormValid,
        onEditPetSubmit,
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
    }, onEditPetSubmit, id);

    const handleClickClear = () => {
        setValues(state => ({ ...state, status: '' }));
        setPetForm(state => ({ ...state, status: '' }));
        setError(state => ({ ...state, status: true }));
    };

    useEffect(() => {
        setIsLoading(true);
        if (isOwner) {
            getPetById(id)
                .then(result => {
                    setValues({
                        ...values,
                        title: result.title,
                        status: result.status,
                        location: result.location,
                        geolocation: result.geolocation,
                        contactName: result.contactName,
                        phone: result.phone,
                        imageUrl: result.imageUrl,
                        description: result.description
                    });
                    setPetForm({
                        ...values,
                        title: result.title,
                        status: result.status,
                        location: result.location,
                        geolocation: result.geolocation,
                        contactName: result.contactName,
                        phone: result.phone,
                        imageUrl: result.imageUrl,
                        description: result.description
                    });
                    setCoords(result.geolocation);
                    setIsLoading(false);
                });
        };
    }, [id, isOwner]);

    useEffect(() => {
        setValues({ ...values, geolocation: coords });
        setPetForm({ ...values, geolocation: coords });
    }, [coords]);

    useEffect(() => {
        checkIsPetFormValid();
    }, [form.title, form.status, form.location, form.geolocation, form.title, form.contactName, form.phone, form.imageUrl, form.description]);

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (<ThemeProvider theme={theme}>
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
                            <EditIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5" >
                            Редактиране на сигнал
                        </Typography>

                        {/* <PetForm isPetFormValid={isPetFormValid} values={values} changeHandler={changeHandler} onSubmit={onSubmit} /> */}

                        <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: '100%' }}>
                            {/* {error.serverErrors.length !== 0 && (error.serverErrors?.map(err =>
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
                            {error.title && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Заглавието трябва да е поне 3 символа</Typography>}

                            <StatusSelect
                                changeHandler={changeHandler}
                                handleClickStatus={handleClickStatus}
                                handleClickClear={handleClickClear}
                                required={true}
                                inputValue={values.status}
                                styles={{ mt: 1, mb: 0.5 }}
                                error={error.status}
                            />

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
                                <Map id="geo-location" coords={coords || 0} setCoords={setCoords} mapPosition={position} mapHeight={height} mapZoom={zoom} editable={true} />
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
                                sx={{ mt: 2 }}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickContactName(e);
                                }}
                            />
                            {error.contactName && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Името трябва да в поне 3 символа</Typography>}

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
                            {error.phone && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Въведете валиден телефон</Typography>}

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
                            {error.imageUrl && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Въведете валиден URL</Typography>}

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
                            {error.description && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Описанието трябва да е поне 20 символа</Typography>}

                            <Button
                                disabled={!isPetFormValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                            >
                                Редактирай
                            </Button>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider >
            )}
        </>
    );
};