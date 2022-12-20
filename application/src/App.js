import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home';
import Companhia from './components/pages/Companhia';
import Contato from './components/pages/Contato';
import NovoProjeto from './components/pages/NovoProjeto';

import Navbar from './components/layouts/Navbar';
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Projects';
import Project from './components/projects/Project';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/company' element={<Companhia/>}/>
          <Route path='/contato' element={<Contato/>}/>
          <Route path='/newproject' element={<NovoProjeto/>}/>
          <Route path='/projects' element={<Projects/>}/>
          <Route path='/project/:id' element={<Project/>}/>
        </Routes>
        </Container>
      <Footer/>
    </BrowserRouter>
  )
}
