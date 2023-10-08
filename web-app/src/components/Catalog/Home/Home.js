import './Home.scss';

// import { useVehicleContext } from "../../contexts/VehicleContext";

import { CatalogList } from '../CatalogList/CatalogList';

export const Home = () => {
    return (
        <section style={{ minHeight: '60vh' }} id="catalog-page">
            <h1 style={{ color: '#550A21' }}>Добре дошли в PetFind.Me</h1>

            <CatalogList />

        </section>
    );
};