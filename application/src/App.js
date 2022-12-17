import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Home from './components/pages/Home';
import Companhia from './components/pages/Companhia';
import Contato from './components/pages/Contato';
import NovoProjeto from './components/pages/NovoProjeto';

import Navbar from './components/layouts/Navbar';
import Container from './components/layouts/Container';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Switch>
      <Container customClass='min-height'>
          <Route exact path='/'>
            <Home/>
          </Route>
          <Route exact path='/company'>
            <Companhia/>
          </Route>
          <Route exact path='/contato'>
            <Contato/>
          </Route>
          <Route exact path='/newproject'>
            <NovoProjeto/>
          </Route>
        </Container>
      </Switch>
      <Footer/>
    </BrowserRouter>
  )
}

export default App;
