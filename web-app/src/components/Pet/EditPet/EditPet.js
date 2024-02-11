import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Avatar, Container, Box, TextField, Typography, MenuItem, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { usePetValidation } from '../../../hooks/usePetValidation';
import { useForm } from '../../../hooks/useForm';
import { PetForm } from '../PetForm/PetForm';

const theme = createTheme();

export const EditPet = () => {
    const { id } = useParams();

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
        contactName: '',
        phone: '',
        imageUrl: '',
        description: ''
    }, onEditPetSubmit, id);

    useEffect(() => {
        getPetById(id)
            .then(result => {
                setValues({
                    ...values,
                    title: result.title,
                    status: result.status,
                    location: result.location,
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
                    contactName: result.contactName,
                    phone: result.phone,
                    imageUrl: result.imageUrl,
                    description: result.description
                });
            })
    }, [id]);

    useEffect(() => {
        checkIsPetFormValid();
    }, [form.title, form.status, form.location, form.contactName, form.phone, form.imageUrl, form.description]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
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
                            Редактирай
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};