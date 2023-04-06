import { getDb, putDb } from './database';
import { header } from './header';

export default class {
    constructor () {
        const localData = localStorage.getItem ('content');

        if (typeof CodeMirror === 'undefined') {
            throw new Error ('CodeMirror has not loaded');
        }

        this.editor = CodeMirror (document.querySelector ('#main'), {
            value: '',
            mode: 'javascript',
            theme: 'monokai',
            lineNumbers: true,
            lineWrapping: true,
            autofocus: true,
            indentUnit: 2,
            tabSize: 2,
        });

        getDb.apply().then ((data) => {
            console.info ('Loaded data from IndexedDB, Injecting to editor');
            this.editor.setValue (data || localDate || header);
        });
        this.editor.on ('change', () => {
            localStorage.setItem ('content', this.editor.getValue());
        });
        this.editor.on ('blur', () => {
            console.log ('Editor lost focus');
            putDb (localStorage.getItem ('content'));
        });
    }
}