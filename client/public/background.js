if (typeof chrome !== 'undefined' && chrome.tabs && chrome.storage && chrome.notifications && chrome.runtime) {
  // Listener for tab activation
  chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn) {
        chrome.tabs.get(activeInfo.tabId, (tab) => {
          console.log('Tab switched to URL:', tab.url);
        });
      }
    });
  });

  // Listener for window focus changes
  chrome.windows.onFocusChanged.addListener((windowId) => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn && windowId !== chrome.windows.WINDOW_ID_NONE) {
        // Query the active tab in the newly focused window
        chrome.tabs.query({ active: true, windowId: windowId }, (tabs) => {
          if (tabs.length > 0) {
            console.log('Window switched to URL:', tabs[0].url);
          }
        });
      }
    });
  });

  // Listener for Chrome window removal (indicating Chrome is closed)
  chrome.windows.onRemoved.addListener((windowId) => {
    chrome.storage.local.get(['loggedIn'], (result) => {
      if (result.loggedIn && windowId === chrome.windows.WINDOW_ID_CURRENT) {
        console.log('Chrome has been closed.');
      }
    });
  });

  // Handle message from content script
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'CHECK_STATUS') {
      // Logic to check status
      let status = 'Active';
      sendResponse({ status });
    }
  });

  console.log("Extension installed");
}
