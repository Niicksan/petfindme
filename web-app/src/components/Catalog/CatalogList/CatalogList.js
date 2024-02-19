import { Box, Grid } from '@mui/material';

import { usePetContext } from '../../../contexts/PetContext';

import { CatalogItem } from './CatalogItem/CatalogItem';
import { MainButton } from '../../Buttons/MainButton/MainButton';
import { Loader } from '../../Loader/Loader';

export const CatalogList = () => {
    const { pets, isLoading } = usePetContext();

    return (
        <>
            {isLoading && (<Loader />)}
            {!isLoading && pets.length > 0 && (
                <Box className="main-grid-container" sx={{ justifyContent: 'center', width: '80%', maxWidth: '1920px' }}>
                    <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                        {pets.length !== 0 && (pets.map(x =>
                            <Grid item xs={4} sm={4} md={4} lg={3} key={x._id}>
                                <CatalogItem {...x} />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
            {!isLoading && pets.length === 0 && (
                <>
                    <h3 className="no-articles-title">Все още няма добавени сигнали за изгубени или намерени животни.</h3>
                    <MainButton path={"/pet/create"} text={"Подай сигнал"} />
                </>
            )}
        </>
    )
};