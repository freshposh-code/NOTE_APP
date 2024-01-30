'use strict'


// DB Object

let /**{Object} */ noteKeeperDB = {};

/**
 * Intializes a local database. If the data exists in local storage, it is loaded;
 * Otherwise,  a new empty database structure is created and stored
 */

const initDB = function () {
    const db = localStorage.getItem('noteKeeperDB');

    if (db) {
        noteKeeperDB = JSON.parse(db);
    } else {
        noteKeeperDB.notebooks = [];
        localStorage.setItem('noteKeeperDB', JSON.stringify(noteKeeperDB))
    }
}

initDB();

/**
 * Collection of function for performing CRUD (Create, Read, Updating, Delete) operations an database.
 * The database state is managed using global variables and local storage
 * @namespace
 * @property {object}  get -Function for retrieving data from the database.     
 * @property {object}  post -Function for adding data from the database.  
 * @property {object}  update -Function for updating data from the database.  
 * @property {object}  delete -Function for deleting data from the database.  
 */

export const db = {};