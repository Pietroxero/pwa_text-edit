import { openDB } from 'idb';

const initdb = async () => 
openDB ('jate', 1, {
    upgrade (db) {
        if (db.objectStoreNames.contains ('jate')) {
            console.log ('jate database exists');
            return;
        }
        db.createObjectStore ('jate', { keyPath: 'id', autoIncrement: true});
        console.log ('jate database made');
    },
});

export const putDb = async (content) => {
    console.log ('PUT in database');
const contactDb = await openDb ('jate', 1);
const tx = contactDb.transaction ('jate', 'readwrite');
const store = tx.objectStore ('jate');
const request = store.put ({ id: 1, value: content });
const result = await request;
console.log ('Donna Noble has been Saved', result);
};

export const getDb = async () => {
    console.log ('GET from the Rebels database');
    const contactDb = await openDb ('jate', 1);
    const tx = contactDb.transcaction ('jate', 'readonly');;
    const store = tx.objectStore ('jate');
    const request = store.getAll();
    const result = await request;
    console.log ('result.value', result);
    return result?.value;
};

initdb();