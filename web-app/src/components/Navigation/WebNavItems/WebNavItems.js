import { useAuthContext } from '../../../contexts/AuthContext';
import { WebNavButton } from '../../Buttons/WebNavButton/WebNavButton';

export const WebNavItems = () => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <WebNavButton path={'/catalog/pets'} buttonKey={'catalog'} text={'Каталог'} />

            {isAuthenticated && (
                <>
                    {/* <WebNavButton path={'/catalog/lost'} buttonKey={'lost'} text={'Изгубени'} />
                    <WebNavButton path={'/catalog/found'} buttonKey={'found'} text={'Намерени'} />
                    <WebNavButton path={'/catalog/adotpion'} buttonKey={'adotpion'} text={'За осиновяване'} /> */}

                    <WebNavButton path={'/pet/create'} buttonKey={'pet-create'} text={'Добави'} />
                    <WebNavButton path={'/user/my-profile'} buttonKey={'my-profile'} text={'Моят профил'} />
                    <WebNavButton path={'/auth/logout'} buttonKey={'logout'} text={'Изход'} />
                </>
            )}

            {!isAuthenticated && (
                <>
                    <WebNavButton path={'/auth/login'} buttonKey={'login'} text={'Вход'} />
                    <WebNavButton path={'/auth/register'} buttonKey={'register'} text={'Регистрация'} />
                </>
            )}
        </>
    );
};