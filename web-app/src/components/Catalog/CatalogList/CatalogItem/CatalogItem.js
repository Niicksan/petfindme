import './CatalogItem.scss';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

import { Card, Box, CardContent, Typography, CardMedia, Tooltip } from '@mui/material';

import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useProfileContext } from '../../../../contexts/ProfileContext';

// export const CatalogItem = ({
//     _id,
//     title,
//     status,
//     location,
//     imageUrl,
//     createdAt
// }) => {
//     const [imgHeight, setImgHeight] = useState();
//     const [imgWidth, setImgWidth] = useState();
//     const imagRef = useRef(null);

//     const date = new Date(createdAt);
//     const createdDate = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

//     useEffect(() => {
//         setImgWidth(imagRef.current.getBoundingClientRect().width);
//     }, []);

//     useEffect(() => {
//         setImgHeight(imgWidth);
//     }, [imgWidth]);

//     console.log(imgWidth, imgHeight)

//     return (
//         <Card elevation={5} sx={{ position: 'relative', width: '100%', height: '100%', borderRadius: '5px' }}>
//             <Tooltip title={<>Харесайте тук</>}>
//                 <FavoriteIcon sx={{
//                     position: 'absolute', top: '5px', right: '5px',
//                     fill: 'rgba(69, 69, 69, 0.8)', stroke: 'white',
//                     strokeWidth: 1, p: '2px', m: '5px', borderRadius: 50,
//                     fontSize: '2em', zIndex: 50, '&:hover': { fill: 'rgba(135, 0, 0, 0.8)' }
//                 }} />
//             </Tooltip>
//             <Link to={`/catalog/pets/details/${_id}`} style={{ display: 'flex', flexDirection: 'column', height: '100%', textDecoration: "none", color: 'black' }}>
//                 <Box >
//                     <CardMedia
//                         ref={imagRef}
//                         className='image'
//                         component="img"
//                         image={imageUrl}
//                         alt={imageUrl}
//                         sx={{
//                             position: 'relative',
//                             height: imgHeight / 1.5,
//                             borderRadius: '5px 5px 0 0',
//                         }}
//                     />
//                 </Box>
//                 <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', p: 2, '&:last-child': { pb: 2 }, pt: 0 }}>
//                     <Box>
//                         <Typography component="h5" sx={{
//                             py: 1,
//                             fontSize: '1.2em',
//                             lineHeight: '1',
//                             display: '-webkit-box',
//                             overflow: 'hidden',
//                             WebkitBoxOrient: 'vertical',
//                             WebkitLineClamp: 2
//                         }}>
//                             {title}
//                         </Typography>
//                     </Box>
//                     <Box sx={{ display: 'flex', flexDirection: 'column', }} >
//                         <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9em', lineHeight: '1.5', color: 'dimgray', }}>
//                             <Typography component='span' sx={{ display: 'flex', fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5', mr: 0.5 }} className='content-item-left'>
//                                 <InfoIcon sx={{ fill: '#550A21' }} />
//                             </Typography> {status}
//                         </Typography>
//                         <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9em', lineHeight: '1.5', color: 'dimgray' }}>
//                             <Typography component='span' sx={{ display: 'flex', fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5', mr: 0.5 }} className='content-item-left'>
//                                 <LocationOnIcon sx={{ fill: '#550A21' }} />
//                             </Typography> {location}
//                         </Typography>
//                         <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', fontSize: '0.9em', lineHeight: '1.5', color: 'dimgray' }}>
//                             <Typography component='span' sx={{ display: 'flex', fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5', mr: 0.5 }} className='content-item-left'>
//                                 <CalendarMonthIcon sx={{ fill: '#550A21' }} />
//                             </Typography> {createdDate}
//                         </Typography>
//                     </Box>
//                 </CardContent >
//             </Link>
//         </Card >
//     );
// };

export const CatalogItem = ({
    _id,
    title,
    status,
    location,
    imageUrl,
    createdAt
}) => {
    const { addtoFavouriteById } = useProfileContext();
    const [imgWidth, setImgWidth] = useState();
    const imagRef = useRef(null);

    const statusColor = {
        'Изгубен': '#CE0000',
        'Намерен': 'green',
        'За осиновяване': 'orange'
    };

    const date = new Date(createdAt);
    const createdDate = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        setImgWidth(imagRef.current.getBoundingClientRect().width);
    }, []);

    return (
        <Card elevation={0} className='card' sx={{ position: 'relative', width: '100%', height: '100%' }}>
            <Tooltip title={<>Добавете в Любими</>}>
                <FavoriteIcon sx={{
                    position: 'absolute', top: '5px', right: '5px',
                    fill: 'rgba(69, 69, 69, 0.8)', stroke: 'white',
                    strokeWidth: 1, p: '2px', m: '5px', borderRadius: 50,
                    fontSize: '2em', zIndex: 50, '&:hover': { fill: 'rgba(135, 0, 0, 0.8)' }
                }}
                    onClick={() => {
                        addtoFavouriteById(_id);
                    }} />
            </Tooltip>
            <Link to={`/catalog/pets/details/${_id}`}>
                <Box>
                    <CardMedia
                        ref={imagRef}
                        className='image'
                        component="img"
                        image={imageUrl}
                        alt={imageUrl}
                        sx={{
                            height: imgWidth / 1.5,
                        }}
                    />
                </Box>
                <CardContent className='card-content'>
                    <Box>
                        <Typography component="h5" className='title'>
                            {title}
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', pt: '0.5rem' }} >
                        <Typography variant="caption" className='span-row' >
                            <Typography component='span' className='icon'>
                                <Tooltip title={<>Статус</>}>
                                    {/* <CircleIcon sx={{ fill: statusColor[status] }} /> */}
                                    <RadioButtonCheckedIcon sx={{ fill: statusColor[status] }} />
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
                            {createdDate}
                        </Typography>
                    </Box>
                </CardContent >
            </Link>
        </Card >
    );
};