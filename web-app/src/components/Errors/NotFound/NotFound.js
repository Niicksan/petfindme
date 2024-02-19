import { ErrorPage } from '../ErrorPage/ErrorPage';

export const NotFound = () => {
    const title = "404 - Страницата не беше намерена";

    return (
        <ErrorPage title={title} />
    );
};