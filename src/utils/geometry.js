"use strict";

function getScreenCoords(x, y, ctm) {
    var xn = ctm.e + x * ctm.a + y * ctm.c;
    var yn = ctm.f + x * ctm.b + y * ctm.d;
    return { x: xn, y: yn };
}

// Converts screen-space coords (from getScreenCoords / getCTM) to canvas-group
// local coordinates. At zoom=identity this is a no-op. Uses canvasCTMInverse
// from store (updated by the zoom handler in main.js).
function getCanvasCoords(x, y, ctm) {
    var s   = getScreenCoords(x, y, ctm);
    var inv = canvasCTMInverse; // global via store proxy
    if (!inv) { return s; }
    return {
        x: inv.a * s.x + inv.c * s.y + inv.e,
        y: inv.b * s.x + inv.d * s.y + inv.f
    };
}

var ELEMENT_GEOMETRY = {
    startEvent: { radius: 20, flowOffsetX: 20, flowOffsetY: 0 },
    endEvent:   { radius: 20, flowOffsetX: 26, flowOffsetY: 0 },
    task:       { width: 120, height: 80, flowOffsetX: 67, flowOffsetY: 40 },
    gateway:    { size: 42.8, flowOffsetX: 35, flowOffsetY: 30 }
};
