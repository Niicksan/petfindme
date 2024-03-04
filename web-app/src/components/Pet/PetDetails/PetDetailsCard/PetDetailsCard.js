import './PetDetailsCard.scss';

import { useState } from 'react';

import ReactImageGallery from 'react-image-gallery';
import { Card, Box, CardContent, Typography } from '@mui/material';

import { Map } from '../../../Map/Map';

export const PetDetailsCard = ({
    _id,
    title,
    status,
    location,
    geolocation,
    contactName,
    phone,
    imageUrl,
    description,
    createdAtFormated,
}) => {
    const images = [
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
        {
            original: imageUrl,
            thumbnail: imageUrl,
        },
    ];
    const position = [
        geolocation?.latitude || 42.798165,
        geolocation?.longitude || 25.6275174
    ];
    const coords = {
        latitude: geolocation?.latitude,
        longitude: geolocation?.longitude
    };
    const height = '400px';
    const zoom = 17;

    return (
        <>
            <Card className='details-card' elevation={0} sx={{ m: 2, width: '80%', maxWidth: '1920px' }}>
                <ReactImageGallery
                    showBullets={true}
                    showPlayButton={false}
                    showIndex={true}
                    items={images}
                />

                <Box className='details-card-content-holder'>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', p: 0, mb: '2rem' }}>
                        <Typography component='h3' sx={{ fontWeight: 'bold', textAlign: 'left', fontSize: '1.2rem' }} >{title}</Typography>
                        <Box className='details-content-items-holder'>
                            <Box className='details-content-items' >
                                <Typography color="text.secondary" >
                                    <Typography component='span' className='content-item-left'>Статус: </Typography>{status}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>Град: </Typography>{location}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>За връзка: </Typography>{contactName}
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>Телефон: </Typography>{phone}
                                </Typography>
                            </Box>
                            <Box className='content-desc' >{description}</Box>
                        </Box>

                        <Box sx={{ mt: '1rem' }}>
                            <Typography color="text.secondary" sx={{ textAlign: 'left' }}>
                                <Typography component='span' className='content-item-left'>Публикувано на: </Typography>{createdAtFormated}
                            </Typography>
                        </Box>
                    </CardContent>

                    <Box sx={{ width: '100%' }}>
                        <Map coords={coords} mapPosition={position} mapHeight={height} mapZoom={zoom} editable={false} />
                    </Box>
                </Box>
            </Card >
        </>
    );
};