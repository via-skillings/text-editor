const butInstall = document.getElementById('buttonInstall');
let deferredPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  deferredPrompt = event;
});

butInstall.addEventListener('click', async () => {
    //if defered prompt is not null then ask the prompt
  if (deferredPrompt) {
    try {
      await deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installation accepted');
        } else {
          console.log('PWA installation dismissed');
        }
        deferredPrompt = null;
      });
    } catch (error) {
      console.error('Failed to install the PWA:', error);
    }
  } else {
    console.log('PWA installation is not supported in this browser.');
  }
});

window.addEventListener('appinstalled', (event) => {
  console.log('PWA has been installed successfully!');
});