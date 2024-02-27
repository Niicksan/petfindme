import { Link } from 'react-router-dom';
import { Button } from '@mui/material';

import { useAuthContext } from '../../../contexts/AuthContext';
import { WebNavButton } from '../../Buttons/WebNavButton/WebNavButton';

export const WebNavItems = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <WebNavButton path={'/catalog/pets'} key={'catalog'} text={'Каталог'} />

            {isAuthenticated && (
                <>
                    {/* <WebNavButton path={'/catalog/lost'} key={'lost'} text={'Изгубени'} />
                    <WebNavButton path={'/catalog/found'} key={'found'} text={'Намерени'} />
                    <WebNavButton path={'/catalog/adotpion'} key={'adotpion'} text={'За осиновяване'} /> */}

                    <WebNavButton path={'/pet/create'} key={'pet-create'} text={'Добави'} />
                    <WebNavButton path={'/user/my-profile'} key={'my-profile'} text={'Моят профил'} />
                    <WebNavButton path={'/auth/logout'} key={'logout'} text={'Изход'} />
                </>
            )}

            {!isAuthenticated && (
                <>
                    <WebNavButton path={'/auth/login'} key={'login'} text={'Вход'} />
                    <WebNavButton path={'/auth/register'} key={'register'} text={'Регистрация'} />
                </>
            )}
        </>
    );
};