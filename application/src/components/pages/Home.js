import styles from './Home.module.css'
import savin from '../../img/saving.png'
import Links from '../layouts/Links'

function Home(){
    return(
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <Links to="/newproject" text="Criar Projeto"/>
            <img src={savin} alt="savin'"/>
        </section>
    )
}

export default Home