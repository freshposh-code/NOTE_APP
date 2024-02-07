'use strict'

import { generateID } from "./utils.js";


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
        }
    }
};

