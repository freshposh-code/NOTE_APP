'use strict'

// TOGGLES THE THEME BETWEEN LIGHT AND DARK
// MANAGES THE THEME SETTING IN THE DOM AND LOCAL STORAGE

const toggleTheme = function () {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light'

    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// INITIALIZE THE THEME

const storedTheme = localStorage.getItem('theme');

const setThemeisDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const InitialTheme = storedTheme ? (setThemeisDark ? 'dark' : 'light') : (setThemeisDark ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', InitialTheme);


// ATTTACH TOGGLETHEME TO THEME BUTTON CLICK EVENT

window.addEventListener('DOMContentLoaded', function () {
    const $themeBtn = document.querySelector('[data-theme-btn]')
    if ($themeBtn) $themeBtn.addEventListener('click', toggleTheme)
})

