import { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { catalogServiceFactory } from '../services/catalogService';
import { petServiceFactory } from '../services/petService';

export const PetContext = createContext();

export const PetProvider = ({
    children,
}) => {
    const navigate = useNavigate();

    const [pets, setPets] = useState([]);
    const [pet, setPet] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const catalogService = catalogServiceFactory();
    const petService = petServiceFactory();

    useEffect(() => {
        setIsLoading(true);
        catalogService.getLatestPets()
            .then(result => {
                setPets(result);
                setIsLoading(false);
            });
    }, []);

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

    const contextValues = {
        pets,
        pet,
        setPet,
        getPetById,
        isLoading
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