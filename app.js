'use strict'

// MODULE IMPORT
import { addEventOnElelments } from "./utils.js";
import { Tooltip } from "./Tolltip.js";
import { activeNotebook } from "./utils.js";
import { makeElemEditable } from "./utils.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModal } from "./Modal.js";

// TOGGLE SIDEBAR IN SMALL SCREEEN

const $sidebar = document.querySelector('[data-sidebar]');
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
// const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElelments($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    // $overlay.classList.toggle('active');
});

// INITIALIZE TOOLTIP BEHAVIOUR FOR ALL DOM ELEMENT WITH 'DATA-TOOLTIP' ATTRIBUTE.

const $tooltipElems = document.querySelectorAll('[data-tooltip]')

$tooltipElems.forEach($elem => Tooltip($elem));


document.addEventListener('DOMContentLoaded', function () {
    const greetingElement = document.querySelector('[data-greeting]');
    const currentDateElement = document.querySelector('[data-current-date]');

    // Function to get the current greetings
    const getCurrentGreetings = function () {
        const hour = new Date().getHours();

        if (hour >= 0 && hour < 12) {
            return 'Good Morning'
        } else if (hour >= 0 && hour < 18) {
            return 'Good Afternoon'
        } else {
            return 'Good Evening'
        }
    }

    // Function to get the current date
    function getCurrentDate() {
        const option = { weekday: 'long', day: 'numeric', year: 'numeric', month: 'long' };
        const currentDate = new Date().toLocaleDateString('en-us', option);

        return currentDate;
    };

    // Update greetings and current date
    function updateGreetingsAndDate() {
        greetingElement.textContent = getCurrentGreetings();
        currentDateElement.textContent = getCurrentDate();

    }
    // Initial update
    updateGreetingsAndDate();


    // Update every minute (you can adjust the interval as needed)
    setInterval(updateGreetingsAndDate, 60000);
});


// NOTEBOOK CREATE FIELD

const $sidebarList = document.querySelector('[data-sidebar-list]');
const $addNoteButtonBtn = document.querySelector('[data-add-notebook]');

/**
 * Shows a notebook creation field in the sidebar when teh "ADD Notebook" button is clicked.
 * The function dynamically adds a new notebook field element,  makes it editable,  and listens for
 * the ENTER key to create a new notebook when pressed
 */

const showNotebookField = function () {
    const $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field>
        <div class="state-layer"></div>
    </span>
    `

    $sidebarList.appendChild($navItem);

    const $navItemField = $navItem.querySelector('[data-notebook-field]');

    // Active new created notebook and deaactivate the last one.
    activeNotebook.call($navItem);

    // Make notebook field content editable and focus
    makeElemEditable($navItemField);

    $navItemField.addEventListener('keydown', createNotebook);
}

// When user prses 'ENTER' key is pressed while editing a notebook name field

$addNoteButtonBtn.addEventListener('click', showNotebookField);

/**
 * Create new notebook
 * Create a newbook when the 'ENTER key is pressed while editing a notebook name field.
 * The new notebook is started in the database.
 *  @param {KeyboardEvent} event - the keyboard event that triggered notebook creation.
 */

const createNotebook = function (event) {
    if (event.key === 'Enter') {
        // Store new created notebook in database
        const notebookData = db.post.notebook(this.textContent || 'Untitled'); //this:$navItemField
        this.parentElement.remove();

        // Render NavItem
        client.notebook.create(notebookData);
    }
}

/**
 * Renders the existing notebook list by retrieving data from the database and passing it to the client.
 */
const renderExistingNotebook = function () {
    const notebookList = db.get.notebook();
    client.notebook.read(notebookList);
    // console.log(notebookList)
};

renderExistingNotebook();

/**Create new note
 * 
 * Attaches event listeners to a collection of DOM elements representing "Create Note" buttons.
 * When a button is clicked, it opens a modal for creating a new note and handles the submission
 * of the new note to the database and client.
 */

const $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');

addEventOnElelments($noteCreateBtns, 'click', function () {
    // Create and open new modal
    const modal = NoteModal();
    modal.open();

    // Handle the submission od the new note to the database and client 
    modal.onSubmit(noteObj => {
        const activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;

        const noteData = db.post.note(activeNotebookId, noteObj);
        client.note.create(noteData)
        modal.close();
    })
});

/**
 * Renders existing notes in the active notebook. Retrieves note data from the database based
 *  on the active notebook's ID and uses the client to display the notes.
 */
const renderExistedNote = function () {
    const activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;

    if (activeNotebookId) {
        const noteList = db.get.note(activeNotebookId);

        // Display existing note
        client.note.read(noteList);
    }
}

renderExistedNote();