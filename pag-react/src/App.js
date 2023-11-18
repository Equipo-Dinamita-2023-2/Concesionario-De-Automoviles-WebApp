import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Inicio from './paginas/inicio';
import Productos from './paginas/productos';
import Reparar from './paginas/reparar';
import Cotizar from './paginas/cotizar';
import Cotizacion from './paginas/cotizacion2';
import './estilos/general.css'
import PagoEnvio from './paginas/pagos-envios';
import Devoluciones from './paginas/devoluciones';
import Preguntas from './paginas/preguntas';
import Promociones from './paginas/promociones';
import Terminos from './paginas/terminos';
import Privacidad from './paginas/privacidad';
import Error from './paginas/error';
import Login from './paginas/login';
import Formulario from './paginas/roles';
import Cotizar from './paginas/cotizar';
import Progreso from './paginas/progreso';

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
        <Route path='/roles' element={<Formulario/>}></Route>  
        <Route path='/terminos-condiciones' element={<Terminos/>}></Route>
        <Route path='/privacidad' element={<Privacidad/>}></Route>
        <Route path='/progreso' element={<Progreso/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
