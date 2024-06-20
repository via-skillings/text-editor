// Select the install button element from the DOM
const butInstall = document.getElementById('buttonInstall');

// Initialize a variable to store the deferred prompt for installing the PWA
let deferredPrompt = null;

// Listen for the 'beforeinstallprompt' event to capture the installation prompt
window.addEventListener('beforeinstallprompt', (event) => {
    // Prevent the default prompt from appearing
  event.preventDefault();
    // Store the event object for later use
  deferredPrompt = event;
});

// Add a click event listener to the install button
butInstall.addEventListener('click', async () => {
  // Check if a deferred prompt is available
  if (deferredPrompt) {
    try {
        // Show the installation prompt
      await deferredPrompt.prompt();
        // Wait for the user's choice
      deferredPrompt.userChoice.then((choiceResult) => {
         // Check the user's choice outcome
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installation accepted');
        } else {
          console.log('PWA installation dismissed');
        }
          // Reset the deferred prompt after use
        deferredPrompt = null;
      });
    } catch (error) {
       // Log an error if installation fails
      console.error('Failed to install the PWA:', error);
    }
  } else {
     // Log a message if PWA installation prompt is not supported
    console.log('PWA installation is not supported in this browser.');
  }
});

// Listen for the 'appinstalled' event to confirm successful PWA installation
window.addEventListener('appinstalled', (event) => {
  console.log('PWA has been installed successfully!');
});