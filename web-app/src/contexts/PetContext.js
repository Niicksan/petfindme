import { createContext, useState, useEffect, useContext } from 'react';

import { catalogServiceFactory } from '../services/catalogService';

export const PetContext = createContext();

export const PetProvider = ({
    children,
}) => {
    const [pets, setPets] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const petService = catalogServiceFactory();

    useEffect(() => {
        setIsLoading(true);
        petService.getLatestPets()
            .then(result => {
                setPets(result);
                setIsLoading(false);
            });
    }, []);


    const contextValues = {
        pets,
        setPets,
        isLoading,
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