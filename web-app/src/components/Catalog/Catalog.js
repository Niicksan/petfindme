import './Catalog.scss';

import { Box, TextField, MenuItem, Button, Grid, Stack, Pagination, InputAdornment } from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

import { CatalogList } from "./CatalogList/CatalogList";

import { usePetValidation } from '../../hooks/usePetValidation';

export const Catalog = () => {
    const { statuses } = usePetValidation();

    return (
        <>
            <Box className="main-catalog" >
                <Box
                    component="form"
                    noValidate
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '80%',
                        maxWidth: '1920px',
                        mt: 8,
                        mb: 4
                    }}>
                    <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 14, lg: 14 }}>
                        <Grid item xs={4} sm={4} md={8} lg={8}>
                            <Box >
                                <TextField
                                    id="search"
                                    label="Цялата страна"
                                    name="search"
                                    type="search"
                                    fullWidth
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <SearchIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={4} sm={4} md={6} lg={6}>
                            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
                                <TextField id="location" label="Град" name="location" sx={{ width: '33.33%', pr: 0.5 }} />
                                <TextField
                                    id="status"
                                    margin="normal"
                                    select
                                    label="Статус"
                                    name="status"
                                    sx={{ width: '33.33%', px: 0.5, my: 0 }}
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
                                    sx={{ width: '33.33%', bgcolor: '#550A21', py: '1rem', ml: 0.5 }}
                                >
                                    Търсене
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
                <CatalogList />
                <Stack spacing={2} sx={{ mt: 4 }} >
                    <Pagination count={10} />
                </Stack>
            </Box>
        </>
    );
}