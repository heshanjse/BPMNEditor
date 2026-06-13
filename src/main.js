"use strict";
document.onload = (function (d3, saveAs, Blob, undefined) {

    // ── DOM / D3 references ────────────────────────────────────────────────
    store.tooltipDiv = d3.select("body")
        .append("div")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("opacity", 0)
        .style("pointer-events", "none");

    store.semodal  = document.getElementById('SEModal');
    store.tsemodal = document.getElementById('TSEModal');
    store.msemodal = document.getElementById('MSEModal');
    store.esemodal = document.getElementById('ESEModal');
    store.eemodal  = document.getElementById('EEModal');
    store.tmodal   = document.getElementById('TModal');
    store.gmodal   = document.getElementById('GModal');
    store.fmodal   = document.getElementById('FModal');

    document.getElementById('SEClose').onclick  = function () { store.semodal.style.display  = "none"; };
    document.getElementById('TSEClose').onclick = function () { store.tsemodal.style.display = "none"; };
    document.getElementById('MSEClose').onclick = function () { store.msemodal.style.display = "none"; };
    document.getElementById('ESEClose').onclick = function () { store.esemodal.style.display = "none"; };
    document.getElementById('EEClose').onclick  = function () { store.eemodal.style.display  = "none"; };
    document.getElementById('TClose').onclick   = function () { store.tmodal.style.display   = "none"; };
    document.getElementById('GClose').onclick   = function () { store.gmodal.style.display   = "none"; };
    document.getElementById('FClose').onclick   = function () { store.fmodal.style.display   = "none"; };

    // ── Modal Save handlers ────────────────────────────────────────────────
    function saveElementName(inputId, closeModal) {
        var id  = store.editingElementId;
        var val = document.getElementById(inputId).value;
        for (var i = 0; i < store.bpmnjson.length; i++) {
            if (store.bpmnjson[i].id === id) {
                store.bpmnjson[i].name = val;
                break;
            }
        }
        closeModal.style.display = "none";
    }

    document.getElementById('se-save').onclick  = function () { saveElementName('se-name',  store.semodal);  };
    document.getElementById('tse-save').onclick = function () { saveElementName('tse-name', store.tsemodal); };
    document.getElementById('mse-save').onclick = function () { saveElementName('mse-name', store.msemodal); };
    document.getElementById('ese-save').onclick = function () { saveElementName('ese-name', store.esemodal); };
    document.getElementById('ee-save').onclick  = function () { saveElementName('ee-name',  store.eemodal);  };
    document.getElementById('g-save').onclick   = function () { saveElementName('g-name',   store.gmodal);   };
    document.getElementById('f-save').onclick   = function () { saveElementName('f-name',   store.fmodal);   };

    document.getElementById('t-save').onclick = function () {
        var id = store.editingElementId;
        var name     = document.getElementById('t-name').value;
        var assignee = document.getElementById('t-assignee').value;
        for (var i = 0; i < store.bpmnjson.length; i++) {
            if (store.bpmnjson[i].id === id) {
                store.bpmnjson[i].name     = name;
                store.bpmnjson[i].assignee = assignee;
                var textEl = document.getElementById('textid' + id);
                if (textEl) { textEl.innerHTML = name; }
                break;
            }
        }
        store.tmodal.style.display = "none";
    };


    // ── GraphCreator (toolbox + file I/O wiring) ───────────────────────────
    var GraphCreator = function (svg, nodes, edges) {
        var thisGraph = this;
        thisGraph.idct = 0;

        thisGraph.nodes = nodes || [];
        thisGraph.edges = edges || [];

        thisGraph.state = {
            selectedNode: null,
            selectedEdge: null,
            mouseDownNode: null,
            mouseDownLink: null,
            justDragged: false,
            justScaleTransGraph: false,
            lastKeyDown: -1,
            shiftNodeDrag: false,
            selectedText: null
        };

        // ── Download (JSON export) ─────────────────────────────────────────
        d3.select("#download-input").on("click", function () {
            var bpmn = [];
            for (var i = 0; i < bpmnjson.length; i++) {
                var bpmnnode = bpmnjson[i];
                if (bpmnnode.id != 0) {
                    bpmn.push(bpmnnode);
                }
            }
            bpmn.push({
                "id":               "data",
                "idstartelement":   idstartelement,
                "idendelement":     idendelement,
                "idtaskelement":    idtaskelement,
                "idgatewayelement": idgatewayelement,
                "idflow":           idflow
            });
            var blob = new Blob([window.JSON.stringify({ bpmn })], { type: "text/plain;charset=utf-8" });
            saveAs(blob, "bpmn.json");
        });

        // ── Toolbox buttons ────────────────────────────────────────────────
        d3.select("#start-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "startEvent";
            subElement  = "StartEvent";
        });
        d3.select("#start-time-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "startEvent";
            subElement  = "TimeStartEvent";
        });
        d3.select("#start-message-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "startEvent";
            subElement  = "MessageStartEvent";
        });
        d3.select("#start-error-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "startEvent";
            subElement  = "ErrorStartEvent";
        });

        d3.select("#end-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "endEvent";
            subElement  = "EndEvent";
        });
        d3.select("#error-end-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "endEvent";
            subElement  = "ErrorEndEvent";
        });
        d3.select("#cancel-end-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "endEvent";
            subElement  = "CancelEndEvent";
        });
        d3.select("#terminate-end-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "endEvent";
            subElement  = "TerminateEndEvent";
        });

        d3.select("#user-task-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "task";
            subElement  = "UserTask";
        });
        d3.select("#script-task-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "task";
            subElement  = "ScriptTask";
        });
        d3.select("#mail-task-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "task";
            subElement  = "MailTask";
        });
        d3.select("#manual-task-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "task";
            subElement  = "ManualTask";
        });

        d3.select("#parallel-gateway-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "gateway";
            subElement  = "parallel";
        });
        d3.select("#exclusive-gateway-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "gateway";
            subElement  = "exclusive";
        });
        d3.select("#inclusive-gateway-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "gateway";
            subElement  = "inclusive";
        });
        d3.select("#event-gateway-button").on("click", function () {
            document.body.style.cursor = "copy";
            bpmnElement = "gateway";
            subElement  = "event";
        });

        d3.select("#arrow-button").on("click", function () {
            document.body.style.cursor = "pointer";
            bpmnElement = "flow";
        });

        // ── Upload (JSON import) ───────────────────────────────────────────
        d3.select("#upload-input").on("click", function () {
            document.getElementById("hidden-file-upload").click();
        });
        d3.select("#hidden-file-upload").on("change", function () {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var uploadFile  = this.files[0];
                var filereader  = new window.FileReader();
                filereader.onload = function () {
                    try {
                        var jsonObj = JSON.parse(filereader.result);
                        uploadgraphCreator(jsonObj);
                    } catch (err) {
                        window.alert("Error parsing uploaded file\nerror message: " + err.message);
                    }
                };
                filereader.readAsText(uploadFile);
            } else {
                alert("Your browser won't let you save this graph -- try upgrading your browser to IE 10+ or Chrome or Firefox.");
            }
        });
    };

    GraphCreator.prototype.setIdCt = function (idct) {
        this.idct = idct;
    };

    GraphCreator.prototype.consts = {
        selectedClass:        "selected",
        connectClass:         "connect-node",
        circleGClass:         "conceptG",
        graphClass:           "graph",
        activeEditId:         "active-editing",
        BACKSPACE_KEY:        8,
        DELETE_KEY:           46,
        ENTER_KEY:            13,
        nodeRadius:           50
    };

    // ── Main SVG setup ─────────────────────────────────────────────────────
    window.onbeforeunload = function () {
        return "Make sure to save your graph locally before leaving :-)";
    };

    var svg = d3.select("body").append("svg")
        .attr("width",  window.innerWidth)
        .attr("height", window.innerHeight);

    // ── Dot-grid background pattern ────────────────────────────────────────
    var defs = svg.append("defs");
    defs.append("pattern")
        .attr("id",           "dot-grid")
        .attr("width",        20)
        .attr("height",       20)
        .attr("patternUnits", "userSpaceOnUse")
        .append("circle")
        .attr("cx",   10)
        .attr("cy",   10)
        .attr("r",    1.5)
        .attr("fill", "#d0d0d0");

    // ── Canvas group — all diagram elements live here ──────────────────────
    var canvasGroup = svg.append("g").attr("id", "canvas-group");

    canvasGroup.append("rect")
        .attr("x",      -50000)
        .attr("y",      -50000)
        .attr("width",   100000)
        .attr("height",  100000)
        .attr("fill",   "url(#dot-grid)");

    // Route element creation through canvasGroup
    store.sampleSVG   = canvasGroup;
    store.canvasGroup = canvasGroup;

    // ── D3 zoom (programmatic only — no user-input events) ─────────────────
    var zoom = d3.zoom()
        .scaleExtent([0.1, 8])
        .filter(function () { return false; })
        .on("zoom", function (event) {
            canvasGroup.attr("transform", event.transform);
            store.canvasCTMInverse = canvasGroup.node().getScreenCTM().inverse();
        });

    svg.call(zoom);
    store.canvasCTMInverse = canvasGroup.node().getScreenCTM().inverse();

    // ── Scroll to pan ──────────────────────────────────────────────────────
    svg.on("wheel", function (event) {
        event.preventDefault();
        zoom.translateBy(d3.select(this), -event.deltaX, -event.deltaY);
    });

    // ── Responsive resize ──────────────────────────────────────────────────
    window.addEventListener("resize", function () {
        svg.attr("width", window.innerWidth).attr("height", window.innerHeight);
    });

    // ── SVG click — place element at canvas-local coords ──────────────────
    svg.on("click", function (event) {
        var p = d3.pointer(event, canvasGroup.node());
        bpmnEventDivider(bpmnElement, subElement, canvasGroup, p[0], p[1]);
        d3.select('body').style("cursor", "auto");

        var element   = document.getElementById('edittext');
        var textvalue = element.value;
        element.value = "";
        element.style.display = "none";

        if (store.selectedtextid != null) {
            document.getElementById(store.selectedtextid).innerHTML = textvalue;
            store.selectedtextid = null;
        }
    });

    var graph = new GraphCreator(svg, [], []);
    graph.setIdCt(2);

    // ── Zoom button handlers ───────────────────────────────────────────────
    d3.select("#zoom-in-btn").on("click", function () {
        zoom.scaleBy(svg.transition().duration(250), 1.3);
    });
    d3.select("#zoom-out-btn").on("click", function () {
        zoom.scaleBy(svg.transition().duration(250), 1 / 1.3);
    });

    // ── Drag-from-toolbox ─────────────────────────────────────────────────
    // Enables dragging an icon from the toolbox directly onto the canvas to
    // place an element (in addition to the existing click-click flow).
    function enableToolboxDrag(btnId, bpmnElem, subElem) {
        var btn = document.getElementById(btnId);
        if (!btn) return;
        var isDragging = false;
        var ghost = null;

        btn.addEventListener('mousedown', function (e) {
            e.preventDefault();
            isDragging = true;
            window.bpmnElement = bpmnElem;
            window.subElement  = subElem;
            document.body.style.cursor = 'copy';

            ghost = document.createElement('img');
            ghost.src = btn.src;
            Object.assign(ghost.style, {
                position:      'fixed',
                pointerEvents: 'none',
                opacity:       '0.65',
                width:         '30px',
                height:        '30px',
                zIndex:        '9999',
                left:          (e.clientX - 15) + 'px',
                top:           (e.clientY - 15) + 'px'
            });
            document.body.appendChild(ghost);
        });

        document.addEventListener('mousemove', function (e) {
            if (!isDragging || !ghost) return;
            ghost.style.left = (e.clientX - 15) + 'px';
            ghost.style.top  = (e.clientY - 15) + 'px';
        });

        document.addEventListener('mouseup', function (e) {
            if (!isDragging) return;
            isDragging = false;
            if (ghost) { document.body.removeChild(ghost); ghost = null; }
            document.body.style.cursor = 'auto';

            function overBox(id) {
                var el = document.getElementById(id);
                if (!el) return false;
                var r = el.getBoundingClientRect();
                return e.clientX >= r.left && e.clientX <= r.right &&
                       e.clientY >= r.top  && e.clientY <= r.bottom;
            }

            var svgNode = document.querySelector('svg');
            var svgRect = svgNode.getBoundingClientRect();
            var onCanvas = e.clientX >= svgRect.left && e.clientX <= svgRect.right &&
                           e.clientY >= svgRect.top  && e.clientY <= svgRect.bottom;
            var onUI = overBox('toolbox') || overBox('zoom-controls');

            if (onCanvas && !onUI) {
                var p = d3.pointer(e, canvasGroup.node());
                bpmnEventDivider(window.bpmnElement, window.subElement, canvasGroup, p[0], p[1]);
            }
            window.bpmnElement = null;
            window.subElement  = null;
        });
    }

    enableToolboxDrag('start-button',            'startEvent', 'StartEvent');
    enableToolboxDrag('start-time-button',       'startEvent', 'TimeStartEvent');
    enableToolboxDrag('start-message-button',    'startEvent', 'MessageStartEvent');
    enableToolboxDrag('start-error-button',      'startEvent', 'ErrorStartEvent');
    enableToolboxDrag('end-button',              'endEvent',   'EndEvent');
    enableToolboxDrag('error-end-button',        'endEvent',   'ErrorEndEvent');
    enableToolboxDrag('cancel-end-button',       'endEvent',   'CancelEndEvent');
    enableToolboxDrag('terminate-end-button',    'endEvent',   'TerminateEndEvent');
    enableToolboxDrag('user-task-button',        'task',       'UserTask');
    enableToolboxDrag('script-task-button',      'task',       'ScriptTask');
    enableToolboxDrag('mail-task-button',        'task',       'MailTask');
    enableToolboxDrag('manual-task-button',      'task',       'ManualTask');
    enableToolboxDrag('parallel-gateway-button', 'gateway',    'parallel');
    enableToolboxDrag('exclusive-gateway-button','gateway',    'exclusive');
    enableToolboxDrag('inclusive-gateway-button','gateway',    'inclusive');
    enableToolboxDrag('event-gateway-button',    'gateway',    'event');

})(window.d3, window.saveAs, window.Blob);
