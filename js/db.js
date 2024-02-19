'use strict'

import { findNotebook, findNotebookIndex, generateID } from "./utils.js";


// DB Object

let /**{Object} */ noteKeeperDB = {};

/**
 * Intializes a local database. If the data exists in local storage, it is loaded;
 * Otherwise,  a new empty database structure is created and stored
 */

const initDB = function () {
    const db = localStorage.getItem('noteKeeperDB');

    if (db) {
        try {
            noteKeeperDB = JSON.parse(db);
            // Ensure noteKeeperDB is an object with notebooks property
            if (!noteKeeperDB || typeof noteKeeperDB !== 'object' || !noteKeeperDB.notebooks || !Array.isArray(noteKeeperDB.notebooks)) {
                throw new Error('Invalid data in local storage');
            }
        } catch (error) {
            console.error('Error parsing data from local storage:', error);
            // Initialize noteKeeperDB as an object with notebooks property
            noteKeeperDB = { notebooks: [] };
            localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB));
        }
    } else {
        // Initialize noteKeeperDB as an object with notebooks property
        noteKeeperDB = { notebooks: [] };
        localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB));
    }
}



initDB();

/**
 * Read and loads the localstorage data into the  global variable `notekeeperDB`.
 */
const readDB = function () {
    noteKeeperDB = JSON.parse(localStorage.getItem('noteKeeperDB'));
}

/**
 * Writes the current state of the global variable `noteKeeperDB` to local storage
 */
const writeDB = function () {
    localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB));
}



/**
 * Collection of function for performing CRUD (Create, Read, Updating, Delete) operations an database.
 * The database state is managed using global variables and local storage
 * @namespace
 * @property {object}  get -Function for retrieving data from the database.     
 * @property {object}  post -Function for adding data from the database.  
 * @property {object}  update -Function for updating data from the database.  
 * @property {object}  delete -Function for deleting data from the database.  
 */

export const db = {
    post: {

        /**
         * ADDS A NEW NOTEBOOK TO THE DATABASE.
         * 
         * @function
         * @param {string} name - The name of the new notebook.
         * @returns {object} The newly created notebook object
         */

        notebook(name) {
            readDB();

            // Make sure noteKeeperDB.notebooks is initialized and is an array
            if (!noteKeeperDB.notebooks || !Array.isArray(noteKeeperDB.notebooks)) {
                noteKeeperDB.notebooks = [];
            }
            // Initialize noteKeeperDB.notebooks as an array if it's undefined
            // if (!noteKeeperDB.notebooks) {
            //     noteKeeperDB.notebooks = [];
            // }

            const notebookData = {
                id: generateID(),
                name,
                notes: []
            }

            noteKeeperDB.notebooks.push(notebookData);
            // console.log(notebookData)

            writeDB();

            return notebookData;
        },
        note(notebookId, object) {
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);

            const noteData = {
                id: generateID(),
                notebookId,
                ...object,
                postedOn: new Date().getTime()
            }

            notebook.notes.unshift(noteData);
            writeDB();

            return noteData;
        }

    },

    get: {
        /**
         * Retrieves all notebooks from the database.
         * 
         * @function
         * @return {Array<Object>} An array of notebook objects.
         */
        notebook() {
            readDB();

            return noteKeeperDB.notebooks;
        },

        /**
         * Retrieve all notes within a specified notebook.
         * 
         * @function
         * @param {string} notebookId - The ID of the notebook to retrieve notes from.
         * @returns {Array<Object>} - An array of note objects.
         */

        note(notebookId) {
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);
            return notebook.notes
        }
    },

    update: {
        /**
         * Update the name of a notebook in the database.
         * @function 
         * @param {string} notebookId - The ID of the notebook to update.
         * @param {string} name - The new name for the notebook
         * @returns {Object} The updated notebook object.
         */
        notebook(notebookId, name) {
            readDB();

            const notebook = findNotebook(noteKeeperDB, notebookId);
            notebook.name = name;

            writeDB();

            return notebook;
        }
    },

    delete: {

        /**
         * @function
         * @param {string} notebookId - The ID of the notebook to delete
         */

        notebook(notebookId) {
            readDB();

            const notebookIndex = findNotebookIndex(noteKeeperDB, notebookId);
            console.log(notebookIndex)
            noteKeeperDB.notebooks.splice(notebookIndex, 1);

            writeDB();
        }
    }
};

