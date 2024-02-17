import { Grid, Box, Typography } from '@mui/material';
import { TabPanel } from '@mui/lab';

import { ProfileItem } from "../ProfileItem/ProfileItem";

export const ProfileTabPanel = ({
    tabValue,
    data,
    isFavourite
}) => {
    return (
        <TabPanel value={tabValue} sx={{ px: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: '1920px' }}>
                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 1, sm: 1, md: 1, lg: 1 }}>
                    {data?.length !== 0 && (data?.map(x =>
                        <Grid item xs={1} sm={1} md={1} lg={1} key={x._id}>
                            <ProfileItem {...x} isFavourite={isFavourite} />
                        </Grid>
                    ))}
                    {(tabValue === '1' && !data?.length) && (<Typography component="p" sx={{ pl: 2 }}>Нямате подадени сигнали.</Typography>)}
                    {(tabValue === '2' && !data?.length) && (<Typography component="p" sx={{ pl: 2 }}>Колекцията Любими е празна.</Typography>)}
                </Grid>
            </Box>
        </TabPanel>
    );
};