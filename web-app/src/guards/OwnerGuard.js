import { useEffect, useState } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';

import { usePetContext } from "../contexts/PetContext";
import { petServiceFactory } from '../services/petService';

export const OwnerGuard = ({ children }) => {
    const pathname = window.location.pathname;

    const { id } = useParams();
    const { isOwner, setIsOwner } = usePetContext();
    // const [isOwner, setIsOwner] = useState();
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