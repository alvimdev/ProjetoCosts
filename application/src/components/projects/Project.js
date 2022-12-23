import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layouts/Loading';
import Message from '../layouts/Message';
import Container from '../layouts/Container';
import ProjectForm from './ProjectForm';

import styles from './Project.module.css';

function Project(){
    
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [typeMessage, setTypeMessage] = useState('')

    useEffect(() => {
        setTimeout(() => {
            //                         ↓ Dev URL (@alvimdev on GitHub) ↓                                  ↓ Common URL  ↓
            fetch(`https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us80.gitpod.io/projects/${id}` || `http://localhost:6000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then(res => res.json())
            .then((data) => {
                setProject(data)
            })
            .catch(err => console.log(err))  
        }, 100)
    }, [id])

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project){
        //budget validation
        if(project.budget < project.cost){
            setMessage("O orçamento não pode ser menor que o custo do serviço.")
            setTypeMessage('error')
            return false
        }
        //                         ↓ Dev URL (@alvimdev on GitHub) ↓                                  ↓ Common URL  ↓
        fetch(`https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us80.gitpod.io/projects/${id}` || `http://localhost:6000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(project),
        })
        .then(res => res.json())
        .then((data) => {
            setProject(data)
            setShowProjectForm(false)
            setMessage("Projeto atualizado com sucesso!")
            setTypeMessage('success')
        })
        .catch(err => console.log(err))
    }
    
    return (
        <>
            {!project.name ? (
                <Loading/>
            ) : (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={typeMessage} msg={message}/>}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria: </span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total de Orçamento: </span> R${project.budget}
                                    </p>
                                    <p>
                                        <span>Total utilizado: </span> R${project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm handleSubmit={editPost} btnText="Concluir edição" projectData={project}/>
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            )}
        </>
    )
}

export default Project