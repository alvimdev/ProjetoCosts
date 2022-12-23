import Input from '../form/Input';
import Select from '../form/Select';
import Submit from '../form/Submit';

import styles from './ProjectForm.module.css';

import {useEffect, useState} from 'react';

function ProjectForm(props){
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(props.projectData || {});

    useEffect(() => {
        fetch("https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us80.gitpod.io/categories" || "http://localhost:6000/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

        .then((resp) => resp.json())
        .then((data) => {
            setCategories(data);
        })
        .catch((err) => console.log(err));
    }, [])

    const submit = (e) => {
        e.preventDefault();
        props.handleSubmit(project)
        //console.log(project)
    }

    function handleChange(e) {
        setProject({...project, [e.target.name]: e.target.value});
    }

    function handleCategory(e) {
        setProject({...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            },
        });
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
              type="text" 
              text="Nome do Projeto" 
              name="name" 
              placeholder="Nome do projeto" 
              handleonChange={handleChange}
              value={project.name ? project.name : ""}
            />
            <Input 
              type="number" 
              ext="Orcamento do Projeto" 
              name="budget" 
              placeholder="Orçamento total" 
              handleonChange={handleChange}
              value={project.budget ? project.budget : ""}
            />
            <Select 
              name="category_id" 
              text="Selecione uma categoria" 
              options={categories} 
              handleonChange={handleCategory} 
              value={project.category ? project.category.id : ''}
            />
            <Submit text={props.btnText} />
        </form>
    )
}

export default ProjectForm
