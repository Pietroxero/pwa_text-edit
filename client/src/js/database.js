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

}