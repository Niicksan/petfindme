import './MyProfile.scss';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { imageUrl } from '../../env';

import { useAuthContext } from "../../contexts/AuthContext";
import { userServiceFactory } from '../../services/userService';

import { Loader } from "../Loader/Loader";
import { Grid, Box, Card, CardMedia, Typography, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { ProfileItem } from './ProfileItem/ProfileItem'

export const MyProfile = () => {
    const { profileData, setProfileData } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const userService = userServiceFactory();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        setIsLoading(true);
        userService.getUserInfo()
            .then(result => {
                setProfileData(result);
                setIsLoading(false);
            })
    }, []);

    const date = new Date(profileData?.createdAt);
    const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (
                <Box className="profile">
                    <Card className='profile-card'>
                        <CardMedia
                            className='profile-image'
                            alt='My profile picture'
                            component='img'
                            title='My profile picture'
                            image={`https://image.freepik.com/free-photo/friendly-brunette-looking-camera_23-2147774849.jpg`}
                        />
                        <Box sx={{ mt: '5rem', mb: '2rem', p: '1rem', color: 'rgba(0, 0, 0, 0.6)' }}>
                            <Typography component="h2" className='user-profile-name' sx={{ textAlign: 'center', fontSize: '2.4rem', my: '3rem' }} >
                                {profileData?.name}
                            </Typography>

                            <Typography component="p" sx={{ my: '0.5rem' }} >
                                <Typography component="span" sx={{ fontWeight: 'bold', pr: '0.5rem' }} >
                                    Имейл:
                                </Typography>
                                <Typography component="span">
                                    {profileData?.email}
                                </Typography>
                            </Typography>
                            <Typography component="p" sx={{ my: '0.5rem' }} >
                                <Typography component="span" sx={{ fontWeight: 'bold', pr: '0.5rem' }} >
                                    Създаден на:
                                </Typography>
                                <Typography component="span" >
                                    {createdAt}
                                </Typography>
                            </Typography>

                            <Box sx={{ display: 'flex', justifyContent: 'space-evenly', my: '2rem' }} >
                                <Typography component="p" >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.6rem', textAlign: 'center' }} >
                                        {profileData.myPets?.length}
                                    </Typography>
                                    <Typography component="p">
                                        Сигнали
                                    </Typography>
                                </Typography>

                                <Typography component="p" >
                                    <Typography sx={{ fontWeight: 'bold', fontSize: '1.6rem', textAlign: 'center' }} >
                                        {profileData.likedPets?.length}
                                    </Typography>
                                    <Typography component="p" >
                                        Любими
                                    </Typography>
                                </Typography>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                <Link to="/pet/create" className="add-button">
                                    Подай сигнал
                                </Link>
                            </Box>
                        </Box>
                    </Card>
                    <Box sx={{ maxWidth: '900px', width: '100%', typography: 'body1', margin: '2rem auto' }}>
                        <TabContext value={value} >
                            <Box sx={{ borderBottom: 1, borderColor: 'rgba(85, 10,33, 0.5)' }}>
                                <TabList
                                    onChange={handleChange}
                                    aria-label="lab API tabs example"
                                    TabIndicatorProps={{
                                        sx: {
                                            backgroundColor: '#550A21'
                                        }
                                    }}
                                    sx={{
                                        ".MuiTab-root.Mui-selected": {
                                            color: '#550A21'
                                        }
                                    }}
                                >
                                    <Tab icon={<AccountCircleIcon />} iconPosition="start" label="Сигнали" value="1" />
                                    <Tab icon={<FavoriteIcon />} iconPosition="start" label="Любими" value="2" />
                                </TabList>
                            </Box>
                            <TabPanel value="1" sx={{ px: 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '1920px' }}>
                                    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                                        {profileData.myPets?.length !== 0 && (profileData.myPets?.map(x =>
                                            <Grid item xs={1} sm={1} md={1} lg={1} key={x._id}>
                                                <ProfileItem {...x} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {!profileData.myPets?.length && (<Typography component="p" >Нямате подадени сигнали.</Typography>)}
                                </Box>

                            </TabPanel>
                            <TabPanel value="2" sx={{ px: 1 }}>
                                <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '1920px' }}>
                                    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                                        {profileData.likedPets?.length !== 0 && (profileData.likedPets?.map(x =>
                                            <Grid item xs={1} sm={1} md={1} lg={1} key={x._id}>
                                                <ProfileItem {...x} isFavourite={true} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                    {!profileData.likedPets?.length && (<Typography component="p" >Колекцията Любими е празна.</Typography>)}
                                </Box>
                            </TabPanel>
                        </TabContext>
                    </Box>
                </Box>
            )}
        </>
    );
};