'use strict';


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

    return $navItem;
};