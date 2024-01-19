import './App.css';

import { Routes, Route } from 'react-router-dom';

import { Box, Toolbar } from '@mui/material';

import { AuthProvider } from './contexts/AuthContext';

import { Navigation } from './components/Navigation/Navigation';
import { Home } from './components/Catalog/Home/Home';
import { Logout } from './components/Logout/Logout';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Footer } from './components/Footer/Footer';

function App() {
    return (
        <AuthProvider >
            <div className="app">
                <Navigation />
                <Box component="main" className="main">
                    <Toolbar />
                    <Routes>
                        <Route path='/' element={<Home />} />
                        {/* <Route element={<AuthGuard />}> */}
                        {/* <Route element={<VehicleOwnerGuard />}> */}

                        {/* </Route> */}
                        {/* <Route path='/user/my-profile' element={<MyProfile />} /> */}
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
        </AuthProvider>
    );
}

export default App;