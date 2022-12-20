import styles from './Loading.module.css';
import loadin from '../../img/loading.gif'

export default function App() {
  return (
    <div className={styles.loader_container}>
        <img className={styles.loader} src={loadin} alt="Carregando"/>
    </div>
  )
}