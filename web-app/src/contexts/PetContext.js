import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { catalogServiceFactory } from '../services/catalogService';
import { petServiceFactory } from '../services/petService';
import { useAuthContext } from './AuthContext';

export const PetContext = createContext();

export const PetProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    const { profileData, setProfileData } = useAuthContext();
    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const catalogService = catalogServiceFactory();
    const petService = petServiceFactory();
    const [error, setError] = useState({
        title: false,
        status: false,
        location: false,
        contactName: false,
        phone: false,
        imageUrl: false,
        description: false,
        serverErrors: false
    });

    useEffect(() => {
        setIsLoading(true);
        catalogService.getLatestPets()
            .then(result => {
                setPets(result);
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setError({
            title: false,
            status: false,
            location: false,
            contactName: false,
            phone: false,
            imageUrl: false,
            description: false,
            serverErrors: false
        });
    }, [pathname]);

    const getPetById = async (petId) => {
        try {
            const pet = await petService.getPetById(petId);

            return pet;
        } catch (err) {
            if (err.messageEn === "Item doesn't exist") {
                navigate('/404');
            } else if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const onCreatePetSubmit = async (data) => {
        try {
            const newPet = await petService.createPet(data);

            setPets(state => [newPet, ...state]);
            setProfileData({ ...profileData, myPets: [newPet, ...profileData.myPets] });
            navigate('/');
        } catch (err) {
            setError({ ...error, serverErrors: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const onEditPetSubmit = async (data, petId) => {
        try {
            const pet = await petService.editPet(petId, data);

            setPets(state => state.map(p => p._id === petId ? pet : p));
            navigate('/');
        } catch (err) {
            setError({ ...error, serverErrors: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const onDeletePetSubmit = async (petId) => {
        try {
            await petService.deletePet(petId);

            setPets(state => state.filter(pet => pet._id !== petId));
            setProfileData({ ...profileData, myPets: [...profileData.myPets.filter(pet => pet._id !== petId)] });
        } catch (err) {
            setError({ ...error, serverErrors: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const contextValues = {
        pets,
        pet,
        setPet,
        error,
        setError,
        isLoading,
        getPetById,
        onCreatePetSubmit,
        onEditPetSubmit,
        onDeletePetSubmit,
    };

    return (
        <PetContext.Provider value={contextValues}>
            {children}
        </PetContext.Provider>
    );
};

export const usePetContext = () => {
    const context = useContext(PetContext);

    return context;
};