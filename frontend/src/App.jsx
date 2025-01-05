import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
       <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
