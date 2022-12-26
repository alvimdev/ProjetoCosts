import { useState } from 'react';

import Input from '../form/Input';
import Submit from '../form/Submit';

import styles from '../projects/ProjectForm.module.css';

function ServiceForm({btnText, handleSubmit, projectData}){

    const [service, setService] = useState([]);

    function handleChange(e){
        setService({ ...service, [e.target.name]: e.target.value});
    }

    function submit(e)
    {
        e.preventDefault()
        projectData.service.push(service)
        handleSubmit(projectData)
    }

    return(
        <form onSubmit={submit} className={styles.form}>
            <Input 
              type="text"
              text="Nome do servico"
              name="name"
              placeholder="Nome do serviço"
              handleonChange={handleChange}
            />
            <Input 
              type="number"
              text="Custo do servico"
              name="cost"
              placeholder="Valor do serviço"
              handleonChange={handleChange}
            />
            <Input 
              type="text"
              text="Descricao do servico"
              name="description"
              placeholder="Descreva o serviço"
              handleonChange={handleChange}
            />
            <Submit text={btnText} />
        </form>
    )
}

export default ServiceForm;