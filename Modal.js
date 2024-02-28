'use strict';

const $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');

/**
 * Create and manages a modal for adding or editing notes. The modal allows users to input a note's and text,
 * and provides functionality to submit and save the note.
 * 
 * @param {string} [title='Untitle'] - The default title for the note. 
 * @param {string} [text='Add your note...'] - The default text for the note
 * @param {string} [time=''] - the time associated with the note.
 * @returns {Object} - An object containing functions to open the modal, close the modal, and handle note submision
 */

const NoteModal = function (title = '', text = '', time = '') {

    const $modal = document.createElement('div');

    $modal.classList.add('modal');

    $modal.innerHTML = `
    
    <button class="icon-btn large" aria-label="Close modal" data-close-btn>
                <ion-icon class="material-symbols-rounded" name="close"></ion-icon>

                <div class="state-layer"></div>
            </button>

            <input type="text" placeholder="Untitled" value="${title}" class="modal-title text-title-medium"
                data-notebook-field>

            <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar"
                data-notebook-field>${text}</textarea>

            <div class="modal-footer">
                <span class="time text-label-large">${time}</span>

                <button class="btn text" data-submit-btn>
                    <span class="text-label-large">Save</span>

                    <div class="state-layer"></div>
                </button>
            </div>
            `;


    const $submitBtn = $modal.querySelector('[data-submit-btn]');
    $submitBtn.disabled = true;

    const [$titleField, $textField] = $modal.querySelectorAll('[data-notebook-field]');

    const enableSubmit = function () {
        $submitBtn.disabled = !$titleField.value && !$textField.value;
    }

    $textField.addEventListener('keyup', enableSubmit);
    $titleField.addEventListener('keyup', enableSubmit);


    /**
     * Open the note modal by appending it to the document body and setting focus on the title field.
     */

    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
        $titleField.focus();
    }

    // Closes the note modal by removing it from the document body

    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    // Attach click event to closeBtn, when click call the close modal function
    const $closeBtn = $modal.querySelector('[data-close-btn]');
    $closeBtn.addEventListener('click', close);

    /**
     * Handles the submission of a note within the modal.
     * 
     * @param {Function} callback - The callback function to execute with the submitted note data.
     */

    const onSubmit = function (callback) {

        $submitBtn.addEventListener('click', function () {
            const noteData = {
                title: $titleField.value,
                text: $textField.value
            }

            callback(noteData)
        })

    }

    return { open, close, onSubmit }

}

/**
 * 
 * @param {string} title - The title of the item to be deleted
 * @returns {Object} - An object containing function to
 *  open the modal, close the modal, and handle confirmation
 */

const DeleteConfirmModal = function (title) {
    const $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
          <h3 class="modal-title text-title-medium">Are you sure you want to delete <strong>"${title}"</strong> ?
            </h3>

            <div class="modal-footer">

                <button class="btn text" data-action-btn="false">
                    <span class="text-label-large">Cancel</span>

                    <div class="state-layer"></div>
                </button>

                <button class="btn fill" data-action-btn="true">
                    <span class="text-label-large">Delete</span>

                    <div class="state-layer"></div>
                </button>
            </div>
            `;
    /**
     * Opens the delete confirmation modal by appending it to the document body
     */
    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    /**
     * Closes the delete confirmation modal by removing it from thr document body
     */
    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const $actionBtns = $modal.querySelectorAll('[data-action-btn]')

    /**
     * Handles the submission of the delete confirmation.
     * 
     * @param {Function} callback - The callback function to execute with the confirmation
     *  result (true for confirmation, false for cancel)
     */

    const onSubmit = function (callback) {
        $actionBtns.forEach($btn => $btn.addEventListener('click', function () {
            const isConfirm = this.dataset.actionBtn === 'true' ? true : false;

            callback(isConfirm)
        }))
    }

    return { open, close, onSubmit };
}

export { DeleteConfirmModal, NoteModal }