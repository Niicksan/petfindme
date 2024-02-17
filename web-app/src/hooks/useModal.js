import { useState } from 'react';

export const useModal = () => {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleClickOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleClickCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    };

    return {
        openDeleteModal,
        handleClickOpenDeleteModal,
        handleClickCloseDeleteModal,
    };
};