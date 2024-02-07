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

export {
    addEventOnElelments,
    activeNotebook,
    makeElemEditable,
    generateID
}