import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './components/Auth';
import MyBookDetail from './components/MyBookDetail';
import Dashboard from './components/Dashboard';

function App() {
  const [count, setCount] = useState(0)
  const nonTrue = false;
  const userId = localStorage.getItem('userId');
  const [loguser, setLogUser] = useState({ id: '', email: '' });
  return (
    <>
       <BrowserRouter>
      <Routes>
        {userId ? (
          <>
            <Route path="/books/:id" element={<MyBookDetail userId={userId} />} />
            <Route path="/" element={<Dashboard />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Auth loguser={loguser} setLogUser={setLogUser}/>} />
            <Route path="/auth" element={<Auth loguser={loguser} setLogUser={setLogUser}/>} />
          </>
        )}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
