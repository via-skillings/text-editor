import { openDB } from 'idb';

// Initialize the IndexedDB database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('Database already exists');
        return;
      }
        // Create a new object store named 'jate' with auto-incrementing IDs
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('Database created');
    },
  });

// Function to add or update content in the database
export const putDb = async (content) => {
  console.log('PUT to the database');
    // Open the 'jate' database with version 1
  const jateDB = await openDB('jate',1);
    // Create a new transaction with readwrite access
  const transaction = jateDB.transaction('jate', 'readwrite');
    // Access the 'jate' object store
  const store = transaction.objectStore('jate');
    // Add or update content in the object store
  const request = store.put({id: 1, jate: content });
  console.log(`request: ${request}`);
  const result = await request;
  console.log('Data saved to the database', result);
};

// Function to get all content from the database
export const getDb = async () => {
  console.log('GET all from the database');
    // Open the 'jate' database with version 1
  const jateDB = await openDB('jate', 1);
    // Create a new transaction with readonly access
  const transaction =  jateDB.transaction('jate', 'readonly');
    // Access the 'jate' object store
  const store = transaction.objectStore('jate');
    // Get all content from the object store
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.jate;
};

// Initialize the database when the module is loaded
initdb();