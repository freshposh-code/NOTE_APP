'use strict';

import { getRelativeTime } from "./utils.js";

import { Tooltip } from "./Tolltip.js";

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

    <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note">
        <ion-icon class="material-symbols-rounded" name="trash"></ion-icon>

        <div class="state-layer"></div>
    </button>
</div>

<div class="state-layer"></div>
    `;

    Tooltip($card.querySelector('[data-tooltip]'));

    return $card;
}