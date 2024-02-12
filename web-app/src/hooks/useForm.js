import { useState } from 'react';

export const useForm = (initialValues, onSubmitHandler, petId) => {
    const [values, setValues] = useState(initialValues);

    const changeHandler = (e) => {
        setValues(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        onSubmitHandler(values, petId);
    };

    return {
        values,
        setValues,
        changeHandler,
        onSubmit
    };
};