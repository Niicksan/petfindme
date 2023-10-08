
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

// import { useAuthContext } from '../../../contexts/AuthContext';

export const WebNavItems = () => {
    // const { isAuthenticated } = useAuthContext();

    return (
        <>
            {/* {isAuthenticated && ( */}
            <>
                <Button component={Link} to='/catalog/vehicles' key={'catalog'} sx={{
                    color: '#fff', ":hover": {
                        bgcolor: "white",
                        color: "#550A21"
                    }
                }}>
                    Автомобили
                </Button>
                <Button component={Link} to='/vehicle/create' key={'vehicle-create'} sx={{
                    color: '#fff', ":hover": {
                        bgcolor: "white",
                        color: "#550A21"
                    }
                }}>
                    Добави
                </Button>
                <Button component={Link} to='/user/my-profile' key={'my-profile'} sx={{
                    color: '#fff', ":hover": {
                        bgcolor: "white",
                        color: "#550A21"
                    }
                }}>
                    Моят профил
                </Button>
                <Button component={Link} to='/auth/logout' key={'logout'} sx={{
                    color: '#fff', ":hover": {
                        bgcolor: "white",
                        color: "#550A21"
                    }
                }}>
                    Изход
                </Button>
            </>
            {/* )} */}

            {/* {!isAuthenticated &&  ( */}
            <>
                <Button component={Link} to='/auth/login' key={'login'} sx={{
                    color: '#fff', ":hover": {
                        bgcolor: "white",
                        color: "#550A21"
                    }
                }}>
                    Вход
                </Button>

                <Button component={Link} to='/auth/register' key={'register'} sx={{
                    color: '#fff', ":hover": {
                        bgcolor: "white",
                        color: "#550A21"
                    }
                }}>
                    Регистрация
                </Button>
            </>
            {/* )} */}
        </>
    );
};