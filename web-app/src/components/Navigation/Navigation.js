import { Link } from 'react-router-dom';

import { useState } from 'react';

import { Box, CssBaseline, Drawer, AppBar, Toolbar, Typography, IconButton, Slide } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import useScrollTrigger from '@mui/material/useScrollTrigger';

import { WebNavItems } from './WebNavItems/WebNavItems';
import { DrawerItems } from './DrawerItems/DrawerItems';

export const Navigation = (props) => {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    function HideOnScroll(props) {
        const { children, window } = props;
        const trigger = useScrollTrigger({
            target: window ? window() : undefined,
        });

        return (
            <Slide appear={false} direction="down" in={!trigger} >
                {children}
            </Slide>
        );
    }

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} >
            <CssBaseline />
            <HideOnScroll {...props}>
                <AppBar component="nav" sx={{ backgroundColor: '#550A21' }}>
                    <Toolbar sx={{ width: '95%', maxWidth: '1920px', margin: '0 auto' }}>
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{ flexGrow: 1, textAlign: 'left' }}
                        >
                            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                                PetFind.Me
                            </Link>
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, marginRight: 0, paddingRight: 0 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                            <WebNavItems />
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Box component="nav" >
                <Drawer
                    anchor='right'
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 260 },
                    }}
                >
                    <DrawerItems handleDrawerToggle={handleDrawerToggle} />
                </Drawer>
            </Box>
        </Box>
    );
};