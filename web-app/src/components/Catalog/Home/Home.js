import './Home.scss';

import { CatalogList } from '../CatalogList/CatalogList';

import { usePetContext } from '../../../contexts/PetContext';

export const Home = () => {
    const { pets } = usePetContext();
    return (
        <>
            <h1>Добре дошли в PetFind.Me</h1>
            <section id="home-page-catalog">
            <CatalogList pets={pets}/>
            </section>
        </>
    );
};