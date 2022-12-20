import { useNavigate } from 'react-router-dom';

import styles from './NovoProjeto.module.css';

import ProjectForm from '../projects/ProjectForm';

function NovoProjeto(){
    
    const navigate = useNavigate()

    function createPost(project){
        // initialize cost and service
        project.cost = 0;
        project.service = []
        //                         ↓ Dev URL (@alvimdev on GitHub) ↓                                  ↓ Common URL  ↓
        fetch("https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us79.gitpod.io/projects" || "http://localhost:6000/projects", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })

            .then((response) => response.json()
               .then((data) => {
                    console.log(data)
                    //redirect
                    navigate('/projects', {state: {message: 'Projeto criado com sucesso!'}})
               }
            ).catch(err => console.log(err)))
    }

    return(
        <div className={styles.newproj_container}>
            <h1>Criar Projeto</h1>
            <p>Crie seu projeto para, assim, adicionar serviços</p>
            <p>Formulário</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto"/>
        </div>
    )
}

export default NovoProjeto