import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Inicio from './paginas/inicio';
import Productos from './paginas/productos';
import Reparar from './paginas/reparar';
//import Cotizacion from './paginas/cotizacion2';
import './estilos/general.css'
import PagoEnvio from './paginas/pagos-envios';
import Devoluciones from './paginas/devoluciones';
import Preguntas from './paginas/preguntas';
import Terminos from './paginas/terminos';
import Privacidad from './paginas/privacidad';
import Error from './paginas/error';
import Login from './paginas/login';
import Cotizar from './paginas/cotizar';
import Progreso from './paginas/progreso';
import GestionEmpleado from './paginas/gestionEmpleado';
import GestionSucursal from './paginas/gestionSucursal';
import GestionVehiculo from './paginas/gestionarVehiculo';
import GestionRepuesto from './paginas/gestionRepuestos';

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
        <Route path='/terminos-condiciones' element={<Terminos/>}></Route>
        <Route path='/privacidad' element={<Privacidad/>}></Route>
        <Route path='/progreso' element={<Progreso/>}></Route>
        <Route path='/empleado' element={<GestionEmpleado/>}></Route>
        <Route path='/sucursal' element={<GestionSucursal/>}></Route>
        <Route path='/vehiculo' element={<GestionVehiculo/>}></Route>
        <Route path='/repuesto' element={<GestionRepuesto/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
