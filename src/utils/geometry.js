"use strict";

function getScreenCoords(x, y, ctm) {
    var xn = ctm.e + x * ctm.a + y * ctm.c;
    var yn = ctm.f + x * ctm.b + y * ctm.d;
    return { x: xn, y: yn };
}

var ELEMENT_GEOMETRY = {
    startEvent: { radius: 20, flowOffsetX: 20, flowOffsetY: 0 },
    endEvent:   { radius: 20, flowOffsetX: 26, flowOffsetY: 0 },
    task:       { width: 120, height: 80, flowOffsetX: 67, flowOffsetY: 40 },
    gateway:    { size: 42.8, flowOffsetX: 35, flowOffsetY: 30 }
};
