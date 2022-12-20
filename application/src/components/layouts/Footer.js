import {FaTwitter, FaInstagram, FaLinkedin, FaGithub} from 'react-icons/fa';

import styles from './Footer.module.css';

function Footer(){
    return (
        <footer className={styles.footer}>
            <ul className={styles.social_list}>
                <li className={styles.item}>
                    <a href="https://www.instagram.com/sb_alvim" target="_blank"><FaInstagram/></a>
                </li>
                <li className={styles.item}>
                    <a href="https://www.twitter.com/alvim_brn" target="_blank"><FaTwitter/></a>
                </li>
                <li className={styles.item}>
                    <a href="https://www.linkedin.com/in/bernardo-alvim" target="_blank"><FaLinkedin/></a>
                </li>
                <li className={styles.item}>
                    <a href="https://github.com/alvimdev" target="_blank"><FaGithub/></a>
                </li>
            </ul>
            <p className={styles.copy_right}>
                <span> Alvim </span> &copy; 2022
            </p>
        </footer>
    )
}

export default Footer