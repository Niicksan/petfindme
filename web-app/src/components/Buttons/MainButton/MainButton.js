import './MainButton.scss';

import { Link } from "react-router-dom";

export const MainButton = ({ text }) => {
    return (
        <Link className="link" to={'/catalog/pets'}>{text}</Link>
    );
};