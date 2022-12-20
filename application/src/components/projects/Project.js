import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Loading from '../layouts/Loading';
import Container from '../layouts/Container';

import styles from './Project.module.css';

function Project(){
    
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            //                         ↓ Dev URL (@alvimdev on GitHub) ↓                                  ↓ Common URL  ↓
            fetch(`https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us79.gitpod.io/projects/${id}` || `http://localhost:6000/projects/${id}`, {
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
    
    return (
        <>
            {!project.name ? (
                <Loading/>
            ) : (
                <div className={styles.project_details}>
                    <Container customClass="column">
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
                                        <span>Total utilizado: </span> {project.cost}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <p>Form</p>
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