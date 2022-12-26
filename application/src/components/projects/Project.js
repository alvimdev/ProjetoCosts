import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {parse, v4} from 'uuid';

import Loading from '../layouts/Loading';
import Message from '../layouts/Message';
import Container from '../layouts/Container';
import ProjectForm from './ProjectForm';
import ServiceForm from '../service/ServiceForm';

import styles from './Project.module.css';

function Project(){
    
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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

    function createService(){
        setMessage('')
        
        //last service
        const lastService = project.service[project.service.length - 1]
        
        lastService.id = v4()
        
        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)
        

        //maximum value validation
        if(newCost > parseFloat(project.budget)){
            setMessage("Orçamento ultrapassado, verifique o valor do serviço")
            setTypeMessage('error')
            project.service.pop()
            return false;
        }

        //add service cost to total cost
        project.cost = newCost;

        //update project
        fetch(`https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us80.gitpod.io/projects/${id}` || `http://localhost:6000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(project)
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data)
        })
        .catch(err => console.log(err))
    }

    function toggleProjectForm(){
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm(){
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project){
        setMessage('')

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
                            <h1> <span>Projeto: </span> {project.name}</h1>
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
                        <div className={styles.service_form_container}>
                            <h2>Adicione um serviço</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                      handleSubmit={createService}
                                      btnText="Adicionar serviço"
                                      projectData={project}
                                    />
                                )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            <p>Itens de serviço:</p>
                        </Container>
                    </Container>
                </div>
            )}
        </>
    )
}

export default Project