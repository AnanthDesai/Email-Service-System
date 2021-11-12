import React, { useEffect, useState } from 'react'
import './App.css';
import Navbar from './components/layouts/Navbar'
import MainContent from './components/layouts/MainContent'
import Login from './components/layouts/Login'


function App() {

  const [login, setLogin] = useState(false);
  
  useEffect(() => {
    const email = localStorage.getItem("User");
    if (email) {
      setLogin(true);
    }
    else {
      setLogin(false);
    }
  }, [])

  return (
    <div className="App">
      {
        login
          ?
          <>
            <Navbar />
            <MainContent />
          </>
          :
          <Login />
      }
        
    </div>
  );
}



export default App;
