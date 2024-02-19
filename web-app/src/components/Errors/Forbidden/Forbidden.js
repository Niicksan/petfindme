import { ErrorPage } from '../ErrorPage/ErrorPage';

export const Forbidden = () => {
    const title = "403 - Нямате право да достъпите тази страницa";

    return (
        <ErrorPage title={title} />
    );
};