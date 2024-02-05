import './PetDetailsCard.scss';

import { Icon } from 'leaflet'
import { Card, Box, CardContent, Typography } from '@mui/material';
import { MapContainer, TileLayer, Circle, Tooltip, Marker } from 'react-leaflet'

import ReactImageGallery from 'react-image-gallery';
import marker from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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

    const markerIcon = new Icon({
        iconUrl: marker,
        iconSize: [25, 41],
        iconAnchor: [12, 41]
    })

    const mmarkerShadow = new Icon({
        iconUrl: markerShadow,
        iconSize: [41, 41],
        iconAnchor: [12, 41]
    })

    const center = [42.8672352, 25.3166931]
    const fillBlueOptions = { fillColor: 'blue' }

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
                        <MapContainer center={center} zoom={15} scrollWheelZoom={true} style={{ width: '100%', height: '400px' }}>
                            <TileLayer
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />
                            <Marker position={center} icon={markerIcon} zIndexOffset={10} />
                            <Marker position={center} icon={mmarkerShadow} />
                            <Circle center={center} pathOptions={fillBlueOptions} radius={50} >
                                <Tooltip>Радиус от 50 метра</Tooltip>
                            </Circle>
                        </MapContainer >
                    </Box>
                </Box>
            </Card >
        </>
    );
};