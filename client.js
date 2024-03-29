'use strict'

import { Card } from "./Card.js"
import { NavItem } from "./NavItem.js"
import { activeNotebook } from "./utils.js"

const $sidebarList = document.querySelector('[data-sidebar-list]')

const $notePanelTitle = document.querySelector('[data-note-panel-title]')

const $notePanel = document.querySelector('[data-note-panel]')

const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]')

const emptyNotesTemplate = `
<div class="empty-notes">
<ion-icon class="material-symbols-rounded" aria-hidden="true" name="paper"></ion-icon>

<div class="text-headline-small">No notes</div>
</div>
`;

const disableNoteCreateBtns = function (isThereAnyNotebook) {
    $noteCreateBtns.forEach($item => {
        $item[isThereAnyNotebook ? 'removeAttribute' : 'setAttribute']('disabled', '')
    })
}


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
            activeNotebook.call($navItem);
            $notePanelTitle.textContent = notebookData.name;
            $notePanel.innerHTML = emptyNotesTemplate;
            disableNoteCreateBtns(true)
        },

        /**
         * Reads and dispaly a list of notebooks in the UI.
         * 
         * @param {Array<Object>} notebookList - List of notebook data to display
         */
        read(notebookList) {
            disableNoteCreateBtns(notebookList.length);

            notebookList.forEach((notebookData, index) => {
                const $navItem = NavItem(notebookData.id, notebookData.name);

                if (index === 0) {
                    activeNotebook.call($navItem);
                    $notePanelTitle.textContent = notebookData.name;
                }

                $sidebarList.appendChild($navItem)
            });
        },

        /**
         * Updates the UI to reflect changes in a notebook.
         * 
         * @param {string} notebookId ID of the data to update
         * @param {Object} notebookData New data for the notebook
         */

        update(notebookId, notebookData) {
            const $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $newNotebook = NavItem(notebookData.id, notebookData.name);

            $notePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        /**
         * Delete a notebook from the UI
         * 
         * @param {string} notebookId -ID of the notebook to delete
         */

        delete(notebookId) {
            const $deleteNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const $activeNavitem = $deleteNotebook.nextElementSibling ?? $deleteNotebook.previousElementSibling;

            if ($activeNavitem) {
                $activeNavitem.click();
            } else {
                $notePanelTitle.innerHTML = ``;
                $notePanel.innerHTML = ``;
                disableNoteCreateBtns(false);
            }

            $deleteNotebook.remove();
        }
    },

    note: {
        /**
         * Create a new note card in the UI based on provide note data
         * 
         * @param {Object} notebook - Data representing the new note
         */
        create(noteData) {
            // Clear 'emptyNotesTemplate from 'notePanel if there is no existing note
            if (!$notePanel.querySelector('[data-note]')) $notePanel.innerHTML = ''

            // Append card in notepanel
            const $card = Card(noteData);
            $notePanel.prepend($card);
        },

        read(noteList) {

            if (noteList.length) {
                $notePanel.innerHTML = ``
                noteList.forEach(noteData => {
                    const $card = Card(noteData);
                    $notePanel.appendChild($card);
                })
            } else {
                $notePanel.innerHTML = emptyNotesTemplate
            }
        },

        /**
         * Updates a note card in the UI based on provided note daa.
         * 
         * @param {string} noteId - ID of the note to update.
         * @param {Object} noteData - New data for the note.
         */

        update(noteId, noteData) {
            const $oldCard = document.querySelector(`[data-note="${noteId}"]`);
            const $newCard = Card(noteData);
            $notePanel.replaceChild($newCard, $oldCard);
        },

        /**
         * Delete a note card from the UI
         * 
         * @param {string} noteId - ID of the note to delete
         * @param {boolean} isNoteExists - Indicates whether other notes still exist.
         */

        delete(noteId, isNoteExists) {
            document.querySelector(`[data-note="${noteId}"]`).remove();
            if (!isNoteExists) $notePanel.innerHTML = emptyNotesTemplate;
        }

    }

}
