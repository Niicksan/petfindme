import { Link } from "react-router-dom";

import { Button } from "@mui/material";

export const WebNavButton = ({ path, key, text }) => {
    return (
        <Button component={Link} to={path} key={key} sx={{
            color: '#fff', ":hover": {
                bgcolor: "white",
                color: "#550A21"
            }
        }}>
            {text}
        </Button>
    );
};