import './ProfileItem.scss';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Card, Box, Button, CardContent, CardActions, Typography, CardMedia, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { DeleteModal } from '../../DeleteModal/DeleteModal';

import { useModal } from '../../../hooks/useModal';
import { usePetContext } from '../../../contexts/PetContext';
import { useProfileContext } from '../../../contexts/ProfileContext';

export const ProfileItem = ({
    _id,
    title,
    status,
    location,
    imageUrl,
    createdAt,
    isArchived,
    isFavourite
}) => {
    const [cardWidth, setTabWith] = useState();
    const [imgWidth, setImgWidth] = useState();
    const cardRef = useRef(null);
    const imagRef = useRef(null);

    const { openDeleteModal, handleClickOpenDeleteModal, handleClickCloseDeleteModal } = useModal();
    const { onDeletePetSubmit, archivePetById, activatePetById } = usePetContext();
    const { removeFromFavouriteById } = useProfileContext();

    const statusColor = {
        'Изгубен': '#CE0000',
        'Намерен': 'green',
        'За осиновяване': 'orange'
    };

    const date = new Date(createdAt);
    const deleteMessage = 'Сигурни ли сте, че искате да изтриете сигнала?';
    const archiveMessage = 'Сигурни ли сте, че искате да архивирате сигнала?';
    const removeMessage = 'Сигурни ли сте, че искате да премахнете сигнала от Любими?';
    const createdAtDate = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        setImgWidth(imagRef.current.getBoundingClientRect().width);
        setTabWith(cardRef.current.getBoundingClientRect().width);
    }, []);

    return (
        <>
            {openDeleteModal && (<DeleteModal
                open={openDeleteModal}
                title={title}
                message={isFavourite ? removeMessage : isArchived ? deleteMessage : archiveMessage}
                handleClose={handleClickCloseDeleteModal}
                onDeleteSubmit={onDeletePetSubmit}
                archivePetById={archivePetById}
                activatePetById={activatePetById}
                removeFromFavourite={removeFromFavouriteById}
                petId={_id}
                isArchived={isArchived}
                isFavourite={isFavourite}
            />)}

            <Card className='profile-item-card' ref={cardRef} sx={{ borderRadius: '10px' }}>
                <Link to={`/catalog/pets/details/${_id}`} className='card-link'>
                    <Box >
                        {(cardWidth <= 524 && isFavourite) && (<FavoriteIcon sx={{
                            position: 'absolute', top: '5px', right: '5px',
                            fill: 'rgba(135, 0, 0, 0.8)', stroke: 'white',
                            strokeWidth: 1, p: '2px', m: '5px', borderRadius: 50,
                            fontSize: '2em', zIndex: 50
                        }} />)}
                        <CardMedia
                            ref={imagRef}
                            className='profile-item-image'
                            component="img"
                            image={imageUrl}
                            alt={title}
                            sx={{
                                height: imgWidth > 150 ? (imgWidth / 1.5) : '150px'
                            }}
                        />
                    </Box>
                    <CardContent className='profile-card-content'>
                        <Box>
                            <Typography component="h5" className='title'>
                                {title}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', pt: '0.5rem' }} >
                            <Typography variant="caption" className='span-row' >
                                <Typography component='span' className='icon'>
                                    <Tooltip title={<>Статус</>}>
                                        <CircleIcon sx={{ fill: statusColor[status] }} />
                                    </Tooltip>
                                </Typography>
                                {status}
                            </Typography>
                            <Typography variant="caption" className='span-row'>
                                <Typography component='span' className='icon'>
                                    <Tooltip title={<>Местоположение</>}>
                                        <LocationOnIcon sx={{ fill: '#550A21' }} />
                                    </Tooltip>
                                </Typography>
                                {location}
                            </Typography>
                            <Typography variant="caption" className='span-row'>
                                <Typography component='span' className='icon'>
                                    <Tooltip title={<>Дата на добавяне</>}>
                                        <CalendarMonthIcon sx={{ fill: '#550A21' }} />
                                    </Tooltip>
                                </Typography>
                                {createdAtDate}
                            </Typography>
                        </Box>
                    </CardContent >
                </Link>
                <CardActions className='action' sx={{ m: 1 }} >
                    {cardWidth > 524 && (
                        <>
                            {!isFavourite && (
                                <>
                                    <Link to={`/catalog/pets/edit/${_id}`}>
                                        <Button size="small" variant="text" className="icon-button" sx={{ top: 0, right: 1, color: '#262626' }} >
                                            <EditIcon />
                                        </Button>
                                    </Link>

                                    {isArchived && (
                                        <Button size="small" color="success" className="icon-button" sx={{ bottom: '40px', right: -1 }} onClick={() => { activatePetById(_id) }} >
                                            <RestoreFromTrashIcon sx={{ fontSize: '1.8rem' }} />
                                        </Button>
                                    )}

                                    <Button size="small" variant="contained" color="error" className="icon-button" sx={{ bottom: 1, right: 1 }} onClick={handleClickOpenDeleteModal} >
                                        <DeleteIcon />
                                    </Button>
                                </>
                            )}
                            {isFavourite && (
                                <>
                                    <FavoriteIcon sx={{
                                        position: 'absolute', top: '0px', right: '0px',
                                        fill: 'rgba(135, 0, 0, 0.8)', stroke: 'white',
                                        strokeWidth: 1, p: '2px', m: '5px', borderRadius: 50,
                                        fontSize: '2em', zIndex: 50
                                    }} />
                                    <Button size="small" variant="contained" color="error" className="icon-button" sx={{ bottom: 1, right: 1 }} onClick={handleClickOpenDeleteModal} >
                                        <DeleteIcon />
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                    {cardWidth <= 524 && (
                        <>
                            {!isFavourite && (
                                <>
                                    {!isArchived && (
                                        <Button size="small" variant="contained" color="error" startIcon={<RemoveCircleIcon />} sx={{ borderRadius: '5px', textTransform: 'none' }} onClick={handleClickOpenDeleteModal} >Архивирай</Button>
                                    )}
                                    {isArchived && (
                                        <>
                                            <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ borderRadius: '5px', textTransform: 'none' }} onClick={handleClickOpenDeleteModal} >Изтрий</Button>
                                            <Button size="small" variant="contained" color="success" startIcon={<RestoreFromTrashIcon />} sx={{ borderRadius: '5px', textTransform: 'none' }} onClick={() => { activatePetById(_id) }} >Активирай</Button>
                                        </>
                                    )}
                                    <Link to={`/catalog/pets/edit/${_id}`}>
                                        <Button size="small" variant="outlined" startIcon={<EditIcon />} sx={{ border: '1px solid #161616', borderRadius: '5px', color: '#262626', textTransform: 'none' }} >Редактирай</Button>
                                    </Link>
                                </>
                            )}
                            {isFavourite && (
                                <>
                                    <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ borderRadius: '5px', textTransform: 'none' }} onClick={handleClickOpenDeleteModal} >Премахване от Любими</Button>
                                </>
                            )}
                        </>
                    )}
                </CardActions>
            </Card >
        </>
    );
};