// Import methods to save and retrieve data from the IndexedDB database in './database.js'
import { getDb, putDb } from './database';
import { header } from './header';

export default class {
  constructor() {
        // Retrieve content from localStorage
    const localData = localStorage.getItem('content');

        // Verify if CodeMirror is loaded
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror is not loaded');
    }

      // Initialize CodeMirror editor with specified options
    this.editor = CodeMirror(document.querySelector('#main'), {
      value: '',
      mode: 'javascript',
      theme: 'monokai',
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

      // Load content from IndexedDB and inject into the editor
      // Fallback to localStorage content if no data is found in IndexedDB
      // Use the header content as the last fallback
    getDb().then((data) => {
      console.info('Loaded data from IndexedDB, injecting into editor');
      this.editor.setValue(data || localData || header);
    });

        // Save the content to localStorage whenever there is a change in the editor
    this.editor.on('change', () => {
      localStorage.setItem('content', this.editor.getValue());
    });

        // Save the content to IndexedDB when the editor loses focus
    this.editor.on('blur', () => {
      console.log('The editor has lost focus');
      putDb(localStorage.getItem('content'));
    });
  }
}
