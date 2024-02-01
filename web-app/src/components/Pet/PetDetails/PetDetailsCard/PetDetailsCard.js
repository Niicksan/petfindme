import { Directions } from '@mui/icons-material';
import './PetDetailsCard.scss';

import { Card, Box, CardContent, Typography, CardMedia } from '@mui/material';

export const PetDetailsCard = ({
    _id,
    title,
    status,
    location,
    contactName,
    phone,
    imageUrl,
    description,
    createdAtFormated,
}) => {
    return (
        <>
            <Card className='details-card' sx={{ m: 2, width: '80%', maxWidth: '1920px' }}>
                <CardMedia component='img'
                    sx={{ minWidth: '30%', maxWidth: '40%', flex: 1, objectFit: 'cover' }}
                    className='image'
                    image={imageUrl}
                    title={imageUrl}
                />
                <Box className='details-card-content-holder'>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
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

                        <Box>
                            <Typography color="text.secondary" sx={{ textAlign: 'left' }}>
                                <Typography component='span' className='content-item-left'>Публикувано на: </Typography>{createdAtFormated}
                            </Typography>
                        </Box>
                    </CardContent>
                </Box>
            </Card >
        </>
    );
};