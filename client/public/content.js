// Function to handle visibility change (tab switching)
function handleVisibilityChange() {
    if (document.hidden) {
      console.log("Violation: Tab switching not allowed");
    }
  }
  
  // Function to handle key press (prevent Ctrl+C, Ctrl+V, Ctrl+S)
  function handleKeyPress(event) {
    if (event.ctrlKey) {
      if (['KeyC', 'KeyV', 'KeyS'].includes(event.code)) {
        console.log(`Violation: Ctrl+${event.code.slice(-1)} not allowed`);
        return false;
      }
    }
    if (event.altKey) {
      console.log("Alt Key Press Detected");
      return false;
    }
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
  
  // Function to handle fullscreen change (detect exiting fullscreen)
  function handleFullscreenChange() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement) {
      console.log("Violation: Exiting Full Screen not allowed");
    }
  }
  
  // Add event listeners
  document.addEventListener("visibilitychange", handleVisibilityChange, false);
  document.addEventListener("keydown", handleKeyPress, false);
  document.addEventListener("fullscreenchange", handleFullscreenChange, false);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange, false);
  