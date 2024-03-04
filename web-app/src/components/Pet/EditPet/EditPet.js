import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Avatar, Container, Box, Button, TextField, FormControl, MenuItem, InputLabel, Select, Typography } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';

import { usePetContext } from '../../../contexts/PetContext';

import { usePetValidation } from '../../../hooks/usePetValidation';
import { useForm } from '../../../hooks/useForm';

import { Loader } from '../../Loader/Loader'
import { PetForm } from '../PetForm/PetForm';
import { Map } from '../../Map/Map';

const theme = createTheme();

export const EditPet = () => {
    const { id } = useParams();
    const { isOwner, cities } = usePetContext();
    const [coords, setCoords] = useState({});
    const position = [coords?.latitude || 42.798165, coords?.longitude || 25.6275174];
    const height = '300px';
    const zoom = 17;
    const [isLoading, setIsLoading] = useState(false);

    const {
        form,
        error,
        statuses,
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

    const { values, setValues, changeHandler, onSubmit } = useForm({
        title: '',
        status: '',
        location: '',
        geolocation: {},
        contactName: '',
        phone: '',
        imageUrl: '',
        description: ''
    }, onEditPetSubmit, id);

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

                            <TextField
                                error={error.status}
                                margin="dense"
                                required
                                fullWidth
                                id="status"
                                select={true}
                                label="Статус"
                                name="status"
                                autoComplete="status"
                                value={values.status}
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

                            <FormControl fullWidth required sx={{ my: 1 }} >
                                <InputLabel id="location-label" htmlFor="location">Местоположение</InputLabel>
                                <Select
                                    id="location"
                                    name="location"
                                    label="Местоположение"
                                    value={values.location}
                                    MenuProps={{
                                        style: {
                                            maxHeight: 500,
                                        },
                                    }}
                                    onChange={(e) => {
                                        changeHandler(e);
                                        handleClickLocation(e);
                                    }}
                                >
                                    {cities?.map((option) => (
                                        <MenuItem key={option.key} value={option.name}>
                                            {option.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            {error.location && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Mестоположението трябва да е поне 3 символа</Typography>}

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