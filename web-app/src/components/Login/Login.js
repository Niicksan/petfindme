import { useEffect } from "react";
import { Link } from 'react-router-dom';

import {
    Container,
    Avatar,
    Button,
    CssBaseline,
    TextField,
    Box,
    Grid,
    Typography,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useForm } from "../../hooks/useForm";
import { useAuthValidation } from "../../hooks/useAuthValidation";

const theme = createTheme();

export const Login = () => {
    const {
        error,
        user,
        isLoginFormValid,
        onLoginSubmit,
        handleClickEmail,
        handleClickPassword,
        checkIsLoginFormValid,
        showPassword,
        handleClickShowPassword,
        handleMouseDownPassword
    } = useAuthValidation();

    const { values, changeHandler, onSubmit } = useForm({
        email: '',
        password: '',
    }, onLoginSubmit);

    useEffect(() => {
        checkIsLoginFormValid()
    }, [user.email, user.password]);

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Вход в PetFind.Me
                    </Typography>
                    <Box component="form" onSubmit={onSubmit} sx={{ mt: 1, minWidth: '100%' }}>
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
                        {error.invalidLoginData && <Typography component={"p"} sx={{ color: '#d32f2f', textAlign: 'left', paddingLeft: '15px' }}>{error.invalidLoginData}</Typography>}

                        <Button
                            disabled={!isLoginFormValid}
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#550A21' }}
                        >
                            Вход
                        </Button>
                        <Grid container sx={{ justifyContent: 'center' }}>
                            <Grid item sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                                <Typography sx={{ marginRight: '5px' }}>
                                    Нямате aкаунт?
                                </Typography>
                                <Typography component={Link} to="/auth/register" sx={{ color: '#550A21', textDecoration: 'none', cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}>
                                    {"Регистрирайте се"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
};