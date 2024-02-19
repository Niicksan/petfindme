import './MainButton.scss';

import { Link } from "react-router-dom";

export const MainButton = ({ path, text }) => {
    return (
        <Link className="link" to={path}>{text}</Link>
    );
};