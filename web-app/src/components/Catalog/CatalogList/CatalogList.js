import { Link } from 'react-router-dom';

import { Box } from '@mui/system';

import { CatalogListItem } from './CatalogListItem/CatalogListItem';

export const CatalogList = () => {
    return (
        <>
            {/* {vehicles.length > 0 && ( */}
            <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                {/* {vehicles.length !== 0 && (vehicles.map(x => */}
                <CatalogListItem key="1" />
                <CatalogListItem key="2" />
                <CatalogListItem key="3" />
                <CatalogListItem key="4" />
                {/* ))} */}
            </Box>
            {/* )}
            {vehicles.length === 0 && (
                <>
                    <h3 className="no-articles">Все още няма добавени автомобили</h3>
                    <Link to="/vehicle/create" className="add">
                        Добави
                    </Link>
                </>
            )} */}
        </>
    )
};