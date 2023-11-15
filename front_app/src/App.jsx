import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Inicio from './pages/inicio';
import Productos from './pages/productos';
import Reparar from './pages/reparar';
import Cotizar from './pages/cotizar';
import './styles/general.css'
import PagoEnvio from './pages/pagos-envios';
import Devoluciones from './pages/devoluciones';
import Preguntas from './pages/preguntas';
import Promociones from './pages/promociones';
import Terminos from './pages/terminos';
import Privacidad from './pages/privacidad';
import Error from './pages/error';
import Login from './pages/login';
import Formulario from './pages/roles';



function App() {
  return (
    <Router>
      <Routes>
        <Route path='*' element={<Error/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/inicio' element={<Inicio/>}></Route>
        <Route path='/productos' element={<Productos/>}></Route>
        <Route path='/reparar' element={<Reparar/>}></Route>
        <Route path='/cotizar' element={<Cotizar/>}></Route>
        <Route path='/pagos-envios' element={<PagoEnvio/>}></Route>
        <Route path='/devoluciones' element={<Devoluciones/>}></Route>
        <Route path='/preguntas' element={<Preguntas/>}></Route>
        <Route path='/promociones' element={<Promociones/>}></Route>
        <Route path='/terminos-condiciones' element={<Terminos/>}></Route>
        <Route path='/roles' element={<Formulario></Formulario>}></Route> 
        <Route path='/privacidad' element={<Privacidad/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;