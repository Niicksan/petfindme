import './Home.scss';

// import { useVehicleContext } from "../../contexts/VehicleContext";

import { CatalogList } from '../CatalogList/CatalogList';

export const Home = () => {
    return (
        <>
            <h1>Добре дошли в PetFind.Me</h1>
            <section id="catalog-page">

                <CatalogList />

            </section>
        </>
    );
};