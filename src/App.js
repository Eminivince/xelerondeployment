import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home';
import Swap from './Pages/Swap';
import Connect from './Pages/Connect';
import SelectAccount from './Pages/SelectAccount';
import Pool from './Pages/Pool';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/swap' element={<Swap />}/>
        <Route path='/connect' element={<Connect />}/>
        <Route path='/account' element={<SelectAccount />}/>
        <Route path='/pool' element={<Pool />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
