import './CatalogItem.scss';
import { useState, useEffect, useRef } from 'react';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardMedia, Tooltip } from '@mui/material';
import FavortieBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

// export const CatalogItem = ({
//     _id,
//     title,
//     status,
//     location,
//     imageUrl,
//     updatedAt
// }) => {
//     const [imgHeight, setImgHeight] = useState();
//     const [imgWidth, setImgWidth] = useState();
//     const imagRef = useRef(null);

//     const date = new Date(updatedAt);
//     const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

//     useEffect(() => {
//         setImgWidth(imagRef.current.getBoundingClientRect().width);
//     }, []);

//     useEffect(() => {
//         setImgHeight(imgWidth);
//     }, [imgWidth]);
//     console.log(imgWidth, imgHeight)
//     return (
//         <Card sx={{ width: '100%', height: '100%', boxShadow: 3, cursor: 'pointer', borderRadius: '5px', }}>
//             <Box sx={{ position: 'relative', zIndex: 50 }}>
//                 <CardMedia
//                     ref={imagRef}
//                     className='image'
//                     component="img"
//                     image={imageUrl}
//                     alt={imageUrl}
//                     sx={{
//                         position: 'relative',
//                         height: imgHeight,
//                         borderRadius: '5px 5px 0 0',
//                     }}
//                 />
//                 <Tooltip title={<>Харесайте тук</>}>
//                     <FavoriteIcon sx={{
//                         position: 'absolute', top: '5px', right: '5px',
//                         fill: 'rgba(85, 10, 33, 0.5)', stroke: 'white', strokeWidth: 1,
//                         p: '2px', m: '5px', borderRadius: 50, fontSize: '2em'
//                     }} />
//                 </Tooltip>
//             </Box>
//             <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 2, '&:last-child': { pb: 2 }, pt: 0 }}>
//                 <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
//                     <Typography component="h5" sx={{
//                         pt: 2, pb: 1,
//                         fontSize: '1.2em',
//                         lineHeight: '1.2',
//                         display: '-webkit-box',
//                         overflow: 'hidden',
//                         WebkitBoxOrient: 'vertical',
//                         WebkitLineClamp: 2,
//                         textDecoration: 'none',
//                         color: 'black',
//                         height: '60px'
//                     }}>
//                         {title}
//                     </Typography>
//                 </Box>
//                 <Box sx={{ display: 'flex', flexDirection: 'column', }} >
//                     <Typography variant="caption" sx={{ fontSize: '1em', lineHeight: '1.5', color: 'dimgray', }}>
//                         <Typography component='span' sx={{ fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Статус: </Typography> {status}
//                     </Typography>
//                     <Typography variant="caption" sx={{ fontSize: '1em', lineHeight: '1.5', color: 'dimgray' }}>
//                         <Typography component='span' sx={{ fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Град: </Typography> {location}
//                     </Typography>
//                     <Typography variant="caption" sx={{ fontSize: '1em', lineHeight: '1.5', color: 'dimgray' }}>
//                         <Typography component='span' sx={{ fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Добавено на: </Typography> {createdAt}
//                     </Typography>
//                 </Box>
//             </CardContent >
//             {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
//                 <Typography>
//                     Добави в любими
//                 </Typography>
//                 <Tooltip title={<>Харесайте тук</>}>
//                     <FavortieBorderIcon sx={{
//                         p: '2px', m: '10px', borderRadius: 50, fontSize: '2em',
//                         color: '#550A21', '&:hover': { background: 'rgba(197, 197, 197, 0.5)' }
//                     }} />
//                 </Tooltip>
//             </Box> */}
//         </Card >
//     );
// };

