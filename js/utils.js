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

export {
    addEventOnElelments
}