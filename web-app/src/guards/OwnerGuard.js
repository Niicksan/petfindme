import { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';

import { usePetContext } from "../contexts/PetContext";
import { petServiceFactory } from '../services/petService';

export const OwnerGuard = ({ children }) => {
    const { id } = useParams();
    const { isOwner, setIsOwner } = usePetContext();
    const petService = petServiceFactory();

    useEffect(() => {
        petService.checkIsOwner(id)
            .then(result => {
                setIsOwner(result.isOwner);
            })
    }, [id]);

    if (isOwner === false) {
        setIsOwner(null);
        return <Navigate to={`/403`} replace />
    }

    return children ? children : <Outlet />
};