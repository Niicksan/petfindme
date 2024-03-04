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
    const phoneRegex = new RegExp(/^\+?\d{5,13}$/);

    const [isPetFormValid, setIsPetFormValid] = useState(false);
    const { error, setError, getPetById, onCreatePetSubmit, onEditPetSubmit } = usePetContext();
    const [form, setPetForm] = useState({
        title: '',
        status: '',
        location: '',
        geolocation: {},
        contactName: '',
        phone: '',
        imageUrl: '',
        description: '',
    });

    const handleClickTitle = (e) => {
        if ((e.target.value).length < 3) {
            setError({ ...error, title: true });
        } else {
            setError({ ...error, title: false });
        }

        setPetForm({ ...form, title: e.target.value });
    };

    const handleClickStatus = (e) => {
        if (statuses.some(x => x.value === e.target.value)) {
            setError({ ...error, status: false });
        } else {
            setError({ ...error, status: true });
        }

        setPetForm({ ...form, status: e.target.value });
    };

    const handleClickLocation = (e) => {
        if ((e.target.value).length < 3) {
            setError({ ...error, location: true });
        } else {
            setError({ ...error, location: false });
        }

        setPetForm({ ...form, location: e.target.value });
    };

    const handleClickContactName = (e) => {
        if ((e.target.value).length < 3) {
            setError({ ...error, contactName: true });
        } else {
            setError({ ...error, contactName: false });
        }

        setPetForm({ ...form, contactName: e.target.value });
    };

    const handleClickPhone = (e) => {
        if (!phoneRegex.test(e.target.value)) {
            setError({ ...error, phone: true });
        } else {
            setError({ ...error, phone: false });
        }

        setPetForm({ ...form, phone: e.target.value });
    };

    const handleClickImageUrl = (e) => {
        if (!urlRegex.test(e.target.value)) {
            setError({ ...error, imageUrl: true });
        } else {
            setError({ ...error, imageUrl: false });
        }

        setPetForm({ ...form, imageUrl: e.target.value });
    };

    const handleClickDescription = (e) => {
        if ((e.target.value).length < 20) {
            setError({ ...error, description: true });
        } else {
            setError({ ...error, description: false });
        }

        setPetForm({ ...form, description: e.target.value });
    };

    const checkIsPetFormValid = () => {
        (
            (!error.title && form.title !== '') &&
            (!error.status && form.status !== '') &&
            (!error.location && form.location !== '') &&
            (form.geolocation?.latitude && form.geolocation?.longitude) &&
            (!error.contactName && form.contactName !== '') &&
            (!error.phone && form.phone !== '') &&
            (!error.imageUrl && form.imageUrl !== '') &&
            (!error.description && form.description !== '')
        ) ? setIsPetFormValid(true) : setIsPetFormValid(false);
    };

    return {
        statuses,
        form,
        error,
        setPetForm,
        isPetFormValid,
        handleClickTitle,
        handleClickStatus,
        handleClickLocation,
        handleClickContactName,
        handleClickPhone,
        handleClickImageUrl,
        handleClickDescription,
        getPetById,
        onCreatePetSubmit,
        onEditPetSubmit,
        checkIsPetFormValid
    };
};