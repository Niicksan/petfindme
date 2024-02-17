import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';
import { usePetContext } from '../contexts/PetContext';
import { userServiceFactory } from '../services/userService';
import { petServiceFactory } from '../services/petService';

export const ProfileContext = createContext();

export const ProfileProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    const { profileData, setProfileData } = useAuthContext();
    const { pets } = usePetContext();
    const [isLoading, setIsLoading] = useState(false);
    const userService = userServiceFactory();
    const petService = petServiceFactory();

    useEffect(() => {
        setIsLoading(true);
        userService.getUserInfo()
            .then(result => {
                setProfileData(result);
                setIsLoading(false);
            })
    }, []);

    const addtoFavouriteById = async (petId) => {
        try {
            await petService.addtoFavourite(petId);

            const likedPet = pets.find(pet => pet._id === petId);

            setProfileData({ ...profileData, likedPets: [likedPet, ...profileData.likedPets] });
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const removeFromFavouriteById = async (petId) => {
        try {
            await petService.removeFromFavourite(petId);

            setProfileData({ ...profileData, likedPets: [...profileData.likedPets.filter(pet => pet._id !== petId)] });
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const contextValues = {
        isLoading,
        addtoFavouriteById,
        removeFromFavouriteById
    };

    return (
        <ProfileContext.Provider value={contextValues}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfileContext = () => {
    const context = useContext(ProfileContext);

    return context;
};