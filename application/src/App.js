import {BrowserRouter, Routes, Route} from 'react-router-dom';

import Home from './components/pages/Home';
import Companhia from './components/pages/Companhia';
import Contato from './components/pages/Contato';
import NovoProjeto from './components/pages/NovoProjeto';

import Navbar from './components/layouts/Navbar';
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';
import Projects from './components/pages/Project';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/company' element={<Companhia/>}/>
          <Route path='/contato' element={<Contato/>}/>
          <Route path='/newproject' element={<NovoProjeto/>}/>
          <Route path='/project' element={<Projects/>}/>
        </Routes>
        </Container>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
