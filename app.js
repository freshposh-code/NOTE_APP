'use strict'

// MODULE IMPORT
import { addEventOnElelments } from "./js/utils.js";
import { Tooltip } from "./js/Tolltip.js";
import { activeNotebook } from "./js/utils.js";
import { makeElemEditable } from "./js/utils.js";

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

        return currentDate
    }

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

    console.log(makeElemEditable)
}

$addNoteButtonBtn.addEventListener('click', showNotebookField);