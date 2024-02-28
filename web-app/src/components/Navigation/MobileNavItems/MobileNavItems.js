import { useAuthContext } from '../../../contexts/AuthContext';

import { MobileNavButton } from '../../Buttons/MobileNavButton/MobileNavButton';

export const MobileNavItems = ({ handleDrawerToggle }) => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/pets'} buttonKey={'catalog'} text={'Каталог'} />

            {isAuthenticated && (
                <>
                    {/* <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/lost'} buttonKey={'lost'} text={'Изгубени'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/found'} buttonKey={'found'} text={'Намерени'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/adotpion'} buttonKey={'adotpion'} text={'За осиновяване'} /> */}

                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/pet/create'} buttonKey={'pet-craete'} text={'Добави'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/user/my-profile'} buttonKey={'my-profile'} text={'Моя Профил'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/auth/logout'} buttonKey={'logout'} text={'Изход'} />

                </>
            )}

            {!isAuthenticated && (
                <>
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/auth/login'} buttonKey={'login'} text={'Вход'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/auth/register'} buttonKey={'register'} text={'Регистрация'} />
                </>
            )}
        </>
    );
};