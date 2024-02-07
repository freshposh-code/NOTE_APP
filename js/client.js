'use strict'

import { NavItem } from "./NavItem.js"

const $sidebarList = document.querySelector('[data-sidebar-list]')


/**
 * The client object manages interactions with the user interface (UI) to create, read, update, and delete notebooks ansd notes.
 * It provides functions for performing these operations and updating the UI accordingly.
 * 
 * @namespace
 * @property {object} notebook - Function for managing notebooks in the UI.
 * 
 * @property {object} note - Functions for managing notes in the UI.
 */

export const client = {

    notebook: {
        /**
         * Create a new notebook in the UI. based on provided notebook data.
         * 
         * @param {object} notebookData - Data representing the new notebook.
         * 
         */
        create(notebookData) {
            const $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
        }
    }

}