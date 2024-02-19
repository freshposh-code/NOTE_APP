'use strict'

/**
 * Attaches an event listener to a collection of DOM elements.

 * @param {Array<HTMLElement>} $elements  -An array of DOM elements to attach the event listener to.
 * @param {string} eventType - The type of event to listen for (e.g,, 'click', 'mouseover').
 * @param {Function} callback - The function to be executed to be executed when the event occurs.
 */

const addEventOnElelments = function ($elements, eventType, callback) {
    $elements.forEach($elements => $elements.addEventListener(eventType, callback))
}

let $lastActiveNavItem;

/**
 * Activate a navigation item by adding the 'active class and deactivates the previously active item
 */
const activeNotebook = function () {
    $lastActiveNavItem?.classList?.remove('active');
    this.classList.add('active');
    $lastActiveNavItem = this;
}

/**
 * 
 * @param {HTMLElement} $element -The DOM element to make editable
 */

const makeElemEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
};

/**
 * Generate a unique ID based on the current timestamp.
 * 
 * @returns {string} A string representation of the current timestamp.
 */

const generateID = function () {
    return new Date().getTime().toString();
}

/**
 * 
 * @param {Object} db The database containing the notebooks.
 * @param {string} notebookId The ID of the notebook to find.
 * @returns {Object | undefined} The found notebook object, or undefined if not found.
 */

const findNotebook = function (db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
}

/**
 * Find the index of a notebook in an array of notebooks.
 * 
 * @param {Object} db The object containing an array of notebooks.
 * @param {string} notebookId The ID of the notebook to find.
 * @returns {number} The index of the found notebook, or -1 if not found
 */

const findNotebookIndex = function (db, notebookId) {
    return db.notebooks.findIndex(item => item === notebookId)
}

/**
 * Convert a timestamp in milliseconds to a human-readable relative time string.
 * 
 * @param {number} milliseconds - The timestamp in milliseconds to convert.
 * @returns {string} A string representing the relative time (e.g., "Just now" "5 min ago" "3 hours ago," "2 days ago".)
 */

const getRelativeTime = function (milliseconds) {
    // Calculate the difference between the current time and the provided timestamp
    const difference = Date.now() - milliseconds;

    // Define time intervals in milliseconds
    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    // Define relative time strings
    const intervals = [
        { label: 'year', divisor: year },
        { label: 'month', divisor: month },
        { label: 'week', divisor: week },
        { label: 'day', divisor: day },
        { label: 'hour', divisor: hour },
        { label: 'minute', divisor: minute },
        { label: 'just now' } // Set divisor to 1 to avoid division by zero
    ];

    // Find the appropriate interval and return the relative time string
    for (const interval of intervals) {
        if (difference >= interval.divisor) {
            const count = Math.floor(difference / interval.divisor);
            return count === 1 ? `1 ${interval.label} ago` : `${count} ${interval.label}s ago`;
        }
    }

    return 'just now'; // Default to 'just now' if timestamp is too recent
};


export {
    addEventOnElelments,
    activeNotebook,
    makeElemEditable,
    generateID,
    findNotebook,
    findNotebookIndex,
    getRelativeTime
}