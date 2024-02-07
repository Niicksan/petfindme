import { useState } from "react";
import { usePetContext } from "../contexts/PetContext";

const statuses = [
    {
        value: 'Изгубен',
        label: 'Изгубен',
    },
    {
        value: 'Намерен',
        label: 'Намерен',
    },
    {
        value: 'За осиновяване',
        label: 'За осиновяване',
    }
];

export const usePetValidation = () => {
    const urlRegex = new RegExp(/^https?:\/\/.+$/);

    const [isPetFormValid, setIsPetFormValid] = useState(false);
    const { error, setError, getPetById, onCreatePetSubmit, onEditPetSubmit } = usePetContext();
    const [form, setPetForm] = useState({
        title: '',
        status: '',
        location: '',
        contactName: '',
        phone: '',
        imageUrl: '',
        description: '',
    });

    const handleClickTitle = (e) => {
        if ((e.target.value).length > 3) {
            setError({ ...error, title: true });
        } else {
            setError({ ...error, title: false });
        }

        setPetForm({ ...form, title: e.target.value });
    };

    const handleClicStatus = (e) => {
        if (statuses.some(x => x.value === e.target.value)) {
            setError({ ...error, status: true });
        } else {
            setError({ ...error, status: false });
        }

        setPetForm({ ...form, status: e.target.value });
    };

    const handleClickLocation = (e) => {
        if ((e.target.value).length > 3) {
            setError({ ...error, location: true });
        } else {
            setError({ ...error, location: false });
        }

        setPetForm({ ...form, location: e.target.value });
    };

    const handleClickContactName = (e) => {
        if ((e.target.value).length > 1) {
            setError({ ...error, contactName: true });
        } else {
            setError({ ...error, contactName: false });
        }

        setPetForm({ ...form, contactName: e.target.value });
    };

    const handleClickFuel = (e) => {
        if (fuels.some(x => x.value === e.target.value)) {
            setError({ ...error, fuel: true });
        } else {
            setError({ ...error, fuel: false });
        }

        setPetForm({ ...form, fuel: e.target.value });
    };

    const handleClickYearOfManufacture = (e) => {
        if (years.some(x => x.value === e.target.value)) {
            setError({ ...error, yearOfManufacture: true });
        } else {
            setError({ ...error, yearOfManufacture: false });
        }

        setPetForm({ ...form, yearOfManufacture: e.target.value });
    };

    const handleClickImageUrl = (e) => {
        if (urlRegex.test(e.target.value)) {
            setError({ ...error, imageUrl: true });
        } else {
            setError({ ...error, imageUrl: false });
        }

        setPetForm({ ...form, imageUrl: e.target.value });
    };

    const checkIsVehicleFormValid = () => {
        (
            (error.vinNumber && form.vinNumber !== '') &&
            (error.make && form.make !== '') &&
            (error.model && form.model !== '') &&
            (error.engine && form.engine !== '') &&
            (error.fuel && form.fuel !== '') &&
            (error.yearOfManufacture && form.yearOfManufacture !== '') &&
            (error.imageUrl && form.imageUrl !== '')
        ) ? setIsVehicleFormValid(true) : setIsVehicleFormValid(false);
    };

    return {
        fuels,
        years,
        form,
        error,
        setVehicleForm,
        isVehicleFormValid,
        handleClickVinNumber,
        handleClickMake,
        handleClickModel,
        handleClickEngine,
        handleClickFuel,
        handleClickYearOfManufacture,
        handleClickImageUrl,
        getVehicleById,
        onCreateVehicleSubmit,
        onEditVehicleSubmit,
        checkIsVehicleFormValid
    };
};