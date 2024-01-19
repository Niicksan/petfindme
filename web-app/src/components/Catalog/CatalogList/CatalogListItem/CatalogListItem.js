import './CatalogListItem.scss';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardMedia, CardActions, Button } from '@mui/material';

// import { useVehicleContext } from '../../../contexts/VehicleContext';

export const CatalogListItem = ({
    // _id,
    // vinNumber,
    // make,
    // model,
    // engine,
    // fuel,
    // yearOfManufacture,
    // imageUrl,
    // createdAtFormatted,
    isDetails
}) => {
    return (
        <>
            <Card className='card' sx={{ m: 2, width: '80%', maxWidth: '1920px' }}>
                <CardMedia component='img' to={`/catalog/pet/1`}
                    sx={{ minWidth: '30%', maxWidth: '40%', flex: 1, objectFit: 'cover' }}
                    className='image'
                    image="https://www.akc.org/wp-content/uploads/2017/11/Samoyed-standing-in-the-forest.jpg"
                    title="Изгубено куче"
                />
                <Box className='card-content-holder'>
                    <CardContent >
                        <Typography gutterBottom variant="h5" component="div">
                            Изгубено куче
                        </Typography>

                        <Box variant="body2" className='content-items-holder' >
                            <Box className='content-items' >
                                <Typography color="text.secondary" >
                                    <Typography component='span' className='content-item-left'>Статус: </Typography>Изгубено
                                </Typography>
                            </Box>

                            <Box className='content-items' >
                                Изгубен е мъжки самоет на година и половина в района на зала Колодрум в Пловдив.
                                Много е красив и много умен. Отговаря на името Полар. Много ви моля ако някой го намери да се свърже с мен
                            </Box>

                            <Box className='content-items' >
                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>Град: </Typography>Пловдив
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>За връзка: </Typography>Емилиа
                                </Typography>

                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>Телефон: </Typography>0888888888
                                </Typography>
                            </Box>
                        </Box>
                        {isDetails && (
                            <Box className='content-items'>
                                <Typography color="text.secondary">
                                    <Typography component='span' className='content-item-left'>Публикувано на: </Typography>15.12.2022 08:14
                                </Typography>
                            </Box>
                        )}
                    </CardContent>
                    <CardActions className='action' sx={{ m: 1, justifyContent: 'flex-end' }}>
                        <>
                            <Button component={Link} to={`/catalog/pet/1`} variant="outlined" size="small" >Детайли</Button>
                        </>
                    </CardActions>
                </Box>
            </Card >
        </>
    );
};