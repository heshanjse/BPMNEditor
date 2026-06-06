"use strict";

function buildTooltipHTML(options) {
    var showArrow = options.showArrow !== false;
    var showText  = options.showText  === true;
    var imgBase   = "assets/img/";

    var html = '<input id="trash-button" type="image" title="Delete" src="' + imgBase + 'trash-icon.png" alt="delete" style="width:25px;">&nbsp;';

    if (showArrow) {
        html += '<input id="arrow-button" type="image" title="Draw Flow" src="' + imgBase + 'arrow.png" alt="flow" style="width:25px;">&nbsp;';
    }

    if (showText) {
        html += '<input id="text-button" type="image" title="Edit Text" src="' + imgBase + 'review.png" alt="text" style="width:25px;">&nbsp;';
    }

    html += '<br><input id="property-button" type="image" title="Properties" src="' + imgBase + 'settingsicon.png" alt="properties" style="width:25px;">';

    return html;
}
