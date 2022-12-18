import styles from './NovoProjeto.module.css';

import ProjectForm from '../projects/ProjectForm';

function NovoProjeto(){
    return(
        <div className={styles.newproj_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para, assim, adicionar serviços</p>
            <p>Formulário</p>
            <ProjectForm btnText="Criar Projeto"/>
        </div>
    )
}

export default NovoProjeto