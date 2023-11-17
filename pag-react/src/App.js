import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Inicio from './paginas/inicio';
import Productos from './paginas/productos';
import Reparar from './paginas/reparar';
<<<<<<< HEAD
import Cotizar from './paginas/cotizar';
=======
import Cotizacion from './paginas/cotizacion2';
>>>>>>> CDAW-72-CDA2-78-CDAW84
import './estilos/general.css'
import PagoEnvio from './paginas/pagos-envios';
import Devoluciones from './paginas/devoluciones';
import Preguntas from './paginas/preguntas';
<<<<<<< HEAD
import Promociones from './paginas/promociones';
=======
>>>>>>> CDAW-72-CDA2-78-CDAW84
import Terminos from './paginas/terminos';
import Privacidad from './paginas/privacidad';
import Error from './paginas/error';
import Login from './paginas/login';
<<<<<<< HEAD
import Formulario from './paginas/roles';

=======
import Cotizar from './paginas/cotizar';
>>>>>>> CDAW-72-CDA2-78-CDAW84

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
<<<<<<< HEAD
        <Route path='/promociones' element={<Promociones/>}></Route>
        <Route path='/terminos-condiciones' element={<Terminos/>}></Route>
        <Route path='/roles' element={<Formulario/>}></Route>  
=======
        <Route path='/terminos-condiciones' element={<Terminos/>}></Route>
>>>>>>> CDAW-72-CDA2-78-CDAW84
        <Route path='/privacidad' element={<Privacidad/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
