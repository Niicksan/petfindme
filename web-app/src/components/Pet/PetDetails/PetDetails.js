import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Box } from "@mui/material";

import { PetDetailsCard } from "./PetDetailsCard/PetDetailsCard";
import { Loader } from "../../Loader/Loader";

import { usePetContext } from "../../../contexts/PetContext";

export const PetDetails = () => {
    const { id } = useParams();
    const { pet, setPet, getPetById } = usePetContext();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        getPetById(id)
            .then((petData) => {
                setPet(petData);
                setIsLoading(false);
            })
    }, [id]);

    const date = new Date(pet?.createdAt);
    const createdAtFormated = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && (<Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <PetDetailsCard key={pet?._id} {...pet} createdAtFormated={createdAtFormated} />
            </Box>)
            }
        </>
    );
};