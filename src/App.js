import React, { useState, useEffect } from 'react';
import './app.css'
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
      const alreadyLoggedIn = localStorage.getItem('isLoggedIn')
      if(alreadyLoggedIn === '1'){
        setIsLoggedIn(true)
      }
  }, []);

  

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn' , '1')
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn')
    setIsLoggedIn(false);
  };

  return (
      
      <AuthContext.Provider value={{
        isLoggedIn : isLoggedIn,
        onLogout : logoutHandler
        }}>
        <MainHeader onLogout={logoutHandler} />
        <main>
          {!isLoggedIn && <Login onLogin={loginHandler} />}
          {isLoggedIn && <Home onLogout={logoutHandler} />}
        </main>
      </AuthContext.Provider>
  );
}

export default App;
