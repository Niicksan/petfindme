import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { locationServiceFactory } from '../services/locationService';
import { catalogServiceFactory } from '../services/catalogService';
import { petServiceFactory } from '../services/petService';
import { useSnackbarContext } from './SnackbarContext';
import { useAuthContext } from './AuthContext';

export const PetContext = createContext();

export const PetProvider = ({
    children,
}) => {
    const navigate = useNavigate();
    const pathname = window.location.pathname;

    const { handleOpenSnackbar, setMessage } = useSnackbarContext();
    const { profileData, setProfileData } = useAuthContext();
    const [cities, setSities] = useState();
    const [pets, setPets] = useState([]);
    const [catalogPets, setCatalogPets] = useState([]);
    const [pet, setPet] = useState([]);
    const [isOwner, setIsOwner] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const locationService = locationServiceFactory();
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
        locationService.getAllCities()
            .then(result => {
                setSities(result);
            });
    }, []);

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

            setMessage('Сигналът беше подаден успешно!');
            handleOpenSnackbar();

            navigate('/user/my-profile');
        } catch (err) {
            setError({ ...error, serverErrors: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const onEditPetSubmit = async (data, petId) => {
        try {
            const editedPet = await petService.editPet(petId, data);

            setPets(state => state.map(p => p._id === petId ? editedPet : p));
            setProfileData({ ...profileData, myPets: [...profileData.myPets.map(pet => pet._id === petId ? editedPet : pet)] });

            setMessage('Успешно редактиране!');
            handleOpenSnackbar();

            navigate('/user/my-profile');
        } catch (err) {
            setError({ ...error, serverErrors: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const onDeletePetSubmit = async (petId) => {
        try {
            const response = await petService.deletePet(petId);

            setPets(state => state.filter(pet => pet._id !== petId));
            setProfileData({ ...profileData, myPets: [...profileData.myPets.filter(pet => pet._id !== petId)] });

            setMessage(response.messageBg);
            handleOpenSnackbar();
        } catch (err) {
            setError({ ...error, serverErrors: err?.message });

            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const archivePetById = async (petId) => {
        try {
            const response = await petService.archivePet(petId);

            if (response.messageBg === 'Успешно архивиране!') {
                const achrivedPet = profileData.myPets.find(pet => pet._id === petId);
                achrivedPet.isActive = false;

                setPets(state => state.filter(pet => pet._id !== petId));
                setProfileData({ ...profileData, myPets: [...profileData.myPets.map(pet => pet._id === petId ? achrivedPet : pet)] });
            };

            setMessage(response.messageBg);
            handleOpenSnackbar();
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const activatePetById = async (petId) => {
        try {
            const response = await petService.activatePet(petId);

            if (response.messageBg === 'Успешно активиране!') {
                const activatedPet = profileData.myPets.find(pet => pet._id === petId);
                activatedPet.isActive = true;

                setPets(pets => [...pets, activatedPet]);
                setProfileData({ ...profileData, myPets: [...profileData.myPets.map(pet => pet._id === petId ? activatedPet : pet)] });
            }

            setMessage(response.messageBg);
            handleOpenSnackbar();
        } catch (err) {
            if (err.messageEn === "Access denied! You don't have rights to access this page!") {
                navigate('/403');
            }
        }
    };

    const contextValues = {
        cities,
        pets,
        catalogPets,
        setCatalogPets,
        pet,
        setPet,
        isOwner,
        setIsOwner,
        error,
        setError,
        isLoading,
        setIsLoading,
        getPetById,
        onCreatePetSubmit,
        onEditPetSubmit,
        onDeletePetSubmit,
        archivePetById,
        activatePetById
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