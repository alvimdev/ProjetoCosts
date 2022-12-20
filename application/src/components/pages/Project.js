import { useLocation } from "react-router-dom"
import { useState, useEffect } from 'react'

import Message from "../layouts/Message"
import Container from "../layouts/Container"
import Load  from "../layouts/Loading"
import Links from "../layouts/Links"
import Card from "../projects/Card"

import styles from "./Project.module.css"

function Projects(){

    const  [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(false)

    const location = useLocation()
    let message = ''
    if(location.state){
        message = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            //                         ↓ Dev URL (@alvimdev on GitHub) ↓                                  ↓ Common URL  ↓
            fetch('https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us79.gitpod.io/projects' || 'http://localhost:6000/projects', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(response => response.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data)
                    setLoading(true)
                })
                .catch((err) => console.log(err))
        }, 300)
    }, [])

    return(
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <Links to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message msg={message} type="success"/>}
            <Container customClass="start">
                {projects.length > 0 && 
                    projects.map((project) => {
                        return (
                            <Card 
                              name={project.name}
                              id={project.id}
                              budget={project.budget}
                              category={project?.category?.name}
                              key={project.id}
                            />
                        )
                    })
                }
                {!loading && <Load/>}
                {loading && projects.length === 0 && (
                    <p>Não há projetos cadastrados.</p>
                )}
            </Container>
        </div>
    )
}

export default Projects