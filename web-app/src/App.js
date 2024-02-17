import './App.css';

import { Routes, Route } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';
import { PetProvider } from './contexts/PetContext';
import { ProfileProvider } from './contexts/ProfileContext';

import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Catalog/Home/Home';
import { PetDetails } from './components/Pet/PetDetails/PetDetails';
import { CreatePet } from './components/Pet/CreatePet/CreatePet';
import { EditPet } from './components/Pet/EditPet/EditPet';
import { MyProfile } from './components/MyProfile/MyProfile';
import { Logout } from './components/Logout/Logout';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <AuthProvider >
            <PetProvider >
                <ProfileProvider>
                    <div className="app">
                        <Navigation />
                        <Box component="main" className="main">
                            <Toolbar />
                            <Routes>
                                <Route path='/' element={<Home />} />
                                <Route path='/catalog/pet/:id' element={< PetDetails />} />
                                <Route path='/catalog/pet/edit/:id' element={< EditPet />} />
                                {/* <Route element={<AuthGuard />}> */}
                                {/* <Route element={<VehicleOwnerGuard />}> */}

                                {/* </Route> */}
                                <Route path='/pet/create' element={<CreatePet />} />
                                <Route path='/user/my-profile' element={<MyProfile />} />
                                <Route path='/auth/logout' element={<Logout />} />
                                {/* </Route> */}
                                {/* <Route element={<HasUserGuard />}>*/}

                                <Route path='/auth/login' element={<Login />} />
                                <Route path='/auth/register' element={<Register />} />
                                {/*
                                </Route>
                                <Route path='/about' element={<About />} />
                                <Route path='/contacts' element={<Contacts />} />
                                <Route path="/403" element={<Forbidden />} />
                                <Route path="/404" element={<NotFound />} />
                                <Route path="*" element={<NotFound />} /> 
                            */}

                            </Routes>
                            <Toolbar />
                        </Box>

                        <Footer />
                    </div>
                </ProfileProvider>
            </PetProvider >
        </AuthProvider >
    );
}

export default App;
