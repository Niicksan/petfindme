import { Link } from "react-router-dom";

import { Button } from "@mui/material";

export const WebNavButton = ({ path, buttonKey, text }) => {
    return (
        <Button component={Link} to={path} key={buttonKey} sx={{
            color: '#fff', ":hover": {
                bgcolor: "white",
                color: "#550A21"
            }
        }}>
            {text}
        </Button>
    );
};