'use strict'

// MODULE IMPORT
import { addEventOnElelments } from "./js/utils.js";

// TOGGLE SIDEBAR IN SMALL SCREEEN

const $sidebar = document.querySelector('[data-sidebar]');
const $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElelments($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
})