import './CatalogItem.scss';

import { Link } from 'react-router-dom';
import { Card, Box, CardContent, Typography, CardMedia, IconButton, Tooltip } from '@mui/material';
import FavortieBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteBorderOutlined from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

export const CatalogItem = ({
    _id,
    title,
    status,
    location,
    imageUrl,
    updatedAt
}) => {
    const date = new Date(updatedAt);
    const createdAt = date.toLocaleDateString('Bg-bg', { year: 'numeric', month: 'long', day: 'numeric' });
    return (
        <Card sx={{ width: '100%', height: '100%', boxShadow: 3, cursor: 'pointer', borderRadius: '5px' }}>
            <Box sx={{ position: 'relative', zIndex: 50 }}>
                <CardMedia
                    className='image'
                    component="img"
                    image={imageUrl}
                    alt={imageUrl}
                    sx={{
                        position: 'relative',
                        height: '200px',
                        borderRadius: '5px 5px 0 0',
                    }}
                />
                <Tooltip title={<>Харесайте тук</>}>
                    <FavortieBorderIcon sx={{
                        position: 'absolute', top: '5px', right: '5px',
                        color: '#550A21', background: 'rgba(255, 255, 255, 0.3)',
                        p: '2px', m: '5px', borderRadius: 50, fontSize: '2em'
                    }} />
                </Tooltip>
            </Box>
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 }, pt: 0 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Typography component="h5" sx={{
                        pt: 2, pb: 1,
                        fontSize: '1.1em',
                        lineHeight: '1.2',
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        textDecoration: 'none',
                        color: 'black'
                    }}>
                        {title}
                    </Typography>
                </Box>
                <Box sx={{ display: 'flex', flexDirection: 'column', }} >
                    <Typography variant="caption" sx={{ fontSize: '0.9em', lineHeight: '1.5', color: 'dimgray', }}>
                        <Typography component='span' sx={{ fontSize: '0.9em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Статус: </Typography> {status}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.9em', lineHeight: '1.5', color: 'dimgray' }}>
                        <Typography component='span' sx={{ fontSize: '0.9em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Град: </Typography> {location}
                    </Typography>
                    <Typography variant="caption" sx={{ fontSize: '0.9em', lineHeight: '1.5', color: 'dimgray' }}>
                        <Typography component='span' sx={{ fontSize: '0.9em', fontWeight: 'bolder', lineHeight: '1.5' }} className='content-item-left'>Добавено на: </Typography> {createdAt}
                    </Typography>
                </Box>
            </CardContent >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <Typography>
                    Добави в любими
                </Typography>
                <Tooltip title={<>Харесайте тук</>}>
                    <FavortieBorderIcon sx={{
                        p: '2px', m: '10px', borderRadius: 50, fontSize: '2em',
                        color: '#550A21', '&:hover': { background: 'rgba(197, 197, 197, 0.5)' }
                    }} />
                </Tooltip>
            </Box>
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
//                             component="img3
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
//                 </Link>
//                 <Box className='favorite'>
//                     <IconButton aria-label="favorite">
//                         <FavortieBorderIcon />
//                     </IconButton>
//                 </Box>
//             </Card >
//         </>
//     );
// };