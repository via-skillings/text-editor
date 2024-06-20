// Import Workbox for service worker management
import { Workbox } from 'workbox-window';
// Import Editor class from './editor.js'
import Editor from './editor';
// Import and initialize IndexedDB database in './database.js'
import './database';
// Import CSS styles
import '../css/style.css';

// Clear the content of the main element
const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner" />
    </div>
  `;
  main.appendChild(spinner);
};

// Create an instance of the Editor class to initialize the text editor
const editor = new Editor();

// Display a loading spinner if the Editor class is not properly initialized
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported in the browser
if ('serviceWorker' in navigator) {
    // Initialize Workbox with the service worker file '/src-sw.js'
  const workboxSW = new Workbox('/src-sw.js');
    // Register the service worker with Workbox
  workboxSW.register();
} else {
    // Log an error message if service workers are not supported
  console.error('Service workers are not supported in this browser.');
}
