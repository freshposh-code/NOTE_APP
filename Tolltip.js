'use strict'


/**
 * Attaches a tooltip behavior to a given DON element.
 * When the element is hovered over, a tooltip with the specified content is diplayed.
 * The tolltip is automatically positioned below the element

 * @param {HTMLElement} $elements  -The DOM element to which the tooltip behavior is added
 */

export const Tooltip = function ($element) {
    const $tooltip = document.createElement('span');

    $element.addEventListener('mouseenter', function () {

        $tooltip.textContent = this.dataset.tooltip;
        $tooltip.classList.add('tooltip', 'text-body-small');

        const {
            top,
            left,
            height,
            width
        } = this.getBoundingClientRect();

        $tooltip.style.top = top + height + 4 + 'px';
        $tooltip.style.left = left + (width / 2) + 'px';
        $tooltip.style.transform = 'translate(-50%, 0)';
        document.body.appendChild($tooltip);
    });

    $element.addEventListener('mouseleave', $tooltip.remove.bind($tooltip))
}