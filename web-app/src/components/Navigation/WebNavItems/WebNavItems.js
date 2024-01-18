import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAuthContext } from '../../../contexts/AuthContext';

export const WebNavItems = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            {isAuthenticated && (
                <>
                    <Button component={Link} to='/catalog/lost' key={'lost'} sx={{
                        color: '#fff', ":hover": {
                            bgcolor: "white",
                            color: "#550A21"
                        }
                    }}>
                        Изгубени
                    </Button>
                    <Button component={Link} to='/catalog/found' key={'found'} sx={{
                        color: '#fff', ":hover": {
                            bgcolor: "white",
                            color: "#550A21"
                        }
                    }}>
                        Намерени
                    </Button>
                    <Button component={Link} to='/catalog/adotpion' key={'adotpion'} sx={{
                        color: '#fff', ":hover": {
                            bgcolor: "white",
                            color: "#550A21"
                        }
                    }}>
                        За осиновяване
                    </Button>
                    <Button component={Link} to='/pet/create' key={'pet-create'} sx={{
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
            )}

            {!isAuthenticated && (
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
            )}
        </>
    );
};