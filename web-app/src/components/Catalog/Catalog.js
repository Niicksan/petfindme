import './Catalog.scss';

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Box, TextField, MenuItem, Button, Grid, Stack, Pagination, PaginationItem, InputAdornment } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import { CatalogList } from "./CatalogList/CatalogList";

import { usePetValidation } from '../../hooks/usePetValidation';
import { usePetContext } from '../../contexts/PetContext';
import { catalogServiceFactory } from '../../services/catalogService';


export const Catalog = () => {
    let queryString = decodeURIComponent(window.location.search);
    const catalogService = catalogServiceFactory();
    const { statuses } = usePetValidation();
    const { isLoading, setIsLoading, catalogPets, setCatalogPets } = usePetContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [params, setParams] = useState({
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        status: searchParams.get('status') || ''
    });

    console.log('queryString', queryString);
    const changeValueHandler = (e) => {
        setParams(state => ({ ...state, [e.target.name]: e.target.value }));
    };

    const changePageHandler = (event, value) => {
        setPage(value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        queryString = '';

        if (params.search) {
            queryString += `?search=${params.search}`;
        }

        if (params.location) {
            queryString += params.search ? '&' : "?";
            queryString += `location=${params.location}`;
        }

        if (params.status) {
            queryString += (params.search || params.location) ? '&' : '?';
            queryString += `status=${params.status}`;
        }

        setSearchParams(queryString);
        setPage(1);
    };

    useEffect(() => {
        setIsLoading(true);
        catalogService.getCatalogSearchResults(queryString)
            .then(result => {
                setCatalogPets(result);
                setIsLoading(false);
            });
    }, [queryString]);

    return (
        <>
            <Box className="main-catalog" >
                <Box
                    className="form"
                    component="form"
                    method='GET'
                    noValidate
                    onSubmit={onSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '80%',
                        maxWidth: '1920px',
                        mt: 6,
                        mb: 4
                    }}
                >
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 14, lg: 14 }} >
                        <Grid item xs={4} sm={4} md={8} lg={8}>
                            <Box >
                                <TextField
                                    fullWidth
                                    id="search"
                                    label="Цялата страна"
                                    name="search"
                                    type="search"
                                    value={params.search}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    onChange={(e) => {
                                        changeValueHandler(e);
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} sm={4} md={6} lg={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <TextField
                                    id="location"
                                    label="Град"
                                    name="location"
                                    value={params.location}
                                    sx={{ width: '33.33%', pr: 0.5 }}
                                    onChange={(e) => {
                                        changeValueHandler(e);
                                    }}
                                />
                                <TextField
                                    select
                                    id="status"
                                    label="Статус"
                                    name="status"
                                    margin="normal"
                                    value={params.status}
                                    sx={{ width: '33.33%', px: 0.5, my: 0 }}
                                    onChange={(e) => {
                                        changeValueHandler(e);
                                    }}
                                >
                                    <MenuItem key="Всички" value="Всички">
                                        Всички
                                    </MenuItem>
                                    {statuses.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    onSubmit={onSubmit}
                                    sx={{ width: '33.33%', bgcolor: '#550A21', py: '1rem', ml: 0.5 }}
                                >
                                    Търсене
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <CatalogList pets={catalogPets.items} />
                {!isLoading && catalogPets.items?.length > 0 && (
                    <Stack spacing={2} sx={{ mt: 4 }} >
                        <Pagination
                            count={Math.ceil(catalogPets.totalCount / catalogPets.itemsPerPage)}
                            page={page}
                            onChange={changePageHandler}
                            renderItem={(item) => (
                                <PaginationItem
                                    component={Link}
                                    to={`/catalog/pets/${queryString.replace(`?page=${page}`, '').replace(`&page=${page}`, '')}${item.page === 1 ? '' : queryString.replace(`?page=${page}`, '').replace(`&page=${page}`, '') === "" ? `?page=${item.page}` : `&page=${item.page}`}`}
                                    {...item}
                                />
                            )} />
                    </Stack>
                )}
            </Box>
        </>
    );
}