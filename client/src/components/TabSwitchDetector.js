import React, { useEffect } from 'react';

const TabSwitchDetector = () => {
  useEffect(() => {
    const handleTabSwitch = (activeInfo) => {
      console.log('Tab switched to:', activeInfo.tabId);
    };

    const attachListenerIfLoggedIn = () => {
      if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        chrome.storage.local.get(['loggedIn'], (result) => {
          if (result.loggedIn && chrome.tabs) {
            chrome.tabs.onActivated.addListener(handleTabSwitch);
          }
        });
      }
    };

    attachListenerIfLoggedIn();

    return () => {
      if (typeof chrome !== 'undefined' && chrome.tabs) {
        chrome.tabs.onActivated.removeListener(handleTabSwitch);
      }
    };
  }, []);

  return (
    <div>
      <h2>Tab Switch Detector</h2>
      <p>Switch tabs to see detection in action.</p>
    </div>
  );
};

export default TabSwitchDetector;
