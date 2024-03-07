import { useState } from "react";

import ImageUploading from "react-images-uploading";

import { Box, Button, IconButton, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import AutorenewIcon from '@mui/icons-material/Autorenew';
import DeleteIcon from '@mui/icons-material/Delete';

export const PetImageUpload = () => {
    const uploadImg = '/assets/cloud-upload.png';
    const [images, setImages] = useState([]);
    const maxNumber = 10;
    const maxFileSize = 20971520; // in bytes

    const onChange = (imageList) => {
        setImages(imageList);
    };

    // 👇 Calculate Size in KiloByte and MegaByte
    const calcSize = (size) => {
        return size < 1000000
            ? `${Math.floor(size / 1000)} KB`
            : `${Math.floor(size / 1000000)} MB`;
    };

    const CustomBox = styled(Box)({
        '&.MuiBox-root': {
            backgroundColor: '#fff',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            border: '2px dashed #550A21',
            borderRadius: '8px',
            padding: '1.2rem',
            margin: 0,
            marginTop: '8px',
            marginBottom: '4px',
        },
        '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
            opacity: 0.6,
        },
    });

    return (
        <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            maxFileSize={maxFileSize}
            dataURLKey="data_url"
            acceptType={["jpg", "JPEG", 'PNG']}
        >
            {({ imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps
            }) => (
                <>
                    <CustomBox
                        style={isDragging ? { color: "red" } : null}
                        sx={{ cursor: 'pointer' }}
                        onClick={onImageUpload}
                        {...dragProps}
                    >
                        <Box
                            display='flex'
                            justifyContent='center'
                            alignItems='center'
                            sx={{
                                width: '100%',
                                height: '12rem',
                                borderRadius: '16px',
                            }}
                        >
                            <Stack justifyContent='center' sx={{ p: 1, textAlign: 'center' }}>
                                <Typography variant='body1' component='span'>
                                    Изберете снимки за качване
                                </Typography>
                                <Typography variant='body2' component='span' sx={{ color: '#666' }}>
                                    (Mаксимален размер 20 MB)
                                </Typography>
                                <Box>
                                    <img
                                        src={uploadImg}
                                        alt='file upload'
                                        style={{ width: '5rem' }}
                                    />
                                </Box>
                                <Typography variant='body1' component='span'>
                                    <strong>Поддържани файлове</strong>
                                </Typography>
                                <Typography variant='body2' component='span' sx={{ color: '#666' }}>
                                    JPG, JPEG, PNG
                                </Typography>
                            </Stack>
                        </Box>
                    </CustomBox>

                    {imageList.length > 0 ? (
                        <Box className="upload-image-wrapper" sx={{ mb: 0.5, width: '100%' }}>
                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color={'error'}
                                        onClick={onImageRemoveAll}
                                        sx={{ "&.MuiButton-startIcon": { marginRight: "3px" }, my: 1 }}
                                        startIcon={<DeleteIcon />}
                                    >
                                        Премахни всички снимки
                                    </Button>
                                </Box>
                                <Stack spacing={1} sx={{ mt: 0.5 }}>
                                    {imageList.map((image, index) =>
                                        <Box
                                            key={index}
                                            sx={{
                                                position: 'relative',
                                                backgroundColor: '#f5f8ff',
                                                borderRadius: 1.5,
                                                p: 0.5,
                                            }}
                                        >
                                            <Box display='flex'>
                                                <img
                                                    src={image.data_url}
                                                    alt='upload'
                                                    style={{
                                                        maxWidth: '5.5rem',
                                                        height: '4.5rem',
                                                        objectFit: 'contain',
                                                    }}
                                                />
                                                <Box sx={{ ml: 1 }}>
                                                    <Typography sx={{
                                                        lineHeight: '1.2',
                                                        display: '-webkit-box',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 1,
                                                        overflow: 'hidden',
                                                        wordBreak: 'break-word'
                                                    }}
                                                    >
                                                        {image.file.name}
                                                    </Typography>
                                                    <Typography variant='body2'>
                                                        {calcSize(image.file.size)}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <IconButton
                                                sx={{
                                                    color: 'green',
                                                    position: 'absolute',
                                                    right: '2rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                                onClick={() => {
                                                    onImageUpdate(index);
                                                }}
                                            >
                                                <AutorenewIcon />
                                            </IconButton>
                                            <IconButton
                                                sx={{
                                                    color: '#df2c0e',
                                                    position: 'absolute',
                                                    right: '0.5rem',
                                                    top: '50%',
                                                    transform: 'translateY(-50%)',
                                                }}
                                                onClick={() => {
                                                    onImageRemove(index);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Box>
                                    )}
                                </Stack>
                            </>
                        </Box>
                    ) : null}
                </>
            )}
        </ImageUploading >
    );
};