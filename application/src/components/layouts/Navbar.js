import {Link} from 'react-router-dom'

import Container from './Container';

import styles from './Navbar.module.css'
import logo from '../../img/costs_logoII.png'

function Navbar(){
    return(
        <nav className={styles.navbar}>
            <Container>
                <ul className={styles.list}>
                    <li className={styles.logo}>
                        <Link to="/">
                            <img src={logo} alt="COSTS"/>
                        </Link>
                    </li>
                    <li className={styles.item}
                        ><Link to="/">Home</Link>
                    </li>
                    <li className={styles.item}
                        ><Link to="/projects">Projetos</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/company">Companhia</Link>
                    </li>
                    <li className={styles.item}>
                        <Link to="/contato">Contato</Link>
                    </li>
                </ul>
            </Container>
        </nav>
    )
}

export default Navbar;