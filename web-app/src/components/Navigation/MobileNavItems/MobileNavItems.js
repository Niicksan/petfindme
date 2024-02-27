import { useAuthContext } from '../../../contexts/AuthContext';

import { MobileNavButton } from '../../Buttons/MobileNavButton/MobileNavButton';

export const MobileNavItems = ({ handleDrawerToggle }) => {
    const { isAuthenticated } = useAuthContext();

    return (
        <>
            <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/pets'} key={'catalog'} text={'Каталог'} />

            {isAuthenticated && (
                <>
                    {/* <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/lost'} key={'lost'} text={'Изгубени'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/found'} key={'found'} text={'Намерени'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/catalog/adotpion'} key={'adotpion'} text={'За осиновяване'} /> */}

                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/pet/create'} key={'pet-craete'} text={'Добави'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/user/my-profile'} key={'my-profile'} text={'Моя Профил'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/auth/logout'} key={'logout'} text={'Изход'} />

                </>
            )}

            {!isAuthenticated && (
                <>
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/auth/login'} key={'login'} text={'Вход'} />
                    <MobileNavButton handleDrawerToggle={handleDrawerToggle} path={'/auth/register'} key={'register'} text={'Регистрация'} />
                </>
            )}
        </>
    );
};