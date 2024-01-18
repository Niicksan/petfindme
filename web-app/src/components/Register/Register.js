import { useEffect } from "react";
import { Link } from 'react-router-dom';

import { Container, Avatar, Button, CssBaseline, TextField, Box, Grid, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "../../hooks/useForm";
import { useAuthValidation } from "../../hooks/useAuthValidation";

const theme = createTheme();

export const Register = () => {
    const {
        error,
        user,
        isRegFormValid,
        onRegisterSubmit,
        handleClickEmail,
        handleClickName,
        handleClickPassword,
        handleClickConfirmPassword,
        checkIsRegFormValid,
        showPassword,
        showConfirmPassword,
        handleClickShowPassword,
        handleClickShowConfirmPassword,
        handleMouseDownPassword
    } = useAuthValidation();

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    }, onRegisterSubmit);

    useEffect(() => {
        checkIsRegFormValid()
    }, [user.email, user.name, user.password, user.confirmPassword]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 6,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Регистрация в PetFin.dMe
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1 }}>
                        <TextField
                            error={!error.email}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Имейл адрес"
                            name="email"
                            autoComplete="email"
                            value={values.email}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickEmail(e);
                            }}
                        />
                        {!error.email && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Невалиден имейл</Typography>}
                        {error.isUserExist && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{error.isUserExist}</Typography>}

                        <TextField
                            error={!error.name}
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Вашето име"
                            name="name"
                            autoComplete="name"
                            value={values.name}
                            onChange={(e) => {
                                changeHandler(e);
                                handleClickName(e);
                            }}
                        />
                        {!error.name && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Името трябва да съдържа поне 2 символа</Typography>}
                        <FormControl fullWidth required sx={{ margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="password">Парола</InputLabel>
                            <OutlinedInput
                                error={!error.password}
                                id="password"
                                label="Парола"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={values.password}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickPassword(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {!error.password && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Паролата трябва е дълга поне 5 символа</Typography>}
                        <FormControl required fullWidth sx={{ margin: '8px 0' }} variant="outlined">
                            <InputLabel htmlFor="confirmPassword">Повторете паролата</InputLabel>
                            <OutlinedInput
                                error={!error.confirmPassword}
                                id="confirmPassword"
                                label="Повторете паролата"
                                type={showConfirmPassword ? 'text' : 'password'}
                                name="confirmPassword"
                                value={values.confirmPassword}
                                onChange={(e) => {
                                    changeHandler(e);
                                    handleClickConfirmPassword(e);
                                }}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleClickShowConfirmPassword}
                                            edge="end"
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        {!error.confirmPassword && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>Паролите не съвпадат</Typography>}

                        <Button
                            disabled={!isRegFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                        >
                            Регистрация
                        </Button>
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ marginRight: '5px' }}>
                                    Имате акаунт?
                                </Typography>
                                <Typography component={Link} to="/auth/login" sx={{ color: '#550A21', textDecoration: 'none', cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>
                                    {"Вход"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};