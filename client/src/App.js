import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TabSwitchDetector from './components/TabSwitchDetector';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(['loggedIn'], (result) => {
        if (result.loggedIn) {
          setLoggedIn(true);
        }
      });
    }
  }, []);

  const handleLogin = () => {
    setLoggedIn(true);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ loggedIn: true });
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set({ loggedIn: false });
    }
  };

  return (
    <div className="App">
      {loggedIn ? (
        <div>
          <TabSwitchDetector />
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
