import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from "./pages";

function App() {
  useEffect(() => {
    document.title = "TASQ - Login"
  }, [])
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
