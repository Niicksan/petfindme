import './Footer.scss';

import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faCircleQuestion, faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faInstagram, faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons'

export const Footer = () => {
    return (
        <footer className="footer">
            <section className="container top">
                <div className="about">
                    <h4>Информация</h4>
                    <ul>
                        <Link to="/about">
                            <li><FontAwesomeIcon icon={faCircleInfo} className="fa" />За нас</li>
                        </Link>
                        <Link to="/contacts">
                            <li><FontAwesomeIcon icon={faCircleQuestion} className="fa" />Помощ</li>
                        </Link>
                    </ul>
                </div>

                <div className="social">
                    <h4>Последвайте ни</h4>
                    <ul>
                        <a href="https://www.instagram.com/" className="instagram">
                            <li><FontAwesomeIcon icon={faInstagram} className="fa" />Instagram</li>
                        </a>
                        <a href="https://twitter.com/" className="twitter">
                            <li><FontAwesomeIcon icon={faTwitter} className="fa" />Twitter</li>
                        </a>
                        <a href="https://facebook.com" className="facebook">
                            <li><FontAwesomeIcon icon={faFacebook} className="fa" />Facebook</li>
                        </a>
                    </ul>
                </div>

                <div className="contact">
                    <h4>Връзка с нас</h4>
                    <ul>
                        <li><FontAwesomeIcon icon={faEnvelope} className="fa" />Емейл: contacs@petfindme.com</li>
                        <li><FontAwesomeIcon icon={faPhone} className="fa" />Телефон: 0888888888</li>
                        <li><FontAwesomeIcon icon={faLocationDot} className="fa" />Адрес: София бул. Академик 57</li>
                    </ul>
                </div>
            </section>

            <section className="bottom">
                <p>&#169; PetFInd.Me All Rights Reserved {new Date().getFullYear()}</p>
            </section>
        </footer>
    );
};