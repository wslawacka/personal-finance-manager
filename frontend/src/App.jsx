import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Expenses from './components/Expenses';
import Income from './components/Income';
import UserFinances from './components/UserFinances';
import './styles/App.css';
import { useState } from 'react';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="register" element={<Register />} />
          <Route path="finances" element={<UserFinances isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="income" element={<Income />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
