import styles from './Links.module.css';
import { Link } from 'react-router-dom';

function Links({to, text}){
    return(
        <Link className={styles.btn} to={to}>
            {text}
        </Link>
    )
}

export default Links