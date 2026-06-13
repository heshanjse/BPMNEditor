"use strict";

var store = {
    // Diagram data
    bpmnjson: [],

    // ID counters
    idstartelement:   0,
    idendelement:     0,
    idtaskelement:    0,
    idgatewayelement: 0,
    idflow:           0,
    idelement:        0,

    // Active toolbox selection
    bpmnElement:  null,
    subElement:   null,

    // Flow drawing state
    startid:   0,
    starttype: "",
    startx:    0,
    starty:    0,
    endid:     0,
    endtype:   "",
    endx:      0,
    endy:      0,
    midx:      0,
    midy:      0,
    flowPortASide: "",
    flowPortBSide: "",

    // Drag state
    dragFlows: [],
    dragging:  false,
    drawing:   false,
    taskwidth: 0,

    // Selection / text editing
    selectedId:       0,
    selectedtextid:   null,
    editingElementId: null,

    // D3 references (set during init in main.js)
    sampleSVG:       null,
    canvasGroup:     null,
    canvasCTMInverse: null,
    tooltipDiv: null,

    // Modal DOM references (set during init in main.js)
    semodal:  null,
    tsemodal: null,
    msemodal: null,
    esemodal: null,
    eemodal:  null,
    tmodal:   null,
    gmodal:   null,
    fmodal:   null,
};

// Make every store property accessible as a bare global variable.
// This means all existing files can use e.g. `bpmnjson.push(...)` or
// `startx = 100` without any changes — they transparently read/write store.
(function exposeAsGlobals(keys) {
    var descriptors = {};
    keys.forEach(function (key) {
        descriptors[key] = {
            get: function ()  { return store[key]; },
            set: function (v) { store[key] = v; },
            configurable: true,
            enumerable:   false,
        };
    });
    Object.defineProperties(window, descriptors);
})(Object.keys(store));
