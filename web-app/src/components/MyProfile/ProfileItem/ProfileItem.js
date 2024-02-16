import './ProfileItem.scss';
import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { Card, Box, Button, CardContent, CardActions, Typography, CardMedia, Tooltip } from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export const ProfileItem = ({
    _id,
    title,
    status,
    location,
    imageUrl,
    updatedAt,
    isFavourite
}) => {
    const [cardWidth, setTabWith] = useState();
    const [imgWidth, setImgWidth] = useState();
    const cardRef = useRef(null);
    const imagRef = useRef(null);

    const statusColor = {
        'Изгубен': '#CE0000',
        'Намерен': 'green',
        'За осиновяване': 'orange'
    };

    const date = new Date(updatedAt);
    const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        setImgWidth(imagRef.current.getBoundingClientRect().width);
        setTabWith(cardRef.current.getBoundingClientRect().width);
    }, []);

    return (
        <Card className='profile-item-card' ref={cardRef} sx={{ borderRadius: '10px' }}>
            <Link to={`/catalog/pet/${_id}`} className='card-link'>
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
                            {createdAt}
                        </Typography>
                    </Box>
                </CardContent >
            </Link>
            <CardActions className='action' sx={{ m: 1 }} >
                {cardWidth > 524 && (
                    <>
                        {!isFavourite && (
                            <>
                                <Link to={`/catalog/pet/edit/${_id}`}>
                                    <Button size="small" variant="text" className="icon-button" sx={{ top: 0, right: 1, color: '#262626' }} >
                                        <EditIcon />
                                    </Button>
                                </Link>
                                <Button size="small" variant="contained" color="error" className="icon-button" sx={{ bottom: 1, right: 1 }} >
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
                                <Button size="small" variant="contained" color="error" className="icon-button" sx={{ bottom: 1, right: 1 }} >
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
                                <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ borderRadius: '5px' }} >Изтрий</Button>
                                <Link to={`/catalog/pet/edit/${_id}`}>
                                    <Button component={Link} size="small" variant="outlined" startIcon={<EditIcon />} sx={{ border: '1px solid #161616', borderRadius: '5px', color: '#262626' }} >Редактирай</Button>
                                </Link>
                            </>
                        )}
                        {isFavourite && (
                            <>
                                <Button size="small" variant="contained" color="error" startIcon={<DeleteIcon />} sx={{ borderRadius: '5px' }} >Премахване от Любими</Button>
                            </>
                        )}
                    </>
                )}
            </CardActions>
        </Card >
    );
};