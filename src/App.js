import './App.css';
import Home from './Components/Home';

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BottamNave from './Components/BottamNave';
import participationform from './Components/participationform';
import AdminLogin from './Components/AdminLogin';
import { AdminScreen } from './Screen/AdminScreen';
import { Cesaadmin } from './Screen/Cesaadmin';
import { Sacadmin } from './Screen/Sacadmin';
import { UpdateEvent } from './Screen/UpdateEvent';

function App() {



  return (
    <BrowserRouter>
      <BottamNave />

      <Routes>
        <Route path='/' Component={Home} exact />
        <Route path='/form' Component={participationform} exact />
        <Route path='/admin' Component={AdminLogin} exact />
        <Route path='/organizer' Component={AdminScreen} exact />
        <Route path='/cesaadmin' Component={Cesaadmin} exact />
        <Route path='/sacadmin' Component={Sacadmin} exact />
        <Route path='/:id/update' Component={UpdateEvent} exact />
      </Routes>
    </BrowserRouter>


  );
}

export default App;