export const CatalogItem = ({
    _id,
    title,
    status,
    location,
    imageUrl,
    updatedAt
}) => {
    const [imgHeight, setImgHeight] = useState();
    const [imgWidth, setImgWidth] = useState();
    const imagRef = useRef(null);

    const date = new Date(updatedAt);
    const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

    useEffect(() => {
        setImgWidth(imagRef.current.getBoundingClientRect().width);
    }, []);

    useEffect(() => {
        setImgHeight(imgWidth);
    }, [imgWidth]);
    console.log(imgWidth, imgHeight)
    return (
        <Card elevation={0} sx={{ width: '100%', height: '100%', cursor: 'pointer', borderRadius: '5px', border: 0 }}>
            <Box sx={{ position: 'relative', zIndex: 50 }}>
                <CardMedia
                    ref={imagRef}
                    className='image'
                    component="img"
                    image={imageUrl}
                    alt={imageUrl}
                    sx={{
                        position: 'relative',
                        height: imgHeight / 1.5,
                        // height: 'calc(width * 2.75)',
                        borderRadius: '15px',
                    }}
                />
                <Tooltip title={<>Харесайте тук</>}>
                    <FavoriteIcon sx={{
                        position: 'absolute', top: '5px', right: '5px',
                        fill: 'rgba(85, 10, 33, 0.5)', stroke: 'white', strokeWidth: 1,
                        p: '2px', m: '5px', borderRadius: 50, fontSize: '2em'
                    }} />
                </Tooltip>
            </Box>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 0, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Typography component="h5" sx={{
                        pt: 2, pb: 1,
                        fontSize: '1.2em',
                        lineHeight: '1.2',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        textDecoration: 'none',
                        color: 'black',
                        height: '60px'
                    }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', }} >
                    <Typography variant="caption" sx={{ fontSize: '1em', lineHeight: '1.5', color: 'dimgray', }}>
                        <Typography component='span' sx={{ fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Статус: </Typography> {status}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '1em', lineHeight: '1.5', color: 'dimgray' }}>
                        <Typography component='span' sx={{ fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Град: </Typography> {location}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '1em', lineHeight: '1.5', color: 'dimgray' }}>
                        <Typography component='span' sx={{ fontSize: '1em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Дата: </Typography> {createdAt}
                    </Typography>
                </Box>
            </CardContent >
            {/* <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography>
                    Добави в любими
                </Typography>
                <Tooltip title={<>Харесайте тук</>}>
                    <FavortieBorderIcon sx={{
                        p: '2px', m: '10px', borderRadius: 50, fontSize: '2em',
                        color: '#550A21', '&:hover': { background: 'rgba(197, 197, 197, 0.5)' }
                    }} />
                </Tooltip>
            </Box> */}
        </Card >
    );
};

// export const CatalogItem = ({
//     _id,
//     title,
//     status,
//     location,
//     imageUrl,
//     updatedAt
// }) => {
//     const date = new Date(updatedAt);
//     const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });

//     return (
//         <>
//             <Card className='card' sx={{ boxShadow: 3 }}>
//                 <Link to={`/catalog/pet/${_id}`}>
//                     <Box className='card-content-holder'>
//                         <CardMedia
//                             className='image'
//                             component='img'
//                             image={imageUrl}
//                             alt={imageUrl}
//                         />
//                         <CardContent className='content-desc'>
//                             <Typography component="h6">
//                                 {title}
//                             </Typography>
//                             <Box className='content-items-holder'>
//                                 <Box className='content-items'>
//                                     <Typography color="text.secondary">
//                                         <Typography component='span' className='content-item-left'>Статус: </Typography>{status}
//                                     </Typography>
//                                     <Typography color="text.secondary">
//                                         <Typography component='span' className='content-item-left'>Град: </Typography>{location}
//                                     </Typography>
//                                     <Typography color="text.secondary">
//                                         <Typography component='span' className='content-item-left'>Добавено на: </Typography>{createdAt}
//                                     </Typography>
//                                 </Box>
//                             </Box>
//                         </CardContent>
//                     </Box>
//                 </Link >
//                 <Box className='favorite'>
//                     <IconButton aria-label="favorite">
//                         <FavortieBorderIcon />
//                     </IconButton>
//                 </Box>
//             </Card >
//         </>
//     );
// };