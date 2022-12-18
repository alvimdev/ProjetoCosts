import Input from '../form/Input';
import Select from '../form/Select';
import Submit from '../form/Submit';

import styles from './ProjectForm.module.css';

import {useEffect, useState} from 'react';

function ProjectForm(props){
    const [getCategories, setGetCategories] = useState([]);

    useEffect(() => {
        fetch("https://6000-alvimdev-projetocosts-oh4bd0188ho.ws-us79.gitpod.io/categories", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

        .then((resp) => resp.json())
        .then((data) => {
            setGetCategories(data);
        })
        .catch((err) => console.log(err));
    }, [])

    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do Projeto" name="name" placeholder="Nome do projeto"/>
            <Input type="number" text="Orcamento do Projeto" name="budget" placeholder="Orçamento total"/>
            <Select name="category_id" text="Selecione uma categoria" options={getCategories}/>
            <Submit text={props.btnText}/>
        </form>
    )
}

export default ProjectForm
