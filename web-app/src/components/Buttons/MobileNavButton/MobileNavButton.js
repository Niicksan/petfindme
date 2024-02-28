import { Link } from "react-router-dom";

import { ListItem, ListItemButton, ListItemText } from '@mui/material';

export const MobileNavButton = ({
    handleDrawerToggle,
    path,
    buttonKey,
    text
}) => {
    return (
        <ListItem onClick={handleDrawerToggle} component={Link} to={path} key={buttonKey} disablePadding >
            <ListItemButton sx={{
                textAlign: 'left', color: '#550A21', paddingLeft: "90px", ":hover": {
                    border: "1px solid #550A21"
                }
            }}>
                <ListItemText primary={text} />
            </ListItemButton>
        </ListItem>
    );
};