'use strict';

import { DeleteConfirmModal } from "./Modal.js";
import { Tooltip } from "./Tolltip.js";
import { client } from "./client.js";
import { db } from "./db.js";
import { activeNotebook, makeElemEditable } from "./utils.js";


const $notePanelTitle = document.querySelector('[data-note-panel-title]')


/**
 * Create a navigation item representing a notebook. This item displays the notebook's name, allows editing
 * and deletion of the notebook , and handles click events to display its associated notes.
 * 
 * @param {string} id - The unique identifier of the notebook.
 * @param {string} name - The name of the notebook.
 * @returns {HTMLElement} - An HTML element representing the navigation item for the notebook.
 */

export const NavItem = function (id, name) {

    const $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');
    $navItem.setAttribute('data-notebook', id);

    $navItem.innerHTML = `

                <span class="text text-label-large" data-notebook-field>${name}</span>

                <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
                    <ion-icon name="create" class="material-symbols-rounded"></ion-icon>

                    <div class="state-layer"></div>
                </button>


                <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Delete notebook"
                    data-delete-btn>
                    <ion-icon name="trash" class="material-symbols-rounded"></ion-icon>

                    <div class="state-layer"></div>
                </button>

                <div class="state-layer"></div>
    `;

    // SHOW TOOLTIP ON EDIT AND DELETE BUTTON 
    const $tooltipElems = $navItem.querySelectorAll('[data-tooltip]');
    $tooltipElems.forEach($elem => Tooltip($elem));

    /**
     * Handles the click event on the navigation item. Updates the note panel's title, retrieves the associated notes,
     * and marks the item as active.
     */
    $navItem.addEventListener('click', function () {
        $notePanelTitle.textContent = name;
        activeNotebook.call(this);

        const noteList = db.get.note(this.dataset.notebook);
        client.note.read(noteList);
    });

    /**
     * Notebooks edit functionality
     */
    const $navItemEditBtn = $navItem.querySelector('[data-edit-btn]');
    const $navItemField = $navItem.querySelector('[data-notebook-field]');

    $navItemEditBtn.addEventListener('click', makeElemEditable.bind(null, $navItemField));

    $navItemField.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            this.removeAttribute('contenteditable');

            // UPDATE EDITED DATA IN DATABASE
            const updateNotebookData = db.update.notebook(id, this.textContent);

            // RENDER UPDATED NOTEBOOK
            client.notebook.update(id, updateNotebookData)
        }
    });

    /**
 * Notebooks delete functionality
 */
    const $navItemDeleteBtn = $navItem.querySelector('[data-delete-btn]');
    $navItemDeleteBtn.addEventListener('click', function () {

        const modal = DeleteConfirmModal(name);

        modal.open();

        modal.onSubmit(function (isConfirm) {
            if (isConfirm) {
                db.delete.notebook(id);
                client.notebook.delete(id);
            }

            modal.close()
        })
    })


    return $navItem;
};