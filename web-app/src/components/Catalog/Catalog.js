import './Catalog.scss';

import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Box, TextField, InputAdornment, Button, Grid, Stack, Pagination, PaginationItem, IconButton } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from '@mui/icons-material/Search';

import { CatalogList } from "./CatalogList/CatalogList";
import { StatusSelect } from '../Inputs/StatusSelect/StatusSelect';
import { LocationAutocomplete } from '../Inputs/LocationAutocompleteInput/LocationAutocomplete';

import { usePetContext } from '../../contexts/PetContext';
import { catalogServiceFactory } from '../../services/catalogService';

export const Catalog = () => {
    let queryString = decodeURIComponent(window.location.search);

    const catalogService = catalogServiceFactory();
    const { isLoading, setIsLoading, catalogPets, setCatalogPets } = usePetContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1);
    const [params, setParams] = useState({
        search: searchParams.get('search') || '',
        location: searchParams.get('location') || '',
        status: searchParams.get('status') || ''
    });

    const changeValueHandler = (e) => {
        setParams(state => ({ ...state, [e.target.name]: e.target.value }));
    };
    const changeAutocompleteValueHandler = (value) => {
        setParams(state => ({ ...state, location: value ? value.name : '' }));
    };

    const handleClickClear = (param) => {
        if (param === 'search') {
            setParams(state => ({ ...state, search: '' }));
        } else {
            setParams(state => ({ ...state, status: '' }));
        }
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
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12, lg: 14 }} >
                        <Grid item xs={4} sm={4} md={6} lg={8} sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%' }}>
                                <TextField
                                    fullWidth
                                    id="search"
                                    label="Какво търсиш?"
                                    name="search"
                                    type="search"
                                    value={params.search}
                                    sx={{
                                        '&:hover': {
                                            '.clear-buuton': {
                                                visibility: 'visible'
                                            }
                                        }
                                    }}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    className="clear-buuton"
                                                    onClick={() => {
                                                        handleClickClear('search');
                                                    }}
                                                    sx={{ visibility: "hidden", p: 0.5, mr: 0.5 }}
                                                >
                                                    <ClearIcon fontSize="small" />
                                                </IconButton>
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
                                <LocationAutocomplete
                                    changeValueHandler={changeAutocompleteValueHandler}
                                    inputValue={params.location}
                                    required={false}
                                    label={'Град'}
                                    styles={{ width: '33.33%', pr: 0.5 }}
                                />

                                <StatusSelect
                                    changeValueHandler={changeValueHandler}
                                    handleClickClear={handleClickClear}
                                    required={false}
                                    inputValue={params.status}
                                    styles={{ width: '33.33%', px: 0.5 }}
                                />

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
            </Box >
        </>
    );
};