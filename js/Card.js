'use strict';

import { getRelativeTime } from "./utils.js";

import { Tooltip } from "./Tolltip.js";
import { DeleteConfirmModal, NoteModal } from "./Modal.js";
import { client } from "./client.js";
import { db } from "./db.js";

/**
 * Creates and HTML card element representing a note based on provided note data.
 * 
 * @param {Object} noteData  - Data representing the note to be displayed in the card
 * @returns {HTMLElement} - The generated card element.
 */
export const Card = function (noteData) {
    const { id, title, text, postedOn, notebookId } = noteData;

    const $card = document.createElement('div');
    $card.classList.add('card');
    $card.setAttribute('data-note', id);

    $card.innerHTML = `
       <h3 class="card-title text-title-medium">${title}</h3>

<p class="card-text-text-body-large">${text}</p>

<div class="wrapper">
    <div class="card-time text-label-large">${getRelativeTime(postedOn)}</div>

    <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note" data-delete-btn>
        <ion-icon class="material-symbols-rounded" name="trash"></ion-icon>

        <div class="state-layer"></div>
    </button>
</div>

<div class="state-layer"></div>
    `;

    Tooltip($card.querySelector('[data-tooltip]'));

    /**
     * Note detail and edit functionality
     * 
     * Attaches a click event listener to card element.
     * When the card is clicked. it opens a modal with the note's details and allows for updating the note
     */
    $card.addEventListener('click', function () {
        const modal = NoteModal(title, text, getRelativeTime(postedOn));
        modal.open();

        // Attach a callback to handle the submission of changes
        modal.onSubmit(noteData => {
            const updatedData = db.update.note(id, noteData);
            modal.close();

            // Update the note in the client UI
            client.note.update(id, updatedData);
        });
    });

    /**
     * Note delete functionality
     * 
     * Attaches a click event listener to delete button element within card
     * When the delete button is clicked, it opens a confirmation modal for deleting the associated note.
     * If the deletion is confirmed, it update the UI and database to remove the note.
     */

    const $deleteBtn = $card.querySelector('[data-delete-btn]')

    $deleteBtn.addEventListener('click', function (event) {
        event.stopImmediatePropagation();

        const modal = DeleteConfirmModal(title);

        modal.open();

        modal.onSubmit(function (isConfirm) {
            if (isConfirm) {
                const existedNotes = db.delete.note(notebookId, id);

                client.note.delete(id, existedNotes.length);
            }

            modal.close();
        })
    })



    return $card;
}